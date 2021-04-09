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
            account: {},
            feedbackTitle: '',
            feedbackContent: '',
            feedbackStatus: 1,
            buttonDisable: false,
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

    onPressSendFeedback() {
        const { userId } = this.props.route.params;
        var { feedbackTitle, feedbackContent, feedbackStatus } = this.state;
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
                    data.append('Title', feedbackTitle);
                    data.append('Content', feedbackContent);
                    data.append('Status', feedbackStatus);

                    let url = Const.domain + 'api/feedback/createfeedback';
                    if (!feedbackTitle || feedbackTitle == '' || feedbackTitle == null) {
                        ToastAndroid.show('Vui lòng không để Tiêu đề của feedback', ToastAndroid.SHORT);
                    }
                    else {
                        Request.Post(url, header, data)
                            .then(response => {
                                console.log(response);
                                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                    ToastAndroid.show('Cảm ơn bạn đã feedback! Vui lòng chờ phản hồi từ chúng tôi', ToastAndroid.LONG);
                                    console.log(response);
                                    this.props.navigation.goBack();
                                } else {
                                    if (response.code == Const.REQUEST_CODE_FAILED) {
                                        ToastAndroid.show('Gửi feedback không thành công! Vui lòng kiểm tra lại', ToastAndroid.LONG);
                                        console.log(response);
                                    }
                                }
                            })
                            .catch(reason => {
                                console.log('Lỗi rồi!');
                                console.log(reason);
                            });
                    }
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
        //this.getProfile();
    }

    render() {
        const { buttonDisable } = this.state;
        //LogBox.ignoreAllLogs();      
        return (
            <ScrollView>
                <View>
                    <Text style={{
                        marginTop: Utils.scale(5, Const.Vertical),
                        marginLeft: Utils.scale(15, Const.Vertical),
                        fontWeight: 'bold',
                        fontSize: Utils.scale(23, Const.Horizontal),
                    }}>Feedback</Text>
                    <StatusBar hidden={false} backgroundColor='#fbb897' />
                    <View style={{
                        marginTop: Utils.scale(10, Const.Vertical),
                    }}>
                        <View style={{
                            marginLeft: Utils.scale(10, Const.Horizontal),
                        }}>
                            <Text style={{
                                marginLeft: Utils.scale(5, Const.Vertical),
                                fontWeight: 'bold',
                                fontSize: Utils.scale(15, Const.Horizontal),
                            }}>Tiêu đề</Text>
                            <TextInput
                                onChangeText={text => {
                                    this.setState({ feedbackTitle: text });
                                }}
                                style={{
                                    backgroundColor: '#ccffff',
                                    height: Utils.scale(35, Const.Vertical),
                                    width: Utils.scale(380, Const.Horizontal),
                                    borderColor: 'gray',
                                    borderWidth: 0.1,
                                    borderRadius: 10,
                                    paddingLeft: 10,
                                    fontSize: Utils.scale(15, Const.Horizontal),
                                }}
                            />
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
                            <TextInput
                                multiline={true}
                                onChangeText={text => {
                                    this.setState({ feedbackContent: text });
                                }}
                                style={{
                                    backgroundColor: '#ccffff',
                                    height: Utils.scale(400, Const.Vertical),
                                    width: Utils.scale(380, Const.Horizontal),
                                    borderColor: 'gray',
                                    borderWidth: 0.1,
                                    borderRadius: 10,
                                    paddingLeft: 10,
                                    fontSize: Utils.scale(14, Const.Horizontal),
                                    textAlignVertical: "top",
                                }}
                            />
                        </View>
                        <TouchableOpacity disabled={buttonDisable}
                            onPress={() => {
                                this.onPressSendFeedback();
                                this.setState({ buttonDisable: true });
                            }}>
                            <View style={{
                                height: Utils.scale(35, Const.Vertical),
                                width: Utils.scale(120, Const.Horizontal),
                                backgroundColor: '#668cff',
                                borderColor: 'gray',
                                borderWidth: 0.1,
                                borderRadius: 10,
                                paddingLeft: 10,
                                marginLeft: Utils.scale(10, Const.Horizontal),
                                marginTop: Utils.scale(20, Const.Vertical),
                            }}>
                                <Text style={{
                                    marginLeft: Utils.scale(-10, Const.Horizontal),
                                    alignSelf: 'center',
                                    marginTop: Utils.scale(6, Const.Vertical),
                                    fontWeight: 'bold',
                                    fontSize: Utils.scale(18, Const.Horizontal),
                                }}>Gửi</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        )
    }
}