import React, {Component} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  FlatList,
} from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import {AVATAR} from '../../image/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale} from '../common/utils';
import {Horizontal, Vertical} from '../common/const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeout from 'react-native-swipeout';
import {SearchBar} from 'react-native-elements';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowkey: null,
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
  getListCoversation() {
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
          let url = Const.domain + 'api/Conversation';
          Request.Get(url, header)
            .then((response) => {
              if (
                response &&
                response.code &&
                response.code == Const.REQUEST_CODE_SUCCESSFULLY
              ) {
                console.log(response);
                this.setState({
                  accountId: response.accountId,
                  firstName: response.firstName,
                  lastName: response.lastName,
                  avatarUri: response.avatarUri,
                });

                let tempArray = [];
                response.listConversation.forEach((item) => {
                  let listdata = {
                    accountId: item.accountId,
                    chatWithAccountId: item.chatWithAccountId,
                    timeUpdate: item.timeUpdate,
                    lastMessage: item.lastMessage,
                    lastSender: item.lastSender,
                    chatWithFirstName: item.chatWithFirstName,
                    chatWithLastName: item.chatWithLastName,
                    chatWithAvatarUri: item.chatWithAvatarUri,
                    chatWithAvatar: item.chatWithAvatar,
                  };
                  tempArray.push(listdata);
                });
                this.setState({listConversations: tempArray});
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
  componentWillUnmount() {}

  componentDidMount() {
    this.getListCoversation();
  }
  searchConversation() {

  }

  render() {
    const {
      accountId,
      firstName,
      lastName,
      avatarUri,
      listConversations,
    } = this.state;
    return (
      <SafeAreaView>
        <StatusBar hidden={false} backgroundColor={'#300808'} />
        <View style={[Style.newsfeed.Header]}>
          <Text style={{fontFamily: '20db', fontSize: 30, color: '#fef4ca'}}>
            SOFA
          </Text>
          <Ionicons
            style={{
              marginLeft: 'auto',
              marginRight: scale(5, Horizontal),
            }}
            name={'search-outline'}
            color={'#fef4ca'}
            size={30}
          />
          <Ionicons
            style={{
              marginRight: scale(5, Horizontal),
            }}
            name={'notifications'}
            color={'#fef4ca'}
            size={30}
          />
          <MaterialCommunityIcons
            style={{
              marginRight: scale(5, Horizontal),
            }}
            name={'message-text-outline'}
            color={'#fef4ca'}
            size={30}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}></View>
        <View style={Style.voucher.mainContainer}>
          <View style={Style.voucher.card}>
            <View
              style={{
                height: 1,
                backgroundColor: 'steelblue',
              }}
            />
            <SafeAreaView>
              <SearchBar
                placeholder="Tìm kiếm..."
                lightTheme
                round
                onFocus={() => this.searchConversation()}
                autoCorrect={false}
              />
              
              <FlatList
                data={listConversations}
                renderItem={({item, index}) => {
                  return (
                    <MyLisConversation
                      navigate={this.props.navigation.navigate}
                      accountId={item.accountId}
                      chatWithAccountId={item.chatWithAccountId}
                      timeUpdate={item.timeUpdate}
                      lastMessage={item.lastMessage}
                      lastSender={item.lastSender}
                      chatWithFirstName={item.chatWithFirstName}
                      chatWithLastName={item.chatWithLastName}
                      chatWithAvatarUri={item.chatWithAvatarUri}
                      chatWithAvatar={item.chatWithAvatar}
                    />
                  );
                }}
                keyExtractor={(item, index) => `${item.chatWithAccountId}`}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: 'steelblue',
                    }}
                  />
                )}
              />
            </SafeAreaView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
class MyLisConversation extends Component {
  ConversationDetail = () => {
    this.props.navigate('Conversation', {
      uid1: this.props.accountId,
      uid2: this.props.chatWithAccountId,
    });
  };
  render() {
    const swipeSetting = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {},
      onOpen: (secId, rowId, direction) => {},
      right: [
        {
          onPress: () => {
            alert('Swipe');
          },
          text: 'Delete',
          type: 'delete',
        },
      ],
      rowId: this.props.index,
      SelectionId: 1,
    };
    return (
      <Swipeout {...swipeSetting}>
        <TouchableOpacity onPress={this.ConversationDetail}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View>
              <Image
                source={
                  this.props.chatWithAvatarUri &&
                  this.props.chatWithAvatarUri > 0
                    ? {uri: avatarUri}
                    : AVATAR
                }
                resizeMode={'cover'}
                style={{
                  height: Utils.scale(50, Const.Horizontal),
                  width: Utils.scale(50, Const.Horizontal),
                  borderRadius: Utils.scale(20, Const.Horizontal),
                  borderWidth: 1,
                  overflow: 'hidden',
                }}
              />
            </View>
            <View
              style={{
                marginLeft: Utils.scale(10, Const.Horizontal),
              }}>
              <Text
                style={{
                  fontSize: Utils.scale(19, Const.Horizontal),
                  fontWeight: 'bold',
                }}>
                {this.props.chatWithFirstName} {this.props.chatWithLastName}
              </Text>
              <Text
                style={{
                  fontSize: Utils.scale(20, Const.Horizontal),
                }}>
                {this.props.lastMessage}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}
