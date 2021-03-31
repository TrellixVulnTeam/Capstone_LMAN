import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, TouchableOpacity } from 'react-native';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import NotificationViewModel from "../Model/notificationViewModel";
import { HOANG } from '../../image/index';
import PushNotification from "react-native-push-notification";


export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            user: {},
            listNotification: []
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
                    this.notificationConnection();
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

    getAllNotification = async () => {
        await this.getData('token')
            .then(result => {
                if (result) {
                    // console.log('Get all post', result);
                    this.setState({ token: result.toString().substr(1, result.length - 2) });
                }
            })
            .catch(reason => {
                this.setState({ token: '' });
                console.log(reason);
            })
        //console.log('Hello');
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
            "Authorization": 'Bearer ' + this.state.token,
        };
        var data = {};
        var uri = Const.domain + 'api/notification/getnotibyid?accountID=7';

        Request.Get(uri, header, data)
            .then(response => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    //console.log(Const.REQUEST_CODE_SUCCESSFULLY);
                    let listNotiRes = response.listNoti;
                    //console.log(listNotiRes.length);
                    let listNotiTemp = this.state.listNotification;
                    for (let i = 0; i < listNotiRes.length; i++) {
                        listNotiTemp.push(new NotificationViewModel(listNotiRes[i]));
                    }
                    this.setState({ listNotification: listNotiRes });
                    console.log(this.state.listNotification.length);
                }
            })
            .catch(reason => {
                console.log(reason);
            })

    }

    notificationConnection() {
        if (typeof this.connection === 'undefined') {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(Const.domain + 'notification', {
                    accessTokenFactory: () => this.state.token,
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                .build();
            this.connection.start().then(() => {
                console.log('Connected');
            }).catch(function (err) {
                return console.error(err.toString());
            });
            this.connection.on("NewNotification", data => {
                console.log(data.fromAccountName + ' ' + data.content);
                if (data) {
                    PushNotification.localNotification({
                        title: "Thông báo",
                        message: data.fromAccountName + ' ' + data.content,
                    });
                }
            });
        }
    }

    componentDidMount() {
        this.checkLoginToken();
        this.getAllNotification();
    }

    onPressNotification(noti) {
        //console.log(noti);
        //console.log(noti.postId);
        this.setIsRead(noti)
        this.props.navigation.navigate('PostDetail', { postID: noti.postId});
    }

    setIsRead(noti) {
        const { token } = this.state;
        if (token && token.length > 0) {
            var header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                'Content-Type': 'multipart/form-data',
                "Accept": 'application/json',
                "Authorization": 'Bearer ' + token,
            };
            let data = new FormData();
            data.append('PostID', post.id);
            let uri = '';
            if (!post.isLiked) {
                uri = Const.domain + 'api/post/likepost';
            } else {
                uri = Const.domain + 'api/post/unlikepost';
            }
            Request.Post(uri, header, data)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        this.updatePostByID(response.listPost[0].id, 'numberOfLike', response.listPost[0].numberOfLike);
                        this.updatePostByID(response.listPost[0].id, 'isLiked', response.listPost[0].isLiked);
                    } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                        console.log(response.errorMessage);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                })
        } else {
            Alert.alert('Thông báo', 'Hãy đăng nhập để thực hiện việc này');
        }
    }

    NotiItem = ( {data} ) => {
        let noti = data;
        //console.log(noti);
        return (
            <TouchableOpacity onPress={() => this.onPressNotification(noti)}>
                <View style={[Style.noti.Article, {backgroundColor: (noti.isRead == true ? 'white' : '#d6faff'),}]} >
                    <View style={Style.noti.flexRow}>
                        <Image source={HOANG} style={Style.noti.ArticleAvatar} />
                        <Text style={Style.noti.ArticleContent}>{noti.content}</Text>
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
                    <Text style={Style.noti.headerText}>Trước đó</Text>
                </View>

                <View style={{ height: scale(625, Vertical) }}>
                    <FlatList
                        data={listNotification}
                        keyExtractor={(item, index) => item.id + ''}
                        renderItem={({ item, index }) => {
                            //console.log(item)
                            return (<this.NotiItem data={item} />)
                        }}

                    />
                </View>
            </View>
        )
    }
}