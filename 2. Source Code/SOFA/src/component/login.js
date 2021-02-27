import React, { Component } from 'react';
import { View, Text, StatusBar, TextInput, Button, Alert, Image, TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Utils from '../common/utils';
import * as Const from '../common/const';
import * as Style from '../style/style';
import * as Request from '../common/request';
import { USER_ICON, GOOGLE_ICON, FACEBOOK_ICON } from '../../image/index';
import LinearGradient from 'react-native-linear-gradient';
import Progress from 'react-native-progress';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'user',
      password: '123456',
      loginStatus: false,
      isLoading: false
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
  onPressLogin() {
    this.setState({ isLoading: true });
    const { username, password, account, token } = this.state;
    let header = {
      "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
      "Content-Type": "multipart/form-data",
      "Host":"chientranhvietnam.org"
    };
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);
    console.log('Login: ' + username + ' - ' + password);
    let url = Const.domain + 'api/auth/login';
    Request.Post(url, header, data)
      .then(response => {
        if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
          this.setState({ loginStatus: true })
          console.log(response.token);
          this.storeData('token', response.token)
            .then(res => {
              this.setState({ isLoading: false });
              this.props.navigation.navigate('BottomNav');
            });
        } else {
          if (response.code == Const.REQUEST_CODE_FAILED) {
            this.setState({ isLoading: false });
            Alert.alert('Login status', 'Thông tin tài khoản hoặc mật khẩu không chính xác');
          }
        }
      })
      .catch(reason => {
        console.log(reason);
        this.setState({ isLoading: false });
      });
  }
  onPressRegister() {
    this.props.navigation.navigate('Register')
  }
  render() {
    const { username, password, loginStatus, isLoading } = this.state;
    return (
      <View pointerEvents={isLoading ? "none" : "auto"}>
        <StatusBar hidden={false} style={{ backgroundColor: 'white' }} />
        <LinearGradient colors={['#FFFFFF', '#A392FC', '#D38FF5']} style={{ height: Utils.scale(710, Const.Vertical) }}>
          <Image source={USER_ICON} style={{ width: Utils.scale(100, Const.Horizontal), height: Utils.scale(100, Const.Vertical), alignSelf: 'center', marginTop: Utils.scale(50, Const.Vertical) }} />
          <View style={[Style.common.flexRow, { marginTop: Utils.scale(50, Const.Vertical), alignSelf: 'center' }]}>
            <TextInput
              value={username}
              onChangeText={text => { this.setState({ username: text }) }}
              style={
                {
                  backgroundColor: 'white',
                  height: Utils.scale(40, Const.Vertical),
                  width: Utils.scale(258, Const.Horizontal),
                  borderColor: 'gray',
                  borderWidth: 0,
                  borderRadius: 20,
                  paddingLeft: 10,
                }} />
          </View>
          <View style={[Style.common.flexRow, { marginTop: Utils.scale(20, Const.Vertical), alignSelf: 'center' }]}>
            <TextInput
              value={password}
              onChangeText={text => { this.setState({ password: text }) }}
              secureTextEntry={true}
              style={
                {
                  backgroundColor: 'white',
                  height: Utils.scale(40, Const.Vertical),
                  width: Utils.scale(258, Const.Horizontal),
                  borderColor: 'gray',
                  borderWidth: 0,
                  borderRadius: 20,
                  paddingLeft: 10,
                }} />
          </View>
          <Text style={
            {
              fontSize: 16,
              color: '#FFFFFF',
              paddingTop: Utils.scale(45, Const.Vertical),
              marginRight: Utils.scale(65, Const.Horizontal),
              marginLeft: 'auto'
            }}>Quên mật khẩu</Text>
          <LinearGradient colors={['#EFEFEF', '#9CFFFF']} style={{
            marginTop: Utils.scale(30, Const.Vertical),
            width: Utils.scale(130, Const.Horizontal),
            height: Utils.scale(40, Const.Vertical),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10
          }}>
            <Text onPress={() => this.onPressLogin()} style={{ color: '#707070', fontSize: 20 }}>Đăng nhập</Text>
          </LinearGradient>
          <View style={{
            borderStyle: 'solid',
            height: 1,
            backgroundColor: '#E5FFF7',
            width: 250,
            alignSelf: 'center',
            marginTop: Utils.scale(27, Const.Vertical)
          }}></View>
          <View style={[Style.common.flexRow, { alignSelf: 'center', marginTop: Utils.scale(16, Const.Vertical) }]}>
            <Image source={GOOGLE_ICON} style={{
              width: Utils.scale(55, Const.Horizontal),
              height: Utils.scale(55, Const.Vertical)
            }} />
            <Image source={FACEBOOK_ICON} style={{
              width: Utils.scale(55, Const.Horizontal),
              height: Utils.scale(55, Const.Vertical),
              marginLeft: Utils.scale(20, Const.Horizontal)
            }} />
          </View>

          <View style={{
            marginTop: Utils.scale(30, Const.Vertical),
            width: Utils.scale(130, Const.Horizontal),
            height: Utils.scale(40, Const.Vertical),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text onPress={() => this.onPressRegister()} style={{ color: 'white', fontSize: 20 }}>Đăng ký ngay</Text>
          </View>
        </LinearGradient>
      </View >

    )
  }
}