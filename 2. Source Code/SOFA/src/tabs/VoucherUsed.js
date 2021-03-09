import React, {Component} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableHighlight,
  Alert,
  PermissionsAndroid,
  FlatList,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  NavigationContainer,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {MenuProvider} from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import {
  AVATAR,
  ADDRESS_ICON,
  BIRTHDAY_ICON,
  PHONE_ICON,
  GENDER_ICON,
} from '../../image/index';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {acc} from 'react-native-reanimated';

export default class VoucherUsed extends Component {
  static navigationOptions = {
    title: 'Used',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      avatarUri: '',
      listVoucher: [],
      token:'',
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
          data.append('IsExpiress', `false`);
          data.append('IsUsed', `true`);
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
                    <MyListItem
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
class MyListItem extends Component {
  _onPress = () => {
    alert(`VoucherId: ${this.props.id}`);
  };
  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            {this.props.title}
          </Text>
          <Text
            style={{
              fontWeight: 'nomal',
              fontSize: 12,
              color: 'black',
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            {this.props.toDate}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
