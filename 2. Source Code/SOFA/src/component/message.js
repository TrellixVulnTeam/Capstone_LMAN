import React, { Component, createRef } from 'react';
import { Animated, View, Text, StatusBar, Image, TouchableHighlight, FlatList, ActivityIndicator, Modal, TouchableOpacity, ToastAndroid, ImageBackground, StyleSheet, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Badge, Icon, withBadge } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';

import * as signalR from '@microsoft/signalr';
import * as Style from '../style/style';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import { scale, getData, calculateTime } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';
import ViewImageModal from './viewImageModel';

import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';
import * as MessageService from '../service/messageService';
import * as OnlineService from '../service/onlineService';

import Session from '../common/session';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            color: '#46AA4A',
            isRefreshing: false,
            listConversations: [],
            listOnline: [],
            account: {}
        }
    }


    getListCoversation() {
        this.setState({ isLoading: true });
        MessageService.getListCoversation()
            .then(response => {
                this.setState({ isLoading: false });
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
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
                            isReaded: item.isReaded
                        };
                        tempArray.push(listdata);
                    });
                    this.setState({ listConversations: tempArray });
                    this.getListActiveAccount();
                } else {
                    ToastAndroid.show("Tải danh sách thất bại! Hãy thử lại!", ToastAndroid.LONG);
                }
            })
            .catch(reason => {
                this.setState({ isLoading: false });
                console.log(reason);
                if ((reason.code == Const.REQUEST_CODE_NOT_LOGIN)) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                    this.props.navigation.goBack();
                } else {
                    ToastAndroid.show("Tải danh sách thất bại! Hãy thử lại!", ToastAndroid.LONG);
                }
            })
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

    updateWhenNewMessage(item) {
        console.log('update', item)
        const listTemp = this.state.listConversations;
        for (let i = 0; i < listTemp.length; i++) {
            if (listTemp[i].chatWithAccountId == item.fromAccountId) {
                listTemp[i].lastMessage = item.content;
                listTemp[i].isReaded = false;
                listTemp[i].timeUpdate = calculateTime(item.time);
            }
        }
        this.setState({ listConversation: listTemp });
    }

    messageConnectionHub() {
        let token = Session.getInstance().token;
        let account = Session.getInstance().account;
        if (token) {
            if (typeof this.messageConnection === 'undefined') {
                this.messageConnection = new signalR.HubConnectionBuilder()
                    .withUrl(Const.domain + 'message', {
                        accessTokenFactory: () => token,
                        skipNegotiation: true,
                        transport: signalR.HttpTransportType.WebSockets,
                    })
                    .withAutomaticReconnect()
                    .build();
                this.messageConnection
                    .start()
                    .then(() => {
                        console.log('MessageWSS', 'Connected from Message');
                    })
                    .catch(function (err) {
                        return console.error(err.toString());
                    });
                this.messageConnection.on('NewMessage', (data) => {
                    if (data) {
                        this.updateWhenNewMessage(data);
                    }
                });
                this.messageConnection.on("ChangeStatus", (data) => {
                    console.log('Message', data);
                    if (data) {
                        this.setState({ listOnline: data });
                    }
                })
            }
        }
    }

    deleteConversation(index) {
        Alert.alert('Cảnh báo', 'Nếu xóa bạn sẽ không thể khôi phục nội dung cuộc trò chuyện này!',
            [
                {
                    text: 'Xóa',
                    onPress: () => MessageService.deleteConversation(this.state.listConversations[index].chatWithAccountId)
                        .then(response => {
                            if (response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                let temp = this.state.listConversations;
                                temp.splice(index, 1);
                                this.setState({ listConversation: temp });
                            } else {
                                ToastAndroid.show('Xóa cuộc trò chuyện không thành công!', ToastAndroid.LONG);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            ToastAndroid.show('Xóa cuộc trò chuyện không thành công!', ToastAndroid.LONG);
                        })
                },
                {
                    text: 'Hủy',
                    onPress: () => console.log('Không xóa')
                }
            ])
    }

    componentDidMount() {
        this.messageConnectionHub();

        this._screenFocus = this.props.navigation.addListener('focus', () => {
            if (!Session.getInstance().token || Session.getInstance().token.length == 0) {
                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                this.props.navigation.goBack();
            } else {
                this.setState({ account: Session.getInstance().account });
            }
            if (Session.getInstance().settings && Session.getInstance().settings.chatColor) {
                this.setState({ color: Session.getInstance().settings.chatColor });
            }
            this.getListCoversation();
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
        });
    }

    componentWillUnmount() {
        if (this.messageConnection) {
            this.messageConnection.stop();
        }
    }
    render() {
        const { account, isLoading, isRefreshing, color, listConversations, activeRowkey, listOnline } = this.state;
        return (
            <View style={[styles.container]}>
                <StatusBar hidden={false} backgroundColor={color} />
                <View style={[styles.header, { backgroundColor: color }]}>
                    <View style={[styles.headerTitleBounder]}>
                        <Text style={styles.headerTitle}>Chats</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('MessageSearch')}
                            style={[styles.headerSearchIcon]}
                        >
                            <Ionicons name={'search-sharp'} color={'white'} size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.listConversationArea]}>
                    <FlatList
                        data={listConversations}
                        keyExtractor={(item, index) => item.chatWithAccountId + ''}
                        renderItem={({ item, index }) =>
                            <ConversationItem
                                data={item}
                                navigation={this.props.navigation}
                                deleteConversation={() => this.deleteConversation(index)}
                                listOnline={listOnline}
                                account={account}
                            />}
                        onRefresh={() => this.getListCoversation()}
                        refreshing={isRefreshing}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('MessageSearch')}
                    style={[styles.newConversationBounder, { backgroundColor: color }]}>
                    <MaterialIcons name='person-add-alt-1' color='white' size={30} />
                </TouchableOpacity>
            </View >
        )
    }
}
const ConversationItem = ({ data, navigation, deleteConversation, listOnline }) => {
    const rightActions = (progress, dragX) => {
        return (
            <TouchableOpacity
                onPress={() => deleteConversation()}
                style={[styles.rightAction]}>
                <Text style={[styles.actionText]}>
                    Xóa
                </Text>
            </TouchableOpacity>
        );
    }
    return (
        <Swipeable renderRightActions={rightActions} rightThreshold={0.1}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Conversation', {
                    uid1: data.accountId,
                    uid2: data.chatWithAccountId,
                })}
                style={[styles.conversationItemBounder, (!data.isReaded) && (data.lastSender != data.accountId) ? { backgroundColor: '#D1D1D1' } : {}]}>
                <View>
                    <Image
                        source={{ uri: Const.assets_domain + data.chatWithAvatarUri }}
                        style={[styles.conversationItemAvatar]}
                    />
                    {listOnline.indexOf(data.chatWithAccountId) != -1 ? (
                        <Badge
                            status="success"
                            containerStyle={[styles.activeStatus]}
                            badgeStyle={{ width: scale(10, Horizontal), height: scale(10, Horizontal) }}
                        />
                    ) : (
                        <View></View>
                    )}
                </View>
                <View style={[styles.conversationItemContent]}>
                    <Text style={[styles.conversationItemContentUserName, (!data.isReaded) && (data.lastSender != data.accountId) ? { color: 'white' } : { color: 'black' }]}>{data.chatWithFirstName + ' ' + data.chatWithLastName}</Text>
                    <Text style={[styles.conversationItemContentLastMess, (!data.isReaded) && (data.lastSender != data.accountId) ? { color: 'white' } : { color: 'gray' }]}>{Utils.getContentDemo(data.lastMessage, 20).content + (Utils.getContentDemo(data.lastMessage, 20).canShowMore ? '...' : '')}</Text>
                </View>
                <Text style={[styles.conversationItemUpdateTime]}>{calculateTime(data.timeUpdate) + ' trước'}</Text>
            </TouchableOpacity>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
    },
    headerTitleBounder: {
        flexDirection: 'row',
        paddingVertical: scale(20, Vertical),
        paddingHorizontal: scale(20, Vertical)
    },
    headerTitle: {
        fontFamily: 'Segeo UI',
        fontSize: 35,
        color: 'white',
    },
    headerSearchIcon: {
        alignSelf: 'center',
        marginLeft: 'auto'
    },
    headerButtonBounder: {
        flexDirection: 'row',
    },
    listConversationArea: {
        flex: 1
    },
    conversationItemBounder: {
        paddingHorizontal: scale(10, Horizontal),
        paddingVertical: scale(10, Vertical),
        flexDirection: 'row'
    },
    conversationItemAvatar: {
        height: scale(60, Horizontal),
        width: scale(60, Horizontal),
        resizeMode: 'cover',
        borderRadius: 50,
        backgroundColor: 'gray'
    },
    conversationItemContent: {
        marginLeft: scale(10, Horizontal)
    },
    conversationItemContentUserName: {
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 17
    },
    conversationItemContentLastMess: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    conversationItemUpdateTime: {
        alignSelf: 'center',
        marginRight: scale(10, Horizontal),
        marginLeft: 'auto',
        fontSize: 14,
        color: 'gray'
    },
    rightAction: {
        backgroundColor: 'red',
        width: scale(100, Horizontal),
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionText: {
        color: 'white'
    },
    newConversationBounder: {
        width: scale(60, Horizontal),
        height: scale(60, Horizontal),
        borderRadius: 50,
        position: 'absolute',
        bottom: scale(20, Vertical),
        right: scale(20, Horizontal),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10
    },
    activeStatus: {
        position: 'absolute',
        top: scale(5, Vertical),
        right: scale(5, Horizontal),
    },
})