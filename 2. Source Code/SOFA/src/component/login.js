import React, { Component } from 'react';
import { View, Text, StatusBar, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Utils from '../common/utils';
import * as Const from '../common/const';
import * as Style from '../style/style';
import * as Request from '../common/request'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: '123',
      loginStatus: false
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
    const { username, password, account, token } = this.state;
    let header = { 'Content-Type': 'multipart/form-data' };
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);
    console.log('Login: ' + username + ' - ' + password);
    let url = Const.domain + 'api/auth/token';
    Request.Post(url, header, data)
      .then(response => {
        if (response && response.code && response.code == 'LOGIN_SUCCESSFULY') {
          this.setState({ loginStatus: true })
          console.log(response.token);
          this.storeData('token', response.token)
            .then(res => {
              this.props.navigation.navigate('Home');
            });
        } else {
          if (response.code == 'LOGIN_FAILED') {
            Alert.alert('Login status', 'Thông tin tài khoản hoặc mật khẩu không chính xác');
          }
        }
      })
      .catch(reason => console.log(reason));
  }
  onPressRegister() {
    this.props.navigation.navigate('Register')
  }
  render() {
    const { username, password, loginStatus } = this.state;
    return (
      <View style={[Style.common.container]}>
        <StatusBar hidden={false} backgroundColor='orange' />
        <View style={Style.common.header}>
          <Text style={Style.common.labelTitle}>Login Screen</Text>
        </View>
        <View style={[Style.common.flexRow, { marginTop: Utils.scale(200, Const.Vertical), alignItems: 'center' }, { paddingLeft: Utils.scale(10, Const.Vertical) }]}>
          <Text style={{ width: Utils.scale(100, Const.Vertical) }}>Username</Text>
          <TextInput
            defaultValue={'admin'}
            onChangeText={text => { this.setState({ username: text }) }}
            style={{ backgroundColor: 'white', marginLeft: Utils.scale(5, Const.Horizontal), height: Utils.scale(40, Const.Vertical), width: Utils.scale(290, Const.Horizontal), borderColor: 'gray', borderWidth: 1 }} />
        </View>
        <View style={[Style.common.flexRow, { marginTop: Utils.scale(10, Const.Vertical), alignItems: 'center' }, { paddingLeft: Utils.scale(10, Const.Vertical) }]}>
          <Text style={{ width: Utils.scale(100, Const.Vertical) }}>Password</Text>
          <TextInput
            defaultValue={'123'}
            onChangeText={text => { this.setState({ password: text }) }}
            secureTextEntry={true}
            style={{ backgroundColor: 'white', marginLeft: Utils.scale(5, Const.Horizontal), height: Utils.scale(40, Const.Vertical), width: Utils.scale(290, Const.Horizontal), borderColor: 'gray', borderWidth: 1 }} />
        </View>
        <View style={[{ width: Utils.scale(100, Const.Vertical), alignSelf: 'center', marginTop: Utils.scale(10, Const.Vertical) }]}>
          <Button title='Login' onPress={() => this.onPressLogin()} />
        </View>
        <View style={[{ width: Utils.scale(100, Const.Vertical), alignSelf: 'center', marginTop: Utils.scale(10, Const.Vertical) }]}>
          <Button title='Register' onPress={() => this.onPressRegister()} />
        </View>
      </View>
    )
  }
}
