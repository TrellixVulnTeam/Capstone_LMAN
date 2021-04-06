import React, {Component} from 'react';
import { SafeAreaView, ImageBackground, View, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import {AVATAR} from '../../image/index';
import {ScrollView} from 'react-native-gesture-handler';

export default class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTransaction: [],
      avatarUri: '',
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
  getBalance() {
    const {balance} = this.state;
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
                this.setState({listTransaction: tempArray});
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
  onPressTopUp() {
    const {account, avatarUri} = this.state;
    this.props.navigation.navigate('topUp', {
      account: account,
      avatarUri: avatarUri,
    });
  }

  componentWillUnmount() {}

  componentDidMount() {
    this.getBalance();
  }

  render() {
    const {balance, listTransaction, avatarUri} = this.state;

    return (
      <View style={Style.balance.main}>
        <ScrollView>
          <ImageBackground
            source={avatarUri ? {uri: avatarUri} : AVATAR}
            style={Style.balance.container}>
            <View style={Style.balance.overlay}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: '#FFFFFF',
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                My Balance
              </Text>
              <Image
                source={avatarUri ? {uri: avatarUri} : AVATAR}
                style={Style.balance.avatarStyle}
              />
              <Text style={Style.balance.textStyle}>
                Balance: {balance} VND
              </Text>
            </View>
          </ImageBackground>
          <View style={Style.balance.mainContainer}>
            <View></View>
            <View style={Style.balance.card}>
              <View style={Style.profile.button}>
                <Button
                  style={Style.profile.singleButton}
                  color="#ff7878"
                  onPress={() => this.onPressTopUp()}
                  title="TopUp"
                />
                <View style={{flex: 0.2}}></View>
                <Button
                  style={Style.profile.singleButton}
                  color="#ff7878"
                  title="View Voucher"
                  onPress={() => this.props.navigation.navigate('Voucher')}
                />
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
                }}>
                Recent Transaction
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'steelblue',
                }}
              />
              <SafeAreaView>
                <FlatList
                  data={listTransaction}
                  renderItem={({item, index}) => {
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
        </ScrollView>
      </View>
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
            {this.props.transactionTime}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
