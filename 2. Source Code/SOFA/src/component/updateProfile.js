import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, ToastAndroid, PermissionsAndroid, FlatList, TouchableOpacity, KeyboardAvoidingView, ScrollView, LogBox } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';


import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { AVATAR, ADDRESS_ICON, BIRTHDAY_ICON, PHONE_ICON, GENDER_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';
import Session from '../common/session';

export default class UpdateProfile extends Component {
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
        ImagePicker.openPicker({
            width: 600,
            height: 600,
            cropping: true,
            cropperCircleOverlay: true,
            includeBase64: true,
            multiple: false
        })
            .then(result => {
                if (result.data) {
                    this.setState({ avatarUri: result.path });
                    callback({ base64: result.data });
                }
            })
            .catch(reason => {
                console.log(reason);
            })
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

        ImagePicker.openCamera({
            width: 600,
            height: 600,
            cropping: true,
            cropperCircleOverlay: true,
            includeBase64: true,
            multiple: false
        })
            .then(result => {
                if (result.data) {
                    this.setState({ avatarUri: result.path });
                    callback({ base64: result.data });
                }
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    updateAvatar() {
        const { account } = this.state;
        const token = Session.getInstance().token;
        if (token) {
            let header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Content-Type": "multipart/form-data",
                "Host": Const.host,
                "Authorization": 'Bearer ' + token,
            };
            let data = new FormData();

            data.append('Avatar', account.avatar);
            console.log("Update avatar!");
            let url = Const.domain + 'api/profile/updateavatar';
            Request.Post(url, header, data)
                .then(response => {
                    console.log(response);
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        ToastAndroid.show('Update avatar thành công!', ToastAndroid.SHORT);
                        this.setState({ account: response });
                        Session.getInstance().account = response;
                    } else {
                        ToastAndroid.show('Update avatar không thành công! Vui lòng kiểm tra lại', ToastAndroid.LONG);
                    }
                })
                .catch(reason => {
                    ToastAndroid.show('Update avatar không thành công! Vui lòng kiểm tra lại', ToastAndroid.LONG);
                    console.log(reason);
                });

        } else {
            this.props.navigation.navigate('Login')
        }
    }


    updateInfomation() {
        const { account } = this.state;
        this.getData('token')
            .then(result => {
                if (result) {
                    let header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Content-Type": "multipart/form-data",
                        "Host": Const.host,
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
                    if (!account.firstName || account.firstName == '' || account.firstName == null) {
                        ToastAndroid.show('Vui lòng không để trống Họ', ToastAndroid.SHORT);
                    } else if (!account.lastName || account.lastName == '' || account.lastName == null) {
                        ToastAndroid.show('Vui lòng không để trống Tên', ToastAndroid.SHORT);
                    } else if (!account.address || account.address == '' || account.address == null) {
                        ToastAndroid.show('Vui lòng không để trống Địa chỉ', ToastAndroid.SHORT);
                    }
                    else {

                        Alert.alert(
                            "Cập nhật",
                            "Bạn có muốn chỉnh sửa không?",
                            [
                                {
                                    text: "Không",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                {
                                    text: "Có", onPress: () => {
                                        Request.Post(url, header, data)
                                            .then(response => {
                                                console.log(response);
                                                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                                    ToastAndroid.show('Update thành công!', ToastAndroid.SHORT);
                                                    this.props.navigation.goBack();
                                                    Session.getInstance().account = response;
                                                } else {
                                                    if (response.code == Const.REQUEST_CODE_FAILED) {
                                                        ToastAndroid.show('Update không thành công! Vui lòng kiểm tra lại', ToastAndroid.LONG);
                                                        console.log(response);
                                                    }
                                                }
                                            })
                                            .catch(reason => {
                                                console.log('Lỗi rồi!');
                                                console.log(reason);
                                            });
                                    }
                                }
                            ]
                        );




                    }
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
    }

    componentDidMount() {
        const { account, avatarUri } = this.props.route.params;
        this.setState({ avatarUri: avatarUri });
        this.setState({ account: account });
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: false
            });
        });
        this._screenFocus = this.props.navigation.addListener('blur', () => {
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: false
            });
        });
    }

    render() {
        const { avatarUri, account } = this.state;

        const data = [
            {
                value: 1,
                label: 'Nam',
                icon: () => <FontAwesome name='male' size={20} color={'#9E9E9E'} />
            },
            {
                value: 0,
                label: 'Nữ',
                icon: () => <FontAwesome name='female' size={20} color={'#9E9E9E'} />

            },
        ];
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={[Style.common.container]}>
                        <View style={{ flex: 1 }}>
                            <StatusBar hidden={false} backgroundColor='rgba(0,0,0,0.8)' />
                            <View style={{
                                height: Utils.scale(300, Const.Vertical),
                                width: Utils.scale(400, Const.Horizontal),
                                marginBottom: Utils.scale(20, Const.Vertical)
                            }}>
                                <Image
                                    source={{ uri: avatarUri }}
                                    style={{
                                        height: Utils.scale(300, Const.Vertical),
                                        width: Utils.scale(400, Const.Horizontal),
                                        resizeMode: 'cover',
                                        position: 'absolute'
                                    }}
                                />
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', flex: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.goBack()}
                                            style={{ marginLeft: Utils.scale(10, Const.Horizontal) }}
                                        >
                                            <Octicons name='chevron-left' size={40} color='gray' />
                                        </TouchableOpacity>
                                        <Text style={{
                                            color: 'white',
                                            marginLeft: Utils.scale(85, Const.Horizontal),
                                            marginRight: 'auto',
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 20
                                        }} >Chỉnh sửa thông tin</Text>
                                    </View>
                                    <View style={{
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: Utils.scale(20, Const.Vertical),
                                        paddingBottom: Utils.scale(20, Const.Vertical),
                                    }}>

                                        <Image
                                            source={(account.avatarUri && account.avatarUri.length > 0) ? { uri: avatarUri } : AVATAR}
                                            style={{
                                                width: Utils.scale(150, Const.Horizontal),
                                                height: Utils.scale(150, Const.Horizontal),
                                                borderRadius: Utils.scale(70, Const.Horizontal),
                                                resizeMode: 'cover'
                                            }} />
                                        <View style={{
                                            height: Utils.scale(70, Const.Vertical),
                                            width: Utils.scale(200, Const.Horizontal),
                                            position: 'absolute',
                                            top: Utils.scale(130, Const.Horizontal),
                                            left: Utils.scale(240, Const.Horizontal)
                                        }}>
                                            <MenuProvider>
                                                <Menu>
                                                    <MenuTrigger>
                                                        <View style={{
                                                            height: Utils.scale(40, Const.Horizontal),
                                                            width: Utils.scale(40, Const.Horizontal),
                                                            backgroundColor: '#FF5151',
                                                            borderRadius: 50,
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <Entypo name='camera' size={20} color={'white'} />
                                                        </View>
                                                    </MenuTrigger>
                                                    <MenuOptions>
                                                        <MenuOption onSelect={() => this.takePicture(source => {
                                                            console.log('Take picture callback');
                                                            account.avatar = source.base64;
                                                            this.setState()
                                                            this.setState({ account: account });
                                                            this.updateAvatar();
                                                        })} text='Máy ảnh' />
                                                        <MenuOption onSelect={() => this.chooseFile(source => {
                                                            console.log('Choose file callback');
                                                            account.avatar = source.base64;
                                                            this.setState({ account: account });
                                                            this.updateAvatar();
                                                        })} text='Thư viện' />
                                                    </MenuOptions>
                                                </Menu>
                                            </MenuProvider>
                                        </View>

                                    </View>
                                    <View style={Style.updateProfile.updateName}>
                                        <View style={Style.updateProfile.updateItemFirst}>
                                            <TextInput defaultValue={account.lastName}
                                                onChangeText={text => {
                                                    account.lastName = text;
                                                    this.setState({ account: account });
                                                }}
                                                style={Style.updateProfile.updateInputFirst}
                                            />
                                        </View>
                                        <View style={Style.updateProfile.updateItemFirst}>
                                            <TextInput defaultValue={account.firstName}
                                                onChangeText={text => {
                                                    account.firstName = text;
                                                    this.setState({ account: account });
                                                }}
                                                style={Style.updateProfile.updateInputFirst}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={Style.updateProfile.updateInfo}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={Style.updateProfile.updateItemSecond}>
                                        <Text style={Style.updateProfile.updateLabel}>Ngày sinh</Text>
                                        <DatePicker
                                            style={Style.updateProfile.updateInputDate}
                                            date={account.dob}
                                            mode="date"
                                            placeholder="select date"
                                            format="YYYY-MM-DD"
                                            minDate="1950-01-01"
                                            maxDate="2021-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 4,
                                                    marginRight: 2
                                                },
                                                dateInput: {
                                                    borderWidth: 0,
                                                }
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(date) => {
                                                account.dob = date;
                                                this.setState({ account: account });
                                            }}
                                        />
                                    </View>
                                    <View style={Style.updateProfile.updateItemSecond}>
                                        <Text style={Style.updateProfile.updateLabel}>Giới tính</Text>
                                        <DropDownPicker
                                            defaultValue={account.gender ? 1 : 0}
                                            containerStyle={{ width: Utils.scale(150, Const.Horizontal), height: Utils.scale(35, Const.Vertical) }}
                                            items={data}
                                            style={{}}
                                            onChangeItem={({ value }) => {
                                                account.gender = (value == 1 ? true : false);
                                                this.setState({ account: account });
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={Style.updateProfile.updateItemSecond}>
                                    <Text style={Style.updateProfile.updateLabel}>Địa chỉ</Text>
                                    <TextInput defaultValue={account.address}
                                        onChangeText={text => {
                                            account.address = text;
                                            this.setState({ account: account });
                                        }}
                                        style={Style.updateProfile.updateInput}
                                    />
                                </View>
                                <View style={Style.updateProfile.updateItemSecond}>
                                    <Text style={Style.updateProfile.updateLabel}>Email</Text>
                                    <TouchableOpacity onPress={() => ToastAndroid.show(
                                        'Bạn có thể thay đổi tại mục cài đặt bảo mật', ToastAndroid.LONG
                                    )}>
                                        <TextInput defaultValue={account.email}
                                            editable={false}
                                            selectTextOnFocus={false}
                                            style={Style.updateProfile.updateInput}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={Style.updateProfile.updateItemSecond}>
                                    <Text style={Style.updateProfile.updateLabel}>Điện thoại</Text>
                                    <TouchableOpacity onPress={() => ToastAndroid.show(
                                        'Bạn có thể thay đổi tại mục cài đặt bảo mật', ToastAndroid.LONG
                                    )}>
                                        <TextInput defaultValue={account.phone}
                                            editable={false}
                                            selectTextOnFocus={false}
                                            style={Style.updateProfile.updateInput}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={Style.updateProfile.buttonUpdate}>
                                <TouchableOpacity onPress={() => this.updateInfomation()} style={Style.updateProfile.appButtonContainer}>
                                    <Text style={Style.updateProfile.appButtonText}>Cập nhật</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View >
                </ScrollView>
            </View>
        )
    }
}