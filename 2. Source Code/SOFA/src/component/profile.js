import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, ScrollView, TouchableOpacity } from 'react-native';
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
import { LogBox } from 'react-native';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { AVATAR, ADDRESS_ICON, BIRTHDAY_ICON, PHONE_ICON, GENDER_ICON, MORE_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            avatarUri: '',
            token: '',
            listImageAll: [],
            pageNumber: 1,
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
        console.log('Access profile');
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

    getListImage = async (page) => {
        console.log('Get image');
        var { listImageAll } = this.state;
        var pageNumber = page;
        console.log('Current page: ' + pageNumber);
        await this.getData('token')
            .then(result => {
                if (result) {
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2)
                    };
                    let url = Const.domain + 'api/post/getuserpost?page=' + pageNumber + '&rowsofpage=' + Const.PROFILE_ROW_OF_PAGE;
                    console.log(url);
                    Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                let listPost = response.listPost;
                                if (listPost.length > 0) {
                                    for (let i = 0; i < listPost.length; i++) {
                                        listImageAll.push(listPost[i].listImage[0]);
                                    }
                                    this.setState({ listImageAll: listImageAll});
                                    this.setState({ pageNumber: pageNumber + 1 });
                                    console.log('next page: ' + this.state.pageNumber);
                                }
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

    formatBirthday(dob) {
        let today = new Date(dob);
        let date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
        return date;
    }

    formatGender(gender) {
        let sex = "Nam";
        if (gender != true) {
            sex = "Nữ";
        }
        return sex;
    }

    onPressUpdateProfile() {
        const { account, avatarUri } = this.state;
        this.props.navigation.navigate('UpdateProfile', {
            account: account,
            avatarUri: avatarUri,
        });
    }

    logout() {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Login');
    }

    componentWillUnmount() {
        //this.setState({ account: {}, avatarUri: '', pageNumber: 1, listImageAll: [] });
    }



    componentDidMount() {
        console.log('My Profile');
        this.setState({ account: {}, avatarUri: '', pageNumber: 1, listImageAll: [] });
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            console.log('focus');
            this.setState({ account: {}, avatarUri: '', pageNumber: 1, listImageAll: [] });
            this.getProfile();
            this.getListImage(1);
        });
    }

    render() {
        const { account, avatarUri } = this.state;
        console.log(account);
        LogBox.ignoreLogs(['source.uri should not be an empty string']);
        return (
            <View>
                <StatusBar hidden={false} backgroundColor='#fbb897' />

                <View style={{
                    height: Utils.scale(650, Const.Vertical),
                }}>
                    <FlatList
                        ListHeaderComponent={(
                            <View >
                                <LinearGradient colors={['#fbb897', '#ff8683']}>
                                    <View style={Style.profile.firstHeader}>
                                        <View style={{
                                            flexDirection: 'row',
                                            width: Utils.scale(400, Const.Horizontal),
                                        }}>
                                            <Image
                                                source={(account.avatarUri && account.avatarUri.length > 0) ? { uri: avatarUri } : AVATAR}
                                                resizeMode={"cover"}
                                                style={Style.profile.image} />
                                            <TouchableOpacity onPress={() => this.onPressUpdateProfile()} style={{
                                                marginRight: Utils.scale(15, Const.Horizontal),
                                                marginLeft: 'auto'
                                            }}>
                                                <Ionicons name='settings-sharp' size={30} color={'white'} />
                                                <Text style={{
                                                    color: 'white',
                                                    marginLeft: 1.2,
                                                }}>Sửa</Text>
                                            </TouchableOpacity>

                                        </View>
                                        <Text style={Style.profile.userName}>{account.firstName + ' ' + account.lastName}</Text>
                                        <Text style={Style.profile.email}>{account.email}</Text>
                                        <View style={Style.profile.basicInfo}>
                                            <Text style={Style.profile.basicSmallInfo}>{account.postNumber}{"\n"}Posts</Text>
                                            <Text style={Style.profile.basicSmallInfo}>{account.followerNumber}{"\n"}Followers</Text>
                                        </View>

                                    </View>
                                </LinearGradient>
                                <View style={Style.profile.information}>
                                    <Image source={ADDRESS_ICON} style={Style.profile.info_icon} />
                                    <Text style={Style.profile.info_text}>
                                        Đến từ <Text style={{ fontWeight: "bold" }}>
                                            {account.address}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={Style.profile.information}>
                                    <Image source={BIRTHDAY_ICON} style={Style.profile.info_icon} />
                                    <Text style={Style.profile.info_text}>
                                        Ngày sinh <Text style={{ fontWeight: "bold" }}>
                                            {this.formatBirthday(account.dob)}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={Style.profile.information}>
                                    <Image source={PHONE_ICON} style={Style.profile.info_icon} />
                                    <Text style={Style.profile.info_text}>
                                        Điện thoại <Text style={{ fontWeight: "bold" }}>
                                            {account.phone}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={Style.profile.information}>
                                    <Image source={GENDER_ICON} style={Style.profile.info_icon} />
                                    <Text style={Style.profile.info_text}>
                                        Giới tính <Text style={{ fontWeight: "bold" }}>
                                            {this.formatGender(account.gender)}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={Style.profile.line} />
                            </View>
                        )}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            console.log('Flat list');
                            this.getListImage(this.state.pageNumber);
                        }}
                        data={this.state.listImageAll}
                        scrollEnabled={true}
                        numColumns={3}
                        keyExtractor={(item) => item.id + ''}
                        renderItem={({ item, index }) => {
                            return (<Image
                            style={{
                                marginLeft: index%3==0? Utils.scale(33.5, Const.Horizontal):Utils.scale(0, Const.Horizontal),
                                height: Utils.scale(100, Const.Vertical),
                                width: Utils.scale(100, Const.Vertical),
                                borderWidth: 1,
                                borderColor: '#EA2338',
                            }}
                            source={{ uri: Const.assets_domain + item.url}}
                        />)}
                        }
                    />
                </View>
            </View>
        )
    }
}