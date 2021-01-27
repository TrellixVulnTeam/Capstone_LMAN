import React, { Component } from 'react';
import { View, Text, StatusBar, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Utils from '../common/utils';
import * as Const from '../common/const';
import * as Style from '../style/style';
import * as Request from '../common/request'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: '123',
      token: '',
      firstname: 'Lê Thiện',
      lastname: 'Văn',
      gender: 'Male',
      dob: '02/18/1999',
      role: 'User'
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
  onPressRegister() {
    const { username, password, role, firstname, lastname, gender, dob } = this.state;
    let header = { 'Content-Type': 'multipart/form-data' };
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('firstname', firstname);
    data.append('lastname', lastname);
    data.append('gender', gender);
    data.append('dob', dob);
    data.append('role', role)
    console.log('Register: ' + username + ' - ' + password + ' - ' + firstname + ' - ' + lastname + ' - ' + gender + ' - ' + dob + ' - ' + role);
    let url = Const.domain + 'api/auth/register';
    Request.Post(url, header, data)
      .then(response => {
        if (response && response.code && response.code == 'SUCCESSFULY') {
          console.log('Register done');
          Alert.alert('Register', 'Đã đăng ký tài khoản thành công',
            [
              {
                text: 'Done',
                onPress: () => {
                  let header = { 'Content-Type': 'multipart/form-data' };
                  let data = new FormData();
                  data.append('username', username);
                  data.append('password', password);
                  console.log('Login: ' + username + ' - ' + password);
                  let url = Const.domain + 'api/auth/token';
                  Request.Post(url, header, data)
                    .then(response => {
                      if (response && response.code && response.code == 'LOGIN_SUCCESSFULY') {
                        this.storeData('token', this.state.token)
                          .then(res => {
                            this.storeData('account', response.account)
                              .then(ress => {
                                this.props.navigation.navigate('Home');
                              })
                          });
                      } else {
                        if (response.code == 'LOGIN_FAILED') {
                          Alert.alert('Login status', 'Thông tin tài khoản hoặc mật khẩu không chính xác');
                        }
                      }
                    })
                    .catch(reason => console.log(reason));
                }
              }
            ])
        } else {
          if (response.code == 'FAILED') {
            Alert.alert('Register', 'Đăng ký tài khoản không thành công!!!');
          }
        }
      })
      .catch(reason => console.log(reason));
  }
  render() {
    const { username, password, firstname, lastname, gender, role, dob, token } = this.state;
    return (
      <View style={[Style.common.container]}>
        <StatusBar hidden={false} backgroundColor='orange' />
        <View style={Style.common.header}>
          <Text style={Style.common.labelTitle}>Register Screen</Text>
        </View>
        <View style={[Style.common.flexRow, { marginTop: Utils.scale(100, Const.Vertical), alignItems: 'center' }, { paddingLeft: Utils.scale(10, Const.Horizontal) }]}>
          <Text style={{ width: Utils.scale(100, Const.Horizontal) }}>Username</Text>
          <TextInput
            defaultValue={'admin'}
            onChangeText={text => { this.setState({ username: text }) }}
            style={{ backgroundColor: 'white', marginLeft: Utils.scale(5, Const.Horizontal), height: Utils.scale(40, Const.Vertical), width: Utils.scale(265, Const.Horizontal), borderColor: 'gray', borderWidth: 1 }} />
        </View>
        <View style={[Style.common.flexRow, { marginTop: Utils.scale(10, Const.Vertical), alignItems: 'center' }, { paddingLeft: Utils.scale(10, Const.Horizontal) }]}>
          <Text style={{ width: Utils.scale(100, Const.Horizontal) }}>Password</Text>
          <TextInput
            defaultValue={'123'}
            onChangeText={text => { this.setState({ password: text }) }}
            secureTextEntry={true}
            style={{ backgroundColor: 'white', marginLeft: Utils.scale(5, Const.Horizontal), height: Utils.scale(40, Const.Vertical), width: Utils.scale(265, Const.Horizontal), borderColor: 'gray', borderWidth: 1 }} />
        </View>
        <View style={[Style.common.flexRow, { marginTop: Utils.scale(10, Const.Vertical), alignItems: 'center' }, { paddingLeft: Utils.scale(10, Const.Horizontal) }]}>
          <Text style={{ width: Utils.scale(100, Const.Horizontal) }}>First Name</Text>
          <TextInput
            defaultValue={'Lê Thiện'}
            onChangeText={text => { this.setState({ firstname: text }) }}
            style={{ backgroundColor: 'white', marginLeft: Utils.scale(5, Const.Horizontal), height: Utils.scale(40, Const.Vertical), width: Utils.scale(265, Const.Horizontal), borderColor: 'gray', borderWidth: 1 }} />
        </View>
        <View style={[Style.common.flexRow, { marginTop: Utils.scale(10, Const.Vertical), alignItems: 'center' }, { paddingLeft: Utils.scale(10, Const.Horizontal) }]}>
          <Text style={{ width: Utils.scale(100, Const.Horizontal) }}>Last Name</Text>
          <TextInput
            defaultValue={'Văn'}
            onChangeText={text => { this.setState({ lastname: text }) }}
            style={{ backgroundColor: 'white', marginLeft: Utils.scale(5, Const.Horizontal), height: Utils.scale(40, Const.Vertical), width: Utils.scale(265, Const.Horizontal), borderColor: 'gray', borderWidth: 1 }} />
        </View>
        <View style={[Style.common.flexRow, { marginTop: Utils.scale(10, Const.Vertical), alignItems: 'center' }, { paddingLeft: Utils.scale(10, Const.Horizontal) }]}>
          <Text style={{ width: Utils.scale(100, Const.Horizontal) }}>Gender</Text>
          <TextInput
            defaultValue={'Male'}
            onChangeText={text => { this.setState({ gender: text }) }}
            style={{ backgroundColor: 'white', marginLeft: Utils.scale(5, Const.Horizontal), height: Utils.scale(40, Const.Vertical), width: Utils.scale(265, Const.Horizontal), borderColor: 'gray', borderWidth: 1 }} />
        </View>
        <View style={[Style.common.flexRow, { marginTop: Utils.scale(10, Const.Vertical), alignItems: 'center' }, { paddingLeft: Utils.scale(10, Const.Horizontal) }]}>
          <Text style={{ width: Utils.scale(100, Const.Horizontal) }}>Birth Day</Text>
          <TextInput
            defaultValue={'02/18/1999'}
            onChangeText={text => { this.setState({ dob: text }) }}
            style={{ backgroundColor: 'white', marginLeft: Utils.scale(5, Const.Horizontal), height: Utils.scale(40, Const.Vertical), width: Utils.scale(265, Const.Horizontal), borderColor: 'gray', borderWidth: 1 }} />
        </View>
        <View style={[Style.common.flexRow, { marginTop: Utils.scale(10, Const.Vertical), alignItems: 'center' }, { paddingLeft: Utils.scale(10, Const.Horizontal) }]}>
          <Text style={{ width: Utils.scale(100, Const.Horizontal) }}>Role</Text>
          <TextInput
            defaultValue={'User'}
            onChangeText={text => { this.setState({ role: text }) }}
            style={{ backgroundColor: 'white', marginLeft: Utils.scale(5, Const.Horizontal), height: Utils.scale(40, Const.Vertical), width: Utils.scale(265, Const.Horizontal), borderColor: 'gray', borderWidth: 1 }} />
        </View>
        <View style={[{ width: Utils.scale(100, Const.Horizontal), alignSelf: 'center', marginTop: Utils.scale(10, Const.Vertical) }]}>
          <Button title='Register' onPress={() => this.onPressRegister()} />
        </View>
      </View>
    )
  }
}
