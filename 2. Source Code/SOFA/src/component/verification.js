import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";

import { USER_ICON, GOOGLE_ICON, FACEBOOK_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';

export default class Verification extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isRegiter: 0,
          transactionID: 0,
          code: ''
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



    checkOTP = async() => {
      const {transactionID,code} = this.state;
      console.log('startLog');
            let header = {
              "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
              "Content-Type": "multipart/form-data",
              "Host":"chientranhvietnam.org"
            };
            let data = new FormData();
            data.append('ID',11);
            data.append('Code',code);
            console.log(transactionID);
            console.log(code);
            let url = Const.domain + 'api/verification/Verify';

            Request.Post(url,header,data)
              .then (response => {
                console.log(response);
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY){
                  if (response && response.verificationStatus && response.verificationStatus == Const.VERIFICATION_STATUS_MATCH){
                    Alert.alert('Verify Successfully', 'Xác nhận OTP thành công!');
                    console.log(response);
                    this.props.navigation.navigate('Login')
                  }
                  if (response && response.verificationStatus && response.verificationStatus == Const.VERIFICATION_STATUS_NOT_MATCH){
                    Alert.alert('Verify Failed', 'Xác nhận OTP không thành công!');
                    console.log(response);
                    this.props.navigation.goBack();
                  }
                }
                else {
                  Alert.alert('REQUEST_CODE_FAILED', 'Không tồn tại OTP Code');
                  console.log(response);
                }
              }) 
      .catch(reason => {
         console.log('failed');
         this.props.navigation.navigate('Login')
      })
    }

    render(){
        return (

          <View style={[Style.verification.container]}>
            <Image source={USER_ICON} style={[Style.verification.logo]} />

            <View style={[Style.verification.content]}>
              <View>
                <Text style={Style.verification.labelTitle}>Verification</Text>
              </View>

              <View style={[Style.verification.phone]}>
                <Text>Get OTP Code By Phone Number</Text>
              </View>

              <View style={[Style.verification.email]}>
                <Text>Get OTP Code By Email</Text>
              </View>

              <View style={[Style.verification.otpText]}>
                <Text>Input OTP Code:</Text>

                <TextInput style={[Style.verification.otpTextInput]}
                  onChangeText={text => { this.setState({ code: text }) }}
                />
              </View>
              
              <View style={[Style.verification.btnSubmit]}>
                <Button title='Submit' color='#3399FF' onPress={()=>this.checkOTP()}/>
              </View>

            </View>

          </View> 
        )
    }
}