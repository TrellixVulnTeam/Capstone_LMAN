import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { AVATAR } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {},
            avatarUri: '',
            token: '',
            messages: [],
            messageText: '',
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
                    let url = Const.domain + 'api/profile';
                    Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.setState({ account: response });
                                this.setState({ avatarUri: Const.assets_domain + response.avatarUri + '?time=' + new Date() });
                                this.setState({ token: result.toString().substr(1, result.length - 2) });
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



    onPressLogout() {
        AsyncStorage.removeItem('token')
            .then(res => {
                this.setState({ account: {} });
                this.props.navigation.navigate('Login');
            })
            .catch(reason => console.log(reason));

    }

    onPressSend() {
        const { messageText, account } = this.state;
        let data = messageText;
        let uri = 'https://60f6000790f0.ngrok.io/' + 'testjwt/api/message';
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        let body = JSON.stringify({ user: account.userName, message: data });
        Request.Post(uri, headers, body)
            .then(response => console.log(response))
            .catch(reason => console.log(reason));
        this.setState({ messageText: '' });
    }

    componentWillUnmount() {
        this._unsubcribe();
    }

    componentDidMount() {
        const { account } = this.state;
        this.checkLoginToken();

        let connection = new signalR.HubConnectionBuilder()
            .withUrl('http://feb10f20bf66.ngrok.io/' + 'testjwt/message', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();
        connection.start().then(function () {
            console.log('Connected!');
        }).catch(function (err) {
            return console.error(err.toString());
        });

        connection.on("sendToReact", data => {
            console.log(data);
            let user = data.user;
            data = data.message;
            console.log(user, account.userName);
            let temp = this.state.messages;
            let last = temp.pop();
            if (last) {
                temp.push(last);
            }
            let item = {
                id: (last ? last.id + 1 : 1),
                text: data,
                sender: user
            }
            console.log(item);
            temp.push(item);
            this.setState({ messages: temp });
        });

        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({ account: {}, avatarUri: null, messages: [] });
            this.checkLoginToken();
        });

    }



    render() {
        const { account, avatarUri, messages, messageText } = this.state;

        return (
            <View style={[Style.common.container]}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <View style={Style.common.header}>
                    <Text style={Style.common.labelTitle}>Home Screen</Text>
                </View>
                <View style={{
                    marginTop: Utils.scale(10, Const.Vertical),
                    height: Utils.scale(100, Const.Vertical),
                    width: Utils.scale(100, Const.Horizontal),
                    alignSelf: 'center'
                }}>
                    <MenuProvider>
                        <Menu>
                            <MenuTrigger >
                                <Image
                                    source={avatarUri ? { uri: avatarUri } : AVATAR}
                                    style={{
                                        height: Utils.scale(100, Const.Vertical),
                                        width: Utils.scale(100, Const.Horizontal),
                                        borderRadius: Utils.scale(20, Const.Horizontal),
                                        alignSelf: 'center'
                                    }} />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => this.takePicture(source => console.log('Take picture callback'))} text='Máy ảnh' />
                                <MenuOption onSelect={() => this.chooseFile(source => console.log('Choose file callback'))} text='Thư viện' />
                            </MenuOptions>
                        </Menu>
                    </MenuProvider>
                </View>
                <View style={[Style.common.flexRow, {
                    paddingLeft: 20,
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: 40,
                    height: Utils.scale(40, Const.Vertical),
                    marginTop: 10,
                }]}>
                    <Text>Tên đăng nhập</Text>
                    <Text style={{ marginLeft: 10 }}>{account.userName}</Text>
                </View>
                <View style={[Style.common.flexRow, {
                    paddingLeft: 20,
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: 40,
                    height: Utils.scale(40, Const.Vertical),
                    marginTop: 10,
                }]}>
                    <Text>Người dùng</Text>
                    <Text style={{ marginLeft: 10 }}>{account.firstName + ' ' + account.lastName}</Text>
                </View>
                <View style={[Style.common.flexRow, {
                    paddingLeft: 20,
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: 40,
                    height: Utils.scale(40, Const.Vertical),
                    marginTop: 10,
                }]}>
                    <Text>Giới tính</Text>
                    <Text style={{ marginLeft: 10 }}>{account.gender}</Text>
                </View>
                <View style={[Style.common.flexRow, {
                    paddingLeft: 20,
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: 40,
                    height: Utils.scale(40, Const.Vertical),
                    marginTop: 10,
                }]}>
                    <Text>Ngày sinh</Text>
                    <Text style={{ marginLeft: 10 }}>{new Date(account.dob).getDate() + ' - ' + (new Date(account.dob).getMonth() + 1) + ' - ' + new Date(account.dob).getFullYear()}</Text>
                </View>
                <View style={[Style.common.flexRow, {
                    paddingLeft: 20,
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: 40,
                    height: Utils.scale(40, Const.Vertical),
                    marginTop: 10,
                }]}>
                    <Text>Quyền</Text>
                    <Text style={{ marginLeft: 10 }}>{account.role}</Text>
                </View>
                <Button title='Logout' onPress={() => this.onPressLogout()} />
                <View style={{ paddingLeft: 10 }}>
                    <FlatList
                        style={{ height: Utils.scale(200, Const.Vertical) }}
                        data={messages}
                        keyExtractor={({ id }) => id + ''}
                        renderItem={({ item }) => (
                            <View style={[Style.common.flexRow, {
                                paddingLeft: 20,
                                alignItems: 'center',
                                alignContent: 'center',
                                backgroundColor: 'white',
                                borderRadius: 40,
                                height: Utils.scale(40, Const.Vertical),
                                width: Utils.scale(300, Const.Horizontal),
                                marginLeft: (item.sender != account.userName ? 0 : 'auto'),
                                marginRight: (item.isReceive != account.userName ? 'auto' : 0),
                                marginTop: 10,
                            }]}>
                                <Text style={{ fontWeight: 'bold' }}>{item.sender}</Text>
                                <Text style={{ marginLeft: 10 }}>{item.text}</Text>
                            </View>
                        )}
                    />
                    <View style={[Style.common.flexRow, { marginTop: Utils.scale(10, Const.Vertical) }]}>
                        <TextInput
                            value={messageText}
                            onChangeText={text => this.setState({ messageText: text })}
                            style={
                                {
                                    backgroundColor: 'white',
                                    height: Utils.scale(40, Const.Vertical),
                                    width: Utils.scale(300, Const.Horizontal),
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    paddingLeft: Utils.scale(10, Const.Horizontal),
                                }} />
                        <LinearGradient colors={['#FFEFEF', '#9CFFFF']}
                            style={{
                                width: Utils.scale(70, Const.Horizontal),
                                height: Utils.scale(40, Const.Vertical),
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: Utils.scale(10, Const.Horizontal),
                                borderRadius: 10
                            }}>
                            <Text onPress={() => this.onPressSend()} style={{ color: '#707070', fontSize: 20 }}>Gửi</Text>
                        </LinearGradient>
                    </View>
                </View>
            </View >
        )
    }
}
