
import React, { Component } from 'react';
import { Text, SafeAreaView, View, FlatList, TouchableOpacity, Image } from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import { scale, getDate } from '../common/utils';
import { navigate } from '../navigation/InitNavigation';

export default class VoucherUsed extends Component {
    static navigationOptions = {
        title: 'Đã sử dụng',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            avatarUri: '',
            listVoucher: [],
            token: '',
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
    getVoucher() {
        this.getData('token')
            .then((result) => {
                if (result) {
                    var header = {
                        'User-Agent':
                            'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        Accept: 'application/json',
                        Authorization:
                            'Bearer ' + result.toString().substr(1, result.length - 2),

                    };
                    let data = new FormData();
                    data.append('IsExpiress', false);
                    data.append('IsUsed', true);
                    let url = Const.domain + 'api/Voucher/getVoucherByAccount';
                    Request.Post(url, header, data)
                        .then((response) => {
                            if (
                                response &&
                                response.code &&
                                response.code == Const.REQUEST_CODE_SUCCESSFULLY
                            ) {
                                let tempArray = [];
                                response.listVoucher.forEach((item) => {
                                    let transaction = {
                                        id: item.id,
                                        title: item.title,
                                        voucherCode: item.voucherCode,
                                        content: item.content,
                                        description: item.description,
                                        image: item.image,
                                        fromDate: item.fromDate,
                                        toDate: item.toDate,
                                        isExpriress: item.isExpriress,
                                        isUsed: item.isUsed,
                                    };
                                    tempArray.push(transaction);
                                });
                                this.setState({ listVoucher: tempArray });
                                this.setState({
                                    token: result.toString().substr(1, result.length - 2),
                                });
                            } else {
                                this.setState({ listVoucher: [] })
                            }
                        })
                        .catch((reason) => {
                            console.log(reason);
                        });
                }
            })
            .catch((reason) => {
                console.log('failed');
                this.props.navigation.goBack();
            });
    }

    componentWillUnmount() { }

    componentDidMount() {
        this.getVoucher();
    }

    render() {

        const { listVoucher } = this.state;
        return (
            <SafeAreaView>
                <View style={Style.voucher.mainContainer}>

                    <View style={{
                        paddingLeft: scale(10, Const.Horizontal),
                        paddingRight: scale(10, Const.Horizontal),
                    }}>
                        <View
                            style={{
                                height: 1,
                                backgroundColor: 'steelblue',
                            }}
                        />
                        <SafeAreaView>
                            <FlatList
                                data={listVoucher}
                                renderItem={({ item, index }) => {
                                    return (
                                        <MyListVoucher
                                            navigate={() => navigate('VoucherDetail', { voucherID: item.id })}
                                            id={item.id}
                                            title={item.title}
                                            voucherCode={item.voucherCode}
                                            content={item.content}
                                            description={item.description}
                                            image={item.image}
                                            fromDate={item.fromDate}
                                            toDate={item.toDate}
                                            isExpriress={item.isExpriress}
                                            isUsed={item.isUsed}
                                        />
                                    );
                                }}
                                keyExtractor={(item, index) => `${item.id}`}

                            />
                        </SafeAreaView>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
class MyListVoucher extends Component {
    navigateVoucherDetail = () => {
        this.props.navigate();
    };

    render() {
        return (
            <TouchableOpacity
                style={{
                    marginTop: scale(20, Const.Vertical),
                    marginBottom: scale(20, Const.Vertical),
                }}
                onPress={this.navigateVoucherDetail} >
                <View style={{
                    borderRadius: 15,

                }}>
                    <Image
                        source={{ uri: Const.assets_domain + this.props.image }}
                        style={{
                            height: scale(150, Const.Vertical),
                            width: scale(380, Const.Horizontal),
                            borderRadius: 15
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'black',
                            marginHorizontal: scale(10, Const.Horizontal),
                        }}>
                        {this.props.title}
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'nomal',
                            fontSize: 14,
                            color: 'black',
                            marginHorizontal: scale(10, Const.Horizontal),
                            marginVertical: scale(5, Const.Vertical),
                        }}>
                        {'Hết hạn: '+ getDate(this.props.toDate)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}