import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, FlatList, TextInput, TouchableWithoutFeedback, Modal } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


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
            isLogin: false,
            listPost: [],
            isKeyBoardShow: false,
            keyboardHeight: 0,
            inScreen: false,
            currentPostSelect: {},
            isShowMenu: false
        }
    }
    actionArticleNotOwn = [
        {
            key: 'savepost',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Lưu bài viết',
            detail: () => 'Thêm vào danh sách các mục đã lưu',
            onPress: () => {
                console.log('save post', this.state.currentPostSelect.id);
            }
        },
        {
            key: 'hidepost',
            icon: () => <AntDesign name='closesquareo' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Ẩn bài viết',
            detail: () => 'Ẩn bài viết này khỏi newsfeed của bạn',
            onPress: () => {
                console.log('hide post', this.state.currentPostSelect.id);
            }
        },
        {
            key: 'reportpost',
            icon: () => <Octicons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo bài viết này',
            detail: () => 'Tôi lo ngại về bài viết này',
            onPress: () => {
                console.log('report post', this.state.currentPostSelect.id);
            }
        },
        {
            key: 'followuserpost',
            icon: () => <SimpleLineIcons name='user-follow' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Theo dõi ' + this.state.currentPostSelect.lastName,
            detail: () => 'Xem những bài viết từ người này',
            onPress: () => {
                console.log('follow user', this.state.currentPostSelect.id);
            }
        },
        {
            key: 'reportuser',
            icon: () => <MaterialIcons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo ' + this.state.currentPostSelect.lastName,
            detail: () => 'Tôi lo ngại về người dùng này',
            onPress: () => {
                console.log('report user', this.state.currentPostSelect.id);
            }
        },


    ]
    actionArticleOwn = [
        {
            key: 'savepost',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Lưu bài viết',
            detail: () => 'Thêm vào danh sách các mục đã lưu',
            onPress: () => {
                console.log('save post', this.state.currentPostSelect.id);
            }
        },
        {
            key: 'deletepost',
            icon: () => <AntDesign name='delete' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Xóa bài viết',
            detail: () => 'Xóa bài viết này khỏi danh sách bài viết của bạn',
            onPress: () => {
                console.log('delete post', this.state.currentPostSelect.id);
                this.deletePost(this.state.currentPostSelect.id);
            }
        },
        {
            key: 'editpost',
            icon: () => <MaterialIcons name='mode-edit' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Chỉnh sửa bài viết',
            detail: () => 'Chỉnh sửa nội dung của bài viết',
            onPress: () => {
                console.log('edit post', this.state.currentPostSelect.id);
            }
        },

    ]
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
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.setState({ inScreen: true });
            this.checkLoginToken();
            this.getAllPost();
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
            this.setState({
                token: '',
                account: {},
                isLogin: false,
                listPost: [],
                isKeyBoardShow: false,
                keyboardHeight: 0,
                commentText: '',
                currentPostComment: 0,
                inScreen: false,
                isShowMenu: false,
                currentPostID: 0
            });
        })
    }

    removePost(postID) {
        let { listPost } = this.state;
        let flag = false;
        for (let i = 0; i < listPost.length; i++) {
            if (!flag && listPost[i].id == postID) {
                flag = true;
            };
            if (flag) {
                listPost[i] = listPost[i + 1];
            }
        }
        listPost.pop();
        this.setState({ listPost: listPost });
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


    deletePost(postID) {
        const { token } = this.state;
        if (token && token.length > 0) {
            var header = {
                "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                'Content-Type': 'multipart/form-data',
                "Accept": 'application/json',
                "Authorization": 'Bearer ' + token,
            };
            let data = new FormData();
            data.append('PostID', postID);
            let uri = Const.domain + 'api/post/deletepost';
            Request.Post(uri, header, data)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        this.removePost(response.listPost[0].id);
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
     * Navigate to list comment of this post
     * @param {Data of the post} post 
     */
    onPressCommentIcon(post) {
        this.props.navigation.navigate('Comment', { 'post': post });
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

    navigateProfile(accountID) {
        const { account, isLogin, token } = this.state;
        if (account && account.accountID && account.accountID == accountID) {
            this.props.navigation.navigate('Profile');
        } else {
            this.props.navigation.navigate('OtherProfile', { 'accountID': accountID });
        }
    }

    ArticleMenu = (props) => {
        const { isShowMenu, currentPostID } = this.state;
        return (
            <View>
                { isShowMenu ? (
                    <View style={{
                        width: scale(400, Horizontal),
                        height: scale(500, Vertical),
                        position: 'absolute',
                        backgroundColor: 'white'
                        //bottom: scale(700, Vertical)
                    }}>
                        <Text>{currentPostID}</Text>
                    </View>) : (<View></View>)}
            </View>
        )
    }

    Article = ({ data }) => {
        let post = data;
        return (
            <View
                style={Style.newsfeed.Article}
            >
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback
                        onPress={() => this.navigateProfile(post.accountPost)}
                    >
                        <Image
                            source={post.avatar && post.avatar.length > 0 ?
                                { uri: Const.assets_domain + post.avatar } : AVATAR}
                            style={Style.newsfeed.ArticleAvatar} />
                    </TouchableWithoutFeedback>
                    <View style={Style.newsfeed.ArticleHeader}>
                        <Text
                            onPress={() => this.navigateProfile(post.accountPost)}
                            style={Style.newsfeed.ArticleAuthor}>{post.firstName + ' ' + post.lastName}</Text>
                        <Text style={{ fontFamily: 'SanFranciscoText-Regular' }}>{Utils.calculateTime(post.time)}</Text>
                    </View>
                    <MaterialCommunityIcons
                        onPress={() => {
                            this.setState({ currentPostSelect: post });
                            this.setState({ isShowMenu: true });
                        }}
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
                        <Text style={{ marginLeft: scale(5, Horizontal), marginTop: scale(5, Horizontal) }}>{post.rateAverage + '/5'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: scale(5, Vertical) }}>
                        <Text style={Style.newsfeed.ArticleAuthor}>{post.firstName + ' ' + post.lastName}</Text>
                        <Text style={{ fontSize: 14, textAlignVertical: 'center', marginLeft: scale(5, Horizontal) }}>{post.content}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { isShowMenu, listPost, account, currentPostSelect } = this.state;
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
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={isShowMenu}
                        onRequestClose={() => {
                            this.setState({ isShowMenu: false });
                        }}
                    >
                        <View style={{
                            width: scale(400, Horizontal),
                            position: 'absolute',
                            backgroundColor: 'white',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            bottom: scale(0, Vertical),
                            elevation: 5
                        }}>
                            {account.accountID != currentPostSelect.accountPost ?
                                this.actionArticleNotOwn.map(item =>
                                    <TouchableHighlight
                                        key={item.key}
                                        onPress={() => item.onPress()}
                                        underlayColor={'#9E9E9E'}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                height: scale(50, Vertical),
                                                borderBottomColor: '#9E9E9E',
                                                borderBottomWidth: 0.5,
                                                alignItems: 'center',
                                                paddingLeft: scale(20, Horizontal)
                                            }}>
                                            {item.icon()}
                                            <View style={{ marginLeft: scale(10, Horizontal) }} >
                                                <Text>{item.title()}</Text>
                                                <Text style={{ color: '#9E9E9E' }}>{item.detail()}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                ) :
                                this.actionArticleOwn.map(item =>
                                    <TouchableHighlight
                                        key={item.key}
                                        onPress={() => item.onPress()}
                                        underlayColor={'#9E9E9E'}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                height: scale(50, Vertical),
                                                borderBottomColor: '#9E9E9E',
                                                borderBottomWidth: 0.5,
                                                alignItems: 'center',
                                                paddingLeft: scale(20, Horizontal)
                                            }}>
                                            {item.icon()}
                                            <View style={{ marginLeft: scale(10, Horizontal) }} >
                                                <Text>{item.title()}</Text>
                                                <Text style={{ color: '#9E9E9E' }}>{item.detail()}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )
                            }
                        </View>
                    </Modal>

                </View>
            </View>
        )
    }
}