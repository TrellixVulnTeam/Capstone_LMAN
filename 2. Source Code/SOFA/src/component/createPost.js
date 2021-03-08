import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, TouchableWithoutFeedback } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import PostViewModel from '../Model/postViewModel';
import { AVATAR, ADD_PRIMARY_IMAGE } from '../../image/index';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';


export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            content: '',
            privacy: '',
            listPrimaryImage: [''],
            listShirtImage: [''],
            listTrousersImage: [''],
            listAccessoriesImage: ['']
        }
    }
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

    checkLoginToken = async () => {
        await this.getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    var uri = Const.domain + 'api/profile';
                    Request.Get(uri, header)
                        .then(response => {
                            console.log(response);
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {

                                this.setState({ account: response, isLogin: true, token: token });
                            } else {
                                this.setState({ account: {}, isLogin: false, token: '' });
                            }
                        })
                        .catch(reason => {
                            this.setState({ account: {}, isLogin: false, token: '' });
                        })
                }
            })
            .catch(reason => {
                this.setState({ token: '' });
                console.log(reason);
            })
    }

    cropImage = async (imagePath) => {

    }

    selectImage = async (imageType) => {
        ImagePicker.openPicker({
            width: 1000,
            height: 1000,
            compressImageMaxHeight: 1000,
            compressImageMaxWidth: 1000,
            includeBase64: true,
            cropping: true
        })
            .then(result => {
                if (imageType == 'primary') {
                    this.setState({ listPrimaryImage: [...this.state.listPrimaryImage, result.data] });
                } else if (imageType == 'shirt') {
                    this.setState({ listPrimaryImage: [...this.state.listShirtImage, result.data] });
                }
                else if (imageType == 'trousers') {
                    this.setState({ listTrousersImage: [...this.state.listTrousersImage, result.data] });
                }
                else if (imageType == 'accessories') {
                    this.setState({ listAccessoriesImage: [...this.state.listAccessoriesImage, result.data] });
                }
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
            //this.selectImage('primary');
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
            this.setState({
                token: '',
                account: {},
                content: '',
                privacy: '',
                listPrimaryImage: [''],
                listShirtImage: [''],
                listTrousersImage: [''],
                listAccessoriesImage: ['']
            });
        })
    }

    render() {
        const { account, listPrimaryImage, listAccessoriesImage, listShirtImage, listTrousersImage, content, privacy } = this.state;
        return (
            <View style={Style.common.container}>
                <StatusBar hidden={false} backgroundColor={'#FFF5F1'} />
                <ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableWithoutFeedback
                            onPress={() => this.navigateProfile(account.accountID)}
                        >
                            <Image
                                source={account.avatarUri && account.avatarUri.length > 0 ?
                                    { uri: Const.assets_domain + account.avatarUri } : AVATAR}
                                style={Style.newsfeed.ArticleAvatar} />
                        </TouchableWithoutFeedback>
                        <View style={Style.newsfeed.ArticleHeader}>
                            <Text
                                onPress={() => this.navigateProfile(account.accountID)}
                                style={Style.newsfeed.ArticleAuthor}>{account.firstName + ' ' + account.lastName}</Text>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            style={{ height: scale(300, Vertical), backgroundColor: 'white' }}
                        />
                    </View>
                    <FlatList
                        data={listPrimaryImage}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        horizontal
                        keyExtractor={(item, index) => index + ''}
                        renderItem={({ item, index }) => {
                            return (
                                <Image
                                    style={{
                                        width: scale(100, Horizontal),
                                        height: scale(100, Horizontal),
                                        resizeMode: 'stretch'
                                    }}
                                    source={index == 0 ? ADD_PRIMARY_IMAGE : { uri: 'data:image/png;base64,' + item }} />
                            )
                        }}
                    />
                    <FlatList
                        data={listShirtImage}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        horizontal
                        keyExtractor={(item, index) => index + ''}
                        renderItem={({ item, index }) => {
                            return (
                                <Image
                                    style={{
                                        width: scale(100, Horizontal),
                                        height: scale(100, Horizontal),
                                        resizeMode: 'stretch'
                                    }}
                                    source={index == 0 ? ADD_PRIMARY_IMAGE : { uri: 'data:image/png;base64,' + item }} />
                            )
                        }}
                    />
                    <FlatList
                        data={listTrousersImage}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        horizontal
                        keyExtractor={(item, index) => index + ''}
                        renderItem={({ item, index }) => {
                            return (
                                <Image
                                    style={{
                                        width: scale(100, Horizontal),
                                        height: scale(100, Horizontal),
                                        resizeMode: 'stretch'
                                    }}
                                    source={index == 0 ? ADD_PRIMARY_IMAGE : { uri: 'data:image/png;base64,' + item }} />
                            )
                        }}
                    />
                    <FlatList
                        data={listAccessoriesImage}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        horizontal
                        keyExtractor={(item, index) => index + ''}
                        renderItem={({ item, index }) => {
                            return (
                                <Image
                                    style={{
                                        width: scale(100, Horizontal),
                                        height: scale(100, Horizontal),
                                        resizeMode: 'stretch'
                                    }}
                                    source={index == 0 ? ADD_PRIMARY_IMAGE : { uri: 'data:image/png;base64,' + item }} />
                            )
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
}