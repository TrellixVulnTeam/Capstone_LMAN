import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, Alert, FlatList, TouchableWithoutFeedback, Modal } from 'react-native';
import { Rating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import * as Style from '../style/style';
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR } from '../../image/index';
import ViewImageModal from './viewImageModel';

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            isLogin: false,
            listPost: [],
            isKeyBoardShow: false,
            keyboardHeight: 0,
            currentPostSelect: {},
            isShowMenu: false,
            page: 1,
            listPostRefreshing: false,
            currentShowImagePost: {},
            currentShowImage: {},
            isShowImage: false,
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
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'hidepost',
            icon: () => <AntDesign name='closesquareo' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Ẩn bài viết',
            detail: () => 'Ẩn bài viết này khỏi newsfeed của bạn',
            onPress: () => {
                console.log('hide post', this.state.currentPostSelect.id);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'reportpost',
            icon: () => <Octicons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo bài viết này',
            detail: () => 'Tôi lo ngại về bài viết này',
            onPress: () => {
                console.log('report post', this.state.currentPostSelect.id);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'followuserpost',
            icon: () => <SimpleLineIcons name='user-follow' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Theo dõi ' + this.state.currentPostSelect.lastName,
            detail: () => 'Xem những bài viết từ người này',
            onPress: () => {
                console.log('follow user', this.state.currentPostSelect.id);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'reportuser',
            icon: () => <MaterialIcons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo ' + this.state.currentPostSelect.lastName,
            detail: () => 'Tôi lo ngại về người dùng này',
            onPress: () => {
                console.log('report user', this.state.currentPostSelect.id);
                this.setState({ isShowMenu: false });
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
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'deletepost',
            icon: () => <AntDesign name='delete' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Xóa bài viết',
            detail: () => 'Xóa bài viết này khỏi danh sách bài viết của bạn',
            onPress: () => {
                console.log('delete post', this.state.currentPostSelect.id);
                this.setState({ isShowMenu: false });
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
                this.setState({ isShowMenu: false });
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

    componentDidMount() {
        this.checkLoginToken();
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
            console.log(this.props.route);
            if (this.props.route && this.props.route.params && this.props.route.params.preScreen == 'CreatePost') { this.getAllPost(1); }
        });
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
        const { account } = this.state;
        if (account && account.accountID && account.accountID == accountID) {
            this.props.navigation.navigate('Profile');
        } else {
            this.props.navigation.navigate('OtherProfile', { 'accountID': accountID });
        }
    }

    onPressImage(post, image) {
        //this.props.navigation.navigate('ViewImage', { 'post': post, 'image': image });
        this.setState({ currentShowImage: image, currentShowImagePost: post });
        this.setState({ isShowImage: true });
    }


    render() {
        const { isShowMenu, listPost, account, currentPostSelect, listPostRefreshing } = this.state;
        return (
            <View style={Style.common.container}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <View style={[Style.newsfeed.Header]}>
                    <Text style={Style.newsfeed.SofaTitle}>SOFA</Text>
                    <Ionicons
                        style={Style.newsfeed.searchIcon}
                        name={'search-outline'} color={'#fef4ca'} size={30} />
                    <Ionicons
                        style={Style.newsfeed.notificationIcon}
                        name={'notifications'} color={'#fef4ca'} size={30} />
                    <MaterialCommunityIcons
                        style={Style.newsfeed.notificationIcon}
                        name={'message-text-outline'} color={'#fef4ca'} size={30} />
                </View>
                
            </View>
        )
    }
}