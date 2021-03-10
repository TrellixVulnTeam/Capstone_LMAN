import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import RadioButtonRN from 'radio-buttons-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {LogBox} from 'react-native';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { AVATAR, ADDRESS_ICON, BIRTHDAY_ICON, PHONE_ICON, GENDER_ICON, MORE_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            avatarUri: '',
            isLogin: true,
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

    getProfile = async () => {
        const { account } = this.state;    
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
                                this.setState({ account: response });
                                this.setState({ avatarUri: Const.assets_domain + response.avatarUri + '?time=' + new Date() });
                            } else {
                                this.props.navigation.navigate('Login')
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            this.props.navigation.navigate('Login')

                        });
                } else {
                    this.setState({isLogin: false});
                }
            })
            .catch(reason => {
                this.setState({isLogin: false});
            })
    }

    logout() {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Login');
    }

    componentWillUnmount() {
        //this._unsubcribe();
    }

    componentDidMount(){
        console.log('My Account');
        this.getProfile();
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({ account: {}, avatarUri: '' });
            this.getProfile();
        });
    }

    render() {
        const { account, avatarUri, isLogin } = this.state;
        console.log(account);     
        if(!isLogin){
            return (
                <View style = {{
                    alignSelf: 'center'
                }}>
                    <Text>Hãy đăng nhập để sử dụng chức năng này</Text>
                </View>
            )
        }else{
            return (
                <ScrollView>
                   <View>
                        <Text>Bạn đã đăng nhập!</Text>
                   </View>
                </ScrollView>
            )
        }
        
    }
}