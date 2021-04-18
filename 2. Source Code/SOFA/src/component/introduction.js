import React, { Component, createRef } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { StackActions } from '@react-navigation/native'

import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { scale, getData, storeData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { APP_LOGO } from '../../image/index';

import * as AuthService from '../service/authService';

import Session from '../common/session';

export default class Introduction extends Component {
    constructor(props) {
        super(props);
    }

    async checkLogin() {
        await AuthService.getProfile()
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    Session.getInstance().account = response;
                    Session.getInstance().token = response.token;
                } else {
                    Session.getInstance().account = {};
                    Session.getInstance().token = '';
                }
            })
            .catch(reason => {
                Session.getInstance().account = {};
                Session.getInstance().token = '';
            })
    }

    async getSettings() {
        await getData('settings')
            .then(result => {
                if (result) {
                    let temp = JSON.parse(result);
                    Session.getInstance().settings = temp;
                    if (typeof temp.isOnNotification === 'undefined') {
                        Session.getInstance().settings.isOnNotification = true;
                    }
                    if (typeof temp.isOnMessageNotification === 'undefined') {
                        Session.getInstance().settings.isOnMessageNotification = true;
                    }
                    if (typeof temp.chatColor === 'undefined') {
                        Session.getInstance().settings.chatColor = '#46AA4A';
                    }
                    if (typeof temp.createPostIntro === 'undefined') {
                        Session.getInstance().settings.createPostIntro = true;
                    }
                    if (typeof temp.appBackground === 'undefined') {
                        Session.getInstance().settings.appBackground = '';
                    }
                } else {
                    Session.getInstance().settings = Const.SETTINGS_DEFAULT;
                    storeData('settings', Const.SETTINGS_DEFAULT);
                }
            })
            .catch(reason => {
                Session.getInstance().settings = Const.SETTINGS_DEFAULT;
                storeData('settings', Const.SETTINGS_DEFAULT);
            });
    }

    async loading() {
        await this.checkLogin();
        await this.getSettings();
        this.props.navigation.dispatch(StackActions.replace('BottomNav', { isRefreshing: true }));
    }

    componentDidMount() {
        this.loading();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={APP_LOGO}
                    style={{
                        height: scale(100, Horizontal),
                        width: scale(100, Horizontal),
                        marginTop: scale(250, Vertical),
                        resizeMode: 'cover',
                        borderRadius: 10,
                    }}
                />
                <ActivityIndicator style={{ marginTop: 'auto', marginBottom: 'auto' }} size='large' color='gray' />
                <View
                    style={{
                        marginTop: 'auto',
                        marginBottom: scale(30, Vertical),
                    }}
                >
                    <Text style={{
                        marginTop: 'auto',
                        fontFamily: 'FS Playlist Script',
                        fontSize: 60,
                    }}>SoFa</Text>
                </View>
            </View>
        )
    }
}