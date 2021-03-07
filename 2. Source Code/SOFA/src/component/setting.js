import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, ScrollView} from 'react-native';
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

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { AVATAR, ADDRESS_ICON, BIRTHDAY_ICON, PHONE_ICON, GENDER_ICON, MORE_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';

export default class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            avatarUri: '',
            token: '',
            listImageAll: []
        
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

    logout(){
        AsyncStorage.removeItem('token');
        this.props.navigation.navigate('Login');
    }

    componentWillUnmount() {
        //this._unsubcribe();
    }

    componentDidMount(){
        // this.getProfile();
        // this.getListImage();
        // this._unsubcribe = this.props.navigation.addListener('focus', () => {
        //     this.setState({ account: {}, avatarUri: ''});
        //     this.getProfile();
        //     this.getListImage();
        // });
    }

    render(){
        const { account, avatarUri} = this.state;
        return (
            <View>
                <Button style={Style.profile.singleButton} color= '#ff7878' title="Logout" onPress={() => this.logout()} />
            </View>                                
            
        )
    }
}