import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, ScrollView, TouchableOpacity } from 'react-native';
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
import { LogBox } from 'react-native';

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
            token: '',
            pageNumber: 1,
            listFollower: [],
            myAccount:{},
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

    getListFollower() {
        const { userId } = this.props.route.params;
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
        };
        let url = Const.domain + 'api/follow/getfollowerlist?userId=' + userId;
        Request.Get(url, header)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ listFollower: response.listFollower });
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(reason => {
                console.log(reason);
                this.props.navigation.navigate('Login')

            });
    }

    componentWillUnmount() {
        //this.setState({ account: {}, avatarUri: '', pageNumber: 1, listImageAll: [] });
    }

    getProfile = async () => {
        const { account } = this.state;
        console.log('Access profile');
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
                                this.setState({ myAccount: response });   
                                console.log(this.state.myAccount);        
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


    onClickItem(userId){
        const {myAccount} = this.state;
        if(myAccount && myAccount.accountID && myAccount.accountID == userId){
            this.props.navigation.navigate('Profile');
        }else{
            this.props.navigation.navigate('OtherProfile', { 'accountID': userId });
        }
    }

    componentDidMount() {
        this.getListFollower();
        this.getProfile();
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.getListFollower();
            this.getProfile();
        });
        this._unfocus = this.props.navigation.addListener('blur', () => {
            this.setState({ listFollower: [] });
        });
    }

    render() {
        const { userId, numberFollower } = this.props.route.params;
        const { listFollower } = this.state;
        return (
            <View>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <LinearGradient colors={['#00bfff', '#99e6ff']}>
                    <View style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        // paddingTop: Utils.scale(20, Const.Vertical),
                        // paddingBottom: Utils.scale(20, Const.Vertical),
                        // borderBottomLeftRadius: 15,
                        // borderBottomRightRadius: 15,
                        width: Utils.scale(400, Const.Horizontal),
                        height: Utils.scale(40, Const.Vertical),
                    }}>
                        <Text style={{
                            fontSize: Utils.scale(15, Const.Horizontal),
                            marginTop: Utils.scale(9, Const.Vertical),
                            fontWeight: 'bold',
                            textAlignVertical: 'center',
                        }}>Số người theo dõi: {numberFollower}</Text>
                    </View>
                </LinearGradient>

                <FlatList
                    data={listFollower}
                    keyExtractor={(item, index) => index + ''}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                this.onClickItem(item.accountId);
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    width: Utils.scale(400, Const.Horizontal),
                                    height: Utils.scale(50, Const.Vertical),
                                    borderColor: 'black',
                                    borderBottomWidth: 2,
                                    textAlignVertical: 'center',
                                }}>
                                    <Image
                                        source={(item.avatarUri && item.avatarUri.length > 0) ? { uri: Const.assets_domain + item.avatarUri + '?time=' + new Date() } : AVATAR}
                                        resizeMode={"cover"}
                                        style={{
                                            height: Utils.scale(45, Const.Horizontal),
                                            width: Utils.scale(45, Const.Horizontal),
                                            borderRadius: Utils.scale(22.5, Const.Horizontal),
                                            borderWidth: 0.2,
                                            overflow: 'hidden',
                                            marginLeft: Utils.scale(7, Const.Horizontal),
                                            marginTop: Utils.scale(4, Const.Vertical),
                                        }} />
                                    <Text style={{
                                        fontSize: Utils.scale(20, Const.Horizontal),
                                        fontWeight: 'bold',
                                        textAlignVertical: 'center',
                                        marginLeft: Utils.scale(7, Const.Horizontal),
                                    }}>{item.firstName} {item.lastName}</Text>
                                </View>
                            </TouchableOpacity>

                        )
                    }}
                />
            </View>
        )
    }
}