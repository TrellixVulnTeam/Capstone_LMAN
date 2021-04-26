import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Image, TouchableWithoutFeedback, FlatList, ActivityIndicator, Modal, TouchableOpacity, ToastAndroid, ImageBackground, StyleSheet, TextInput, Switch } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';

import * as Style from '../style/style';
import * as Const from '../common/const';
import { scale, getData, storeData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';

import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';
import * as ReportService from '../service/reportService';

import Session from '../common/session';

const listColor = ['#46AA4A', 'orange', 'red', 'gray', '#6560FF', '#FE61E3', '#B561FE', '#89FE61', '#FE6161', '#FE61A5', '#619AFE', '#DAFE61', '#FEA561', '#FF8A8A', '#F45BFF', '#242424']

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                role: '',
                email: '',
                phone: '',
            },
            settings: {
                isOnNotification: false,
                isOnMessageNotification: false,
                chatColor: '#46AA4A',
                appBackground: '',
                createPostIntro: true
            },
            isShowModalSelectChatColor: false,
            account: {},
            token: ''
        }
    }

    componentDidMount() {
        getData('user').then((result) => {
            if (result) {
                this.setState({ user: JSON.parse(result) })
            }
        })
            .catch((reason) => {
                console.log(reason);
            });

        let session = Session.getInstance();
        let { settings } = this.state;
        settings.isOnNotification = session.settings.isOnNotification ? true : false;
        settings.isOnMessageNotification = session.settings.isOnMessageNotification ? true : false;
        settings.chatColor = session.settings.chatColor ? session.settings.chatColor : '#46AA4A';
        settings.appBackground = session.settings.appBackground ? session.settings.appBackground : ''
        if (typeof session.createPostIntro === 'undefined') {
            session.settings.createPostIntro = true;
            settings.createPostIntro = true;
        }
        this.setState({ settings: settings });
    }

    onChangeSettings(key, value) {
        let { settings } = this.state;
        settings[key] = value;
        this.setState({ settings: settings })
        // console.log(this.state)

        Session.getInstance().settings = this.state.settings;
        storeData('settings', this.state.settings)
            .then(result => console.log('Saved!'))
            .catch(reason => console.log(reason));
        // console.log(Session.getInstance().settings)
    }

    componentWillUnmount() {

    }
    render() {
        const { isOnMessageNotification, isOnNotification, chatColor, appBackground, account, token } = this.state.settings;
        const { isShowModalSelectChatColor } = this.state;
        return (
            <View style={[styles.container]}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <View style={[Style.newsfeed.Header]}>
                    <View>
                        <Text style={[styles.SettingTitle, { color: 'white', position: 'absolute', top: -2, left: -2 }]}>Settings</Text>
                        <Text style={styles.SettingTitle}>Settings</Text>
                    </View>
                </View>
                <View style={[styles.settingsAreaBounder]}>
                    <View style={[styles.settingsAreaTitle]}>
                        <MaterialCommunityIcons style={[styles.settingsAreaTitleIcon]} name='account-outline' size={30} color='black' />
                        <Text style={[styles.settingsAreaTitleText]}>Tài khoản</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {

                            this.props.navigation.navigate('UpdateProfile', {
                                account: Session.getInstance().account,
                                avatarUri: Const.assets_domain + Session.getInstance().account.avatarUri,
                            });
                        }}
                        style={[styles.settingItemBounder]}>
                        <Text style={[styles.settingItemText]}>Chỉnh sửa thông tin</Text>
                        <Octicons style={[styles.settingItemMoveIcon]} name='chevron-right' size={30} color='gray' />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingItemBounder]}
                        onPress={() => this.props.navigation.navigate('ChangePassword', {
                            isResetPassword: false, phone: this.state.user.phone,
                            transactionID: -1, code: -1
                        })}>
                        <Text style={[styles.settingItemText]}>Đổi mật khẩu</Text>
                        <Octicons style={[styles.settingItemMoveIcon]} name='chevron-right' size={30} color='gray' />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingItemBounder]}>
                        <Text style={[styles.settingItemText]}>Cài đặt bảo mật</Text>
                        <Octicons style={[styles.settingItemMoveIcon]} name='chevron-right' size={30} color='gray' />
                    </TouchableOpacity>
                </View>
                <View style={[styles.settingsAreaBounder]}>
                    <View style={[styles.settingsAreaTitle]}>
                        <Entypo style={[styles.settingsAreaTitleIcon]} name='notification' size={30} color='black' />
                        <Text style={[styles.settingsAreaTitleText]}>Thông báo</Text>
                    </View>
                    <View style={[styles.settingItemBounder]}>
                        <Text style={[styles.settingItemText]}>Thông báo</Text>
                        <Switch style={[styles.settingItemMoveIcon]}
                            trackColor={{ false: 'gray', true: '#2a7ea0' }}
                            thumbColor={'white'}
                            onValueChange={() => {
                                this.onChangeSettings('isOnNotification', !isOnNotification);
                            }}
                            value={isOnNotification}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.onChangeSettings('isOnMessageNotification', !isOnMessageNotification);
                        }}
                        style={[styles.settingItemBounder]}>
                        <Text style={[styles.settingItemText]}>Tin nhắn</Text>
                        <Switch style={[styles.settingItemMoveIcon]}
                            trackColor={{ false: 'gray', true: '#2a7ea0' }}
                            thumbColor={'white'}
                            onValueChange={() => {
                                this.onChangeSettings('isOnMessageNotification', !isOnMessageNotification);
                            }}
                            value={isOnMessageNotification}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.settingsAreaBounder]}>
                    <View style={[styles.settingsAreaTitle]}>
                        <Feather style={[styles.settingsAreaTitleIcon]} name='layout' size={30} color='black' />
                        <Text style={[styles.settingsAreaTitleText]}>Hiển thị</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.setState({ isShowModalSelectChatColor: true })}
                        style={[styles.settingItemBounder]}>
                        <Text style={[styles.settingItemText]}>Chủ đề tin nhắn</Text>
                        <Octicons style={[styles.settingItemMoveIcon]} name='chevron-right' size={30} color='gray' />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingItemBounder]}>
                        <Text style={[styles.settingItemText]}>Nền ứng dụng</Text>
                        <Octicons style={[styles.settingItemMoveIcon]} name='chevron-right' size={30} color='gray' />
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={isShowModalSelectChatColor}
                    onRequestClose={() => this.setState({ isShowModalSelectChatColor: false })}
                    animationType='slide'
                    transparent={true}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressOut={() => this.setState({ isShowModalSelectChatColor: false })}
                        style={[{ height: scale(711, Vertical) }]}
                    >
                        <View style={[styles.modalSelectChatColorBounder]}>
                            <View style={[styles.modalSelectChatColorHeader]}>
                                <Text style={[styles.modalSelectChatColorHeaderText]}>Màu hiện tại</Text>
                                <View style={[styles.currentColorItem, { backgroundColor: chatColor }]}></View>
                            </View>
                            <View style={[styles.listSelectColorArea]}>
                                <FlatList
                                    numColumns={4}
                                    data={listColor}
                                    keyExtractor={(item, index) => item}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.onChangeSettings('chatColor', item);
                                                }}
                                                style={[styles.colorSelectItem, { backgroundColor: item }, chatColor == item ? styles.colorItemSelected : {}]}></TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(15, Horizontal),
    },
    SettingTitle: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    settingsAreaBounder: {

    },
    settingsAreaTitle: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        paddingVertical: scale(10, Vertical)
    },
    settingsAreaTitleIcon: {

    },
    settingsAreaTitleText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginLeft: scale(10, Horizontal)
    },
    settingItemBounder: {
        marginTop: scale(10, Vertical),
        flexDirection: 'row'
    },
    settingItemText: {
        color: 'gray',
        alignSelf: 'center'
    },
    settingItemMoveIcon: {
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: scale(0, Horizontal)
    },
    modalSelectChatColorBounder: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        bottom: 0,
        paddingVertical: scale(10, Vertical),
        paddingHorizontal: scale(10, Horizontal)
    },
    listSelectColorArea: {
        paddingBottom: scale(10, Vertical)
    },
    modalSelectChatColorHeader: {
        height: scale(70, Vertical),
        width: scale(400, Horizontal),
        flexDirection: 'row'
    },
    modalSelectChatColorHeaderText: {
        fontSize: 16,
        fontFamily: 'Segeo UI',
        marginLeft: scale(32.5, Horizontal)
    },
    colorSelectItem: {
        width: scale(50, Horizontal),
        height: scale(50, Horizontal),
        borderRadius: 50,
        marginLeft: scale(32.5, Horizontal),
        marginTop: scale(5, Vertical),
        marginBottom: scale(5, Vertical),
    },
    currentColorItem: {
        width: scale(50, Horizontal),
        height: scale(50, Horizontal),
        borderRadius: 50,
        marginLeft: scale(10, Horizontal),
    },
    colorItemSelected: {
        borderWidth: 1,
        borderColor: 'black'
    }

})