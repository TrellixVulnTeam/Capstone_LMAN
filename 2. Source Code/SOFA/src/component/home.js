import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image } from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { useIsFocused } from '@react-navigation/native';
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {},
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
                    Request.Get('http://139.180.214.58/TestJWT/api/account', header)
                        .then(response => {
                            if (response && response.code && response.code == 'SUCCESSFULY') {
                                this.setState({ account: response.account });
                                console.log(response.account.userName);
                            } else {
                                this.props.navigation.navigate('Login')
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                        });
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(reason => {
                console.log('failed');
            })

    }

    onPressLogout() {
        AsyncStorage.removeItem('token')
            .then(res => {
                this.setState({ account: {} });
                this.props.navigation.navigate('Login');
            })
            .catch(reason => console.log(reason));

    }



    componentWillUnmount() {
        this._unsubcribe();
    }

    componentDidMount() {
        //this.checkLoginToken();
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({ account: {} });
            this.checkLoginToken();
        })
    }

    render() {
        const { account } = this.state;
        return (
            <View style={[Style.common.container]}>
                <StatusBar hidden={false} backgroundColor='orange' />
                <View style={Style.common.header}>
                    <Text style={Style.common.labelTitle}>Home Screen</Text>
                </View>
                <View>
                    <Image style={
                        {
                            height: Utils.scale(100, Const.Vertical),
                            width: Utils.scale(100, Const.Horizontal),
                            borderRadius: Utils.scale(100, Const.Horizontal),
                            alignSelf: 'center'
                        }
                    }
                        source={{ uri: 'http://139.180.214.58/assets/Image/' + account.userName + '/avatar.png' }} />
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
            </View>
        )
    }
}
