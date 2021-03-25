import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMessage: [],
            myProfile: {},
            friendProfile: {},
            friendId: 0,
            onEmojiKeyboard: false,
            messageText: '',
            message: {},
            imageBase64: '',          
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

    chooseFile = (callback) => {
        const { account, token } = this.state;
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true
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
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        let source = response;
                        callback(source);
                    }
                });
            });
    }


    getProfile = async () => {
        console.log('Get my profile');
        const { uid1, uid2 } = this.props.route.params;
        var { message } = this.state;
        await this.getData('token')
            .then(result => {
                if (result) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2)
                    };
                    let url = Const.domain + 'api/profile';
                    Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.setState({ myProfile: response });
                                var friendId = uid1;
                                if (response.accountID == uid1) {
                                    friendId = uid2;
                                    message.fromAccountId = uid1;
                                    message.toAccountId = uid2;
                                } else {
                                    message.fromAccountId = uid2;
                                    message.toAccountId = uid1;
                                }
                                this.setState({ message: message });
                                this.setState({ friendId: friendId });
                                this.getFriendProfile();
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

    getFriendProfile = async () => {
        var { friendId } = this.state;

        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
        };
        let url = Const.domain + 'api/profile/otherprofile?id=' + friendId;
        Request.Get(url, header)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ friendProfile: response });
                    //this.setState({ avatarUri: Const.assets_domain + response.avatarUri + '?time=' + new Date() });
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(reason => {
                console.log(reason);
                this.props.navigation.navigate('Login')

            });
    }
    getMessage() {
        console.log('Get message')
        var { listMessage } = this.state;
        const { cid } = this.props.route.params;
        if (cid) {
            var header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Accept": 'application/json',
            };
            let url = Const.domain + 'api/message/getmessagebycid?cid=' + cid;
            Request.Get(url, header)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        let listMessage = response.listMess;
                        this.setState({ listMessage: listMessage });
                    } else {
                        this.props.navigation.navigate('Login')
                    }
                })
                .catch(reason => {
                    console.log(reason);
                    this.props.navigation.navigate('Login')
                });
        }

    }

    onPressSend() {
        var { message, messageText, imageBase64 } = this.state;
        const { cid } = this.props.route.params;
        message.senderDeleted = false;
        message.receiverDeleted = false;
        message.isRead = false;
        message.conversationId = cid;
        message.imageBase64 = imageBase64;
        message.content = messageText;
        
        console.log(message);

        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Content-Type": "multipart/form-data",
            "Host": "chientranhvietnam.org",
            "Accept": 'application/json',
        };
        let data = new FormData();
        data.append('fromAccountId', message.fromAccountId);
        data.append('toAccountId', message.toAccountId);
        data.append('content', message.content);
        data.append('senderDeleted', message.senderDeleted);
        data.append('receiverDeleted', message.receiverDeleted);
        data.append('isRead', message.isRead);
        data.append('conversationId', message.conversationId);
        data.append('imageBase64', message.imageBase64);
        let url = Const.domain + 'api/message/sendmessage';
        Request.Post(url, header, data)
            .then(response => {
                console.log(response);
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    Alert.alert('Send message Successfully', 'Gửi tin nhắn thành công!');
                    console.log(response);
                } else {
                    if (response.code == Const.REQUEST_CODE_FAILED) {
                        Alert.alert('Send Failed', 'Gửi tin nhắn không thành công! Vui lòng kiểm tra lại');
                        console.log(response);
                    }
                }
            })
            .catch(reason => {
                console.log('Lỗi rồi!');
                console.log(reason);
            });

        console.log(message);
        this.setState({ messageText: '' });
    }

    getItemLayout = (data, index) => (
        { length: Utils.scale(40, Const.Vertical), offset: (Utils.scale(40, Const.Vertical) + 5) * index, index }
    )

    componentDidMount() {
        this.setState({});
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            //this.setState({});
            this.getProfile();
            this.getMessage();
        });
        this._unfocus = this.props.navigation.addListener('blur', () => {
            //this.setState({});
        });
    }

    render() {
        const { cid, uid1, uid2 } = this.props.route.params;
        var { listMessage, myProfile, friendProfile, messageText, onEmojiKeyboard, message, imageBase64 } = this.state;
        return (
            <View>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <LinearGradient colors={['#b30000', '#e60000', '#ff3333']}>
                    <View style={{
                        width: Utils.scale(400, Const.Horizontal),
                        height: Utils.scale(40, Const.Vertical),
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            width: Utils.scale(50, Const.Horizontal),
                        }}></View>
                        <View>
                            <Text style={{
                                textAlign: 'center',
                                textAlignVertical: "center",
                                color: 'white',
                                fontSize: 18,
                                width: Utils.scale(300, Const.Horizontal),
                            }}>{friendProfile.firstName} {friendProfile.lastName}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => alert('Click More')} style={{
                                width: Utils.scale(50, Const.Horizontal),
                                marginTop: Utils.scale(15, Const.Vertical),
                                marginLeft: Utils.scale(15, Const.Horizontal),
                            }}>
                                <Entypo name='dots-three-horizontal' size={22} color={'white'} />
                                <Text style={{
                                    color: 'white',
                                }}></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{
                    width: Utils.scale(400, Const.Horizontal),
                    height: Utils.scale(620, Const.Horizontal),
                }}>
                    <FlatList
                        data={listMessage}
                        //initialScrollIndex={listMessage.length-2}
                        //inverted = {true}
                        getItemLayout={this.getItemLayout}
                        keyExtractor={(item, index) => index + ''}
                        onScroll={e => {
                            this.scrollOffset = e.nativeEvent.contentOffset.y;
                        }}
                        onLayout={e => {
                            this.flatlistTopOffset = e.nativeEvent.layout.y;
                        }}
                        scrollEventThrottle={16}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    {item.content && item.content.length > 0 ? (
                                        <View style={[Style.common.flexRow, {
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            alignItems: 'center',
                                            alignContent: 'center',
                                            backgroundColor: 'white',
                                            borderRadius: 40,
                                            height: Utils.scale(40, Const.Vertical),
                                            marginLeft: (item.fromAccountId != myProfile.accountID ? 10 : 'auto'),
                                            marginRight: (item.fromAccountId != myProfile.accountID ? 'auto' : 10),
                                            marginTop: 5,
                                        }]}>
                                            <Text style={{ alignItems: 'center' }}>{item.content}</Text>
                                        </View>
                                    ) : (
                                        <View></View>
                                    )}

                                    {item.imageUrl && item.imageUrl.length > 0 ? (
                                        <View style={[Style.common.flexRow, {
                                            width: Utils.scale(200, Const.Horizontal),
                                            height: Utils.scale(200, Const.Vertical),
                                            marginLeft: (item.fromAccountId != myProfile.accountID ? 0 : 'auto'),
                                            marginRight: (item.fromAccountId != myProfile.accountID ? 'auto' : 0),
                                        }]}>

                                            <Image style={{
                                                borderRadius: 20,
                                                flex: 1,
                                                width: null,
                                                height: null,
                                                resizeMode: 'contain'
                                            }}
                                                source={{ uri: Const.assets_domain + item.imageUrl }}
                                            />
                                        </View>
                                    ) : (<View></View>)}
                                </View>

                            )
                        }}
                    />
                </View>
                <View style={{
                    width: Utils.scale(400, Const.Horizontal),
                    height: Utils.scale(40, Const.Horizontal),
                }}>
                    <View
                        style={[Style.common.flexRow, { marginBottom: Utils.scale(5, Const.Vertical), marginTop: Utils.scale(20, Const.Horizontal), justifyContent: 'center', alignItems: 'center' }]}>
                        <TextInput
                            defaultValue={messageText}
                            onChangeText={text => {
                                this.setState({ messageText: text });
                            }}
                            style={
                                {
                                    backgroundColor: 'white',
                                    height: Utils.scale(40, Const.Vertical),
                                    width: Utils.scale(260, Const.Horizontal),
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    paddingLeft: Utils.scale(10, Const.Horizontal),
                                    marginLeft: Utils.scale(10, Const.Horizontal),
                                }} />
                        <Icon
                            name="image"
                            size={35}
                            color="black"
                            style={{ marginLeft: Utils.scale(8, Const.Horizontal) }}
                            onPress={() => this.chooseFile((source) => {
                                this.setState({imageBase64 : source.base64});
                            })} />
                        <TouchableOpacity onPress={() => this.takePicture((source) => {
                            this.setState({imageBase64 : source.base64});
                        })}>
                            <Entypo name='camera' size={32} color={'black'} style={{
                                marginLeft: Utils.scale(8, Const.Horizontal),
                            }} />
                        </TouchableOpacity>

                        <Icon
                            name='send'
                            size={35}
                            color="black"
                            onPress={() => this.onPressSend()}
                            style={{ marginLeft: Utils.scale(8, Const.Horizontal), marginRight: Utils.scale(10, Const.Horizontal) }} />
                    </View>
                </View>
            </View >
        )
    }
}