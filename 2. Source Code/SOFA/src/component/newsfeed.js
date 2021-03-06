import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, Keyboard, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import PostViewModel from '../Model/postViewModel';
import { AVATAR } from '../../image/index';

export default class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            listPost: [],
            isKeyBoardShow: false,
            keyboardHeight: 0,
            commentText: '',
            currentPostComment: 0,
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
                    this.setState({ token: result.toString().substr(1, result.length - 2) });
                }
            })
            .catch(reason => {
                this.setState({ token: '' });
                console.log(reason);
            })
    }

    getAllPost = async () => {
        await this.getData('token')
            .then(result => {
                if (result) {
                    // console.log('Get all post', result);
                    this.setState({ token: result.toString().substr(1, result.length - 2) });
                }
            })
            .catch(reason => {
                this.setState({ token: '' });
                console.log(reason);
            })
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
            "Authorization": 'Bearer ' + this.state.token,
        };
        var data = {};
        var uri = Const.domain + 'api/post'
        Request.Get(uri, header, data)
            .then(response => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listPostRes = response.listPost;
                    for (let i = 0; i < listPostRes.length; i++) {
                        listPostRes.isShowComment = false;
                    }
                    this.setState({ listPost: listPostRes });
                }
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    componentDidMount() {
        this.checkLoginToken();
        this.getAllPost();
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', (event) => {
                this.props.navigation.dangerouslyGetParent().setOptions({
                    tabBarVisible: false
                });
                this.setState({ isKeyBoardShow: true });
                this.setState({ keyboardHeight: event.endCoordinates.height });
                this.commentTextInput.focus();
            }
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', () => {
                this.props.navigation.dangerouslyGetParent().setOptions({
                    tabBarVisible: true
                });
                this.setState({ keyboardHeight: 0 });
                this.setState({ isKeyBoardShow: false });
            },
        );
    }

    updatePostByID(postID, key, value) {
        let listPostTemp = this.state.listPost;
        for (let i = 0; i < listPostTemp.length; i++) {
            if (listPostTemp[i].id == postID) {
                listPostTemp[i][key] = value;
                break;
            }
        }
        this.setState({ listPost: listPostTemp });
    }

    getFieldPostByID(postID, key) {
        let listPostTemp = this.state.listPost;
        for (let i = 0; i < listPostTemp.length; i++) {
            if (listPostTemp[i].id == postID) {
                return listPostTemp[i][key];
            }
        }
        return null;
    }

    onPressCommentButton() {
        const { token, currentPostComment, commentText } = this.state;
        if (token && token.length > 0) {
            console.log(currentPostComment, commentText);
            if (currentPostComment > 0 && commentText.length > 0) {
                var header = {
                    "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                    'Content-Type': 'multipart/form-data',
                    "Accept": 'application/json',
                    "Authorization": 'Bearer ' + token,
                };
                let data = new FormData();
                data.append('PostID', currentPostComment);
                data.append('comment', commentText);
                let uri = Const.domain + 'api/post/commentpost';
                Request.Post(uri, header, data)
                    .then(response => {
                        if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                            let listComment = response.listPost[0].listComment;
                            this.updatePostByID(response.listPost[0].id, 'listComment', listComment);
                            this.updatePostByID(response.listPost[0].id, 'numberOfComment', listComment.length);
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
        this.commentTextInput.clear();
        this.commentTextInput.
            this.setState({ commentText: '' });
    }

    onPressCommentIcon(post) {
        if (!post.isShowComment) {
            var header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                "Accept": 'application/json'
            };
            let uri = Const.domain + 'api/post/GetCommentOfPost?postID=' + post.id;
            Request.Get(uri, header)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        if (response.listPost.length > 0) {
                            let listComment = response.listPost[0].listComment;
                            //console.log(listComment);
                            let postID = response.listPost[0].id;
                            this.updatePostByID(postID, 'listComment', listComment);
                        }
                    } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                        console.log(response.errorMessage);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                })
        }
        this.updatePostByID(post.id, 'isShowComment', !post.isShowComment)
        console.log(this.commentInputs.length);

    }

    /**
     * Process when user press icon heart
     * @param {Data of a post} post 
     */
    onPressLikePost(post) {
        const { token } = this.state;
        if (token && token.length > 0) {
            var header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                'Content-Type': 'multipart/form-data',
                "Accept": 'application/json',
                "Authorization": 'Bearer ' + token,
            };
            let data = new FormData();
            data.append('PostID', post.id);
            let uri = '';
            if (!post.isLiked) {
                uri = Const.domain + 'api/post/likepost';
            } else {
                uri = Const.domain + 'api/post/unlikepost';
            }
            Request.Post(uri, header, data)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        this.updatePostByID(response.listPost[0].id, 'numberOfLike', response.listPost[0].numberOfLike);
                        this.updatePostByID(response.listPost[0].id, 'isLiked', response.listPost[0].isLiked);
                    } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                        console.log(response.errorMessage);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                })
        } else {
            Alert.alert('Thông báo', 'Hãy đăng nhập để thực hiện việc này');
        }
    }
    /**
     * Process when user rate a post
     * @param {Data of the post} post 
     * @param {Rate point} rating 
     */
    ratingCompleted(post, rating) {
        console.log("Rating is: " + rating);
        const { token } = this.state;
        if (token && token.length > 0) {
            var header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                'Content-Type': 'multipart/form-data',
                "Accept": 'application/json',
                "Authorization": 'Bearer ' + token,
            };
            let data = new FormData();
            data.append('PostID', post.id);
            data.append('RatePoint', rating);
            let uri = Const.domain + 'api/post/ratepost';
            Request.Post(uri, header, data)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        this.updatePostByID(response.listPost[0].id, 'myRatePoint', response.listPost[0].myRatePoint);
                        this.updatePostByID(response.listPost[0].id, 'rateAverage', response.listPost[0].rateAverage);
                    } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                        console.log(response.errorMessage);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                })
        } else {
            Alert.alert('Thông báo', 'Hãy đăng nhập để đánh giá bài viết này');
        }
    }

    Article = ({ data }) => {
        const { isKeyBoardShow, keyboardHeight, commentText } = this.state;
        let post = data;
        return (
            <View
                style={Style.newsfeed.Article}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={post.avatar && post.avatar.length > 0 ?
                            { uri: Const.assets_domain + post.avatar } : AVATAR}
                        style={Style.newsfeed.ArticleAvatar} />
                    <View style={Style.newsfeed.ArticleHeader}>
                        <Text style={Style.newsfeed.ArticleAuthor}>{post.firstName + ' ' + post.lastName}</Text>
                        <Text>{Utils.calculateTime(post.time)}</Text>
                    </View>
                    <MaterialCommunityIcons
                        style={Style.newsfeed.ArticleMenu}
                        name='dots-horizontal' size={30} color={'black'} />

                </View>
                <View style={Style.newsfeed.ArticleImageList}>
                    <FlatList
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        horizontal
                        data={post.listImage}
                        keyExtractor={item => item.id + ''}
                        pagingEnabled={true}
                        renderItem={({ item }) => {
                            return (
                                <View style={Style.newsfeed.ArticleImageStyle}>
                                    <Image
                                        style={Style.newsfeed.ArticleImage}
                                        source={{ uri: Const.assets_domain + item.url }} />
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={Style.newsfeed.ArtileMore}>
                    <View style={Style.newsfeed.ArticleAction}>
                        <MaterialCommunityIcons
                            onPress={() => this.onPressLikePost(post)}
                            name={post.isLiked ? 'heart' : 'heart-outline'}
                            size={30}
                            color={post.isLiked ? '#dc3f1c' : '#232323'} />
                        <Text style={{ marginLeft: scale(5, Horizontal), marginTop: scale(5, Horizontal) }}>{post.numberOfLike}</Text>
                        <FontAwesome5
                            onPress={() => this.onPressCommentIcon(post)}
                            style={{ marginLeft: scale(10, Horizontal) }}
                            name='comment-dots' size={30}
                            color={'#232323'} />
                        <Text style={{ marginLeft: scale(5, Horizontal), marginTop: scale(5, Horizontal) }}>{post.numberOfComment}</Text>
                        <Rating
                            style={{ marginLeft: scale(10, Horizontal) }}
                            ratingCount={5}
                            imageSize={30}
                            type='custom'
                            ratingColor='#dc3f1c'
                            tintColor='#f8e5d6'
                            readonly={!(this.state.token && this.state.token.length > 0)}
                            //ratingBackgroundColor='#FFF2D1'
                            onFinishRating={(rating) => this.ratingCompleted(post, rating)}
                            startingValue={post.myRatePoint}
                        />
                        <Text style={{ marginLeft: scale(5, Horizontal), marginTop: scale(5, Horizontal) }}>{post.rateAverage}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: scale(5, Vertical) }}>
                        <Text style={Style.newsfeed.ArticleAuthor}>{post.firstName + ' ' + post.lastName}</Text>
                        <Text style={{ fontSize: 14, marginLeft: scale(5, Horizontal) }}>{post.content}</Text>
                    </View>
                    {post.isShowComment ? (
                        <View
                            style={{
                                marginTop: scale(5, Vertical)
                            }}
                        >
                            <FlatList
                                data={post.listComment}
                                keyExtractor={(item, index) => item.id + ''}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ marginLeft: scale(10, Horizontal), marginBottom: scale(5, Vertical) }}>
                                            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    style={{
                                                        width: scale(40, Horizontal),
                                                        height: scale(40, Horizontal),
                                                        borderRadius: 50
                                                    }}
                                                    source={item.avatar && item.avatar.length > 0 ? { uri: Const.assets_domain + item.avatar } : { AVATAR }} />
                                                <Text style={{ fontWeight: 'bold', marginLeft: scale(10, Horizontal) }}>{item.firstName + " " + item.lastName}</Text>
                                                <Text style={{ marginLeft: scale(5, Horizontal) }}>{item.content}</Text>

                                            </View>
                                        </View>
                                    )
                                }}
                            />

                            <View>
                                <TextInput
                                    ref={(input) => { this.commentInputs = input }}
                                    value={commentText}
                                    placeholder={'Bình luận'}
                                    onFocus={() => this.setState({ currentPostComment: post.id })}
                                    style={{
                                        width: scale(300, Horizontal),
                                        backgroundColor: '#EEEEEE',
                                        borderRadius: 10,
                                    }} />
                            </View>


                        </View>
                    ) : (<View></View>)}

                </View>
            </View>
        )
    }

    render() {
        const { account, listPost, isKeyBoardShow, keyboardHeight, commentText } = this.state;
        return (
            <View style={Style.common.container}>
                <StatusBar hidden={false} backgroundColor={'#300808'} />
                <View style={[Style.newsfeed.Header]}>
                    <Text style={{ fontFamily: '20db', fontSize: 30, color: '#fef4ca' }}>SOFA</Text>
                    <Ionicons
                        style={{
                            marginLeft: 'auto',
                            marginRight: scale(5, Horizontal)
                        }}
                        name={'search-outline'} color={'#fef4ca'} size={30} />
                    <Ionicons
                        style={{
                            marginRight: scale(5, Horizontal)
                        }}
                        name={'notifications'} color={'#fef4ca'} size={30} />
                    <MaterialCommunityIcons
                        style={{
                            marginRight: scale(5, Horizontal)
                        }}
                        name={'message-text-outline'} color={'#fef4ca'} size={30} />
                </View>
                <View style={{ height: scale(625, Vertical) }}>
                    <FlatList
                        data={listPost}
                        keyExtractor={(item, index) => item.id + ''}
                        renderItem={({ item, index }) => <this.Article data={item} />}
                    />
                </View>
                {isKeyBoardShow ? (
                    <View style={{ position: 'absolute', top: scale(700 - keyboardHeight - 40, Vertical), flexDirection: 'row' }}>
                        <TextInput
                            onFocus={() => console.log(this.commentInputs.length)}
                            onChangeText={text => {
                                this.setState({ commentText: text });
                            }}
                            ref={(input) => { this.commentTextInput = input }}
                            placeholder={'Bình luận'}
                            style={{ borderWidth: 1, backgroundColor: 'white', borderRadius: 5, height: scale(40, Vertical), width: scale(350, Horizontal) }}
                        />
                        <Ionicons size={scale(40, Vertical)} name='send' onPress={() => this.onPressCommentButton()} />
                    </View>) : (<View></View>)}

            </View>
        )
    }
}