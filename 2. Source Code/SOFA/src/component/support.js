import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, ToastAndroid, PermissionsAndroid, FlatList, TouchableOpacity, KeyboardAvoidingView, ScrollView, LogBox } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { AVATAR, ADDRESS_ICON, BIRTHDAY_ICON, PHONE_ICON, GENDER_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';

export default class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFashionistaRequested: false,
            isLockRequested: false,
            requestFashion: {},
            requestLock: {},
            isFashionista: false,
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

    checkFashionistaRequest = async () => {
        await this.getData('token')
            .then(result => {
                if (result) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2)
                    };
                    let url = Const.domain + 'api/support/getsupportrequest?SupportType=1';
                    Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                if (response.id != 0) {
                                    this.setState({ isFashionistaRequested: true });
                                    this.setState({ requestFashion: response });
                                }
                                else {
                                    this.setState({ isFashionistaRequested: false });
                                }
                            } else {
                                this.props.navigation.navigate('Login')
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            this.props.navigation.navigate('Login')

                        });
                } else {
                    this.setState({ isLogin: false });
                }
            })
            .catch(reason => {
                this.setState({ isLogin: false });
            })
    }

    checkLockRequest = async () => {
        await this.getData('token')
            .then(result => {
                if (result) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2)
                    };
                    let url = Const.domain + 'api/support/getsupportrequest?SupportType=2';
                    Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                if (response.id != 0) {
                                    this.setState({ isLockRequested: true });
                                    this.setState({ requestLock: response });
                                }
                                else {
                                    this.setState({ isLockRequested: false });
                                }
                            } else {
                                this.props.navigation.navigate('Login')
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            this.props.navigation.navigate('Login')

                        });
                } else {
                    this.setState({ isLogin: false });
                }
            })
            .catch(reason => {
                this.setState({ isLogin: false });
            })
    }

    checkFashionista = async () => {
        await this.getData('token')
            .then(result => {
                if (result) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2)
                    };
                    let url = Const.domain + 'api/support/checkfashionista';
                    Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                if (response.isFashionista == true) {
                                    this.setState({ isFashionista: true });
                                }
                                else {
                                    this.setState({ isFashionista: false });
                                }
                            } else {
                                this.props.navigation.navigate('Login')
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            this.props.navigation.navigate('Login')

                        });
                } else {
                    this.setState({ isLogin: false });
                }
            })
            .catch(reason => {
                this.setState({ isLogin: false });
            })
    }

    SendRequest(requestType) {
        this.getData('token')
            .then(result => {
                if (result) {
                    let header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Content-Type": "multipart/form-data",
                        "Host": "chientranhvietnam.org",
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2),
                    };
                    let data = new FormData();
                    data.append('RequestType', requestType);

                    let url = Const.domain + 'api/support/createsupportrequest';
                    Request.Post(url, header, data)
                        .then(response => {
                            console.log(response);
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                ToastAndroid.show('Bạn đã đăng kí thành công. Hãy chờ phản hồi từ chúng tôi nhé!', ToastAndroid.LONG);
                                this.componentDidMount();
                            } else {
                                if (response.code == Const.REQUEST_CODE_FAILED) {
                                    ToastAndroid.show('Gửi đăng kí không thành công! Vui lòng kiểm tra lại', ToastAndroid.LONG);
                                    console.log(response);
                                }
                            }
                        })
                        .catch(reason => {
                            console.log('Lỗi rồi!');
                            console.log(reason);
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

    onPressFashion() {
        var { isFashionistaRequested, isFashionista, requestFashion } = this.state;
        if (isFashionista == true) {
            ToastAndroid.show('Bạn đã là fashionista rồi !', ToastAndroid.LONG);
        } else {
            if (isFashionistaRequested == false) {
                this.SendRequest(1);
            } else {
                this.props.navigation.navigate('SupportRequestDetail', {
                    supportRequest: requestFashion,
                });
            }
        }
    }

    onPressLock() {
        var { isLockRequested, requestLock } = this.state;
        if (isLockRequested == false) {
            this.SendRequest(2);
        } else {
            this.props.navigation.navigate('SupportRequestDetail', {
                supportRequest: requestLock,
            });
        }
    }

    componentWillUnmount() {
        //this._unsubcribe();
    }

    componentDidMount() {
        this.checkFashionistaRequest();
        this.checkLockRequest();
        this.checkFashionista();
    }

    render() {
        const { feedback, colorStatus } = this.state;
        //LogBox.ignoreAllLogs();      
        return (
            <View>
                <Text style={{
                    marginTop: Utils.scale(5, Const.Vertical),
                    marginLeft: Utils.scale(15, Const.Vertical),
                    fontWeight: 'bold',
                    fontSize: Utils.scale(28, Const.Horizontal),
                }}>Hỗ trợ</Text>
                <StatusBar hidden={false} backgroundColor='#fbb897' />
                <View style={{
                    marginLeft: Utils.scale(3, Const.Horizontal),
                }}>
                    <TouchableOpacity onPress={() => this.onPressFashion()}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <AntDesign name='star' size={31} color={'#ff33ff'} style={{
                                marginTop: Utils.scale(15, Const.Horizontal),
                                marginLeft: Utils.scale(8, Const.Horizontal),
                            }} />
                            <Text style={{
                                marginLeft: Utils.scale(12, Const.Horizontal),
                                marginTop: Utils.scale(15, Const.Vertical),
                                alignSelf: 'center',
                                fontSize: Utils.scale(18, Const.Horizontal),
                                fontWeight: 'bold'
                            }}>Đăng kí trở thành fashionista</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginLeft: Utils.scale(3, Const.Horizontal),
                }}>
                    <TouchableOpacity onPress={() => this.onPressLock()}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <FontAwesome5 name='user-lock' size={25} color={'#29293d'} style={{
                                marginTop: Utils.scale(15, Const.Horizontal),
                                marginLeft: Utils.scale(10, Const.Horizontal),
                            }} />
                            <Text style={{
                                marginLeft: Utils.scale(10, Const.Horizontal),
                                marginTop: Utils.scale(15, Const.Vertical),
                                alignSelf: 'center',
                                fontSize: Utils.scale(18, Const.Horizontal),
                                fontWeight: 'bold'
                            }}>Yêu cầu khóa tài khoản</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}