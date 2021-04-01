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
import * as NotificationService from '../service/notificationService';


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
                  
                    this.setState({ token: result.toString().substr(1, result.length - 2) });
                }
            })
            .catch(reason => {
                this.setState({ token: '' });
                console.log(reason);
            })
        
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
                    let listNotiRes = response.listNoti;
                    let listNotiTemp = this.state.listNotification;
                    for (let i = 0; i < listNotiRes.length; i++) {
                        listNotiTemp.push(new NotificationViewModel(listNotiRes[i]));
                    }
                    this.setState({ listNotification: listNotiRes });
                }
            })
            .catch(reason => {
                console.log(reason);
            })

    }

    componentDidMount() {
        this.checkLoginToken();
        this.getAllNotification();
    }

    onPressNotification(noti) {
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
        var uri = Const.domain + 'api/notification/setreadnotibyid?ID='+noti.id;
        Request.Post(uri, header)
            .then(response => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listNotiTemp = this.state.listNotification;
                    for (let i = 0; i < listNotiTemp.length; i++) {
                        if (noti.id == listNotiTemp[i].id){
                            listNotiTemp[i].isRead = true; 
                        }
                    }
                    this.setState({ listNotification: listNotiTemp });
                }
            })
            .catch(reason => {
                console.log(reason);
            })
        }
    }

    NotiItem = ( {data} ) => {
        let noti = data;
        const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
        //console.log(Utils.calculateTime(noti.dateCreated));
        return (
            <TouchableOpacity onPress={() => this.onPressNotification(noti)}>
                <View style={[Style.noti.Article, {backgroundColor: (noti.isRead == true ? 'white' : '#d6faff'),}]} >
                    <View style={Style.noti.flexRow}>
                        <Image source={HOANG} style={Style.noti.ArticleAvatar} />
                        <Text style={Style.noti.ArticleContent}><B>{noti.fromAccountName}</B>  {noti.content} 
                            <B> {noti.toAccountName}</B> {"\n"}{Utils.calculateTime(noti.dateCreated)} </Text>
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
                            return (<this.NotiItem data={item} />)
                        }}

                    />
                </View>
            </View>
        )
    }
}