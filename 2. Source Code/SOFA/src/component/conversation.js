import React, { Component, createRef, useRef } from 'react';
import { Modal, View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard, StyleSheet, ToastAndroid } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import { Badge, Icon, withBadge } from 'react-native-elements';

import * as signalR from '@microsoft/signalr';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import { scale, getMessageTime, diffTime } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';

import * as AuthService from '../service/authService';
import * as ProfileService from '../service/profileService';
import * as MessageService from '../service/messageService';
import * as OnlineService from '../service/onlineService';

import Session from '../common/session';

export default class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            color: '#46AA4A',
            keyboardHeight: 0,
            page: 1,
            canLoadMore: false,
            refreshingList: false,
            content: '',
            imageBase64: '',
            account: {},
            friendAccount: {},
            listMessage: [],
            inputHeight: 40,
            isShowModalImage: false,
            currentShowImage: '',
            token: '',
            isShowMessageMenu: false,
            selectedMessage: {},
            listOnline: []
        }
    }
    concatList(list1, list2) {
        let listRes = list1;
        let pos = 0;
        for (let i = 0; i < list2.length; i++) {
            let flag = true;
            for (let j = list1.length - 1; j >= 0; j--) {
                if (list1[j].id == list2[i].id) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                pos = i;
                break;
            }
        }
        for (let i = pos; i < list2.length; i++) {
            listRes.push(list2[i])
        }
        return listRes;
    }

    getListMessage(page) {
        const { account, friendAccount } = this.state;
        if (page > 1) {
            this.setState({ canLoadMore: false });
        }
        MessageService.getMessageByUID(friendAccount.accountID, page)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listMessageTemp = response.listMess;
                    for (let i = 0; i < listMessageTemp.length; i++) {
                        listMessageTemp[i].isMyMessage = listMessageTemp[i].fromAccountId == account.accountID;
                        listMessageTemp[i].isShowDetail = false;
                    }
                    if (page == 1) {
                        this.setState({ listMessage: listMessageTemp });
                        if (listMessageTemp.length > 0) {
                            this.setState({ page: page, canLoadMore: true });
                        }
                        this.setState({ refreshingList: false });
                        this.getListMessage(2);
                    } else {
                        console.log('load more', page);
                        let listTemp = this.state.listMessage;
                        listTemp = this.concatList(listTemp, listMessageTemp);
                        this.setState({ listMessage: listTemp });
                        if (listMessageTemp.length > 0) {
                            this.setState({ page: page });
                        }
                        this.setState({ canLoadMore: true });

                    }
                } else {
                    ToastAndroid.show('Tải tin nhắn bị lỗi!', ToastAndroid.SHORT);
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                    this.props.navigation.goBack();
                } else {
                    ToastAndroid.show('Tải tin nhắn bị lỗi!', ToastAndroid.SHORT);
                    this.setState({ isLoading: false, isSelectImage: true })
                }
            })
    }

    selectImage = () => {
        ImagePicker.openPicker({
            compressImageMaxHeight: 1200,
            compressImageMaxWidth: 900,
            includeBase64: true,
            cropping: true
        })
            .then(result => {
                let imageContent = result.data;
                this.setState({ imageBase64: imageContent });
                this.sendMessage();
            })
            .catch(reason => {
                console.log(reason);
            })
    }
    takePicture = () => {
        ImagePicker.openCamera({
            compressImageMaxHeight: 1200,
            compressImageMaxWidth: 900,
            includeBase64: true,
            cropping: true
        })
            .then(result => {
                let imageContent = result.data;
                this.setState({ imageBase64: imageContent });
                this.sendMessage();
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    deleteMessage(message) {
        var { friendAccount, listMessage } = this.state;
        let isSenderDelete = false;
        if (friendAccount.accountID != message.fromAccountId) {
            isSenderDelete = true;
        }
        MessageService.deleteMessage(message.id, isSenderDelete)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    var array = [...listMessage];
                    var index = array.indexOf(message)
                    if (index !== -1) {
                        array.splice(index, 1);
                        this.setState({ listMessage: array });
                    }
                }
            })
            .catch(reason => {
                console.log(reason);
                ToastAndroid.show('Xóa tin nhắn không thành công!', ToastAndroid.LONG);
            })
    }

    sendMessage() {
        const { friendAccount, listMessage, content, imageBase64 } = this.state;
        let contentTemp = content;
        let imageBase64Temp = imageBase64;
        this.setState({ content: '', imageBase64: '' });
        if (contentTemp.length > 0 || imageBase64Temp.length > 0) {
            MessageService.sendMessage(friendAccount.accountID, contentTemp, imageBase64Temp, (listMessage[0] && listMessage[0].conversationId) ? listMessage[0].conversationId : 0)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        let messageRes = response;
                        messageRes.isMyMessage = true;
                        this.setState({ listMessage: [response, ...listMessage] });
                    } else {
                        ToastAndroid.show('Gửi tin nhắn bị lỗi!', ToastAndroid.SHORT);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                    if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                        ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                    } else {
                        ToastAndroid.show('Gửi tin nhắn bị lỗi!', ToastAndroid.SHORT);
                        this.setState({ isLoading: false, isSelectImage: true })
                    }
                })

        }

    }

    onlineChat() {
        const { token, friendAccount } = this.state;
        if (typeof this.connection === 'undefined') {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(Const.domain + 'message', {
                    accessTokenFactory: () => token,
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                })
                .withAutomaticReconnect()
                .build();
            this.connection
                .start()
                .then(() => {
                })
                .catch(function (err) {
                    return console.error(err.toString());
                });
            this.connection.on('NewMessage', (data) => {
                if (data.fromAccountId == friendAccount.accountID) {
                    this.setState({ listMessage: [data, ...this.state.listMessage] })
                    MessageService.markMessageIsReaded(data.id)
                        .then(response => {
                        })
                        .catch(reason => console.log(reason));
                }
            });
        }
        if (typeof this.onlineConnection === 'undefined') {
            this.onlineConnection = new signalR.HubConnectionBuilder()
                .withUrl(Const.domain + 'online', {
                    accessTokenFactory: () => token,
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets,
                })
                .withAutomaticReconnect()
                .build();
            this.onlineConnection
                .start()
                .then(() => {
                    this.onlineConnection.invoke('RemoveConnection');
                })
                .catch(function (err) {
                    return console.error(err.toString());
                });
            this.onlineConnection.on("ChangeStatus", (data) => {
                console.log('Online status', data);
                if (data) {
                    this.setState({ listOnline: data });
                }
            })
        }
    }

    getListActiveAccount() {
        let token = Session.getInstance().token;
        if (token) {
            OnlineService.getListInfo()
                .then(response => {
                    this.setState({ listOnline: response.listActiveAccount });
                })
                .catch(reason => {
                    console.log(reason);
                })
        }
    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            console.log('Message', Session.getInstance().settings.chatColor)
            const { uid2 } = this.props.route.params;
            Session.getInstance().currentUserChat = uid2;
            this.setState({ account: Session.getInstance().account, token: Session.getInstance().token });
            console.log(Session.getInstance().account);
            if (!Session.getInstance().token || Session.getInstance().token.length == 0) {
                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                this.props.navigation.goBack();
            }
            if (Session.getInstance().settings && Session.getInstance().settings.chatColor) {
                this.setState({ color: Session.getInstance().settings.chatColor });
            }
            this.getListActiveAccount();
            MessageService.markConversationIsReaded(uid2)
                .then(response => {
                })
                .catch(reason => console.log(reason));
            ProfileService.getOtherProfile(uid2)
                .then(response => {
                    this.setState({ friendAccount: response });
                    this.onlineChat();
                    this.getListMessage(1);
                })
                .catch(reason => {
                    console.log(reason);
                    ToastAndroid.show('Không thể tìm thấy thông tin bạn bè! Hãy thử lại!', ToastAndroid.LONG);
                    this.props.navigation.goBack();
                })
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
            Session.getInstance().currentUserChat = 0;
            if (this.connection) {
                this.connection.stop();
                this.connection = undefined;
            }
            if (this.onlineConnection) {
                this.onlineConnection.stop();
                this.onlineConnection = undefined;
            }
        });

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            this.setState({ keyboardHeight: event.endCoordinates.height });
            // setTimeout(() => this.flatList.current.scrollToEnd(), 0);
        });
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            this.setState({ keyboardHeight: 0 })
        });
    }

    componentWillUnmount() {
        Keyboard.removeAllListeners('keyboardDidShow');
        Keyboard.removeAllListeners('keyboardDidHide');
    }
    onPressMessageItem(index) {
        const { listMessage } = this.state;
        let listTemp = listMessage;
        listTemp[index].isShowDetail = listTemp[index].isShowDetail ? false : true;
        this.setState({ listMessage: listTemp });
    }

    render() {
        const { listOnline, friendAccount, listMessage, keyboardHeight, page, canLoadMore, refreshingList, inputHeight, content, isShowModalImage, currentShowImage, isShowMessageMenu, selectedMessage } = this.state;
        return (
            <View style={[styles.container]}>
                <StatusBar backgroundColor={this.state.color} />
                <View style={[styles.header, { backgroundColor: this.state.color }]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('OtherProfile', { accountID: friendAccount.accountID })}
                        style={[styles.headerChatFriend]}>
                        <View>
                            <Image
                                source={friendAccount.avatarUri && friendAccount.avatarUri.length > 0 ? { uri: Const.assets_domain + friendAccount.avatarUri } : AVATAR}
                                style={[styles.headerChatFriendAvatar]}
                            />
                            {listOnline.indexOf(friendAccount.accountID) != -1 ? (
                                <Badge
                                    status="success"
                                    containerStyle={[styles.activeStatus]}
                                    badgeStyle={{ width: scale(10, Horizontal), height: scale(10, Horizontal) }}
                                />
                            ) : (
                                <View></View>
                            )}
                        </View>
                        <View style={[styles.headerChatFriendInfo]}>
                            <Text style={[styles.headerChatFriendInfoName]}>{friendAccount.lastName + ' ' + friendAccount.firstName}</Text>
                            <Text style={[styles.headerChatFriendInfoActiveTime]}>{listOnline.indexOf(friendAccount.accountID) >= 0 ? 'Online' : 'Offline'}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.headerActionBounder]}>
                        <Ionicons style={[styles.headerActionPhoneIcon]} name='call' size={25} color='white' />
                        <Ionicons style={[styles.headerActionVideoIcon]} name='videocam' size={25} color='white' />
                    </View>
                </View>
                <View style={[{ flex: 1, paddingBottom: scale(10, Vertical) }]}>
                    <FlatList
                        inverted={true}
                        data={listMessage}
                        keyExtractor={(item, index) => item.id + ''}
                        renderItem={({ item, index }) =>
                            <Message
                                friendAccount={friendAccount}
                                data={item}
                                bounderColor={this.state.color}
                                index={index}
                                onPressMessageItem={(index) => this.onPressMessageItem(index)}
                                nextIndex={index < listMessage.length - 1 ? listMessage[index + 1] : { fromAccountId: 0 }}
                                preIndex={index > 0 ? listMessage[index - 1] : { fromAccountId: 0 }}
                                onPressImage={(url) => this.setState({ currentShowImage: url, isShowModalImage: true })}
                                onLongPress={() => {
                                    this.setState({ isShowMessageMenu: true, selectedMessage: item });
                                }}
                            />}
                        onEndReachedThreshold={0.5}

                        onEndReached={() => {
                            if (canLoadMore) {
                                this.getListMessage(page + 1);
                            }
                        }}
                        onRefresh={() => {
                            this.setState({ refreshingList: true });
                            this.getListMessage(1);
                        }}
                        refreshing={refreshingList}
                    />
                </View>
                <View style={[styles.messageBoxBounder]}>
                    <TouchableOpacity
                        onPress={() => console.log('select emoji')}
                        style={[styles.messageBoxIconEmotion]}
                    >
                        <Entypo name='emoji-happy' color={this.state.color} size={25} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.messageBoxInput]}
                        placeholder={'Nhập tin nhắn'}
                        returnKeyType={'none'}
                        multiline={true}
                        onContentSizeChange={(event) => {
                            this.setState({ inputHeight: event.nativeEvent.contentSize.height });
                        }}
                        onChangeText={(text) => {
                            this.setState({ content: text })
                        }}
                        value={content}
                    />
                    {!(content.length > 0) ? (
                        <View style={[styles.messageBoxActionBounder]}>
                            <TouchableOpacity
                                onPress={() => this.selectImage()}
                                style={[styles.messageBoxIconImage]}
                            >
                                <Entypo name='images' color={this.state.color} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.takePicture()}
                                style={[styles.messageBoxIconCamera]}
                            >
                                <AntDesign name='camerao' color={this.state.color} size={25} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={() => this.sendMessage()}
                            style={[styles.messageBoxActionBounder]}>
                            <Ionicons style={[styles.messageBoxIconCamera]} name='send' color={this.state.color} size={25} />
                        </TouchableOpacity>
                    )}
                </View>
                <Modal
                    animationType='slide'
                    visible={isShowModalImage}
                    onRequestClose={() => this.setState({ isShowModalImage: false })}
                >
                    <View style={[styles.modalContainer]}>
                        <Image
                            source={{ uri: Const.assets_domain + currentShowImage }}
                            style={[styles.modalImage]}
                        />
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    onRequestClose={() => this.setState({ isShowMessageMenu: false })}
                    visible={isShowMessageMenu}
                >

                    <TouchableOpacity
                        onPressOut={() => this.setState({ isShowMessageMenu: false })}
                        style={{ flex: 1 }}
                    >
                        <View style={{
                            position: 'absolute',
                            bottom: scale(30, Vertical),
                            width: scale(400, Horizontal),
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ isShowMessageMenu: false });
                                    this.deleteMessage(selectedMessage);
                                }}
                                style={{
                                    backgroundColor: '#AAAAAA',
                                    width: scale(300, Horizontal),
                                    marginBottom: scale(30, Vertical),
                                    height: scale(35, Vertical),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10
                                }}>
                                <Text style={{ color: 'white' }}>Xóa tin nhắn</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}
