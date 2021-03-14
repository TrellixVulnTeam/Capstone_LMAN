import React, {Component} from 'react';
import { SafeAreaView, View,  FlatList} from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import MyListVoucher from './MyListVoucher';

export default class VoucherExpired extends Component {
  static navigationOptions = {
    title: 'Expired',
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
          data.append('IsExpiress', `true`);
          data.append('IsUsed', `false`);
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
                this.setState({listVoucher: tempArray});
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
  componentWillUnmount() {}

  componentDidMount() {
    this.getVoucher();
  }

  render() {
    const {listVoucher} = this.state;
    return (
      <SafeAreaView>
        <View style={Style.voucher.mainContainer}>
          <View style={Style.voucher.card}>
            <View
              style={{
                height: 1,
                backgroundColor: 'steelblue',
              }}
            />
            <SafeAreaView>
              <FlatList
                data={listVoucher}
                renderItem={({item, index}) => {
                  return (
                    <MyListVoucher
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
      </SafeAreaView>
    );
  }
}