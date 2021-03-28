import React, { Component, createRef, useRef } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native';
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

export default class Conversation extends Component {
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
            token: '',
            chatHeight: 605,
            conversationId: 0,
        }

    }

    flatList = createRef();

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

    onlineChat() {
        const { myProfile, token, friendId } = this.state;
        if (typeof this.connection === 'undefined') {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(Const.domain + 'message', {
                    accessTokenFactory: () => this.state.token,
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                .build();
            this.connection.start().then(() => {
                console.log('Connected!');
            }).catch(function (err) {
                return console.error(err.toString());
            });
            this.connection.on("NewMessage", data => {
                console.log('New message', data);
                let temp = this.state.listMessage;
                let item = data;
                temp.push(item);
                this.setState({ listMessage: temp });
                setTimeout(() => {
                    console.log('Có tin nhắn');
                    this.flatList.current.scrollToEnd()
                }, 0);
                console.log('add message');
            }
            );
        }

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
                    this.setState({ token: result.toString().substr(1, result.length - 2) });
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
                                this.getMessage();
                                this.onlineChat();
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
        var { listMessage, myProfile, friendId } = this.state;
        // console.log(myProfile);
        // console.log(friendId);
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
        };
        let url = Const.domain + 'api/message/getmessagebyuid?uid1=' + myProfile.accountID + '&uid2=' + friendId;
        console.log('url: '+url);
        Request.Get(url, header)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listMessage = response.listMess;
                    this.setState({ listMessage: listMessage });
                    setTimeout(() => {
                        this.flatList.current.scrollToEnd()
                    }, 0);
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(reason => {
                console.log(reason);
                this.props.navigation.navigate('Login')
            });

    }

    onPressSend() {
        var { message, messageText, imageBase64, conversationId } = this.state;
        const { cid } = this.props.route.params;
        message.senderDeleted = false;
        message.receiverDeleted = false;
        message.isRead = false;
        if (cid) {
            message.conversationId = cid;
        } else {
            message.conversationId = conversationId;
        }

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
                    let temp = this.state.listMessage;
                    let item = response;
                    temp.push(item);
                    this.setState({ listMessage: temp });
                    this.setState({ conversationId: item.conversationId });
                    setTimeout(() => this.flatList.current.scrollToEnd(), 0);
                    console.log('add sent message');
                } else {
                    if (response.code == Const.REQUEST_CODE_FAILED) {
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
        { length: Utils.scale(200, Const.Vertical), offset: (Utils.scale(200, Const.Vertical) + 5) * index, index }
    )

    removeMessageFromList(messageId){
        
    }

    componentDidMount() {
        this.setState({ listMessage: [], myProfile: {} });
        this.getProfile();
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({ listMessage: [], myProfile: {} });
            this.getProfile();
        });
        this._unfocus = this.props.navigation.addListener('blur', () => {
            this.setState({ listMessage: [], myProfile: {} });
        });
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', (event) => {
                this.setState({ chatHeight: 605 - event.endCoordinates.height });
                setTimeout(() => this.flatList.current.scrollToEnd(), 0);
            }
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ chatHeight: 605 });
                setTimeout(() => this.flatList.current.scrollToEnd(), 0);
            },
        );
    }

    componentWillUnmount() {
        console.log('unmount');
        Keyboard.removeAllListeners('keyboardDidShow');
        Keyboard.removeAllListeners('keyboardDidHide');
    }

    render() {
        const { cid, uid1, uid2 } = this.props.route.params;
        var { listMessage, myProfile, friendProfile, messageText, onEmojiKeyboard, message, imageBase64, chatHeight } = this.state;
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
                    height: Utils.scale(chatHeight, Const.Vertical),
                }}>
                    <FlatList
                        ref={this.flatList}
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
                                            height: Utils.scale(200, Const.Vertical),
                                            width: Utils.scale(200, Const.Horizontal),
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
                    height: Utils.scale(40, Const.Vertical),
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
                                this.setState({ imageBase64: source.base64 });
                                this.onPressSend();
                            })} />
                        <TouchableOpacity onPress={() => this.takePicture((source) => {
                            this.setState({ imageBase64: source.base64 });
                            this.onPressSend();
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