import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Alert, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as Request from '../common/request';
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";

import { USER_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';

export default class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionID: this.props.route.params.transactionID,
      preScreen: this.props.route.params.preScreen,
      phone: this.props.route.params.phone,
      code: this.props.route.params.otpCode,
      timer: 60,
      errMsg: '',
      isValidUser: true,
    }
  }
  componentDidMount() {
    this.timeCall = setInterval(() => {
      if (this.state.timer === 0)
        clearInterval(this.timeCall)
      else
        this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeCall);
  }

  checkOTP = async () => {

    if (this.state.code == undefined || this.state.code.trim().length == 0 || this.state.code == 0) {
      this.setState({ isValidInput: false, errMsg: 'Vui lòng nhập OTP' })
    }
    else {
      const { transactionID, code } = this.state;
      if (this.state.preScreen == Const.FORGOT_PASSWORD) {
        this.props.navigation.navigate('ChangePassword', { phone: this.state.phone, isResetPassword: true, transactionID: transactionID, code: code });
        return;
      }
      let header = {
        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
        "Content-Type": "multipart/form-data",
        "Host": "chientranhvietnam.org"
      };
      let data = new FormData();
      data.append('ID', transactionID);
      data.append('Code', code);
      console.log(transactionID);
      let url = Const.domain + 'api/verification/Verify';

      Request.Post(url, header, data)
        .then(response => {
          console.log(response);
          if (response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
            if (response && response.verificationStatus && response.verificationStatus == Const.VERIFICATION_STATUS_MATCH) {
              ToastAndroid.show("Xác nhận OTP thành công!", ToastAndroid.LONG);
              console.log(response);
              if (this.state.preScreen == Const.REGISTER) {
                this.props.navigation.navigate('Register', { phone: this.state.phone });
              }
            }
          }
          else {
            this.setState({ isValidInput: false, errMsg: 'Mã OTP không tồn tại hoặc đã hết hạn' })
          }
        })
        .catch(reason => {
          console.log('failed');
          this.props.navigation.navigate('Login')
        })
    }
  }

  render() {
    return (

      <View style={[Style.verification.container]}>
        <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
        <Image source={USER_ICON} style={[Style.verification.logo]} />

        <View style={[Style.verification.content]}>
          <View style={styles.titleLabell} >
            <Text style={Style.verification.labelTitle}>Xác thực</Text>
          </View>

          <View style={styles.imputLabel}>
            <Text>Nhập mã OTP đã được gửi về số điện thoại của bạn</Text>
            <Text style={styles.otpCount}>Mã OTP tồn tại trong: <Text style={styles.textCount}>{this.state.timer === 0 ? 'Mã OPT đã hết hạn!' : this.state.timer + 's'}</Text></Text>
          </View>
          <View style={[Style.verification.otpText]}>
            <Text>Mã OTP:</Text>
            <TextInput style={[Style.verification.otpTextInput]}
              onChangeText={text => { this.setState({ code: text, isValidInput: true }) }}
            />
          </View>
          {this.state.isValidInput ? null :
            <Animatable.View duration={500} >
              <Text style={styles.errMsg}>{this.state.errMsg}</Text>
            </Animatable.View>
          }
          <View style={styles.registerContainer}>
            <TouchableOpacity style={styles.registerTouch} onPress={() => this.checkOTP()} disabled={this.state.timer == 0}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#fbb897', '#ff8683']}
                style={styles.registerBtn}>
                <Text style={styles.registerText}>XÁC NHẬN</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  registerContainer: {
    marginTop: Utils.scale(30, Const.Horizontal),
    marginBottom: Utils.scale(30, Const.Horizontal),
    alignItems: 'center',
  },
  registerTouch: {
    justifyContent: "center",
  },
  registerBtn: {
    width: Utils.scale(120, Const.Horizontal),
    borderRadius: Utils.scale(25, Const.Horizontal),
    height: Utils.scale(45, Const.Horizontal),
    alignItems: "center",
    justifyContent: "center",
    elevation: Utils.scale(7, Const.Horizontal),
  },
  registerText: {
    color: "white",
    fontSize: Utils.scale(16, Const.Horizontal),
    backgroundColor: 'transparent',
  },
  titleLabell: {
    alignItems: 'center',
  },
  imputLabel: {
    marginLeft: Utils.scale(10, Const.Horizontal),
  },
  otpCount: {
    paddingTop: Utils.scale(10, Const.Horizontal)
  },
  textCount: {
    color: 'red',
  },
  errMsg: {
    color: 'red',
    fontSize: Utils.scale(12, Const.Horizontal),
    marginTop: Utils.scale(10, Const.Horizontal),
    marginLeft: Utils.scale(30, Const.Horizontal)
  }
});