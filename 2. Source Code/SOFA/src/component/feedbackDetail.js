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
            feedback: {},
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

    getFeedback() {
        const { feedbackId } = this.props.route.params;
        this.getData('token')
            .then(result => {
                if (result) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2)
                    };
                    let url = Const.domain + 'api/feedback/getfeedbackdetail?fid=' + feedbackId;
                    Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.setState({ feedback: response });
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
        //this._unsubcribe();
    }

    componentDidMount() {
        this.getFeedback();
    }

    render() {
        const { feedback, colorStatus } = this.state;
        //LogBox.ignoreAllLogs();      
        return (
            <ScrollView>
                <View>
                    <Text style={{
                        marginTop: Utils.scale(5, Const.Vertical),
                        marginLeft: Utils.scale(15, Const.Vertical),
                        fontWeight: 'bold',
                        fontSize: Utils.scale(25, Const.Horizontal),
                    }}>Chi tiết feedback</Text>
                    <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                    <View style={{
                        marginTop: Utils.scale(10, Const.Vertical),
                    }}>
                        <View style={{
                            marginLeft: Utils.scale(10, Const.Horizontal),
                        }}>
                            <Text style={{
                                marginLeft: Utils.scale(5, Const.Horizontal),
                                fontWeight: 'bold',
                                fontSize: Utils.scale(20, Const.Horizontal),
                            }}>Tiêu đề</Text>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    width: Utils.scale(395, Const.Horizontal),
                                    marginLeft: Utils.scale(5, Const.Horizontal),
                                    fontSize: Utils.scale(17, Const.Horizontal),
                                }}
                            >
                                {feedback.title}
                            </Text>
                        </View>
                        <View style={{
                            marginLeft: Utils.scale(10, Const.Horizontal),
                            marginTop: Utils.scale(10, Const.Vertical),
                        }}>
                            <Text style={{
                                marginLeft: Utils.scale(5, Const.Vertical),
                                fontWeight: 'bold',
                                fontSize: Utils.scale(15, Const.Horizontal),
                            }}>Nội dung</Text>
                            <Text style={{
                                width: Utils.scale(395, Const.Horizontal),
                                marginLeft: Utils.scale(5, Const.Horizontal),
                                fontSize: Utils.scale(17, Const.Horizontal),
                                textAlignVertical: "top",
                            }}
                            >{feedback.content}</Text>
                        </View>
                        <View style={{
                            marginLeft: Utils.scale(10, Const.Horizontal),
                            marginTop: Utils.scale(10, Const.Vertical),
                        }}>
                            <Text style={{
                                marginLeft: Utils.scale(5, Const.Vertical),
                                fontWeight: 'bold',
                                fontSize: Utils.scale(15, Const.Horizontal),
                            }}>Trạng thái</Text>
                            <Text style={{
                                width: Utils.scale(395, Const.Horizontal),
                                marginLeft: Utils.scale(5, Const.Horizontal),
                                fontSize: Utils.scale(17, Const.Horizontal),
                                textAlignVertical: "top",
                                color: (feedback.status == 1) ? '#ff3333' : '#00e600',
                            }}
                            >{(feedback.status == 1) ? 'Đang chờ' : 'Đã xử lý'}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        )
    }
}