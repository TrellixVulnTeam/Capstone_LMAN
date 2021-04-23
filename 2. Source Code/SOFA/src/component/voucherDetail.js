import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { scale, getDate } from '../common/utils';
import MarterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class VoucherDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voucherDetail: {},
        };
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
        } catch (e) {
            console.log(e);
        }
    };
    getVoucherDetail() {
        const { voucherDetail } = this.state;
        const { voucherID } = this.props.route.params;
        this.getData('token')
            .then((result) => {
                if (result) {
                    var header = {
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + result.toString().substr(1, result.length - 2),
                    };
                    let url = Const.domain + 'api/Voucher/getVoucherDetailByAccount';
                    let data = new FormData();
                    data.append('ID', voucherID);
                    Request.Post(url, header, data)
                        .then((response) => {
                            if (
                                response &&
                                response.code &&
                                response.code == Const.REQUEST_CODE_SUCCESSFULLY
                            ) {
                                this.setState({ voucherDetail: response });
                            } else {
                                this.props.navigation.goBack();
                            }
                        })
                        .catch((reason) => {
                            console.log(reason);
                            this.props.navigation.goBack();
                        });
                } else {
                    this.props.navigation.goBack();
                }
            })
            .catch((reason) => {
                console.log('failed');
                this.props.navigation.goBack();
            });
    }

    componentWillUnmount() { }

    componentDidMount() {
        this.getVoucherDetail();
    }
    useVoucher(voucherId) {
        this.getData('token')
            .then((result) => {
                if (result) {
                    var header = {
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + result.toString().substr(1, result.length - 2),
                    };
                    let url = Const.domain + 'api/Voucher/useVoucher';
                    let data = new FormData();
                    data.append('ID', voucherId);
                    Request.Post(url, header, data)
                        .then((response) => {
                            console.log(response);
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.setState({ voucherDetail: { ...this.state.voucherDetail, isUsed: true } })
                            } else {
                                this.props.navigation.goBack();
                            }
                        })
                        .catch((reason) => {
                            console.log(reason);
                            this.props.navigation.goBack();
                        });
                } else {
                    this.props.navigation.goBack();
                }
            })
            .catch((reason) => {
                console.log('failed');
                this.props.navigation.navigate('Login');
            });
    }

    render() {
        const { voucherDetail } = this.state;
        return (
            <ScrollView>
                <View style={Style.voucherDetail.mainContainer}>
                    <View style={{}}>
                        <Image
                            source={{ uri: Const.assets_domain + voucherDetail.image }}
                            style={{
                                height: scale(300, Const.Vertical),
                                width: scale(400, Const.Horizontal)
                            }}
                        />
                        <Text style={Style.voucherDetail.textTitle}>
                            {voucherDetail.title}
                        </Text>
                        <View
                            style={{
                                height: 0.5,
                                backgroundColor: 'steelblue',
                            }}
                        />
                        <View style={{
                            paddingVertical: scale(10, Const.Vertical),
                            paddingHorizontal: scale(10, Const.Horizontal),
                            borderColor: 'steelblue',
                            borderBottomWidth: 0.5
                        }}>
                            <View style={{ flexDirection: 'row', width: scale(380, Const.Horizontal) }}>
                                <Ionicons name='calendar' size={20} color='#2a7ea0' />
                                <Text style={{ marginLeft: scale(5, Const.Horizontal), fontWeight: 'bold', width: scale(100, Const.Horizontal) }}>Hạn sử dụng: </Text>
                                <Text style={{ marginLeft: scale(5, Const.Horizontal) }}>{'Từ ' + getDate(voucherDetail.fromDate)} </Text>
                                <Text style={{ marginLeft: scale(5, Const.Horizontal) }}>{'Đến ' + getDate(voucherDetail.toDate)} </Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: scale(380, Const.Horizontal), marginTop: scale(10, Const.Vertical) }}>
                                <MarterialIcons name='place' color='#2a7ea0' size={20} />
                                <Text style={{ marginLeft: scale(5, Const.Horizontal), fontWeight: 'bold', width: scale(145, Const.Horizontal) }}>Địa điểm sử dụng: </Text>
                                <Text style={{ width: scale(215, Const.Horizontal) }}>Toàn quốc</Text>
                            </View>
                        </View>
                        <Text style={Style.voucherDetail.textContent}>
                            {voucherDetail.content}
                        </Text>
                        <View>
                            {voucherDetail.isUsed == true ? (
                                <View style={{
                                    height: scale(50, Const.Vertical),
                                    width: scale(400, Const.Horizontal),
                                    backgroundColor: '#2a7ea0',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Mã voucher: </Text>
                                    <Text style={{ color: 'white' }}>{voucherDetail.voucherCode}</Text>
                                </View>
                            ) :
                                (
                                    <Button
                                        color="#2a7ea0"
                                        onPress={() =>
                                            this.useVoucher(voucherDetail.id)}
                                        title="Sử dụng"
                                    />
                                )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
