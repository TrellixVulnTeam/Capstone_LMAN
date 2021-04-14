import React, {Component} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import {AVATAR} from '../../image/index';
import {ScrollView} from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Utils from "../common/utils";



export default class MessageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.searchMessage();
  }
  componentWillUnmount() {}

  searchMessage() {
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
          let url = Const.domain + 'api/Conversation/SearchConversation';
          let data = new FormData();
          data.append('searchValue', 'A');
          Request.Post(url, header, data)
            .then((response) => {
              if (
                response &&
                response.code &&
                response.code == Const.REQUEST_CODE_SUCCESSFULLY
              ) {
               
                let tempArray = [];
                response.listSearch.forEach((item) => {
                  let listdata = {
                    accountSearch: item.accountSearch,
                    accountId : item.accountId,
                    firstName : item.firstName,
                    lastName : item.lastName,
                    userName : item.userName,
                    avatarUri : item.avatarUri};
                  tempArray.push(listdata);
                });
                this.setState({dataSearch: tempArray});
                
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
  searchConversation(){

  }



  render() {
    const {
      dataSearch
    } = this.state;
    return (
      <View>
        <SearchBar
          placeholder="Tìm kiếm..."
          lightTheme
          round
          onFocus={() => this.searchConversation()}
          autoCorrect={false}
        />
        <FlatList
          data={dataSearch}
          renderItem={({item, index}) => {
            return (
              <ListMessageSearch
                navigate={this.props.navigation.navigate}
                accountSearch={item.accountSearch}
                accountId={item.accountId}
                firstName={item.firstName}
                lastName={item.lastName}
                userName={item.userName}
                avatarUri={item.avatarUri}
                
              />
            );
          }}
          keyExtractor={(item, index) => `${item.accountId}`}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: 'steelblue',
              }}
            />
          )}
        />
      </View>
    );
  }
}
class ListMessageSearch extends Component {
  ConversationDetail = () => {
    this.props.navigate('Conversation', {
      uid1: this.props.accountSearch,
      uid2: this.props.accountId,
    });
  };
  render() {

    return (
      <TouchableOpacity onPress={this.ConversationDetail}>
      <View style={{
          flexDirection: 'row',
      }}>
          <View>
          <Image 
              source={(this.props.avatarUri && this.props.avatarUri.length > 0) ? { uri: Const.assets_domain + this.props.avatarUri } : AVATAR}
              resizeMode={"cover"}
              style={{
                  height: Utils.scale(40, Const.Horizontal),
                  width: Utils.scale(40, Const.Horizontal),
                  borderRadius: Utils.scale(20, Const.Horizontal),
                  borderWidth: 1,
                  overflow: 'hidden',
                  //alignSelf: 'center',
                  //marginLeft: Utils.scale(149, Const.Horizontal),
              }} />
          </View>
          <View style={{
              marginLeft: Utils.scale(10, Const.Horizontal),
          }}>
              <Text style={{
                  fontSize: Utils.scale(19, Const.Horizontal),
                  fontWeight: 'bold',
              }}>{this.props.firstName+' '+this.props.lastName}</Text>
              <Text style={{
                  fontSize: Utils.scale(13, Const.Horizontal),
              }}>@{this.props.userName}</Text>
          </View>
      </View>
  </TouchableOpacity>
    );
  }
}
