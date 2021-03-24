import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMessage: [],
            myProfile: {},
            friendProfile: {},
            friendId: 0,
            onEmojiKeyboard: false,
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

    chooseFile = (callback) => {
        const { account, token } = this.state;
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                let source = response;
                this.setState({ avatarUri: source.uri });
                if (source.base64) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',                       
                    };
                    console.log(header);
                    let data = new FormData();
                    data.append('Avatar', source.base64);
                    data.append('username', account.userName);
                    let url = Const.domain + 'api/account';
                    Request.Post(url, header, data)
                        .then(response => {
                            if (response && response.code && response.code == 'SUCCESSFULY') {
                                Alert.alert('Avatar', 'Đổi ảnh đại diện thành công!!!');

                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                        });
                }
                callback(source);

            }
        });
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    takePicture = (callback) => {
        const { account, token } = this.state;
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true
        };
        this.requestCameraPermission()
            .then(response => {
                launchCamera(options, (response) => {
                    console.log(response);
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else {
                        let source = response;
                        this.setState({ avatarUri: source.uri });
                        if (source.base64) {
                            var header = {
                                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                                "Accept": 'application/json',                               
                            };
                            console.log(header);
                            let data = new FormData();
                            data.append('Avatar', source.base64);
                            data.append('username', account.userName);
                            let url = Const.domain + 'api/account';
                            Request.Post(url, header, data)
                                .then(response => {
                                    if (response && response.code && response.code == 'SUCCESSFULY') {
                                        Alert.alert('Avatar', 'Đổi ảnh đại diện thành công!!!');
                                    }
                                })
                                .catch(reason => {
                                    console.log(reason);
                                });
                        }
                        callback(source);

                    }
                });
            });
    }


    getProfile = async () =>{
        console.log('Get my profile');
        const {uid1, uid2} = this.props.route.params;
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
                                this.setState({ myProfile: response });
                                //this.setState({ avatarUri: Const.assets_domain + response.avatarUri + '?time=' + new Date() });
                                var friendId = response.accountID == uid1 ? uid2:uid1;
                                this.setState({friendId: friendId}); 
                                this.getFriendProfile();                            
                            } else {
                                this.props.navigation.navigate('Login')
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            this.props.navigation.navigate('Login')

                        });
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(reason => {
                console.log('failed');
                this.props.navigation.navigate('Login')
            })
    }

    getFriendProfile = async () =>{
        var { friendId } = this.state;

        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
        };
        let url = Const.domain + 'api/profile/otherprofile?id=' + friendId;
        Request.Get(url, header)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ friendProfile: response });
                    //this.setState({ avatarUri: Const.assets_domain + response.avatarUri + '?time=' + new Date() });
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(reason => {
                console.log(reason);
                this.props.navigation.navigate('Login')

            });
    }
    getMessage() {
        console.log('Get message')
        var { listMessage } = this.state;
        const { cid } = this.props.route.params;
        if (cid) {
            var header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Accept": 'application/json',
            };
            let url = Const.domain + 'api/message/getmessagebycid?cid=' + cid;
            Request.Get(url, header)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        let listMessage = response.listMess;
                        this.setState({ listMessage: listMessage });
                    } else {
                        this.props.navigation.navigate('Login')
                    }
                })
                .catch(reason => {
                    console.log(reason);
                    this.props.navigation.navigate('Login')
                });
        }

    }

    getItemLayout = (data, index) => (
        { length: Utils.scale(40, Const.Vertical), offset: (Utils.scale(40, Const.Vertical) + 5) * index, index }
      )

    componentDidMount() {
        this.setState({});
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({});
            this.getProfile();
            this.getMessage();
        });
        this._unfocus = this.props.navigation.addListener('blur', () => {
            this.setState({});
        });
    }

    render() {
        const { cid, uid1, uid2 } = this.props.route.params;
        var { listMessage, myProfile, friendProfile } = this.state;
        return (
            <View>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <LinearGradient colors={['#b30000', '#e60000', '#ff3333']}>
                    <View style={{
                        width: Utils.scale(400, Const.Horizontal),
                        height: Utils.scale(40, Const.Vertical),
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            width: Utils.scale(50, Const.Horizontal),
                        }}></View>
                        <View>
                            <Text style={{
                                textAlign: 'center',
                                textAlignVertical: "center",
                                color: 'white',
                                fontSize: 18,
                                width: Utils.scale(300, Const.Horizontal),
                            }}>{friendProfile.firstName} {friendProfile.lastName}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => alert('Click More')} style={{
                                width: Utils.scale(50, Const.Horizontal),               
                                marginTop: Utils.scale(15, Const.Vertical),    
                                marginLeft: Utils.scale(15, Const.Horizontal),    
                            }}>
                                <Entypo name='dots-three-horizontal' size={22} color={'white'} />
                                <Text style={{
                                    color: 'white',
                                }}></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                <View>
                     <FlatList
                     data = {listMessage}
                     getItemLayout={this.getItemLayout}
                     keyExtractor={(item, index) => index + ''}
                     onScroll={e => {
                        this.scrollOffset = e.nativeEvent.contentOffset.y;
                      }}
                      onLayout={e => {
                        this.flatlistTopOffset = e.nativeEvent.layout.y;
                      }}
                      scrollEventThrottle={16}
                      renderItem={({ item, index }) => {      
                        return ( 
                          <View>
                            {item.content && item.content.length > 0 ? (
                              <View style={[Style.common.flexRow, {
                                paddingLeft: 20,
                                paddingRight: 20,
                                alignItems: 'center',
                                alignContent: 'center',
                                backgroundColor: 'white',
                                borderRadius: 40,
                                height: Utils.scale(40, Const.Vertical),
                                marginLeft: (item.fromAccountId != myProfile.accountID ? 10 : 'auto'),
                                marginRight: (item.fromAccountId != myProfile.accountID ? 'auto' : 10),
                                marginTop: 5,
                              }]}>
                                <Text style={{ alignItems: 'center' }}>{item.content}</Text>
                              </View>
                            ) : (
                                <View></View>
                              )}
        
                            {item.imageUrl && item.imageUrl.length > 0 ? (
                              <View style={[Style.common.flexRow, {
                                width: Utils.scale(200, Const.Horizontal),
                                height: Utils.scale(200, Const.Vertical),
                                marginLeft: (item.fromAccountId != myProfile.accountID ? 10 : 'auto'),
                                marginRight: (item.fromAccountId != myProfile.accountID ? 'auto' : 10),
                              }]}>
        
                                {/* <Image style={{
                                  borderRadius: 20,
                                  flex: 1,
                                  width: null,
                                  height: null,
                                  resizeMode: 'contain'
                                }}
                                  source={{ uri: Const.assets_domain + item.imageUrl }}
                                /> */}
                                <Text style={{ alignItems: 'center' }}>{Const.assets_domain + item.imageUrl}</Text>
                              </View>
                            ) : (<View></View>)}
                          </View>
        
                        )
                      }}
                     />
                </View>
            </View>
        )
    }
}