const Message = ({ friendAccount, data, bounderColor, index, onPressMessageItem, nextIndex, preIndex, onPressImage, onLongPress }) => {
    let disTimeNext = diffTime(data.time, nextIndex.time);
    disTimeNext = disTimeNext ? disTimeNext : 100000000;
    let disTimePre = diffTime(data.time, preIndex.time);
    disTimePre = disTimePre ? disTimePre : 100000000;
    return (
        <View style={[styles.messageItemBounder,
        (nextIndex.fromAccountId != data.fromAccountId || disTimeNext > 60000) ? styles.separator : null
        ]}>
            {data.isShowDetail ? (
                <View style={[styles.messageMoreDetailBounder]}>
                    <Text style={[styles.messageMoreDetailTime]}>{getMessageTime(data.time)}</Text>
                </View>) : (<View></View>)}
            <View style={[data.isMyMessage ? styles.messageItemSend : styles.messageItemReceive]}>
                {!data.isMyMessage && (nextIndex.fromAccountId != data.fromAccountId || disTimeNext > 60000) ? (<View>
                    <Image
                        source={friendAccount.avatarUri && friendAccount.avatarUri.length > 0 ? { uri: Const.assets_domain + friendAccount.avatarUri } : AVATAR}
                        style={[styles.messageItemFriendAvatar]}
                    />
                </View>) : (<View></View>)}
                <View style={[styles.messageItemContentBounder]}>
                    {data.imageUrl ? (
                        <View
                            style={[data.isMyMessage || !(nextIndex.fromAccountId != data.fromAccountId || disTimeNext > 60000) ? styles.messageReceiveContentBounderWithoutAva : styles.messageReceiveContentBounderWithAva]}>
                            <TouchableWithoutFeedback
                                onLongPress={() => onLongPress()}
                                onPress={() => onPressImage(data.imageUrl)}
                            >
                                <Image
                                    source={{ uri: Const.assets_domain + data.imageUrl }}
                                    style={[styles.messageContentImage]}
                                />
                            </TouchableWithoutFeedback>
                        </View>) : (<View></View>)}
                    {data.content.length > 0 ? (
                        <TouchableWithoutFeedback
                            activeOpacity={0.9}
                            onPress={() => onPressMessageItem(index)}
                            onLongPress={() => onLongPress()}
                        >
                            <View style={[
                                data.isMyMessage ? styles.messageSendContentBounder : styles.messageReceiveContentBounder,
                                data.isMyMessage ? { backgroundColor: bounderColor } : { backgroundColor: 'rgba(220,220,220,1)' },
                                data.isMyMessage || !(nextIndex.fromAccountId != data.fromAccountId || disTimeNext > 60000) ? styles.messageReceiveContentBounderWithoutAva : styles.messageReceiveContentBounderWithAva,
                                data.isMyMessage && (!nextIndex.isMyMessage || disTimeNext > 60000) ? styles.messageSendContentBounderEnd : {},
                                data.isMyMessage && (!preIndex.isMyMessage || disTimePre > 60000) ? styles.messageSendContentBounderStart : {},
                                !data.isMyMessage && (nextIndex.isMyMessage || disTimeNext > 60000) ? styles.messageReceiveContentBounderEnd : {},
                                !data.isMyMessage && (preIndex.isMyMessage || disTimePre > 60000) ? styles.messageReceiveContentBounderStart : {},

                            ]}>
                                <Text style={[styles.messageContentText
                                    , data.isMyMessage ? { color: 'white' } : { color: 'black' }]}>{data.content}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : (<View></View>)}

                </View>
            </View>

            {data.isShowDetail ? (
                <View style={[styles.messageMoreDetailBounder]}>
                    <Text style={[styles.messageMoreDetailTime]}>{data.isRead ? 'Đã xem' : 'Chưa xem'}</Text>
                </View>) : (<View></View>)}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        paddingVertical: scale(7, Vertical),
        paddingHorizontal: scale(20, Horizontal),
        elevation: 10,
    },
    headerChatFriend: {
        flexDirection: 'row'
    },
    headerChatFriendAvatar: {
        height: scale(45, Horizontal),
        width: scale(45, Horizontal),
        resizeMode: 'cover',
        borderRadius: 50,
        backgroundColor: 'gray'
    },
    headerChatFriendInfo: {
        marginLeft: scale(10, Horizontal)
    },
    headerChatFriendInfoName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Segoe UI'
    },
    headerChatFriendInfoActiveTime: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Segoe UI'
    },
    headerActionBounder: {
        flexDirection: 'row',
        marginLeft: 'auto',
        alignItems: 'center'
    },
    headerActionVideoIcon: {
        marginRight: scale(10, Horizontal)
    },
    headerActionPhoneIcon: {
        marginRight: scale(20, Horizontal)
    },
    listMessageArea: {
        height: scale(600, Vertical)
    },
    messageItemBounder: {
        marginRight: 'auto',
        width: scale(400, Horizontal)
    },
    separator: {
        marginTop: scale(5, Vertical)
    },
    messageItemReceive: {
        flexDirection: 'row',
        marginTop: scale(2, Vertical),
        marginLeft: scale(10, Horizontal),
        marginRight: 'auto'
    },
    messageItemSend: {
        flexDirection: 'row',
        marginTop: scale(2, Vertical),
        marginRight: scale(10, Horizontal),
        marginLeft: 'auto'
    },
    messageItemContentBounder: {
    },
    messageSendContentBounder: {
        alignSelf: 'flex-end',
        maxWidth: scale(280, Horizontal),
        minHeight: scale(30, Vertical),
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        justifyContent: 'center',
        paddingHorizontal: scale(10, Horizontal),
        paddingVertical: scale(6, Vertical),
        marginLeft: scale(5, Horizontal)
    },
    messageSendContentBounderEnd: {
        borderTopRightRadius: 25,
    },
    messageSendContentBounderStart: {
        borderBottomRightRadius: 25,
    },

    messageReceiveContentBounder: {
        alignSelf: 'flex-start',
        maxWidth: scale(280, Horizontal),
        minHeight: scale(30, Vertical),
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        justifyContent: 'center',
        paddingHorizontal: scale(10, Horizontal),
        paddingVertical: scale(10, Vertical),
    },
    messageReceiveContentBounderStart: {
        borderBottomLeftRadius: 25
    },
    messageReceiveContentBounderEnd: {
        borderTopLeftRadius: 25
    },
    messageReceiveContentBounderWithAva: {
        marginLeft: scale(5, Horizontal)
    },
    messageReceiveContentBounderWithoutAva: {
        marginLeft: scale(35, Horizontal)
    },
    messageContentImage: {
        width: scale(200, Horizontal),
        height: scale(100, Vertical),
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: scale(2, Vertical),
        marginLeft: scale(5, Horizontal),
        borderWidth: 0.1,
        borderColor: 'gray',
    },
    messageContentText: {
        alignSelf: 'flex-start',
        fontFamily: 'Segoe UI',
        fontSize: 15,
    },
    messageItemFriendAvatar: {
        width: scale(30, Horizontal),
        height: scale(30, Horizontal),
        resizeMode: 'cover',
        borderRadius: 50
    },
    messageMoreDetailBounder: {
        alignItems: 'center'
    },
    messageMoreDetailTime: {
        fontFamily: 'Segeo UI',
        fontSize: 10
    },
    messageBoxBounder: {
        width: scale(400, Horizontal),
        paddingHorizontal: scale(20, Horizontal),
        paddingVertical: scale(5, Vertical)
    },
    messageBoxIconEmotion: {
        position: 'absolute',
        top: scale(15, Vertical),
        left: scale(10, Horizontal)
    },
    messageBoxInput: {
        marginLeft: scale(30, Horizontal),
        width: scale(340, Horizontal),
        maxHeight: scale(100, Vertical),
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 0.8,
        borderColor: 'gray',
        paddingRight: scale(45, Horizontal)
    },
    messageBoxActionBounder: { position: 'absolute', flexDirection: 'row', right: scale(20, Horizontal), top: scale(15, Vertical) },
    messageBoxIconImage: {
        marginRight: scale(10, Horizontal)
    },
    messageBoxIconCamera: {
        marginRight: scale(10, Horizontal)
    },
    modalContainer: {
        width: scale(400, Horizontal),
        height: scale(711, Vertical)
    },
    modalImage: {
        width: null,
        height: null,
        flex: 1,
        resizeMode: 'contain'
    },
    activeStatus: {
        position: 'absolute',
        top: scale(2, Vertical),
        right: scale(2, Horizontal),
    }

})

