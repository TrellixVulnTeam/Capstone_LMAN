import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, ScrollView} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import RadioButtonRN from 'radio-buttons-react-native';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { AVATAR, ADDRESS_ICON, BIRTHDAY_ICON, PHONE_ICON, GENDER_ICON } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';

export default class OtherProfile extends Component{
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

    getProfile = async () => {
        const { account } = this.state;
        console.log('Access profile');
        await this.getData('token')
        .then(result => {
            if(result){
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
            }else{
                this.props.navigation.navigate('Login')
            }
        })
        .catch(reason => {
            console.log('failed');
            this.props.navigation.navigate('Login')
        })
    }

    getListImage = async () =>{
        await this.getData('token')
        .then(result => {
            if(result){
                var header = {
                    "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                    "Accept": 'application/json',
                    "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2)
                };
                let url = Const.domain + 'api/post/getuserpost';
                Request.Get(url, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                let listPost = response.listPost ;
                                let listImageAll = [];
                                for (let i = 0; i < listPost.length; i++) {
                                    listImageAll.push(listPost[i].listImage[0]);
                                    console.log(Const.assets_domain + listPost[i].listImage[0].url + '?time=' + new Date())
                                }
                                this.setState({ listImageAll: listImageAll });
                                console.log(this.state.listImageAll);                               
                                

                            } else {
                                this.props.navigation.navigate('Login')
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            this.props.navigation.navigate('Login')

                        });
            }else{
                this.props.navigation.navigate('Login')
            }
        })
        .catch(reason => {
            console.log('failed');
            this.props.navigation.navigate('Login')
        })
    }

    formatBirthday(dob){
        let today = new Date(dob);
        let date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear();
        return date;
    }

    formatGender(gender){
        let sex = "Nam";
        if(gender != true){
            sex = "Nữ";
        }
        return sex;
    }

    onPressUpdateProfile(){
        const { account, avatarUri} = this.state;
        this.props.navigation.navigate('UpdateProfile', {
            account: account,
            avatarUri: avatarUri,
          });
    }

    componentWillUnmount() {
        //this._unsubcribe();
    }

    componentDidMount(){
        this.getProfile();
        this.getListImage();
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({ account: {}, avatarUri: ''});
            this.getProfile();
            this.getListImage();
        });
    }

    render(){
        const { account, avatarUri} = this.state;
        return (
            <ScrollView>
            <View>
                <StatusBar hidden={false} backgroundColor='#fbb897' />
                <LinearGradient colors={['#fbb897','#ff8683']}>
                    <View style={Style.profile.firstHeader}>
                        <Image 
                        source={avatarUri ? { uri: avatarUri } : AVATAR}
                        resizeMode={"cover"}
                        style={Style.profile.image} />
                        <Text style={Style.profile.userName}>{account.firstName + ' ' + account.lastName}</Text>
                        <Text style={Style.profile.email}>{account.email}</Text>
                        <View style={Style.profile.basicInfo}>
                            <Text style={Style.profile.basicSmallInfo}>{account.postNumber}{"\n"}Posts</Text>
                            <Text style={Style.profile.basicSmallInfo}>{account.followerNumber}{"\n"}Followers</Text>
                        </View>
                        <View style={Style.profile.button}>
                            <Button style={Style.profile.singleButton} color= '#ff7878' onPress = {() => this.onPressUpdateProfile()} title="Update profile"/>
                            <View style={{flex: 0.2}}></View>
                            <Button style={Style.profile.singleButton} color= '#ff7878' title="View balance" onPress={() => this.props.navigation.navigate('Balance')} />
                        </View>
                    </View>
                </LinearGradient>                       
                <View style={Style.profile.information}>    
                    <Image source={ADDRESS_ICON} style={Style.profile.info_icon} />                   
                    <Text style={Style.profile.info_text}>
                        Đến từ <Text style={{fontWeight: "bold"}}>
                            {account.address}
                        </Text>                       
                    </Text>                   
                </View>
                <View style={Style.profile.information}>    
                    <Image source={BIRTHDAY_ICON} style={Style.profile.info_icon} />                   
                    <Text style={Style.profile.info_text}>
                        Ngày sinh <Text style={{fontWeight: "bold"}}>
                            {this.formatBirthday(account.dob)}
                        </Text>                       
                    </Text>                   
                </View>
                <View style={Style.profile.information}>    
                    <Image source={PHONE_ICON} style={Style.profile.info_icon} />                   
                    <Text style={Style.profile.info_text}>
                        Điện thoại <Text style={{fontWeight: "bold"}}>
                            {account.phone}
                        </Text>                       
                    </Text>                   
                </View>
                <View style={Style.profile.information}>    
                    <Image source={GENDER_ICON} style={Style.profile.info_icon} />                   
                    <Text style={Style.profile.info_text}>
                        Giới tính <Text style={{fontWeight: "bold"}}>
                            {this.formatGender(account.gender)}
                        </Text>                       
                    </Text>                   
                </View>
                <View style={Style.profile.line}/>
                <View style={{
                    alignSelf: 'center',
                    marginTop: Utils.scale(10, Const.Vertical),
                    }}>
                <FlatList
                    data={this.state.listImageAll}
                    scrollEnabled={false}
                    numColumns={3}
                    keyExtractor={(item) => item.id + ''}
                    renderItem={({ item }) => (<Image 
                        style={{
                            height: Utils.scale(100, Const.Vertical),
                            width: Utils.scale(100, Const.Vertical),
                            borderWidth: 1.5,
                            borderColor: '#EA2338',
                        }}
                        source={{uri: Const.assets_domain + item.url + '?time=' + new Date()}} 
                        />)
                      }
                />
                </View>                                
            </View>
            </ScrollView>
        )
    }
}