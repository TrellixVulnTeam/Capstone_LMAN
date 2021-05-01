import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Alert, FlatList, Keyboard, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import { scale, calculateTime } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR } from '../../image/index';

import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';


export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            isLogin: false,
            isKeyBoardShow: false,
            keyboardHeight: 0,
            commentText: '',
            post: {},
            listComment: [],
            page: 1,
            isRefresing: false
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


    checkLoginToken = async () => {
        AuthService.getProfile()
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ account: response, isLogin: true });
                } else {
                    this.setState({ account: {}, isLogin: false, token: '' });
                }
            })
            .catch(reason => {
                this.setState({ account: {}, isLogin: false, token: '' });
                console.log(reason);
            });
    }

    componentDidMount() {
        // this.checkLoginToken();
        // this.setState({ post: { id: 85 } });
        // this.GetAllComment({ id: 85 }, 1);
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            const { post } = this.props.route.params;
            this.setState({ post: post });
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: false
            });
            this.checkLoginToken();
            this.GetAllComment(post, 1);
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
            this.setState({
                token: '',
                account: {},
                isLogin: false,
                isKeyBoardShow: false,
                keyboardHeight: 0,
                commentText: '',
                post: {},
                listComment: [],
                page: 1
            })
        })
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', (event) => {
                this.setState({ isKeyBoardShow: true });
                this.setState({ keyboardHeight: event.endCoordinates.height });
            }
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', () => {
                this.setState({ keyboardHeight: 0 });
                this.setState({ isKeyBoardShow: false });
            },
        );
    }

    componentWillUnmount() {
        Keyboard.removeAllListeners('keyboardDidShow');
        Keyboard.removeAllListeners('keyboardDidHide');
    }


    onPressCommentButton() {
        const { post, commentText } = this.state;
        PostService.commentPost(post.id, commentText)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let comment = response.listPost[0].listComment[0];
                    let listComment = this.state.listComment;
                    listComment.unshift(comment);
                    this.setState({ listComment: listComment, commentText: '' });
                } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                    ToastAndroid.show("Bình luận bài viết không thành công! Hãy thử lại!", ToastAndroid.LONG);
                    console.log(response.errorMessage);
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show("Bình luận bài viết không thành công! Hãy thử lại!", ToastAndroid.LONG);
                }
            })
    }

    GetAllComment(post, page) {
        PostService.getCommentOfPost(post.id, page)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    if (response.listPost.length > 0) {
                        let listComment = response.listPost[0].listComment;
                        if (page == 1) {
                            if (listComment.length > 0) {
                                this.setState({ listComment: listComment, isRefresing: false });
                                this.setState({ page: page });
                                console.log(this.state.page);
                            } else {
                                this.setState({ isRefresing: false });
                            }
                        } else {
                            if (listComment.length > 0) {
                                this.setState({ listComment: [...this.state.listComment, ...listComment], isRefresing: false })
                                this.setState({ page: page });
                                console.log(this.state.page);
                            } else {
                                this.setState({ isRefresing: false });
                            }
                        }
                    }
                } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                    console.log(response.errorMessage);
                }
            })
            .catch(reason => {
                console.log(reason);
                ToastAndroid.show("Lỗi khi tải thêm bình luận", ToastAndroid.LONG);
            })
    }

    navigateProfile(accountID) {
        const { account } = this.state;
        if (account && account.accountID && account.accountID == accountID) {
            this.props.navigation.navigate('Profile');
        } else {
            this.props.navigation.navigate('OtherProfile', { 'accountID': accountID });
        }
    }


    render() {
        const { listComment, commentText, page, keyboardHeight, account } = this.state;
        return (
            <View style={[styles.container]}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <View
                    style={{
                        flex: 1, paddingBottom: scale(70, Vertical)
                    }}
                >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={listComment}
                        keyExtractor={(item, index) => item.id + ''}
                        inverted={true}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.CommentItemBounder}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableWithoutFeedback
                                            onPress={() => this.navigateProfile(item.accountID)}
                                        >
                                            <Image
                                                style={styles.CommentAvatar}
                                                source={item.avatar && item.avatar.length > 0 ? { uri: Const.assets_domain + item.avatar } : { AVATAR }} />
                                        </TouchableWithoutFeedback>
                                        <View style={styles.CommentItem}>
                                            <Text
                                                style={styles.CommentAuthor}
                                                onPress={() => this.navigateProfile(item.accountID)}>{item.lastName + " " + item.firstName}
                                            </Text>
                                            <Text style={styles.CommentContent}>{item.content}</Text>

                                        </View>
                                    </View>
                                    <View style={styles.CommentAction}>
                                        <Text style={{ fontSize: 13 }}>{calculateTime(item.time)}</Text>
                                        <Text style={{ marginLeft: scale(30, Horizontal), fontSize: 13 }}>Thích</Text>
                                        <Text style={{ marginLeft: scale(30, Horizontal), fontSize: 13 }}>Trả lời</Text>

                                    </View>
                                </View>
                            )
                        }}
                        refreshing={this.state.isRefresing}
                        onEndReached={() => {
                            console.log('loadmore');
                            this.GetAllComment(this.state.post, page + 1);
                        }}
                        onEndReachedThreshold={0.5}
                        onRefresh={() => {
                            this.setState({ isRefresing: true });
                            this.GetAllComment(this.state.post, 1);
                        }}

                    />
                </View>
                <View style={[styles.commentBounder, {
                    bottom: scale(10, Vertical),
                }]}>
                    <Image
                        style={styles.CommentAvatar}
                        source={account.avatarUri && account.avatarUri.length > 0 ? { uri: Const.assets_domain + account.avatarUri } : { AVATAR }} />
                    <TextInput
                        value={commentText}
                        placeholder={'Bình luận'}
                        onChangeText={text => this.setState({ commentText: text })}
                        onSubmitEditing={() => this.onPressCommentButton()}
                        returnKeyLabel={'Gửi'}
                        returnKeyType={'send'}
                        placeholder={'Bình luận'}
                        style={styles.CommentTextBox} />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    CommentItemBounder: {
        marginLeft: scale(10, Horizontal),
        marginTop: scale(10, Vertical),
    },
    CommentItem: {
        width: scale(300, Horizontal),
        minHeight: scale(50, Vertical),
        borderRadius: 10,
        backgroundColor: 'rgba(222,222,222,0.3)'
    },
    CommentAvatar: {
        width: scale(50, Horizontal),
        height: scale(50, Horizontal),
        borderRadius: 50,
        resizeMode: 'cover',
        marginLeft: scale(10, Horizontal)
    },
    CommentAuthor: {
        fontWeight: 'bold',
        marginLeft: scale(10, Horizontal)
    },
    CommentContent: { marginLeft: scale(10, Horizontal) },
    commentBounder: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(50, Vertical),
        backgroundColor: 'white',
        width: scale(380, Horizontal),
        marginHorizontal: scale(10, Horizontal),
        borderRadius: 10,
        elevation: 10
    },
    CommentTextBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: scale(300, Horizontal),
        marginLeft: scale(10, Horizontal)
    },
    CommentAction: {
        marginTop: scale(5, Vertical),
        flexDirection: 'row',
        marginLeft: scale(50, Horizontal)
    }
})