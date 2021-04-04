import React, {Component} from 'react';
import { SafeAreaView, ImageBackground, View, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import {AVATAR} from '../../image/index';
import {ScrollView} from 'react-native-gesture-handler';

export default class MessageSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        listTransaction: [],
        avatarUri: '',
        token: '',
      };
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
      } catch (e) {
        console.log(e);
      }
    };
    

  componentDidMount() {
    this.searchMessage('Vi');
  }
  componentWillUnmount() {}
  
  searchMessage(searchValue) {
    this.getData('token')
      .then((result) => {
        if (result) {
          var header = {
            'User-Agent':
              'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            Accept: 'application/json',
            Authorization:
              'Bearer ' + result.toString().substr(1, result.length - 2),

          };
          let data = new FormData();
          data.append("searchValue", searchValue);
          let url = Const.domain + '/api/Conversation/SearchConversation';
          Request.Post(url , header , data )
            .then((response) => {
              if (
                response &&
                response.code &&
                response.code == Const.REQUEST_CODE_SUCCESSFULLY
              ) {
                let tempArray = [];
                response.listSearch.forEach((item) => {
                  let list = {
                    accountId: item.accountId,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    userName: item.userName ,
                    avatarUri: item.avatarUri,
                  };
                  tempArray.push(list);
                });
                this.setState({listSearch: tempArray});
                this.setState({
                  token: result.toString().substr(1, result.length - 2),
                });
              } else {
                this.props.navigation.navigate('Login');
              }
            })
            .catch((reason) => {
              console.log(reason);
              this.props.navigation.navigate('Login');
            });
        } else {
          this.props.navigation.navigate('Login');
        }
      })
      .catch((reason) => {
        console.log('failed');
        this.props.navigation.navigate('Login');
      });
  }

  render() {

    return (
        <View>
<Text>ABC</Text>
        </View>
    )}
}