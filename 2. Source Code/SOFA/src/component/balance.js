import React, { Component } from 'react';
import { SafeAreaView, ImageBackground, View, Text, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import { AVATAR } from '../../image/index';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { getMessageTime, scale } from '../common/utils';


export default class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTransaction: [],
            avatarUri: '',
            token: '',
            balance: 0
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
    getBalance() {
        const { balance } = this.state;
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
                    let url = Const.domain + 'api/Balance/history';
                    Request.Get(url, header)
                        .then((response) => {
                            if (
                                response &&
                                response.code &&
                                response.code == Const.REQUEST_CODE_SUCCESSFULLY
                            ) {
                                this.setState({
                                    balance: response.balance,
                                });

                                let tempArray = [];
                                response.listTransaction.forEach((item) => {
                                    let transaction = {
                                        transactionId: item.transactionId,
                                        beforeBalance: item.beforeBalance,
                                        afterBalance: item.afterBalance,
                                        amount: item.amount,
                                        typeId: item.typeId,
                                        typeName: item.typeName,
                                        transactionTime: item.transactionTime,
                                        accountId: item.accountId,
                                        adminId: item.adminId,
                                    };
                                    tempArray.push(transaction);
                                });
                                this.setState({ listTransaction: tempArray });
                                this.setState({
                                    token: result.toString().substr(1, result.length - 2),
                                });
                            } else {
                                this.props.navigation.navigate('Login');
                            }
                        })
                        .catch((reason) => {
                            console.log(reason);
                            this.props.navigation.navigate('Login');
                        });
                } else {
                    this.props.navigation.navigate('Login');
                }
            })
            .catch((reason) => {
                console.log('failed');
                this.props.navigation.navigate('Login');
            });
    }
    getParsedDate(date) {
        date = String(date).split(' ');
        var days = String(date[0]).split('-');
        var hours = String(date[1]).split(':');
        return [
            parseInt(days[0]),
            parseInt(days[1]) - 1,
            parseInt(days[2]),
            parseInt(hours[0]),
            parseInt(hours[1]),
            parseInt(hours[2]),
        ];
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

    componentWillUnmount() { }

    componentDidMount() {
        this.getBalance();
    }

    render() {
        const { balance, listTransaction, avatarUri } = this.state;

        return (
            <View style={{
                backgroundColor: '#2a7ea0'
            }}>
                <View>
                    <ImageBackground
                        source={avatarUri ? { uri: avatarUri } : AVATAR}
                        style={Style.balance.container}>
                        <View style={{ backgroundColor: '#2a7ea0' }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: '#FFFFFF',
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                }}>Quản lý số dư</Text>
                            <Image
                                source={avatarUri ? { uri: avatarUri } : AVATAR}
                                style={Style.balance.avatarStyle}
                            />
                            <Text style={Style.balance.textStyle}>Khả dụng: {this.formatMoney(balance)} VND</Text>
                        </View>
                    </ImageBackground>
                    <View style={Style.balance.mainContainer}>
                        <View></View>
                        <View style={Style.balance.card}>
                            <View style={Style.profile.button}>
                                <TouchableOpacity style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }} onPress={() => this.props.navigation.navigate('Topup', { money: this.state.balance })}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#91DFFF', '#2A7EA0']}
                                        style={{
                                            height: scale(30, Const.Vertical),
                                            width: scale(100, Const.Horizontal),
                                            borderRadius: 15,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Text style={{ color: 'white' }}>Nạp tiền</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }} onPress={() => this.props.navigation.navigate('Voucher')}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#91DFFF', '#2A7EA0']}
                                        style={{
                                            height: scale(30, Const.Vertical),
                                            width: scale(100, Const.Horizontal),
                                            borderRadius: 15,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Text style={{ color: 'white' }}>Voucher</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 24,
                                    color: 'black',
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignContent: 'center',
                                }}>Lịch sử giao dịch</Text>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: 'steelblue',
                                }}
                            />
                            <SafeAreaView>
                                <FlatList
                                    data={listTransaction}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <MyListItem
                                                transactionId={item.transactionId}
                                                typeId={item.typeId}
                                                beforeBalance={item.beforeBalance}
                                                transactionTime={item.transactionTime}
                                                typeName={item.typeName}
                                                amount={item.amount}
                                                navigate={this.props.navigation.navigate}
                                            />
                                        );
                                    }}
                                    keyExtractor={(item, index) => `${item.transactionId}`}
                                    ItemSeparatorComponent={() => (
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor: 'steelblue',
                                            }}
                                        />
                                    )}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}
class MyListItem extends Component {

    render() {
        return (
            <TouchableOpacity >
                <View>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: 'black',
                            marginHorizontal: 10,
                            marginTop: 10,
                        }}>
                        {this.props.typeName}
                    </Text>
                    <View>
                        {this.props.typeId != 1 && (
                            <Text style={Style.balance.textSuccess}>
                                +{this.props.amount}
                VND
                            </Text>
                        )}
                        {this.props.typeId == 1 && (
                            <Text style={Style.balance.textDanger}>
                                -{this.props.amount}
                VND
                            </Text>
                        )}
                    </View>

                    <Text
                        style={{
                            fontSize: 12,
                            color: 'black',
                            marginHorizontal: 10,
                            marginVertical: 10,
                        }}>
                        {getMessageTime(this.props.transactionTime)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
