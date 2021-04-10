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
            listFeedback: [],
            numberFeedback: 0,
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

    getListFeedback() {
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
        };
        let url = Const.domain + 'api/feedback/getlistfeedback';
        Request.Get(url, header)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ listFeedback: response.listFeedback });
                    this.setState({ numberFeedback: response.listFeedback.length })
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


    onClickItem(feedbackId) {
        // if(myAccount && myAccount.accountID && myAccount.accountID == userId){
        //     this.props.navigation.navigate('Profile');
        // }else{
        //     this.props.navigation.navigate('OtherProfile', { 'accountID': userId });
        // }
        ToastAndroid.show('Direct', 'Sẽ direct sang feedback có Id là: ' + feedbackId, ToastAndroid.SHORT);
    }

    componentDidMount() {
        this.getListFeedback();
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.getListFeedback();
        });
        this._unfocus = this.props.navigation.addListener('blur', () => {
        });
    }

    render() {
        const { numberFeedback, listFeedback } = this.state;
        return (
            <View>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <LinearGradient colors={['#ff8533', '#ffb380']}>
                    <View style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        // paddingTop: Utils.scale(20, Const.Vertical),
                        // paddingBottom: Utils.scale(20, Const.Vertical),
                        // borderBottomLeftRadius: 15,
                        // borderBottomRightRadius: 15,
                        width: Utils.scale(400, Const.Horizontal),
                        height: Utils.scale(35, Const.Vertical),
                    }}>
                        <Text style={{
                            fontSize: Utils.scale(15, Const.Horizontal),
                            marginTop: Utils.scale(9, Const.Vertical),
                            fontWeight: 'bold',
                            textAlignVertical: 'center',
                        }}>Số feedback của bạn: {numberFeedback}</Text>
                    </View>
                </LinearGradient>
                <View style={{
                    height: Utils.scale(665, Const.Vertical),
                }}>
                    <FlatList
                        data={listFeedback}
                        keyExtractor={(item, index) => index + ''}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.onClickItem(item.Id);
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        width: Utils.scale(400, Const.Horizontal),
                                        height: Utils.scale(50, Const.Vertical),
                                        borderColor: 'black',
                                        borderBottomWidth: 2,
                                        textAlignVertical: 'center',
                                    }}>
                                        <Text style={{
                                            fontSize: Utils.scale(20, Const.Horizontal),
                                            fontWeight: 'bold',
                                            textAlignVertical: 'center',
                                            marginLeft: Utils.scale(7, Const.Horizontal),
                                        }}>{item.Id}</Text>
                                        <Text style={{
                                            fontSize: Utils.scale(20, Const.Horizontal),
                                            fontWeight: 'bold',
                                            textAlignVertical: 'center',
                                            marginLeft: Utils.scale(7, Const.Horizontal),
                                        }}>{item.Title}</Text>
                                        <Text style={{
                                            fontSize: Utils.scale(20, Const.Horizontal),
                                            fontWeight: 'bold',
                                            textAlignVertical: 'center',
                                            marginLeft: Utils.scale(7, Const.Horizontal),
                                        }}>{item.Status}</Text>
                                    </View>
                                </TouchableOpacity>

                            )
                        }}
                    />
                </View>

            </View>
        )
    }
}