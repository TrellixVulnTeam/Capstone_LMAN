import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, ToastAndroid, FlatList, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import * as NotificationService from '../service/notificationService';


export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            user: {},
            listNotification: [],
            page: 1
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

    checkLoginToken = async () => {
        await this.getData('token')
            .then(result => {
                if (result) {
                    this.setState({ token: result.toString().substr(1, result.length - 2) });
                }
            })
            .catch(reason => {
                this.setState({ token: '' });
                console.log(reason);
            })
        await this.getData('user')
            .then(result => {
                if (result) {
                    this.setState({ user: result });
                }
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    getAllNotification = async (page) => {

        NotificationService.getNotiByID(page, Const.NOTIFICATION_ROWS_OF_PAGE)
            .then(response => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listNotiRes = response.listNoti;
                    if (page > 1) {
                        console.log('load more', listNotiRes.length);
                        if (listNotiRes.length > 0) {
                            this.setState({
                                listNotification: [...this.state.listNotification, ...listNotiRes],
                                listNotificationRefreshing: false,
                            });
                        } else {
                            this.setState({ listNotificationRefreshing: false });
                        }
                    }
                    else {
                        console.log('reload', listNotiRes.length);
                        if (listNotiRes.length > 0) {
                            this.setState({ listNotification: listNotiRes, listNotificationRefreshing: false });
                        } else {
                            this.setState({ listNotificationRefreshing: false });
                        }
                    }

                } else {
                    ToastAndroid.show('Tải thông báo không thành công!', ToastAndroid.SHORT);
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    this.props.navigation.goBack();
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Tải thông báo không thành công!', ToastAndroid.LONG);
                }
            })
    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
            this.getAllNotification(1);
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
        });
    }

    onPressNotification(noti) {
        this.setIsRead(noti)
        if (noti.fromAccount != 0) {
            switch (noti.typeNotification) {
                case Const.NOTIFICATION_TYPE_FOLLOW:
                    this.props.navigation.navigate('OtherProfile', { accountID: noti.fromAccount });
                    break;
                default:
                    this.props.navigation.navigate('PostDetail', { postID: noti.postId });
            }
        }
    }

    setIsRead(noti) {
        NotificationService.setReadNotiByID(noti.id)
            .then(response => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listNotiTemp = this.state.listNotification;
                    for (let i = 0; i < listNotiTemp.length; i++) {
                        if (noti.id == listNotiTemp[i].id) {
                            listNotiTemp[i].isRead = true;
                        }
                    }
                    this.setState({ listNotification: listNotiTemp });
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    this.props.navigation.goBack();
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Đánh dấu đã đọc không thành công!', ToastAndroid.LONG);
                }
            })
    }

    markAsRead() {
        NotificationService.markAllAsRead()
            .then(response => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.getAllNotification(1);
                } else {
                    ToastAndroid.show('Đánh dấu đã đọc không thành công!', ToastAndroid.LONG);
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    this.props.navigation.goBack();
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Đánh dấu đã đọc không thành công!', ToastAndroid.LONG);
                }
            })
    }

    NotiItem = ({ data }) => {
        let noti = data;
        const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
        //console.log(Utils.calculateTime(noti.dateCreated));
        return (
            <TouchableOpacity onPress={() => this.onPressNotification(noti)}>
                <View style={[Style.noti.Article, { backgroundColor: (noti.isRead == true ? 'white' : '#d6faff'), }]} >
                    <View style={Style.noti.flexRow}>
                        <Image source={{ uri: Const.assets_domain + data.fromAccountAvatar }} style={Style.noti.ArticleAvatar} />
                        <Text style={Style.noti.ArticleContent}><B>{noti.fromAccountName}</B>  {noti.content}
                            {"\n"}{Utils.calculateTime(noti.dateCreated)} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { listNotification } = this.state;
        return (
            <View style={Style.noti.container}>
                <View>
                    <Text style={Style.noti.header}>Thông báo</Text>
                    <View style={[Style.noti.headerMoreBounder]}>
                        <Text style={Style.noti.headerText}>Trước đó</Text>
                        <TouchableOpacity
                            onPress={() => this.markAsRead()}
                            style={[Style.noti.markAsReadBounder]}>
                            <MaterialIcons name='mark-chat-read' size={20} color='black' />
                            <Text style={{}}>Đánh dấu tất cả đã đọc</Text>

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: scale(625, Vertical) }}>
                    <FlatList
                        data={listNotification}
                        keyExtractor={(item, index) => item.id + ''}
                        renderItem={({ item, index }) => {
                            return (<this.NotiItem data={item} />)
                        }}
                        onEndReached={() => {
                            //this.setState({ listPostRefreshing: true });
                            this.getAllNotification(this.state.page + 1);
                            this.setState({ page: this.state.page + 1 });
                        }}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </View>
        )
    }
}