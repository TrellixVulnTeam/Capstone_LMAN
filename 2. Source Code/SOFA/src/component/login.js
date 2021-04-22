import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Utils from '../common/utils';
import * as Const from '../common/const';
import * as Request from '../common/request';
import { LOGO_ICON, GOOGLE_ICON, FACEBOOK_ICON } from '../../image/index';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { GoogleSignin } from '@react-native-community/google-signin'
import NotificationWSS from '../service/NotificationWSS';
import MessageWSS from '../service/messageWSS';
import * as signalR from '@microsoft/signalr';
import CheckBox from '@react-native-community/checkbox';
import * as OnlineService from '../service/onlineService';
import OnlineWSS from '../service/onlineWSS';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: true,
            isValidUser: true,
            errMsg: 'Error',
            rememberMe: false
        }

    }

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '149927872517-hmt3thsbq7e400b1fl0f48bq1oct8ovn.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
        this.handleSession();
    }

    handleSession = async () => {
        this._getToken().catch((error) => { console.log(error); });
    };

    _getToken = async () => {
        await AsyncStorage.getItem('isRememberMe').then(res => {
            if (res != null) {
                if (res == "false") {
                    this.setState({ rememberMe: false })
                } else {
                    this.setState({ rememberMe: true })
                }
            }
        })
            .catch((error) => {
                console.log(error);
            });
        await AsyncStorage.getItem('user').then(result => {
            if (result != null) {
                if (this.state.rememberMe == true) {
                    var user = JSON.parse(result);
                    if (user.password) {
                        this.setState({ username: user.username, password: user.password })
                    } else {
                        this.setState({ rememberMe: false })
                    }
                }
            }
        })
            .catch((error) => {
                console.log(error);
            });
        await AsyncStorage.getItem('token')
            .then(value => {
                if (value != null) {
                    this.props.navigation.dispatch(
                        StackActions.replace('Intro', {
                            isRefreshing: false
                        })
                    )
                }
                else {
                    this.setState({ isLoading: false })
                }
            })
            .catch((error) => {
                console.log(error);
            });
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

    onLogin() {
        if (this.state.username.length < 6 || this.state.password.length < 6) {
            this.setState({ isValidUser: false, errMsg: 'Tài khoản và mật khẩu bao gồm 6 ký tự trở lên' })
        }
        else {
            const { username, password } = this.state;
            let header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Content-Type": "multipart/form-data",
                "Host": "chientranhvietnam.org"
            };
            let data = new FormData();
            data.append('username', username);
            data.append('password', password);
            data.append('isApplicationAccess', true)
            let url = Const.domain + 'api/auth/login';
            Request.Post(url, header, data)
                .then(response => {
                    if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        const user = { username: response.username, role: response.roleName, email: response.email, phone: response.phone, password: password };
                        this.storeData('token', response.token)
                            .then(res => {
                                this.storeData('user', user)
                                    .then(res => {
                                        this.storeData('isRememberMe', this.state.rememberMe).then(result => {
                                            this.setState({ isLoading: false });

                                            let instance = NotificationWSS.getInstance(false);
                                            instance.setConnection(new signalR.HubConnectionBuilder()
                                                .withUrl(Const.domain + 'notification', {
                                                    accessTokenFactory: () => response.token,
                                                    skipNegotiation: true,
                                                    transport: signalR.HttpTransportType.WebSockets
                                                })
                                                .withAutomaticReconnect()
                                                .build());
                                            instance.pushNotification();
                                            let messInstance = MessageWSS.getInstance(false);
                                            messInstance.setConnection(new signalR.HubConnectionBuilder()
                                                .withUrl(Const.domain + 'message', {
                                                    accessTokenFactory: () => response.token,
                                                    skipNegotiation: true,
                                                    transport: signalR.HttpTransportType.WebSockets
                                                })
                                                .withAutomaticReconnect()
                                                .build());
                                            messInstance.pushNotification();
                                            let onlineInstance = OnlineWSS.getInstance(false);
                                            onlineInstance.setConnection(new signalR.HubConnectionBuilder()
                                                .withUrl(Const.domain + 'message', {
                                                    accessTokenFactory: () => response.token,
                                                    skipNegotiation: true,
                                                    transport: signalR.HttpTransportType.WebSockets
                                                })
                                                .withAutomaticReconnect()
                                                .build());
                                            onlineInstance.pushNotification();
                                            this.props.navigation.dispatch(
                                                StackActions.replace('Intro', {
                                                    isRefreshing: false
                                                })
                                            )
                                            // this.props.navigation.goBack();
                                        })
                                    });
                            });
                    } else {
                        if (response.code == Const.REQUEST_CODE_FAILED) {
                            this.setState({ isValidUser: false, errMsg: 'Tài khoản hoặc Mật khẩu không chính xác' })
                        }
                    }
                })
                .catch(reason => {
                    console.log(reason);
                });
        }
    }

    googleSignin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn().then(user => {
                console.log(user.idToken);
                let header = {
                    "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                    "Content-Type": "multipart/form-data",
                    "Host": "chientranhvietnam.org"
                };
                let data = new FormData();
                data.append('tokenId', user.idToken);
                let url = Const.domain + 'api/auth/oauth';
                Request.Post(url, header, data)
                    .then(response => {
                        if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                            const user = { username: response.username, role: response.roleName, email: response.email, phone: response.phone };
                            this.storeData('token', response.token)
                                .then(res => {
                                    this.storeData('user', user)
                                        .then(res => {
                                            this.setState({ isLoading: false });

                                            let instance = NotificationWSS.getInstance(false);
                                            instance.setConnection(new signalR.HubConnectionBuilder()
                                                .withUrl(Const.domain + 'notification', {
                                                    accessTokenFactory: () => response.token,
                                                    skipNegotiation: true,
                                                    transport: signalR.HttpTransportType.WebSockets
                                                })
                                                .withAutomaticReconnect()
                                                .build());
                                            instance.pushNotification();
                                            let messInstance = MessageWSS.getInstance(false);
                                            messInstance.setConnection(new signalR.HubConnectionBuilder()
                                                .withUrl(Const.domain + 'message', {
                                                    accessTokenFactory: () => response.token,
                                                    skipNegotiation: true,
                                                    transport: signalR.HttpTransportType.WebSockets
                                                })
                                                .withAutomaticReconnect()
                                                .build());
                                            messInstance.pushNotification();
                                            // OnlineService.online();
                                            this.props.navigation.dispatch(
                                                StackActions.replace('Intro', {
                                                    isRefreshing: false
                                                })
                                            )
                                            // this.props.navigation.goBack();
                                        });
                                });
                        } else {
                            if (response.code == Const.REQUEST_CODE_FAILED) {
                                Alert.alert(
                                    "Thông báo",
                                    "Hãy đăng ký với địa chỉ email của bạn",
                                    [
                                        {
                                            text: "Hủy",
                                            style: "cancel"
                                        },
                                        { text: "OK", onPress: () => this.props.navigation.navigate('PhoneRegister', { isResetPassword: false }) }
                                    ]
                                );
                            }
                        }
                    })
                    .catch(reason => {
                        console.log(reason);
                    });
            });
        } catch (error) {
            console.log(error);
        }
    }
    onRememberMe() {
        this.setState({ rememberMe: !this.state.rememberMe })

    }

    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color='#ff8683' />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <View>
                            <Image
                                style={styles.logo}
                                source={LOGO_ICON}
                            />
                            <View style={styles.signInContent}>
                                <Text style={{ fontSize: Utils.scale(38, Const.Horizontal) }}>Đăng nhập</Text>
                                <Text style={{ fontSize: Utils.scale(15, Const.Horizontal), opacity: Utils.scale(0.6, Const.Horizontal) }}>Đăng nhập với tài khoản bạn đã đăng ký</Text>
                                <View style={{ borderBottomColor: '#ff8683', borderBottomWidth: Utils.scale(4, Const.Horizontal), borderRadius: Utils.scale(10, Const.Horizontal), width: Utils.scale(50, Const.Horizontal), marginTop: Utils.scale(10, Const.Horizontal) }}></View>
                            </View>
                            <View style={styles.containerInput}>
                                <View style={styles.inputView} >
                                    <Text style={styles.inputTitle}>Tài khoản</Text>
                                    <TextInput
                                        value={this.state.username}
                                        style={styles.inputText}
                                        placeholder='Tài khoản'
                                        onChangeText={text => this.setState({ username: text, isValidUser: !this.stateisValidUser })} />
                                </View>
                                <View style={styles.inputView} >
                                    <Text style={styles.inputTitle}>Mật khẩu</Text>
                                    <TextInput
                                        value={this.state.password}
                                        secureTextEntry
                                        placeholder='Mật khẩu'
                                        style={styles.inputText}
                                        onChangeText={text => this.setState({ password: text, isValidUser: !this.stateisValidUser })} />
                                </View>
                            </View>
                            {this.state.isValidUser ? null :
                                <Animatable.View duration={500}>
                                    <Text style={styles.errMsg}>{this.state.errMsg}</Text>
                                </Animatable.View>
                            }
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Utils.scale(35, Const.Horizontal) }}>
                                <CheckBox value={this.state.rememberMe} onChange={() => this.onRememberMe()} tintColors={{ true: '#ff8683', false: '#C0C0C0' }}></CheckBox>
                                <Text>Nhớ mật khẩu</Text>
                            </View>
                            <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 0 }}>
                                <Text style={styles.forgot} onPress={() => navigate('PhoneRegister', { isResetPassword: true })}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                            <View style={styles.loginContainer}>
                                <TouchableOpacity style={styles.loginTouch} onPress={() => this.onLogin()}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#fbb897', '#ff8683']}
                                        style={styles.loginBtn}>
                                        <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.iconContainer, { marginLeft: '25%' }]} onPress={this.googleSignin}>
                                    <Image style={styles.iconGoogle}
                                        source={GOOGLE_ICON}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.iconContainer, { marginLeft: '4%' }]}>
                                    <Image style={styles.iconGoogle}
                                        source={FACEBOOK_ICON}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', marginTop: Utils.scale(100, Const.Horizontal) }}>
                                <Text style={{ opacity: Utils.scale(0.4, Const.Horizontal), fontSize: Utils.scale(14, Const.Horizontal) }}>
                                    Bạn chưa có tài khoản?
                        </Text>
                                <TouchableOpacity>
                                    <Text
                                        style={{ color: '#ff8683', fontWeight: 'bold', fontSize: Utils.scale(14, Const.Horizontal) }}
                                        onPress={() => navigate('PhoneRegister', { isResetPassword: false })}
                                    > Đăng ký</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loading: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    containerInput: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInContent: {
        marginLeft: Utils.scale(40, Const.Horizontal),
        paddingBottom: Utils.scale(30, Const.Horizontal)
    },
    logo: {
        height: Utils.scale(200, Const.Horizontal),
        width: '100%',
        resizeMode: 'contain',
        marginBottom: Utils.scale(20, Const.Horizontal)
    },
    inputTitle: {
        color: "#000000",
        fontSize: Utils.scale(14, Const.Horizontal),
        fontWeight: 'bold'
    },
    inputView: {
        width: "80%",
        height: Utils.scale(50, Const.Horizontal),
        marginBottom: Utils.scale(20, Const.Horizontal),
        justifyContent: "center",
        marginTop: Utils.scale(20, Const.Horizontal)
    },
    inputText: {
        height: Utils.scale(40, Const.Horizontal),
        borderBottomWidth: Utils.scale(1, Const.Horizontal),
        borderBottomColor: "#DBDBDB",
    },
    forgot: {
        color: "#ff8683",
        fontWeight: 'bold',
        paddingRight: Utils.scale(40, Const.Horizontal),
        fontSize: Utils.scale(12, Const.Horizontal),
    },
    loginContainer: {
        marginTop: Utils.scale(30, Const.Horizontal),
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    loginTouch: {
        alignItems: "center",
        justifyContent: "center",
    },
    loginBtn: {
        width: Utils.scale(120, Const.Horizontal),
        borderRadius: Utils.scale(25, Const.Horizontal),
        height: Utils.scale(45, Const.Horizontal),
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Utils.scale(10, Const.Horizontal),
        marginLeft: Utils.scale(40, Const.Horizontal),
        elevation: Utils.scale(7, Const.Horizontal),
    },
    loginText: {
        color: "white",
        fontSize: Utils.scale(16, Const.Horizontal),
        backgroundColor: 'transparent',
    },
    iconContainer: {
        backgroundColor: '#e7f5f2',
        width: Utils.scale(45, Const.Horizontal),
        height: Utils.scale(45, Const.Horizontal),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Utils.scale(25, Const.Horizontal),
        elevation: Utils.scale(6, Const.Horizontal),
    },
    iconGoogle: {
        width: Utils.scale(27, Const.Horizontal),
        height: Utils.scale(27, Const.Horizontal),
    },
    errMsg: {
        color: '#ff0000',
        fontSize: Utils.scale(12, Const.Horizontal),
        marginLeft: Utils.scale(40, Const.Horizontal),
        marginBottom: Utils.scale(5, Const.Horizontal)
    },
});