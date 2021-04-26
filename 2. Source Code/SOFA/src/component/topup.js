import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, FlatList, ActivityIndicator, Modal, TouchableOpacity, ToastAndroid, ImageBackground, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import CryptoJS from 'crypto-js';

import * as signalR from '@microsoft/signalr';
import * as Style from '../style/style';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import { scale, getData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';
import ViewImageModal from './viewImageModel';
import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';
import PostMenu from './postMenu';
import PushNotification from "react-native-push-notification";
import { TextInput, NativeEventEmitter, NativeModules } from 'react-native';
import Session from '../common/session';


const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

export default class Topup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            account: {},
            token: '',
            current: 0,
            amount: 0
        }
    }

    formatMoney(number) {
        var str = '';
        var temp = number;
        let length = 0;
        while (temp > 0) {
            let num = temp % 10;
            temp = Math.floor(temp / 10);
            if (length % 3 == 0 && length > 0) {
                str = '.' + str;
            }
            str = num + str;
            length++;
        }
        return str;
    }
    setValue(text) {
        let temp = text.trim();
        while (temp.indexOf('.') >= 0) {
            temp = temp.replace('.', '');
        }
        while (temp.indexOf(' ') >= 0) {
            temp = temp.replace(' ', '');
        }
        if (temp.length == 0) temp = '0';
        this.setState({ amount: parseInt(temp) })
    }


    getCurrentDateYYMMDD() {
        var todayDate = new Date().toISOString().slice(2, 10);
        return todayDate.split('-').join('');
    }


    payOrder() {
        var payZP = NativeModules.PayZaloBridge;
        payZP.payOrder(this.state.token);
    }

    async createOrder() {
        ToastAndroid.show('Tính năng đang phát triển', ToastAndroid.SHORT);
        return;
        if (this.state.amount > 0) {
            this.setState({ isLoading: true });
            let apptransid = this.getCurrentDateYYMMDD() + '_' + new Date().getTime();
            let appid = 554;
            let amount = parseInt(this.state.amount);
            let appuser = Session.getInstance().account.accountID + '';
            let apptime = (new Date).getTime();
            let embeddata = "{}";
            let item = "[]";
            let description = "Nạp tiền vào ví SOFA";
            let hmacInput = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item;
            let mac = CryptoJS.HmacSHA256(hmacInput, "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn");
            console.log('====================================');
            console.log("hmacInput: " + hmacInput);
            console.log("mac: " + mac)
            console.log('====================================');
            var order = {
                'appid': appid,
                'appuser': appuser,
                'apptime': apptime,
                'amount': amount,
                'apptransid': apptransid,
                'embeddata': embeddata,
                'item': item,
                'description': description,
                'mac': mac
            }
            let formBody = []
            for (let i in order) {
                var encodedKey = encodeURIComponent(i);
                var encodedValue = encodeURIComponent(order[i]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            await fetch('https://sandbox.zalopay.com.vn/v001/tpe/createorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            }).then(response => response.json())
                .then(resJson => {
                    this.setState({ token: resJson.zptranstoken });
                    this.setState({ returnCode: resJson.returncode });
                    console.log(resJson);
                    if (resJson.returncode == 1) {
                        this.payOrder();
                    } else {
                        ToastAndroid.show('Giao dịch lỗi! Hãy thử lại!', ToastAndroid.LONG);
                        this.setState({ isLoading: true });
                    }
                })
                .catch((error) => {
                    console.log("error ", error)
                    ToastAndroid.show('Giao dịch lỗi! Hãy thử lại!', ToastAndroid.LONG);
                    this.setState({ isLoading: true });
                })
            // console.log(Session.getInstance().account);
        }
    }

    componentDidMount() {
        const { money } = this.props.route.params;
        if (money) {
            this.setState({ current: money });
        }
        this.subscription = payZaloBridgeEmitter.addListener(
            'EventPayZalo',
            (data) => {
                this.setState({ isLoading: false });
                if (data.returnCode == 1) {
                    this.props.navigation.goBack();
                } else {
                    ToastAndroid.show('Giao dịch không thành công!', ToastAndroid.SHORT);
                }
            }
        );

    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    render() {
        const { isLoading, current, amount } = this.state;
        return (
            <View style={[styles.container]}>
                <View style={[styles.header]}>
                    <TouchableOpacity
                        style={[styles.buttonBack]}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <AntDesign name='arrowleft' size={30} color='#2a7ea0' />
                    </TouchableOpacity>
                    <View style={[styles.headerTextBounder]}>
                        <Text style={[styles.headerText]}>Nạp tiền vào ví</Text>
                    </View>
                </View>
                <View style={[styles.bodyBounder]}>
                    <View style={[styles.titleBouder]}>
                        <Text style={[styles.title]}>Số tiền </Text>
                        <Text style={[styles.titleMore]}>{'(Hiện có ' + this.formatMoney(current) + 'đ)'}</Text>
                    </View>
                    <View style={[styles.inputAmountBounder]}>
                        <TextInput
                            placeholder='0đ'
                            style={[styles.inputAmount]}
                            value={this.formatMoney(amount)}
                            keyboardType='decimal-pad'
                            onChangeText={(text) => this.setValue(text)}
                        />
                    </View>
                    <View style={[styles.methodBouder]}>
                        <Text style={{
                            fontWeight: '600'
                        }}>Phương thức thanh toán</Text>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: scale(10, Vertical),
                            alignItems: 'center'
                        }}>
                            <Image
                                source={require('../../image/Icon-app_white-bg.png')}
                                style={{
                                    height: scale(60, Horizontal),
                                    width: scale(60, Horizontal),
                                }}
                            />
                            <Text style={{
                                fontFamily: 'SF UI Text Regular',
                                fontSize: scale(18, Horizontal),
                                marginLeft: scale(10, Horizontal)
                            }}>ZaloPay</Text>
                            <View style={{
                                height: scale(18, Horizontal),
                                width: scale(18, Horizontal),
                                borderColor: '#2a7ea0',
                                borderRadius: 50,
                                borderWidth: 0.5,
                                marginLeft: 'auto',
                                marginRight: scale(5, Horizontal),
                                backgroundColor: '#2a7ea0',
                            }}>

                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        disabled={amount == 0}
                        onPress={() => this.createOrder()}
                        style={[{
                            paddingVertical: scale(5, Vertical),
                            alignItems: 'center',
                            marginTop: scale(20, Vertical),
                            borderRadius: 10
                        }, amount > 0 ? {
                            backgroundColor: '#2a7ea0',
                        } : { backgroundColor: 'gray' }]}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'SF UI Text Regular',

                        }}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
                {isLoading ? (
                    <View style={{
                        height: scale(711, Vertical),
                        width: scale(400, Horizontal),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        position: 'absolute'
                    }}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) :
                    (<View></View>)}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingVertical: scale(10, Vertical),
        width: scale(400, Horizontal),
        borderColor: 'gray',
        borderBottomWidth: 0.5
    },
    buttonBack: {
        marginLeft: scale(10, Horizontal)
    },
    headerTextBounder: {
        position: 'absolute',
        width: scale(400, Horizontal),
    },
    headerText: {
        alignSelf: 'center',
        marginTop: scale(15, Vertical),
        fontWeight: 'bold',
        fontSize: 20
    },
    bodyBounder: {
        paddingTop: scale(20, Vertical),
        paddingBottom: scale(20, Vertical),
        paddingHorizontal: scale(10, Horizontal)
    },
    titleBouder: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: 'black',
        fontSize: 20
    },
    titleMore: {
        fontSize: 14,
        color: 'gray',
        marginTop: 'auto',
        marginBottom: scale(2, Vertical)
    },
    inputAmount: {
        color: '#2a7ea0',
        fontWeight: 'bold',
        fontSize: 30,
        maxWidth: scale(380, Horizontal),
    },
    inputAmountBounder: {
        paddingVertical: scale(10, Vertical)
    },

})