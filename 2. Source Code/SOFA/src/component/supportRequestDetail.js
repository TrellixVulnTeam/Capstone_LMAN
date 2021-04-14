import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, ToastAndroid, PermissionsAndroid, FlatList, TouchableOpacity, KeyboardAvoidingView, ScrollView, LogBox } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'

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
            titleScreen: '',
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

    getDataX(){
        var {supportRequest} = this.props.route.params;
        if(supportRequest.requestType == 1){
            this.setState({titleScreen: 'Bạn đã đăng kí trở thành fashionista rồi! Đây là chi tiết yêu cầu của bạn'});
        }else{
            this.setState({titleScreen: 'Bạn đã đăng kí khóa tài khoản rồi! Đây là chi tiết yêu cầu của bạn'});
        }
    }

    componentWillUnmount() {
        //this._unsubcribe();
    }

    componentDidMount() {
        this.getDataX();
    }

    render() {
        const { titleScreen } = this.state;
        var { supportRequest } = this.props.route.params;
        //LogBox.ignoreAllLogs();      
        return (
            <ScrollView>
                <View>
                    <Text style={{
                        marginTop: Utils.scale(5, Const.Vertical),
                        marginLeft: Utils.scale(15, Const.Vertical),
                        fontWeight: 'bold',
                        fontSize: Utils.scale(20, Const.Horizontal),
                        color: '#000066',
                    }}>{titleScreen}</Text>
                    <StatusBar hidden={false} backgroundColor='#fbb897' />
                    <View style={{
                        marginTop: Utils.scale(15, Const.Vertical),
                    }}>
                        <View style={{
                            marginLeft: Utils.scale(10, Const.Horizontal),
                        }}>
                            <Text style={{
                                marginLeft: Utils.scale(5, Const.Horizontal),
                                fontWeight: 'bold',
                                fontSize: Utils.scale(18, Const.Horizontal),
                            }}>Mã số</Text>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    width: Utils.scale(395, Const.Horizontal),
                                    marginLeft: Utils.scale(5, Const.Horizontal),
                                    fontSize: Utils.scale(17, Const.Horizontal),
                                }}
                            >
                                {supportRequest.id}
                            </Text>
                        </View>
                        <View style={{
                            marginLeft: Utils.scale(10, Const.Horizontal),
                            marginTop: Utils.scale(20, Const.Vertical),
                        }}>
                            <Text style={{
                                marginLeft: Utils.scale(5, Const.Vertical),
                                fontWeight: 'bold',
                                fontSize: Utils.scale(18, Const.Horizontal),
                            }}>Thời gian tạo yêu cầu</Text>
                            <Text style={{
                                width: Utils.scale(395, Const.Horizontal),
                                marginLeft: Utils.scale(5, Const.Horizontal),
                                fontSize: Utils.scale(17, Const.Horizontal),
                                textAlignVertical: "top",
                            }}
                            >{supportRequest.timeCreate}</Text>
                        </View>
                        <View style={{
                            marginLeft: Utils.scale(10, Const.Horizontal),
                            marginTop: Utils.scale(20, Const.Vertical),
                        }}>
                            <Text style={{
                                marginLeft: Utils.scale(5, Const.Vertical),
                                fontWeight: 'bold',
                                fontSize: Utils.scale(18, Const.Horizontal),
                            }}>Trạng thái</Text>
                            <Text style={{
                                width: Utils.scale(395, Const.Horizontal),
                                marginLeft: Utils.scale(5, Const.Horizontal),
                                fontSize: Utils.scale(18, Const.Horizontal),
                                textAlignVertical: "top",
                                color: (supportRequest.status == 2) ? '#ff751a' : '#ff1a1a',
                            }}
                            >{(supportRequest.status == 2) ? 'Đang chờ' : 'Bị từ chối'}</Text>
                        </View>
                        <View style={{
                            marginLeft: Utils.scale(10, Const.Horizontal),
                            marginTop: Utils.scale(20, Const.Vertical),
                        }}>
                            <Text style={{
                                marginLeft: Utils.scale(5, Const.Vertical),
                                fontWeight: 'bold',
                                fontSize: Utils.scale(18, Const.Horizontal),
                            }}>Phản hồi từ hệ thống</Text>
                            <Text style={{
                                width: Utils.scale(395, Const.Horizontal),
                                marginLeft: Utils.scale(5, Const.Horizontal),
                                fontSize: Utils.scale(17, Const.Horizontal),
                            }}
                            >{(supportRequest.respone != null && supportRequest.respone.length > 0 ) ? supportRequest : 'Hệ thống chưa có phản hồi. Bạn vui lòng chờ nhé'}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        )
    }
}