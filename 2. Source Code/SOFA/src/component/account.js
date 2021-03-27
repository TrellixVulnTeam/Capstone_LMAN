import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import RadioButtonRN from 'radio-buttons-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {LogBox, TouchableOpacity} from 'react-native';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { AVATAR, ADDRESS_ICON, BIRTHDAY_ICON, PHONE_ICON, GENDER_ICON, MORE_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';
import { acc, color } from 'react-native-reanimated';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            avatarUri: '',
            isLogin: true,
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

    getProfile = async () => {
        const { account } = this.state;    
        await this.getData('token')
            .then(result => {
                if (result) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2)
                    };
                    let url = Const.domain + 'api/profile';
                    Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.setState({ account: response });
                                this.setState({ avatarUri: Const.assets_domain + response.avatarUri + '?time=' + new Date() });
                                this.setState({isLogin: true});
                            } else {
                                this.props.navigation.navigate('Login')
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            this.props.navigation.navigate('Login')

                        });
                } else {
                    this.setState({isLogin: false});
                }
            })
            .catch(reason => {
                this.setState({isLogin: false});
            })
    }

    logout() {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Login');
    }

    onPressBalance() {
        this.props.navigation.navigate('Balance');
    }

    onPressMessage(){
        this.props.navigation.navigate('Conversation', { 'cid': 4, 'uid1': 13, 'uid2': 18 });
    }

    onPressMarkup() {
        alert('Click Markup');
    }

    onPressPrivacy() {
        alert('Click Privacy');
    }

    onPressSetting() {
        alert('Click Setting');
    }

    onPressFeedback() {
        alert('Click Feedback');
    }

    onPressSupprot() {
        alert('Click Support');
    }

    componentWillUnmount() {
        //this._unsubcribe();
    }

    componentDidMount(){
        console.log('My Account');
        this.getProfile();
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({ account: {}, avatarUri: '' });
            this.getProfile();
        });
    }

    render() {
        const { account, avatarUri, isLogin } = this.state;
        LogBox.ignoreLogs(['source.uri should not be an empty string']);
        // console.log(account);     
        if(!isLogin){
            return (
                
                <View style = {{
                    alignSelf: 'center'
                }}>
                    <StatusBar hidden={false} backgroundColor='#fbb897' />
                    <Text style={{
                        marginTop: Utils.scale(100, Const.Vertical),
                        fontWeight: 'bold',
                        color: '#EA0D1A',
                        fontSize: 20,
                    }}>Hãy đăng nhập để sử dụng chức năng này</Text>
                    <TouchableOpacity                       
                        style={{
                            alignSelf: 'center',
                            marginTop: Utils.scale(20, Const.Vertical),
                        }}
                        onPress={() => this.props.navigation.navigate('Login')}
                        >
                            
                            <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#fbb897', '#ff8683']}
                                        style={{
                                            width: Utils.scale(120, Const.Horizontal),
                                            borderRadius: Utils.scale(25, Const.Horizontal),
                                            height: Utils.scale(50, Const.Horizontal),
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: Utils.scale(10, Const.Horizontal),
                                            elevation: Utils.scale(7, Const.Horizontal),
                                        }}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: Utils.scale(16, Const.Horizontal),
                                            backgroundColor: 'transparent',
                                        }}>ĐĂNG NHẬP</Text>
                                    </LinearGradient>
                        
                    </TouchableOpacity>
                </View>
            )
        }else{
            return (
                <ScrollView>
                    <Text style={{
                        marginTop: Utils.scale(5, Const.Vertical),
                        marginLeft: Utils.scale(15, Const.Vertical),
                        fontWeight: 'bold',
                        fontSize: Utils.scale(23, Const.Horizontal),
                    }}>Account</Text>
                    <StatusBar hidden={false} backgroundColor='#fbb897' />
                   <View style={{
                       marginLeft: Utils.scale(15, Const.Horizontal),
                       marginTop: Utils.scale(13, Const.Vertical),
                       }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View>
                                <Image 
                                    source={(account.avatarUri && account.avatarUri.length > 0) ? { uri: avatarUri } : AVATAR}
                                    resizeMode={"cover"}
                                    style={{
                                        height: Utils.scale(40, Const.Horizontal),
                                        width: Utils.scale(40, Const.Horizontal),
                                        borderRadius: Utils.scale(20, Const.Horizontal),
                                        borderWidth: 1,
                                        overflow: 'hidden',
                                        //alignSelf: 'center',
                                        //marginLeft: Utils.scale(149, Const.Horizontal),
                                    }} />
                                </View>
                                <View style={{
                                    marginLeft: Utils.scale(10, Const.Horizontal),
                                }}>
                                    <Text style={{
                                        fontSize: Utils.scale(19, Const.Horizontal),
                                        fontWeight: 'bold',
                                    }}>{account.firstName+' '+account.lastName}</Text>
                                    <Text style={{
                                        fontSize: Utils.scale(13, Const.Horizontal),
                                    }}>Xem trang cá nhân của bạn</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            marginTop: Utils.scale(15, Const.Vertical),
                            marginLeft: Utils.scale(0, Const.Horizontal),
                            marginRight: Utils.scale(15, Const.Horizontal),
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }} />

                        <View style={{
                            marginLeft: Utils.scale(3, Const.Horizontal),
                        }}>
                            <TouchableOpacity onPress={() => this.onPressMessage()}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <AntDesign name='message1' size={30} color={'black'} style={{
                                        marginTop: Utils.scale(15, Const.Horizontal),
                                        
                                    }} />
                                    <Text style={{
                                        marginLeft: Utils.scale(15, Const.Horizontal),
                                        marginTop: Utils.scale(15, Const.Vertical),
                                        alignSelf: 'center',
                                        fontSize: Utils.scale(17, Const.Horizontal), 
                                        fontWeight: 'bold'
                                    }}>Demo tin nhắn</Text>
                                </View>                              
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginLeft: Utils.scale(3, Const.Horizontal),
                        }}>
                            <TouchableOpacity onPress={() => this.onPressBalance()}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <MaterialIcons name='account-balance-wallet' size={30} color={'black'} style={{
                                        marginTop: Utils.scale(15, Const.Horizontal),
                                        
                                    }} />
                                    <Text style={{
                                        marginLeft: Utils.scale(15, Const.Horizontal),
                                        marginTop: Utils.scale(15, Const.Vertical),
                                        alignSelf: 'center',
                                        fontSize: Utils.scale(17, Const.Horizontal), 
                                        fontWeight: 'bold'
                                    }}>Xem số dư tài khoản</Text>
                                </View>                              
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginLeft: Utils.scale(3, Const.Horizontal),
                        }}>
                            <TouchableOpacity onPress={() => this.onPressMarkup()}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Ionicons name='bookmark' size={30} color={'black'} style={{
                                        marginTop: Utils.scale(15, Const.Horizontal),
                                        
                                    }} />
                                    <Text style={{
                                        marginLeft: Utils.scale(16, Const.Horizontal),
                                        marginTop: Utils.scale(15, Const.Vertical),
                                        alignSelf: 'center',
                                        fontSize: Utils.scale(17, Const.Horizontal), 
                                        fontWeight: 'bold'
                                    }}>Xem bài đã lưu</Text>
                                </View>                              
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginLeft: Utils.scale(3, Const.Horizontal),
                        }}>
                            <TouchableOpacity onPress={() => this.onPressPrivacy()}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <MaterialIcons name='security' size={30} color={'black'} style={{
                                        marginTop: Utils.scale(15, Const.Horizontal),
                                        
                                    }} />
                                    <Text style={{
                                        marginLeft: Utils.scale(15, Const.Horizontal),
                                        marginTop: Utils.scale(15, Const.Vertical),
                                        alignSelf: 'center',
                                        fontSize: Utils.scale(17, Const.Horizontal), 
                                        fontWeight: 'bold'
                                    }}>Cài đặt bảo mật</Text>
                                </View>                              
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginLeft: Utils.scale(4, Const.Horizontal),
                        }}>
                            <TouchableOpacity onPress={() => this.onPressSetting()}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Ionicons name='settings' size={30} color={'black'} style={{
                                        marginTop: Utils.scale(15, Const.Horizontal),
                                        
                                    }} />
                                    <Text style={{
                                        marginLeft: Utils.scale(17, Const.Horizontal),
                                        marginTop: Utils.scale(15, Const.Vertical),
                                        alignSelf: 'center',
                                        fontSize: Utils.scale(17, Const.Horizontal), 
                                        fontWeight: 'bold'
                                    }}>Cài đặt chung</Text>
                                </View>                              
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginLeft: Utils.scale(4, Const.Horizontal),
                        }}>
                            <TouchableOpacity onPress={() => this.onPressFeedback()}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <MaterialIcons name='feedback' size={30} color={'black'} style={{
                                        marginTop: Utils.scale(15, Const.Horizontal),
                                        
                                    }} />
                                    <Text style={{
                                        marginLeft: Utils.scale(16, Const.Horizontal),
                                        marginTop: Utils.scale(15, Const.Vertical),
                                        alignSelf: 'center',
                                        fontSize: Utils.scale(17, Const.Horizontal), 
                                        fontWeight: 'bold'
                                    }}>Phản hồi và thắc mắc</Text>
                                </View>                              
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginLeft: Utils.scale(4, Const.Horizontal),
                        }}>
                            <TouchableOpacity onPress={() => this.onPressSupprot()}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <MaterialCommunityIcons name='comment-question' size={30} color={'black'} style={{
                                        marginTop: Utils.scale(15, Const.Horizontal),
                                        
                                    }} />
                                    <Text style={{
                                        marginLeft: Utils.scale(16, Const.Horizontal),
                                        marginTop: Utils.scale(15, Const.Vertical),
                                        alignSelf: 'center',
                                        fontSize: Utils.scale(17, Const.Horizontal), 
                                        fontWeight: 'bold'
                                    }}>Hỗ trợ</Text>
                                </View>                              
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginLeft: Utils.scale(5, Const.Horizontal),
                        }}>
                            <TouchableOpacity onPress={() => this.logout()}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Entypo name='log-out' size={30} color={'black'} style={{
                                        marginTop: Utils.scale(15, Const.Horizontal),
                                        
                                    }} />
                                    <Text style={{
                                        marginLeft: Utils.scale(15, Const.Horizontal),
                                        marginTop: Utils.scale(15, Const.Vertical),
                                        alignSelf: 'center',
                                        fontSize: Utils.scale(17, Const.Horizontal), 
                                        fontWeight: 'bold'
                                    }}>Đăng xuất</Text>
                                </View>                              
                            </TouchableOpacity>
                        </View>
                   </View>
                </ScrollView>
            )
        }
        
    }
}