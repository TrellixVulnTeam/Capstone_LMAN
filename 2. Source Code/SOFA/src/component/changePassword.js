import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Utils from '../common/utils';
import * as Const from '../common/const';
import * as Request from '../common/request'
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import NotificationWSS from '../service/NotificationWSS';
import PushNotification from 'react-native-push-notification';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
            isResetPassword: this.props.route.params.isResetPassword,
            phone: this.props.route.params.phone,
            transactionID: this.props.route.params.transactionID,
            code: this.props.route.params.code,
            isLoading: false,
        }

    }

    checkConfirmPassword(cfNewPassword) {
        this.setState({ confirmNewPassword: cfNewPassword })
        if (cfNewPassword !== this.state.newPassword) {
            this.setState({ isValidUser: false, errMsg: 'Xác nhận mật khẩu không đúng' })
        } else {
            this.setState({ isValidUser: true })
        }
    }

    checkValidPassword() {
        if (!this.state.isResetPassword) {
            if (this.state.password.length < 6) {
                this.setState({ isValidUser: false, errMsg: 'Mật khẩu bao gồm 6 ký tự trở lên' })
                return false;
            }
            if (this.state.password == this.state.newPassword) {
                this.setState({ isValidUser: false, errMsg: 'Mật khẩu mới không trùng với mật khẩu cũ' })
                return false;
            }
            if (this.state.newPassword !== this.state.confirmNewPassword) {
                this.setState({ isValidUser: false, errMsg: 'Xác nhận mật khẩu không đúng' })
                return false;
            }
            return true;
        }
        if (this.state.newPassword.length < 6) {
            this.setState({ isValidUser: false, errMsg: 'Mật khẩu bao gồm 6 ký tự trở lên' })
            return false;
        }
        if (this.state.newPassword !== this.state.confirmNewPassword) {
            this.setState({ isValidUser: false, errMsg: 'Xác nhận mật khẩu không đúng' })
            return false;
        }
        return true;
    }

    onConfirm() {
        this.setState({ isLoading: true });
        const isValid = this.checkValidPassword();
        if (isValid) {
            const { phone, password, newPassword, transactionID, code } = this.state;
            let header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Content-Type": "multipart/form-data",
                "Host": "chientranhvietnam.org"
            };
            let data = new FormData();
            // not tested yet - change password
            if (!this.state.isResetPassword) {
                data.append('isAfterReset', false);
                data.append('password', password);
                data.append('newPassword', newPassword);
                data.append('phone', phone);
                let url = Const.domain + 'api/auth/reset-password';
                Request.Post(url, header, data)
                    .then(response => {
                        this.setState({ isLoading: false });
                        if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                            Alert.alert(
                                "Đổi mật khẩu",
                                "Đổi mật khẩu thành công",
                                [
                                    {
                                        text: "OK", onPress: () => {
                                            AsyncStorage.removeItem('token');
                                            AsyncStorage.removeItem('user');
                                            let notificationWSS = NotificationWSS.getInstance(false);
                                            if (notificationWSS.getConnection()) {
                                                notificationWSS.getConnection().stop();
                                                PushNotification.setApplicationIconBadgeNumber(0)
                                            }
                                            this.props.navigation.navigate('Login');
                                        }
                                    }
                                ]
                            );
                        } else {
                            if (response.code == Const.REQUEST_CODE_FAILED) {
                                this.setState({ isValidUser: false, errMsg: response.errorMessage })
                            }
                        }
                    })
                    .catch(reason => {
                        console.log(reason);
                    });
            }
            // reset pw
            else {
                data.append('phone', phone);
                data.append('newPassword', newPassword);
                data.append('transactionID', transactionID);
                data.append('code', code)
                data.append('isAfterReset', true);

                let url = Const.domain + 'api/auth/reset-password';
                Request.Post(url, header, data)
                    .then(response => {
                        if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                            this.setState({ isLoading: false });
                            AsyncStorage.clear().then(() => {
                                Alert.alert(
                                    'Đổi mật khẩu thành công',
                                    '',
                                    [
                                        { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
                                    ],
                                    { cancelable: false },
                                );
                            })
                        } else {
                            if (response.code == Const.REQUEST_CODE_FAILED) {
                                this.setState({ isValidUser: false, errMsg: response.errorMessage })
                            }
                        }
                    })
                    .catch(reason => {
                        console.log(reason);
                    });
            }

        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isResetPassword ?
                    <View style={styles.signInContent}>
                        <Text style={{ fontSize: Utils.scale(38, Const.Horizontal), marginTop: Utils.scale(20, Const.Horizontal) }}>Đổi Mật khẩu</Text>
                        <Text style={{ fontSize: Utils.scale(15, Const.Horizontal), opacity: Utils.scale(0.6, Const.Horizontal) }}>Nhập mật khẩu mới của bạn</Text>
                        <View style={{ borderBottomColor: '#ff8683', borderBottomWidth: Utils.scale(4, Const.Horizontal), borderRadius: Utils.scale(10, Const.Horizontal), width: Utils.scale(50, Const.Horizontal), marginTop: Utils.scale(10, Const.Horizontal) }}></View>
                    </View>
                    :
                    <View style={styles.signInContent}>
                        <Text style={{ fontSize: Utils.scale(38, Const.Horizontal), marginTop: Utils.scale(20, Const.Horizontal) }}>Đổi Mật khẩu!</Text>
                        <Text style={{ fontSize: Utils.scale(15, Const.Horizontal), opacity: Utils.scale(0.6, Const.Horizontal) }}>Nhập thông tin mật khẩu của bạn</Text>
                        <View style={{ borderBottomColor: '#ff8683', borderBottomWidth: Utils.scale(4, Const.Horizontal), borderRadius: Utils.scale(10, Const.Horizontal), width: Utils.scale(50, Const.Horizontal), marginTop: Utils.scale(10, Const.Horizontal) }}></View>
                    </View>
                }
                <View style={styles.containerInput}>
                    {this.state.isResetPassword ? null
                        :
                        <View style={styles.inputView} >
                            <Text style={styles.inputTitle}>Mật khẩu</Text>
                            <TextInput
                                secureTextEntry
                                placeholder='Mật khẩu'
                                style={styles.inputText}
                                onChangeText={text => this.setState({ password: text, isValidUser: !this.stateisValidUser })} />
                        </View>
                    }
                    <View style={styles.inputView} >
                        <Text style={styles.inputTitle}>Mật khẩu mới</Text>
                        <TextInput
                            secureTextEntry
                            placeholder='Mật khẩu mới'
                            style={styles.inputText}
                            onChangeText={text => this.setState({ newPassword: text, isValidUser: !this.stateisValidUser })} />
                    </View>
                    <View style={styles.inputView} >
                        <Text style={styles.inputTitle}>Nhập lại mật khẩu mới</Text>
                        <TextInput
                            secureTextEntry
                            placeholder='Nhập lại mật khẩu mới'
                            style={styles.inputText}
                            onChangeText={text => this.checkConfirmPassword(text)} />
                    </View>
                </View>
                {this.state.isValidUser ? null :
                    <Animatable.View duration={500}>
                        <Text style={styles.errMsg}>{this.state.errMsg}</Text>
                    </Animatable.View>
                }
                <View style={styles.registerContainer}>
                    <TouchableOpacity style={styles.registerTouch} onPress={() => this.onConfirm()}>
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerInput: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInContent: {
        marginLeft: Utils.scale(40, Const.Horizontal),
        paddingBottom: Utils.scale(40, Const.Horizontal)
    },
    inputTitle: {
        color: "#000000",
        fontSize: Utils.scale(14, Const.Horizontal),
        fontWeight: 'bold'
    },
    inputView: {
        width: "80%",
        height: Utils.scale(50, Const.Horizontal),
        marginBottom: Utils.scale(20, Const.Horizontal),
        justifyContent: "center",
        marginTop: Utils.scale(20, Const.Horizontal)
    },
    inputText: {
        height: Utils.scale(40, Const.Horizontal),
        borderBottomWidth: Utils.scale(1, Const.Horizontal),
        borderBottomColor: "#DBDBDB",
    },
    forgot: {
        color: "#ff8683",
        textAlign: 'right',
        fontWeight: 'bold',
        paddingRight: Utils.scale(40, Const.Horizontal),
        fontSize: Utils.scale(12, Const.Horizontal)
    },
    registerContainer: {
        marginTop: Utils.scale(30, Const.Horizontal),
    },
    registerTouch: {
        justifyContent: "center",
        marginLeft: Utils.scale(40, Const.Horizontal),
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
    iconContainer: {
        backgroundColor: '#e7f5f2',
        width: Utils.scale(45, Const.Horizontal),
        height: Utils.scale(45, Const.Horizontal),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Utils.scale(25, Const.Horizontal),
        elevation: Utils.scale(6, Const.Horizontal),
    },
    iconGoogle: {
        width: Utils.scale(27, Const.Horizontal),
        height: Utils.scale(27, Const.Horizontal),
    },
    errMsg: {
        color: '#ff0000',
        fontSize: Utils.scale(12, Const.Horizontal),
        marginLeft: Utils.scale(40, Const.Horizontal),
        marginBottom: Utils.scale(5, Const.Horizontal)
    },
});