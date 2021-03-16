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
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR } from '../../image/index';

export default class Newsfeed extends Component {
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
            listComment: []
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
        await this.getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    var uri = Const.domain + 'api/profile';
                    Request.Get(uri, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.setState({ account: response, isLogin: true, token: token });
                            } else {
                                this.setState({ account: {}, isLogin: false, token: '' });
                            }
                        })
                        .catch(reason => {
                            this.setState({ account: {}, isLogin: false, token: '' });
                        })
                }
            })
            .catch(reason => {
                this.setState({ token: '' });
                console.log(reason);
            })
    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            const { post } = this.props.route.params;
            this.setState({ post: post });
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: false
            });
            this.checkLoginToken();
            this.GetAllComment(post);
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
                listComment: []
            })
            console.log('unfocus');
        })
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', (event) => {
                if (this.state.inScreen) {
                    this.setState({ isKeyBoardShow: true });
                    this.setState({ keyboardHeight: event.endCoordinates.height });
                }
            }
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', () => {
                if (this.state.inScreen) {
                    this.setState({ keyboardHeight: 0 });
                    this.setState({ isKeyBoardShow: false });
                }
            },
        );
    }


    onPressCommentButton() {
        const { token, post, commentText } = this.state;
        if (token && token.length > 0) {
            if (post.id > 0 && commentText.length > 0) {
                var header = {
                    "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                    'Content-Type': 'multipart/form-data',
                    "Accept": 'application/json',
                    "Authorization": 'Bearer ' + token,
                };
                let data = new FormData();
                data.append('PostID', post.id);
                data.append('Comment', commentText);
                let uri = Const.domain + 'api/post/commentpost';
                Request.Post(uri, header, data)
                    .then(response => {
                        if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                            let comment = response.listPost[0].listComment[0];
                            this.setState({ listComment: [...this.state.listComment, comment] });
                        } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                            console.log(response.errorMessage);
                        }
                    })
                    .catch(reason => {
                        console.log(reason);
                    })
            }
        } else {
            Alert.alert('Thông báo', 'Hãy đăng nhập để bình luận về bài viết');
        }
        this.setState({ commentText: '' });
    }

    GetAllComment(post) {
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json'
        };
        let uri = Const.domain + 'api/post/GetCommentOfPost?postID=' + post.id + '&page=' + 1 + '&rowsOfPage=' + Const.COMMENT_ROWS_OF_PAGE;
        Request.Get(uri, header)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    console.log(response);
                    if (response.listPost.length > 0) {
                        let listComment = response.listPost[0].listComment;
                        this.setState({ listComment: listComment });
                    }
                } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                    console.log(response.errorMessage);
                }
            })
            .catch(reason => {
                console.log(reason);
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
        const { listComment, commentText } = this.state;
        return (
            <View style={Style.common.container}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <FlatList
                    data={listComment}
                    keyExtractor={(item, index) => item.id + ''}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.CommentItemBounder}>
                                <View style={styles.CommentItem}>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.navigateProfile(item.accountID)}
                                    >
                                        <Image
                                            style={styles.CommentAvatar}
                                            source={item.avatar && item.avatar.length > 0 ? { uri: Const.assets_domain + item.avatar } : { AVATAR }} />
                                    </TouchableWithoutFeedback>
                                    <Text
                                        style={styles.CommentAuthor}
                                        onPress={() => this.navigateProfile(item.accountID)}>{item.firstName + " " + item.lastName}
                                    </Text>
                                    <Text style={styles.CommentContent}>{item.content}</Text>

                                </View>
                            </View>
                        )
                    }}

                />
                <View style={{ height: scale(40, Vertical) }}>
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
    CommentItemBounder: {
        marginLeft: scale(10, Horizontal),
        marginBottom: scale(5, Vertical)
    },
    CommentItem: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    CommentAvatar: {
        width: scale(40, Horizontal),
        height: scale(40, Horizontal),
        borderRadius: 50
    },
    CommentAuthor: {
        fontWeight: 'bold',
        marginLeft: scale(10, Horizontal)
    },
    CommentContent: { marginLeft: scale(5, Horizontal) },
    CommentTextBox: {
        backgroundColor: 'white',
        borderRadius: 10
    },
})