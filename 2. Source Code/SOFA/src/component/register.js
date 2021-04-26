import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Utils from '../common/utils';
import * as Const from '../common/const';
import * as Style from '../style/style';
import * as Request from '../common/request'
import { LOGO_ICON, GOOGLE_ICON, FACEBOOK_ICON } from '../../image/index';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            isValidUser: true,
            phone: this.props.route.params.phone,
            errMsg: '',
            firstname: '',
            lastname: '',
            isHiddenPassword: true,
            isHiddenConfirmPassword: true,
        }

    }

    checkConfirmPassword(cfPassword) {
        this.setState({ confirmPassword: cfPassword })
        if (cfPassword !== this.state.password) {
            this.setState({ isValidUser: false, errMsg: 'Xác nhận mật khẩu không đúng' })
        } else {
            this.setState({ isValidUser: true })
        }
    }

    validateUser() {
        let trimPW = this.state.password.trim();
        if (trimPW != this.state.password || /\s/.test(this.state.password.trim()) || /\s/.test(this.state.username.trim())) {
            this.setState({ isValidUser: false, errMsg: 'Tài khoản và Mật khẩu không bao gồm dấu cách' })
            return false;
        }
        if (/[ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]/.test(this.state.username.toUpperCase())) {
            this.setState({ isValidUser: false, errMsg: 'Tên tài khoản không hợp lệ' })
            return false;
        }
        if (this.state.username.length < 6 || this.state.password.length < 6) {
            this.setState({ isValidUser: false, errMsg: 'Tên tài khoản và mật khẩu bao gồm 6 ký tự trở lên' })
            return false;
        }
        if (this.state.confirmPassword !== this.state.password) {
            this.setState({ isValidUser: false, errMsg: 'Xác nhận mật khẩu không đúng' })
            return false;
        }
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)) {
            this.setState({ isValidUser: false, errMsg: 'Email không hợp lệ' })
            return false;
        }
        if (this.state.firstname.length < 1) {
            this.setState({ isValidUser: false, errMsg: 'Nhập tên của bạn' })
            return false;
        }
        if (this.state.lastname.length < 1) {
            this.setState({ isValidUser: false, errMsg: 'Nhập họ của bạn' })
            return false;
        }
        return true;
    }

    onRegister() {
        const isValid = this.validateUser();
        if (isValid) {
            const { username, password, email, phone, firstname, lastname } = this.state;
            let header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Content-Type": "multipart/form-data",
                "Host": Const.host
            };
            let data = new FormData();
            data.append('username', username);
            data.append('password', password);
            data.append('email', email);
            data.append('phone', phone);
            data.append('firstname', firstname);
            data.append('lastname', lastname);
            data.append('isApplicationAccess', true);
            let url = Const.domain + 'api/auth/register';
            console.log(data);
            Request.Post(url, header, data)
                .then(response => {
                    if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        Alert.alert(
                            'Đăng ký thành công',
                            'Vui lòng đăng nhập để tham gia',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
                            ],
                            { cancelable: false },
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
    }

    setHiddenPassword() {
        this.setState((prev) => ({ isHiddenPassword: !prev.isHiddenPassword }));
    }
    setHiddenConfirmPassword(){
        this.setState((prev) => ({ isHiddenConfirmPassword: !prev.isHiddenConfirmPassword }));
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.signInContent}>
                        <Text style={{ fontSize: Utils.scale(24, Const.Horizontal), fontWeight: 'bold', opacity: Utils.scale(0.6, Const.Horizontal) }}>Nhập thông tin của bạn</Text>
                        <View style={{ borderBottomColor: '#2A7EA0', borderBottomWidth: Utils.scale(4, Const.Horizontal), borderRadius: Utils.scale(10, Const.Horizontal), width: Utils.scale(50, Const.Horizontal), marginTop: Utils.scale(10, Const.Horizontal) }}></View>
                    </View>
                    <View style={styles.containerInput}>
                        <View style={styles.inputView} >
                            <Text style={styles.inputTitle}>Tên tài khoản *</Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder='Tên tài khoản'
                                onChangeText={text => this.setState({ username: text, isValidUser: !this.stateisValidUser })} />
                        </View>
                        <View style={styles.inputView} >
                            <Text style={styles.inputTitle}>Mật khẩu *</Text>
                            <View style={styles.inputViewPassword}>
                                <TextInput
                                    value={this.state.password}
                                    secureTextEntry={this.state.isHiddenPassword}
                                    placeholder='Mật khẩu'
                                    style={styles.inputTextPassword}
                                    onChangeText={text => this.setState({ password: text, isValidUser: !this.stateisValidUser })} />
                                <TouchableOpacity style={styles.iconEye} onPress={() => this.setHiddenPassword()}>
                                    <Entypo size={20} name={this.state.isHiddenPassword ? 'eye' : 'eye-with-line'} color='#2A7EA0' />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputView} >
                            <Text style={styles.inputTitle}>Xác nhận mật khẩu *</Text>
                            <View style={styles.inputViewPassword}>
                                <TextInput
                                    secureTextEntry={this.state.isHiddenConfirmPassword}
                                    placeholder='Xác nhận mật khẩu'
                                    style={styles.inputTextPassword}
                                    onChangeText={text => this.checkConfirmPassword(text)} />
                                <TouchableOpacity style={styles.iconEye} onPress={() => this.setHiddenConfirmPassword()}>
                                    <Entypo size={20} name={this.state.isHiddenConfirmPassword ? 'eye' : 'eye-with-line'} color='#2A7EA0' />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputView} >
                            <Text style={styles.inputTitle}>Họ *</Text>
                            <TextInput
                                placeholder='Họ'
                                style={styles.inputText}
                                onChangeText={text => this.setState({ lastname: text, isValidUser: !this.stateisValidUser })} />
                        </View>
                        <View style={styles.inputView} >
                            <Text style={styles.inputTitle}>Tên *</Text>
                            <TextInput
                                placeholder='Tên'
                                style={styles.inputText}
                                onChangeText={text => this.setState({ firstname: text, isValidUser: !this.stateisValidUser })} />
                        </View>
                        <View style={styles.inputView} >
                            <Text style={styles.inputTitle}>Email *</Text>
                            <TextInput
                                placeholder='Email'
                                style={styles.inputText}
                                onChangeText={text => this.setState({ email: text, isValidUser: !this.stateisValidUser })} />
                        </View>
                        <View style={styles.inputView} >
                            <Text style={styles.inputTitle}>Phone *</Text>
                            <TextInput
                                style={styles.inputText}
                                defaultValue={this.state.phone}
                                editable={false} />
                        </View>
                    </View>
                    {this.state.isValidUser ? null :
                        <Animatable.View duration={500}>
                            <Text style={styles.errMsg}>{this.state.errMsg}</Text>
                        </Animatable.View>
                    }
                    <View style={styles.registerContainer}>
                        <TouchableOpacity style={styles.registerTouch} onPress={() => this.onRegister()}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#91DFFF', '#2A7EA0']}
                                style={styles.registerBtn}>
                                <Text style={styles.registerText}>ĐĂNG KÝ</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

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
        marginTop: Utils.scale(20, Const.Horizontal),
        marginLeft: Utils.scale(40, Const.Horizontal),
        paddingBottom: Utils.scale(10, Const.Horizontal)
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
    inputViewPassword: {
        flexDirection: 'row'
    },
    inputTextPassword: {
        width: '94%',
        height: Utils.scale(40, Const.Horizontal),
        borderBottomWidth: Utils.scale(1, Const.Horizontal),
        borderBottomColor: "#DBDBDB",
    },
    iconEye: {
        alignSelf: 'center'
    },
    inputText: {
        height: Utils.scale(40, Const.Horizontal),
        borderBottomWidth: Utils.scale(1, Const.Horizontal),
        borderBottomColor: "#DBDBDB",
    },
    forgot: {
        color: "#2A7EA0",
        textAlign: 'right',
        fontWeight: 'bold',
        paddingRight: Utils.scale(40, Const.Horizontal),
        fontSize: Utils.scale(12, Const.Horizontal)
    },
    registerContainer: {
        marginTop: Utils.scale(5, Const.Horizontal),
    },
    registerTouch: {
        justifyContent: "center",
        marginLeft: Utils.scale(40, Const.Horizontal),
    },
    registerBtn: {
        width: "26%",
        borderRadius: Utils.scale(25, Const.Horizontal),
        height: Utils.scale(45, Const.Horizontal),
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Utils.scale(10, Const.Horizontal),
        elevation: Utils.scale(4, Const.Horizontal),
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
