/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, createRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Button, Image, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import * as signalR from '@microsoft/signalr';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import MaskedView from "@react-native-community/masked-view";
import Svg, { Rect } from 'react-native-svg';
import * as Request from '../common/request';
import * as Const from '../common/const';
import { scale } from '../common/utils';
import * as Style from '../style/style';
import { AVATAR } from '../../image/index';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { width, height } = Dimensions.get('window')
const ITEM_SIZE = width * 0.72
const BACKDROP_HEIGHT = height * 0.6


export default class Prpfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {},
            avatarUri: '',
            token: '',

        }
    }
    scrollX = new Animated.Value(0);

    flatList = createRef<FlatList<any>>();
    getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    };
    storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        }
        catch (e) {
            console.log(e);
        }
    }

    checkLoginToken() {
        const { account } = this.state;
        console.log('Check login');
        this.getData('token')
            .then(result => {
                if (result) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2),
                    };
                    let url = Const.domain + '/api/account';
                    Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == 'SUCCESSFULLY') {
                                this.setState({ account: response.account });
                                if (response.account.avatar) {
                                    this.setState({ avatarUri: Const.domain.replace('/ChatAPI', '') + '/assets/Image/Avatar/' + response.account.id + '_' + response.account.avatar + '.png' });
                                    console.log(this.state.avatarUri);
                                }
                                this.setState({ token: result.toString().substr(1, result.length - 2) });
                                console.log(this.state.account);
                                console.log(this.state.avatarUri);
                            } else {
                                this.props.navigation.navigate('Login')
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            this.props.navigation.navigate('Login')
                        });
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(reason => {
                console.log('failed');
                this.props.navigation.navigate('Login')
            })

    }

    chooseFile = (callback) => {
        const { account, token } = this.state;
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true,
            maxWidth: 512,
            maxHeight: 512
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                let source = response;
                this.setState({ messageImage: source.base64 });
                console.log(this.state.messageImage);
                callback(source);
            }
        });
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    takePicture = (callback) => {
        const { account, token } = this.state;
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true
        };
        this.requestCameraPermission()
            .then(response => {
                launchCamera(options, (response) => {
                    console.log(response);
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        let source = response;
                        this.setState({ avatarUri: source.uri });
                        if (source.base64) {
                            var header = {
                                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                                "Accept": 'application/json',
                                "Authorization": 'Bearer ' + token,
                            };
                            console.log(header);
                            let data = new FormData();
                            data.append('Avatar', source.base64);
                            data.append('username', account.userName);
                            let url = Const.domain + 'api/account';
                            Request.Post(url, header, data)
                                .then(response => {
                                    if (response && response.code && response.code == 'SUCCESSFULY') {
                                        Alert.alert('Avatar', 'Đổi ảnh đại diện thành công!!!');
                                    }
                                })
                                .catch(reason => {
                                    console.log(reason);
                                });
                        }
                        callback(source);

                    }
                });
            });
    }

    componentDidMount() {
        const { account, token } = this.state;
        //this.checkLoginToken();
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({ account: {}, avatarUri: null });
            this.checkLoginToken();
        });
    }

    componentWillUnmount() {
        console.log('unmount');
        this._unsubcribe();
    }

    render() {
        const { account, avatarUri } = this.state;
        const list = [
            {
                id: 1,
                value: 'Value 1'
            },
            {
                id: 2,
                value: 'Value 2'
            },
            {
                id: 3,
                value: 'Value 3'
            }
        ]
        return (
            <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
                <FlatList
                    data={list}
                    keyExtractor={(item) => item.id + "-backdrop"}
                    removeClippedSubviews={false}
                    contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
                    renderItem={({ item, index }) => {

                        const translateX = this.scrollX.interpolate({
                            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
                            outputRange: [0, width],
                            // extrapolate:'clamp'
                        });
                        return (
                            <Animated.View
                                removeClippedSubviews={false}
                                style={{
                                    position: "absolute",
                                    width: translateX,
                                    height,
                                    overflow: "hidden",
                                }}>
                                <Text
                                    style={{
                                        width,
                                        height: BACKDROP_HEIGHT,
                                        position: "absolute",
                                    }}
                                >{item.value}</Text>
                            </Animated.View>
                        );
                    }}
                />
                <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "red"]}
                    style={{
                        height: BACKDROP_HEIGHT,
                        width,
                        position: "absolute",
                        bottom: 0,
                    }}
                />
            </View>
        )
    }
}
