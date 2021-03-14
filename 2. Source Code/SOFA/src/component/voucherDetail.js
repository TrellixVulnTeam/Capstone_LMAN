import React, {Component} from 'react';
import { View, Text, Button,} from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

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
    const {voucherDetail} = this.state;
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
          let url = Const.domain + 'api/Voucher/getVoucherDetailByAccount';
          let data = new FormData();
          data.append('ID', 2);
          Request.Post(url, header, data)
            .then((response) => {
              if (
                response &&
                response.code &&
                response.code == Const.REQUEST_CODE_SUCCESSFULLY
              ) {
                this.setState({voucherDetail: response});
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

  componentWillUnmount() {}

  componentDidMount() {
    this.getVoucherDetail();
  }
  useVoucher(voucherId) {
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
          let url = Const.domain + 'api/Voucher/useVoucher';
          let data = new FormData();
          data.append('ID', voucherId);
          Request.Post(url, header, data)
            .then((response) => {
              if (
                response &&
                response.code &&
                response.code == Const.REQUEST_CODE_SUCCESSFULLY
              ) {
                this.componentDidMount();
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

  render() {
    const {voucherDetail} = this.state;
    return (
      <ScrollView>
        <View style={Style.voucherDetail.mainContainer}>
          <View style={Style.voucherDetail.card}>
            <Text style={Style.voucherDetail.textTitle}>
              {voucherDetail.title}{' '}
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: 'steelblue',
              }}
            />
            <Text style={Style.voucherDetail.textContent}>
              {voucherDetail.content}
            </Text>
            <View>
              {voucherDetail.isUsed == true && (
                <Text>Use coupon code: {voucherDetail.voucherCode}</Text>
              )}
              {voucherDetail.isUsed == false && (
                <Button
                  color="#ff7878"
                  onPress={() =>
                     this.useVoucher(voucherDetail.id)}
                  title="Use Voucher"
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
