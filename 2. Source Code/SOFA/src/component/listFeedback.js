import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
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
        this.getData('token')
            .then(result => {
                if (result) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2)
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
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(reason => {
                console.log('failed');
                this.props.navigation.navigate('Login')
            })


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
        this.props.navigation.navigate('FeedbackDetail', { 'feedbackId': feedbackId });
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
                <LinearGradient colors={['#2a7ea0', '#5EA4C1']}>
                    <View style={{
                        alignContent: 'center',
                        // paddingTop: Utils.scale(20, Const.Vertical),
                        // paddingBottom: Utils.scale(20, Const.Vertical),
                        // borderBottomLeftRadius: 15,
                        // borderBottomRightRadius: 15,
                        width: Utils.scale(400, Const.Horizontal),
                        height: Utils.scale(45, Const.Vertical),
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            width: Utils.scale(260, Const.Horizontal),
                        }}>
                            <Text style={{
                                fontSize: Utils.scale(16, Const.Horizontal),
                                marginTop: Utils.scale(9.5, Const.Vertical),
                                marginLeft: Utils.scale(9, Const.Vertical),
                                fontWeight: 'bold',
                                textAlignVertical: 'center',
                            }}>Số feedback của bạn: {numberFeedback}</Text>
                        </View>

                        <View style={{
                            width: Utils.scale(140, Const.Horizontal),
                        }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateFeedback')}>
                                <View style={{
                                    marginTop: Utils.scale(2, Const.Horizontal),
                                    //marginRight: Utils.scale(5, Const.Horizontal),
                                    backgroundColor: '#fff0b3',
                                    borderColor: 'black',
                                    borderWidth: 2,
                                    borderRadius: 7,
                                    width: Utils.scale(135, Const.Horizontal),
                                    height: Utils.scale(40, Const.Vertical),
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        marginTop: Utils.scale(-3, Const.Vertical),
                                        marginLeft: Utils.scale(11, Const.Horizontal),
                                        fontSize: Utils.scale(18, Const.Horizontal),
                                        fontWeight: 'bold',
                                    }}>Gửi feedback</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        width: Utils.scale(400, Const.Horizontal),
                        height: Utils.scale(40, Const.Vertical),
                        borderColor: 'black',
                        borderBottomWidth: 2,
                        textAlignVertical: 'center',
                    }}>
                        <View style={{
                            width: Utils.scale(50, Const.Horizontal),
                            textAlignVertical: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            borderRightWidth: 1,
                            borderColor: 'gray',
                        }}>
                            <Text style={{
                                fontSize: Utils.scale(19, Const.Horizontal),
                                textAlignVertical: 'center',
                                fontWeight: 'bold'
                            }}>Mã</Text>
                        </View>

                        <View style={{
                            width: Utils.scale(230, Const.Horizontal),
                            textAlignVertical: 'center',
                            borderRightWidth: 1,
                            borderColor: 'gray',
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: Utils.scale(19, Const.Horizontal),
                                textAlignVertical: 'center',
                                marginLeft: Utils.scale(7, Const.Horizontal),
                                fontWeight: 'bold',
                            }}>Tiêu đề</Text>
                        </View>

                        <View style={{
                            width: Utils.scale(120, Const.Horizontal),
                            textAlignVertical: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                        }}>
                            <Text style={{
                                fontSize: Utils.scale(19, Const.Horizontal),
                                textAlignVertical: 'center',
                                fontWeight:'bold',
                            }}>Trạng thái</Text>
                        </View>

                    </View>
                </View>
                <View style={{
                    height: Utils.scale(665, Const.Vertical),
                }}>
                    <FlatList
                        data={listFeedback}
                        keyExtractor={(item, index) => index + ''}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.onClickItem(item.id);
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        width: Utils.scale(400, Const.Horizontal),
                                        height: Utils.scale(40, Const.Vertical),
                                        borderColor: 'black',
                                        borderBottomWidth: 2,
                                        textAlignVertical: 'center',
                                    }}>
                                        <View style={{
                                            width: Utils.scale(50, Const.Horizontal),
                                            textAlignVertical: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            borderRightWidth: 1,
                                            borderColor: 'gray',
                                        }}>
                                            <Text style={{
                                                fontSize: Utils.scale(17, Const.Horizontal),
                                                textAlignVertical: 'center',
                                            }}>{item.id}</Text>
                                        </View>

                                        <View style={{
                                            width: Utils.scale(230, Const.Horizontal),
                                            textAlignVertical: 'center',
                                            borderRightWidth: 1,
                                            borderColor: 'gray',
                                            alignSelf: 'center',
                                        }}>
                                            <Text style={{
                                                fontSize: Utils.scale(17, Const.Horizontal),
                                                textAlignVertical: 'center',
                                                marginLeft: Utils.scale(7, Const.Horizontal),
                                            }}>{(item.title.length > 28) ? item.title.substring(0, 28) + ' ...' : item.title}</Text>
                                        </View>

                                        <View style={{
                                            width: Utils.scale(120, Const.Horizontal),
                                            textAlignVertical: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                        }}>
                                            <Text style={{
                                                fontSize: Utils.scale(17, Const.Horizontal),
                                                textAlignVertical: 'center',
                                                color: (item.status == 1) ? '#ff3333' : '#00e600',
                                            }}>{(item.status == 1) ? 'Đang chờ' : 'Đã xử lý'}</Text>
                                        </View>

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