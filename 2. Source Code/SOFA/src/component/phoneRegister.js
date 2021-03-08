import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import * as Utils from '../common/utils';
import * as Const from '../common/const';
import * as Request from '../common/request'
import { LOGO_ICON } from '../../image/index';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default class PhoneRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            isResetPassword: this.props.route.params.isResetPassword,
            isValidPhone: true,
            errMsg: '',
            isLoading: false,
            method: 3
        }

    }

    onRegister() {
        this.setState({ isLoading: true});
        if (this.state.phone.length == 10) {
            let header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Content-Type": "multipart/form-data",
                "Host": "chientranhvietnam.org"
            };
            let data = new FormData();
            let api = '';
            var currentScreen = '';
            if (this.state.isResetPassword) {
                api = 'api/verification/reset';
                currentScreen = Const.FORGOT_PASSWORD;
                data.append('method', Const.VERIFICATION_METHOD_PHONE);
            } else {
                api = 'api/verification/register';
                currentScreen = Const.REGISTER;
            }
            data.append('phoneNumber', this.state.phone);
            let url = Const.domain + api;
            Request.Post(url, header, data)
                    .then(response => {
                        this.setState({ isLoading: false});
                        if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                            let otpCode = '';
                            if(currentScreen == Const.FORGOT_PASSWORD){
                                otpCode = response.code;
                            }
                            this.props.navigation.navigate('Verification', {
                                transactionID: response.transactionID,
                                preScreen: currentScreen,
                                phone: this.state.phone,
                                code: otpCode
                            })
                        } else {
                            if (response.code == Const.REQUEST_CODE_FAILED) {
                                this.setState({ isValidPhone: false, errMsg: response.errorMessage })
                            }
                        }
                    })
                    .catch(reason => {
                        console.log(reason);
                    });
        } else {
            this.setState({ isValidPhone: false, errMsg: 'Invalid phone number' })
        }

    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isResetPassword ?
                    <View style={styles.signInContent}>
                        <Text style={{ fontSize: Utils.scale(38, Const.Horizontal), marginTop: Utils.scale(20, Const.Horizontal) }}>Forgot password?</Text>
                        <Text style={{ fontSize: Utils.scale(15, Const.Horizontal), opacity: Utils.scale(0.6, Const.Horizontal) }}>Enter your registed phone number to reset</Text>
                        <View style={{ borderBottomColor: '#ff8683', borderBottomWidth: Utils.scale(4, Const.Horizontal), borderRadius: Utils.scale(10, Const.Horizontal), width: Utils.scale(50, Const.Horizontal), marginTop: Utils.scale(10, Const.Horizontal) }}></View>
                    </View>
                    :
                    <View style={styles.signInContent}>
                        <Text style={{ fontSize: Utils.scale(38, Const.Horizontal), marginTop: Utils.scale(20, Const.Horizontal) }}>Welcome!</Text>
                        <Text style={{ fontSize: Utils.scale(15, Const.Horizontal), opacity: Utils.scale(0.6, Const.Horizontal) }}>Register your phone number to use application</Text>
                        <View style={{ borderBottomColor: '#ff8683', borderBottomWidth: Utils.scale(4, Const.Horizontal), borderRadius: Utils.scale(10, Const.Horizontal), width: Utils.scale(50, Const.Horizontal), marginTop: Utils.scale(10, Const.Horizontal) }}></View>
                    </View>
                }
                <View style={styles.containerInput}>
                    <View style={styles.inputView} >
                        <Text style={styles.inputTitle}>Phone</Text>
                        <TextInput
                            placeholder='Your phone'
                            style={styles.inputText}
                            keyboardType='numeric'
                            onChangeText={text => this.setState({ phone: text, isValidPhone: !this.stateisValidUser })} />
                    </View>
                </View>
                {this.state.isValidPhone ? null :
                    <Animatable.View duration={500}>
                        <Text style={styles.errMsg}>{this.state.errMsg}</Text>
                    </Animatable.View>
                }
                <View style={styles.registerContainer}>
                    <TouchableOpacity style={styles.registerTouch} onPress={() => this.onRegister()} disabled={this.state.isLoading}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#fbb897', '#ff8683']}
                            style={styles.registerBtn}>
                            {this.state.isResetPassword
                                ?
                                <Text style={styles.registerText}>CONFIRM</Text>
                                :
                                <Text style={styles.registerText}>REGISTER</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Image
                    style={styles.logo}
                    source={LOGO_ICON}
                />
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
        marginTop: Utils.scale(40, Const.Horizontal)
    },
    signInContent: {
        marginLeft: Utils.scale(40, Const.Horizontal),
        paddingTop: Utils.scale(20, Const.Horizontal),
        paddingBottom: Utils.scale(20, Const.Horizontal)
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
        marginTop: Utils.scale(5, Const.Horizontal),
    },
    registerTouch: {
        justifyContent: "center",
        marginLeft: Utils.scale(40, Const.Horizontal),
    },
    registerBtn: {
        width: Utils.scale(100, Const.Horizontal),
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
    logo: {
        height: Utils.scale(200, Const.Horizontal),
        width: '100%',
        resizeMode: 'contain',
        marginTop: Utils.scale(150, Const.Horizontal)
    },
});
