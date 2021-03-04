import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { AVATAR, ADDRESS_ICON, BIRTHDAY_ICON, PHONE_ICON, GENDER_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';

export default class UpdateProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            avatarUri: '',
            token: ''
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


    updateInfomation(){
        const {account, token} = this.state;
        this.getData('token')
            .then(result => {
                if (result) {
                    let header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Content-Type": "multipart/form-data",
                        "Host":"chientranhvietnam.org",
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2),
                      };
                      let data = new FormData();
                      data.append('AccountID', account.accountID);
                      data.append('FirstName', account.firstName);
                      data.append('LastName', account.lastName);
                      data.append('Gender', account.gender);
                      data.append('DOB', account.dob);
                      data.append('Email', account.email);
                      data.append('Phone', account.phone);
                      data.append('Address', account.address);
                      data.append('Avatar', account.avatar);
                      console.log("Update profile!");
            
                      console.log(account);
                      let url = Const.domain + 'api/profile/updateprofile';
            
                      Request.Post(url, header, data)
                        .then(response => {
                            console.log(response);
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                Alert.alert('Update Successfully', 'Update thành công!');
                                console.log(response);
                                this.props.navigation.goBack();               
                            } else {
                            if (response.code == Const.REQUEST_CODE_FAILED) {
                                Alert.alert('Update Failed', 'Update không thành công! Vui lòng kiểm tra lại');
                                console.log(response);
                            }
                            }
                        })
                        .catch(reason => {
                            console.log('Lỗi rồi!');
                            console.log(reason);
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


    componentWillUnmount() {
        //this._unsubcribe();
    }

    componentDidMount(){
        //this.getProfile();
        const {account, avatarUri} = this.props.route.params;
        this.setState({avatarUri: avatarUri});
        this.setState({account: account})
    }


    render(){
        const {avatarUri, account} = this.state;
        const data = [
            {label: 'Nam                                ', value:1},
            {label: 'Nữ', value:2},
            ];
        return (
            <View style={[Style.common.container]}>
                <StatusBar hidden={false} backgroundColor='orange' />

                <StatusBar hidden={false} backgroundColor='#fbb897' />
                <LinearGradient colors={['#fbb897','#ff8683']}>
                    <View style={Style.profile.firstHeader}>
                        <Image 
                        source={avatarUri ? { uri: avatarUri } : AVATAR}
                        resizeMode={"cover"}
                        style={Style.profile.image} />
                        <View style={{
                            marginTop: Utils.scale(10, Const.Vertical),
                            height: Utils.scale(70, Const.Vertical),
                            width: Utils.scale(200, Const.Horizontal),
                            alignSelf: 'center',
                        }}>
                        <MenuProvider>
                            <Menu>
                                <MenuTrigger >
                                    <Text style={Style.updateProfile.updateAvaText}>Update Avatar</Text>
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption onSelect={() => this.takePicture(source => {
                                        console.log('Take picture callback');
                                        account.avatar = source.base64;
                                        this.setState({ account: account });
                                    })} text='Máy ảnh' />
                                    <MenuOption onSelect={() => this.chooseFile(source => {
                                        console.log('Choose file callback');
                                        account.avatar = source.base64;
                                        this.setState({ account: account });
                                    })} text='Thư viện' />
                                </MenuOptions>
                            </Menu>
                        </MenuProvider>
                        </View>                      
                    </View>
                </LinearGradient>                 
                <View style={Style.updateProfile.updateInfo}>
                    <View style={Style.updateProfile.updateName}>
                        <View style={Style.updateProfile.updateItemFirst}>
                            <Text style={Style.updateProfile.updateLabel}>First Name</Text>
                            <TextInput defaultValue={account.firstName}
                                        onChangeText={text => { 
                                            account.firstName = text;
                                            this.setState({ account: account });
                                        }}
                                        style={Style.updateProfile.updateInputFirst}
                            />                      
                        </View>    
                        <View style={Style.updateProfile.updateItemFirst}>
                            <Text style={Style.updateProfile.updateLabel}>Last Name</Text>
                            <TextInput defaultValue={account.lastName}
                                        onChangeText={text => { 
                                            account.lastName = text;
                                            this.setState({ account: account });
                                        }}
                                        style={Style.updateProfile.updateInputFirst}
                            />                      
                        </View>   
                    </View>
                    
                    <View style={Style.updateProfile.updateItemSecond}>
                        <Text style={Style.updateProfile.updateLabel}>Gender</Text> 
                        <View></View>           
                        <RadioForm
                            radio_props={data}
                            initial={account.gender==true?0:1}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#F0054D'}
                            selectedButtonColor={'red'}
                            animation={true}
                            onPress={(value) => {
                                account.gender=(value==1?true:false);
                                this.setState({ account: account });
                            }}
                            labelStyle={{fontSize: Utils.scale(15, Const.Horizontal),  }}
                        />
          
                    </View> 
                    <View style={Style.updateProfile.updateItemSecond}>
                        <Text style={Style.updateProfile.updateLabel}>Address</Text>
                        <TextInput defaultValue={account.address}
                                    onChangeText={text => { 
                                        account.address = text;
                                        this.setState({ account: account });
                                    }}
                                    style={Style.updateProfile.updateInput}
                        />                      
                    </View>    
                    <View style={Style.updateProfile.updateItemSecond}>
                        <Text style={Style.updateProfile.updateLabel}>Phone Number</Text>
                        <TextInput defaultValue={account.phone}
                                    onChangeText={text => { 
                                        account.phone = text;
                                        this.setState({ account: account });
                                    }}
                                    style={Style.updateProfile.updateInput}
                        />                      
                    </View>  
                    <View style={Style.updateProfile.buttonAll}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={Style.updateProfile.appButtonContainer}>
                            <Text style={Style.updateProfile.appButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <View style={Style.updateProfile.buttonEmpty}></View>
                        <TouchableOpacity onPress={()=>this.updateInfomation()} style={Style.updateProfile.appButtonContainer}>
                            <Text style={Style.updateProfile.appButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>  
                      
            </View >
        )
    }
}