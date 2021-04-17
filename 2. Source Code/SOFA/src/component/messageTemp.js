import React, { Component } from 'react';
import {
    TouchableOpacity,
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Button,
    Image,
    FlatList,
    Alert,
    StyleSheet,
} from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import { AVATAR } from '../../image/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeout from 'react-native-swipeout';
import { SearchBar } from 'react-native-elements';


export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listConversations: [],
            activeRowkey: null,
            isLoading: false,
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
        this.setState({ isLoading: true });
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
                                this.setState({ listConversations: tempArray });
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
        this.setState({ isLoading: false });
    }
    componentWillUnmount() { }

    componentDidMount() {
        this.getListCoversation();
    }
    searchConversation() {
        this.props.navigation.navigate('MessageSearch');
    }

    render() {
        const {
            listConversations,
            isLoading
        } = this.state;
        const count = 1;
        return (
            <SafeAreaView>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <View style={[Style.newsfeed.Header]}>
                    <View>
                        <Text style={[Style.newsfeed.SofaTitle, { color: 'white', position: 'absolute', top: -2, left: -2 }]}>Chat</Text>
                        <Text style={Style.newsfeed.SofaTitle}>Chat</Text>

                    </View>
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
                                renderItem={({ item, index }) => {
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
class MyLisConversation extends Message {
    ConversationDetail = () => {
        this.props.navigate('Conversation', {
            uid1: this.props.accountId,
            uid2: this.props.chatWithAccountId,
        });
    };
    formatTime(dataDate) {
        let time = new Date(dataDate);
        let date = time.getDate() + '/' + parseInt(time.getMonth() + 1);
        return date;
    }
    render() {
        const swipeSetting = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowkey != null) {
                    this.setState({ activeRowkey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowkey: this.props.chatWithAccountId });
            },
            right: [
                {
                    onPress: () => {
                        Alert.alert(
                            'Alert',
                            'Bạn có chắc chắn muốn xóa cuộc hội thoại này?',
                            [
                                {
                                    text: 'No',
                                    onPress: () => console.log('Cancel Delete Conversation'),
                                },
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        this.getData('token')
                                            .then((result) => {
                                                if (result) {
                                                    var header = {
                                                        'User-Agent':
                                                            'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                                                        Accept: 'application/json',
                                                        Authorization:
                                                            'Bearer ' +
                                                            result.toString().substr(1, result.length - 2),
                                                    };
                                                    let url =
                                                        Const.domain +
                                                        'api/Conversation/deleteConversation';
                                                    let data = new FormData();
                                                    data.append(
                                                        'AccountId',
                                                        this.props.chatWithAccountId,
                                                    );
                                                    Request.Post(url, header, data)
                                                        .then((response) => {
                                                            if (
                                                                response &&
                                                                response.code &&
                                                                response.code == Const.REQUEST_CODE_SUCCESSFULLY
                                                            ) {
                                                                this.getListCoversation();
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
                                    },
                                },
                            ],
                        );
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
                <TouchableOpacity onPress={this.ConversationDetail} style={styles.container} >
                    <Image
                        source={(this.props.chatWithAvatarUri && this.props.chatWithAvatarUri.length > 0)
                            ? { uri: Const.assets_domain + this.props.chatWithAvatarUri }
                            : AVATAR
                        }
                        style={styles.image}
                    />
                    <View style={{ marginLeft: 10 }}>

                        <Text style={styles.username} >
                            {this.props.chatWithFirstName} {this.props.chatWithLastName}
                        </Text>

                        <Text style={styles.text}>
                            {this.props.lastMessage}
                        </Text>
                    </View>

                    <Text style={styles.duration}>{this.formatTime(this.props.timeUpdate)}</Text>
                </TouchableOpacity>
            </Swipeout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 30,
    },
    gradientStyle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },
    count: {
        color: '#fff',
        fontFamily: 'Montserrat_700Bold',
    },
    image: {
        width: scale(60, Horizontal),
        height: scale(60, Horizontal),
        borderRadius: 50,
        resizeMode: 'cover'
    },
    text: {
        color: '#b6b6b6',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 11
    },
    duration: {
        color: '#000119',
        fontSize: 12,
        flex: 1,
        marginLeft: 280,
        position: 'absolute',
        fontFamily: 'Montserrat_600SemiBold'
    },
    username: {
        color: '#000119',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18
    }
})
