import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";

export default class Message extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listMessage: [],
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

    getMessage(){
        console.log('Get message')
        var { listMessage } = this.state;
        const {cid, uid1, uid2} = this.props.route.params;
        if(cid){
            var header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Accept": 'application/json',
            };
            let url = Const.domain + 'api/message/getmessagebycid?cid=' + cid;
            Request.Get(url, header)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listMessage = response.listMess;   
                    //this.setState({ listMessage: response.listMess });  
                    console.log(listMessage);     
                    console.log(this.state.listMessage); 
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

    componentDidMount() {
        this.setState({});
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({});
            this.getMessage();
        });
        this._unfocus = this.props.navigation.addListener('blur', () => {
            this.setState({});
        });
    }

    render(){
        const {cid, uid1, uid2} = this.props.route.params;
        var { listMessage } = this.state;
        return (
            <View>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <Text>Conversation ID: {cid}</Text>
                <Text>List Mess: {listMessage}</Text>
            </View>
        )
    }
}