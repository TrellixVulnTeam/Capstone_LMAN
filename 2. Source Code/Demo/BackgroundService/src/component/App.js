/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, createRef } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, Dimensions, TextInput, Keyboard, Button, Image, MaskedViewBase } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import * as signalR from '@microsoft/signalr';
import ReactNativeForegroundService from '@supersami/rn-foreground-service'
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from 'react-native-dropdown-picker';
import PushNotification from "react-native-push-notification";
import SoundPlayer from 'react-native-sound-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmojiSelector, { Categories } from "react-native-emoji-selector";


// import * as MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import * as Request from '../common/request';
import * as Const from '../common/const';
import { scale } from '../common/utils';
import * as Style from '../style/style';
import { AVATAR } from '../../image/index';
import { interpolate } from 'react-native-reanimated';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: {},
      avatarUri: '',
      token: '',
      messages: [],
      messageText: '',
      chatHeigh: 600,
      isReady: false,
      receiverID: 0,
      friends: [],
      messageImage: '',
      onEmojiKeyboard: false
    }
  }

  flatList = createRef<FlatList<any>>();
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

  loadListFriend() {
    const { account, friends, token } = this.state;
    let uri = Const.domain + '/api/account/friend';
    let header = {
      "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
      "Accept": 'application/json',
      "Authorization": 'Bearer ' + token,
    };

    Request.Get(uri, header)
      .then(response => {
        if (response && response.code && response.code == 'SUCCESSFULLY') {
          let listFriend = [];
          for (let i = 0; i < response.friends.length; i++) {
            let avatarUri = response.friends[i].avatar;
            let friend = {
              label: response.friends[i].firstName + " " + response.friends[i].lastName,
              value: response.friends[i].id,
              icon: () => <Image source={avatarUri ? { uri: Const.domain.replace('/ChatAPI', '') + '/assets/Image/Avatar/' + response.friends[i].id + '_' + response.friends[i].avatar + '.png' } : AVATAR} style={{
                height: scale(40, Const.Vertical),
                width: scale(40, Const.Horizontal),
                borderRadius: scale(10, Const.Horizontal)
              }} />
            }
            listFriend.push(friend);
          }
          this.setState({ friends: listFriend });
        }
      })
      .catch(reason => {
        console.log(reason);
      })
  }


  getItemLayout = (data, index) => (
    { length: scale(40, Const.Vertical), offset: (scale(40, Const.Vertical) + 5) * index, index }
  )

  loadListMessage() {
    const { account, messages, token, receiverID } = this.state;

    this.setState({ messages: [] });
    let uri = Const.domain + '/api/message?id=' + receiverID;
    let header = {
      "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
      "Accept": 'application/json',
      "Authorization": 'Bearer ' + token,
    };
    Request.Get(uri, header)
      .then(response => {
        if (response && response.code && response.code == 'SUCCESSFULLY') {
          this.setState({ messages: response.messages });
          this.setState({ isReady: true });
          setTimeout(() =>
            this.flatList.current.scrollToEnd(), 0
          )
        }
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  checkLoginToken() {
    const { account } = this.state;
    console.log('Check login');
    this.getData('token')
      .then(result => {
        if (result) {
          var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
            "Authorization": 'Bearer ' + result.toString().substr(1, result.length - 2),
          };
          let url = Const.domain + '/api/account';
          Request.Get(url, header)
            .then(response => {
              if (response && response.code && response.code == 'SUCCESSFULLY') {
                this.setState({ account: response.account });
                if (response.account.avatar) {
                  this.setState({ avatarUri: 'data:image/png;base64,' + response.account.avatar });
                }
                this.setState({ token: result.toString().substr(1, result.length - 2) });
                this.loadListFriend();
                this.onlineChat();
              } else {
                this.props.navigation.navigate('Login')
              }
            })
            .catch(reason => {
              console.log(reason);
              this.props.navigation.navigate('Login')
            });
        } else {
          this.props.navigation.navigate('Login')
        }
      })
      .catch(reason => {
        console.log('failed');
        this.props.navigation.navigate('Login')
      })

  }

  chooseFile = (callback) => {
    const { account, token } = this.state;
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
      maxWidth: 512,
      maxHeight: 512
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        let source = response;
        this.setState({ messageImage: source.base64 });
        console.log(this.state.messageImage);
        callback(source);
      }
    });
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  takePicture = (callback) => {
    const { account, token } = this.state;
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true
    };
    this.requestCameraPermission()
      .then(response => {
        launchCamera(options, (response) => {
          console.log(response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            let source = response;
            this.setState({ avatarUri: source.uri });
            if (source.base64) {
              var header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Accept": 'application/json',
                "Authorization": 'Bearer ' + token,
              };
              console.log(header);
              let data = new FormData();
              data.append('Avatar', source.base64);
              data.append('username', account.userName);
              let url = Const.domain + 'api/account';
              Request.Post(url, header, data)
                .then(response => {
                  if (response && response.code && response.code == 'SUCCESSFULY') {
                    Alert.alert('Avatar', 'Đổi ảnh đại diện thành công!!!');
                  }
                })
                .catch(reason => {
                  console.log(reason);
                });
            }
            callback(source);

          }
        });
      });
  }

  onPressSend() {
    const { onEmojiKeyboard, messageImage, messageText, account, token, receiverID } = this.state;

    let uri = Const.domain + '/api/message';
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    };
    let message = {
      senderID: account.id,
      receiverID: receiverID,
      content: messageText,
      isSeen: false,
      image: messageImage
    }

    let body = JSON.stringify(message);
    Request.Post(uri, headers, body)
      .then(response => {
        console.log(response);
        if (response.code == 'SUCCESSFULLY') {
          let data = response.message;
          let temp = this.state.messages;
          let item = data;
          temp.push(item);
          this.setState({ messages: temp });
          console.log('Send', item);
          setTimeout(() => this.flatList.current.scrollToEnd(), 0);
        }
      })
      .catch(reason => console.log(reason));
    this.setState({ messageText: '', messageImage: '' });
  }

  onlineChat() {
    const { account, token, receiverID } = this.state;
    if (typeof this.connection === 'undefined') {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(Const.domain + '/message', {
          accessTokenFactory: () => this.state.token,
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .build();
      this.connection.start().then(() => {
        console.log('Connected!');
      }).catch(function (err) {
        return console.error(err.toString());
      });
      this.connection.on("NewMessage", data => {
        console.log('New message', data);
        console.log('Receiver: ', data.senderID + ' - ' + receiverID);
        if (data.senderID == this.state.receiverID) {
          let temp = this.state.messages;
          let item = data;
          temp.push(item);
          this.setState({ messages: temp });
          setTimeout(() => this.flatList.current.scrollToEnd(), 0);
          console.log('add message');
        }

      });
    }

  }

  componentDidMount() {
    const { account, token } = this.state;
    this.checkLoginToken();
    this._unsubcribe = this.props.navigation.addListener('focus', () => {
      this.setState({ account: {}, avatarUri: null, messages: [] });
      this.checkLoginToken();
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', (event) => {
        this.setState({ chatHeigh: 600 - event.endCoordinates.height });
        setTimeout(() => this.flatList.current.scrollToEnd(), 0);
      }
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => { if (!this.state.onEmojiKeyboard) this.setState({ chatHeigh: 600 }) },
    );

    //SoundPlayer.playSoundFile('rush', 'wav');
  }

  componentWillUnmount() {
    console.log('unmount');
    Keyboard.removeAllListeners('keyboardDidShow');
    Keyboard.removeAllListeners('keyboardDidHide');
    AsyncStorage.removeItem('receiverID');
  }

  onChangeFriendSelect = () => {
    const { receiverID, account } = this.state;
    console.log(receiverID);
    this.storeData('receiverID', receiverID);
    this.loadListMessage();
    if (this.connection) {
      this.connection.stop();
    }
  }

  render() {
    const { onEmojiKeyboard, receiverID, friends, isReady, messages, account, messageText, chatHeigh } = this.state;
    return (
      <LinearGradient colors={['#F6FF7B', '#FFF01A', '#8EFF4E']}>
        <View style={Style.common.flexRow}>
          <DropDownPicker
            items={friends}
            containerStyle={{ height: scale(45, Const.Vertical), width: scale(340, Const.Horizontal), justifyContent: 'center', alignItems: 'center' }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={(item) => this.setState({ receiverID: item.value })}
          />
          <Button onPress={() => this.onChangeFriendSelect()} title={'start'} />
        </View>
        <View style={{ height: scale(666, Const.Vertical) }}>
          <View style={{ height: scale(chatHeigh, Const.Vertical) }}>
            <FlatList
              ref={this.flatList}
              data={messages}
              getItemLayout={this.getItemLayout}
              keyExtractor={(item, index) => index + ''}
              //initialScrollIndex={messages.length - 1}
              onScroll={e => {
                this.scrollOffset = e.nativeEvent.contentOffset.y;
              }}
              onLayout={e => {
                this.flatlistTopOffset = e.nativeEvent.layout.y;
              }}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 2) * ITEM_SIZE,
                  (index - 1) * ITEM_SIZE
                ]

                const translateX = scrollX.interpolate({
                  inputRange,
                  outputRange: [-width, 0]
                })
                return (



                  
                  <View>
                    {item.content && item.content.length > 0 ? (
                      <View style={[Style.common.flexRow, {
                        paddingLeft: 20,
                        paddingRight: 20,
                        alignItems: 'center',
                        alignContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: 40,
                        height: scale(40, Const.Vertical),
                        marginLeft: (item.senderID != account.id ? 10 : 'auto'),
                        marginRight: (item.senderID != account.id ? 'auto' : 10),
                        marginTop: 5,
                      }]}>
                        <Text style={{ alignItems: 'center' }}>{item.content}</Text>
                      </View>
                    ) : (
                        <View></View>
                      )}

                    {item.image && item.image.length > 0 ? (
                      <View style={[Style.common.flexRow, {
                        width: scale(200, Const.Horizontal),
                        height: scale(200, Const.Vertical),
                        marginLeft: (item.senderID != account.id ? 10 : 'auto'),
                        marginRight: (item.senderID != account.id ? 'auto' : 10),
                      }]}>

                        <Image style={{
                          borderRadius: 20,
                          flex: 1,
                          width: null,
                          height: null,
                          resizeMode: 'contain'
                        }}
                          source={{ uri: Const.domain.replace('/ChatAPI', '') + item.image }}
                        />

                      </View>
                    ) : (<View></View>)}
                  </View>

                )
              }}

            />
          </View>
          <View
            pointerEvents={isReady ? "auto" : "none"}
            style={[Style.common.flexRow, { marginBottom: scale(5, Const.Vertical), marginTop: scale(20, Const.Horizontal), justifyContent: 'center', alignItems: 'center' }]}>
            <TextInput
              value={messageText}
              onChangeText={text => this.setState({ messageText: text })}
              style={
                {
                  backgroundColor: 'white',
                  height: scale(40, Const.Vertical),
                  width: scale(240, Const.Horizontal),
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingLeft: scale(10, Const.Horizontal),
                }} />
            <Icon
              name="image"
              size={35}
              color="#fff"
              style={{ marginLeft: scale(10, Const.Horizontal) }}
              onPress={() => this.chooseFile((source) => console.log('select image'))} />
            <Icon
              name='emoji-emotions'
              size={35}
              color="#fff"
              onPress={() => {
                this.setState({ chatHeigh: !onEmojiKeyboard ? 350 : 600, onEmojiKeyboard: !this.state.onEmojiKeyboard })
              }}
              style={{ marginLeft: scale(10, Const.Horizontal) }} />
            <Icon
              name='send'
              size={35}
              color="#fff"
              onPress={() => this.onPressSend()}
              style={{ marginLeft: scale(10, Const.Horizontal), marginRight: scale(10, Const.Horizontal) }} />
          </View>

          {onEmojiKeyboard ? (
            <View style={{ height: scale(250, Const.Vertical) }}>
              <EmojiSelector
                showSearchBar={false}
                columns={12}

                category={Categories.emotion}
                onEmojiSelected={emoji => this.setState({ messageText: this.state.messageText + emoji })}
              />
            </View>) : (<View></View>)}
        </View>


      </LinearGradient>
    )
  }
}
