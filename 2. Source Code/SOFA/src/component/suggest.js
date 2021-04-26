import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, Alert, FlatList, TouchableWithoutFeedback, Modal, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, ImageBackground } from 'react-native';
import { Rating } from 'react-native-ratings';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient'
import { StackActions } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Badge, Icon, withBadge } from 'react-native-elements';

import InfoField from './infoField';
import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';
import PostMenu from './postMenu';
import ViewImageModal from './viewImageModel';

import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';
import * as RecommendService from '../service/recommendService';
import * as InfoService from '../service/infoService';
import Session from '../common/session';

export default class Suggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            isLogin: false,
            listPost: [],
            keyboardHeight: 0,
            currentPostSelect: {},
            isShowMenu: false,
            page: 1,
            listPostRefreshing: false,
            info: {
                id: 0,
                name: '',
                accountID: 0,
                height: 0,
                weight: 0,
                bustSize: 0,
                waistSize: 0,
                hipSize: 0,
                skinColor: 0
            },
            fashionType: {
                id: 0,
                name: '',
                description: ''
            },
            listFashionType: [],
            isLoading: false,
            similarInfoID: [],
            currentShowImage: {},
            currentShowImagePost: {},
            isShowImage: false,
            isSelectInfo: true,
            listInfo: [],
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
        this.setState({ isLoading: true });
        let account = Session.getInstance().account;
        let token = Session.getInstance().token;
        if (token && token.length > 0) {
            this.setState({ account: account, isLogin: true });
            this.setState({ isLoading: false });
            this.getListInfo();
        } else {
            this.setState({ account: {}, isLogin: false });
            ToastAndroid.show('Bạn phải đăng nhập để sử dụng tính năng này!', ToastAndroid.LONG,);
            this.props.navigation.dispatch(
                StackActions.replace('BottomNav', {
                    isRefreshing: false
                })
            )
        }
    }


    getAllRecommendPost = async (page, type = 0) => {
        const { similarInfoID } = this.state;
        for (let i = 0; i < similarInfoID.length; i++) {
            console.log('get recommend post', similarInfoID[i])
            PostService.getPostRecommend(similarInfoID[i].itemID, page)
                .then(response => {
                    console.log('get recommend post', response.listPost);
                    if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        let listPostRes = response.listPost;
                        if (page > 1 || type != 0 || i > 0) {
                            console.log('load more', listPostRes.length);
                            if (listPostRes.length > 0) {
                                this.setState({ listPost: [...this.state.listPost, ...listPostRes], listPostRefreshing: false });
                            } else {
                                this.setState({ listPostRefreshing: false });
                            }
                        } else {
                            this.setState({ listPost: [] })
                            console.log('reload', listPostRes.length);
                            if (listPostRes.length > 0) {
                                this.setState({ listPost: listPostRes, listPostRefreshing: false })
                            } else {
                                this.setState({ listPostRefreshing: false });
                            }
                        }
                    }
                })
                .catch(reason => {
                    this.setState({ listPostRefreshing: false });
                    console.log(reason);
                    if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                        ToastAndroid.show('Bạn phải đăng nhập để sử dụng tính năng này!', ToastAndroid.LONG,);
                    } else {
                        ToastAndroid.show('Có lỗi xảy ra! Vui lòng thử lại!', ToastAndroid.LONG,);
                    }
                })
        }

    }

    getSimilarInfo = (infoID) => {
        this.setState({ isLoading: true });
        RecommendService.getSimilarInfo(infoID)
            .then(response => {
                if (response && response.length > 0) {
                    this.setState({ similarInfoID: response });
                    console.log(this.state.similarInfoID);
                    this.setState({ isLoading: false });
                    this.getAllRecommendPost(1);
                } else {
                    this.setState({ isLoading: false });
                }
            })
            .catch(reason => {
                this.setState({ isLoading: false });
                console.log('Get similar', reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Bạn phải đăng nhập để sử dụng tính năng này!', ToastAndroid.LONG,);
                } else {
                    ToastAndroid.show('Có lỗi xảy ra! Vui lòng thử lại!', ToastAndroid.LONG,);
                }
            })
    }

    getListInfo = () => {
        InfoService.getListInfo()
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listItem = [];
                    let listTemp = response.listInfo;
                    for (let i = 0; i < listTemp.length; i++) {
                        let info = listTemp[i];
                        let item = {
                            value: info.id,
                            label: info.name + '',
                            icon: () => null,
                            data: info
                        }
                        listItem.push(item);
                    }
                    this.setState({ listInfo: listItem, isSelectInfo: true });
                } else {
                    ToastAndroid.show("CÓ lỗi sảy ra! Hãy thử lại!", ToastAndroid.LONG,);
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG,);
                } else {
                    ToastAndroid.show("CÓ lỗi sảy ra! Hãy thử lại!", ToastAndroid.LONG,);
                }
            })
    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
        });
        this._screenFocus = this.props.navigation.addListener('blur', () => {
            this.setState({
                token: '',
                account: {},
                isLogin: false,
                listPost: [],
                keyboardHeight: 0,
                currentPostSelect: {},
                isShowMenu: false,
                page: 1,
                listPostRefreshing: false,
                info: {
                    id: 0,
                    name: '',
                    accountID: 0,
                    height: 0,
                    weight: 0,
                    bustSize: 0,
                    waistSize: 0,
                    hipSize: 0,
                    skinColor: 0
                },
                fashionType: {},
                listFashionType: [],
                isLoading: false,
                similarInfoID: [],
                currentShowImage: {},
                currentShowImagePost: {},
                isShowImage: false,
                isSelectInfo: false,
                listInfo: [],
            })
        });
    }

    removePost(postID) {
        let { listPost } = this.state;
        let flag = false;
        for (let i = 0; i < listPost.length; i++) {
            if (!flag && listPost[i].id == postID) {
                flag = true;
            }
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
        PostService.deletePost(postID)
            .then((response) => {
                if (
                    response &&
                    response.code &&
                    response.code == Const.REQUEST_CODE_SUCCESSFULLY
                ) {
                    this.removePost(response.listPost[0].id);
                    ToastAndroid.show(
                        'Đã xóa bài viết này tài khoản của bạn! Mọi người sẽ không thể tìm thấy cũng như xem lại bài viết này!',
                        ToastAndroid.LONG,
                    );
                } else if (
                    response &&
                    response.code &&
                    response.code == Const.REQUEST_CODE_FAILED
                ) {
                    console.log(response.errorMessage);
                }
            })
            .catch((reason) => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show(
                        'Hãy đăng nhập để thực hiện việc này',
                        ToastAndroid.LONG,
                    );
                }
            });
    }

    /**
     * Navigate to list comment of this post
     * @param {Data of the post} post
     */
    onPressCommentIcon(post) {
        this.props.navigation.navigate('Comment', { post: post });
    }

    /**
     * Process when user press icon heart
     * @param {Data of a post} post
     */
    onPressLikePost(post) {
        if (!post.isLiked) {
            PostService.likePost(post.id)
                .then((response) => {
                    if (
                        response &&
                        response.code &&
                        response.code == Const.REQUEST_CODE_SUCCESSFULLY
                    ) {
                        this.updatePostByID(
                            response.listPost[0].id,
                            'numberOfLike',
                            response.listPost[0].numberOfLike,
                        );
                        this.updatePostByID(
                            response.listPost[0].id,
                            'isLiked',
                            response.listPost[0].isLiked,
                        );
                    } else if (
                        response &&
                        response.code &&
                        response.code == Const.REQUEST_CODE_FAILED
                    ) {
                        console.log(response.errorMessage);
                    }
                })
                .catch((reason) => {
                    console.log(reason);
                    if ((reason.code == Const.REQUEST_CODE_NOT_LOGIN)) {
                        ToastAndroid.show(
                            'Hãy đăng nhập để thực hiện việc này',
                            ToastAndroid.LONG,
                        );
                    }
                });
        } else {
            PostService.unlikePost(post.id)
                .then((response) => {
                    if (
                        response &&
                        response.code &&
                        response.code == Const.REQUEST_CODE_SUCCESSFULLY
                    ) {
                        this.updatePostByID(
                            response.listPost[0].id,
                            'numberOfLike',
                            response.listPost[0].numberOfLike,
                        );
                        this.updatePostByID(
                            response.listPost[0].id,
                            'isLiked',
                            response.listPost[0].isLiked,
                        );
                    } else if (
                        response &&
                        response.code &&
                        response.code == Const.REQUEST_CODE_FAILED
                    ) {
                        console.log(response.errorMessage);
                    }
                })
                .catch((reason) => {
                    console.log(reason);
                    if ((reason.code == Const.REQUEST_CODE_NOT_LOGIN)) {
                        ToastAndroid.show(
                            'Hãy đăng nhập để thực hiện việc này',
                            ToastAndroid.LONG,
                        );
                    }
                });
        }
    }
    /**
     * Process when user rate a post
     * @param {Data of the post} post
     * @param {Rate point} rating
     */
    ratingCompleted(post, rating) {
        PostService.ratePost(post.id, rating)
            .then((response) => {
                if (
                    response &&
                    response.code &&
                    response.code == Const.REQUEST_CODE_SUCCESSFULLY
                ) {
                    this.updatePostByID(
                        response.listPost[0].id,
                        'myRatePoint',
                        response.listPost[0].myRatePoint,
                    );
                    this.updatePostByID(
                        response.listPost[0].id,
                        'rateAverage',
                        response.listPost[0].rateAverage,
                    );
                } else if (
                    response &&
                    response.code &&
                    response.code == Const.REQUEST_CODE_FAILED
                ) {
                    console.log(response.errorMessage);
                }
            })
            .catch((reason) => {
                console.log(reason);
                if ((reason.code == Const.REQUEST_CODE_NOT_LOGIN)) {
                    ToastAndroid.show(
                        'Hãy đăng nhập để thực hiện việc này',
                        ToastAndroid.LONG,
                    );
                }
            });
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
        // this.props.navigation.navigate('ViewImage', { 'post': post, 'image': image });
        this.setState({ currentShowImage: image, currentShowImagePost: post });
        this.setState({ isShowImage: true });
    }

    Article = ({ data }) => {
        const shadowOpt = {
            width: scale(380, Horizontal),
            height: scale(380, Horizontal),
            color: '#000',
            border: 2,
            radius: 3,
            opacity: 0.5,
            x: -10,
            y: -10,
            style: { marginVertical: 5 },
        };
        let post = data;
        return (
            <View style={Style.newsfeed.Article}>
                <TouchableOpacity
                    onPressOut={() =>
                        this.props.navigation.navigate('PostDetail', { postID: post.id })
                    }
                    style={Style.common.flexRow}>
                    <TouchableWithoutFeedback
                        onPress={() => this.navigateProfile(post.accountPost)}>
                        <Image
                            source={
                                post.avatar && post.avatar.length > 0
                                    ? { uri: Const.assets_domain + post.avatar }
                                    : AVATAR
                            }
                            style={Style.newsfeed.ArticleAvatar}
                        />
                    </TouchableWithoutFeedback>

                    <View style={Style.newsfeed.ArticleHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text
                                onPress={() => this.navigateProfile(post.accountPost)}
                                style={Style.newsfeed.ArticleAuthor}>
                                {post.firstName + ' ' + post.lastName}
                            </Text>
                            {post.isFashionista ? (<MaterialIcons style={{ marginLeft: scale(5, Horizontal) }} name='stars' size={15} color='white' />) : (<View></View>)}

                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('PostDetail', { postID: post.id })
                            }>
                            <Text style={Style.newsfeed.ArticleTime}>
                                {Utils.calculateTime(post.time)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <MaterialCommunityIcons
                        onPress={() => {
                            this.setState({ currentPostSelect: post });
                            this.setState({ isShowMenu: true });
                            this.postMenu.onPrepare();
                        }}
                        style={Style.newsfeed.ArticleMenu}
                        name="dots-horizontal"
                        size={30}
                        color={'white'}
                    />
                </TouchableOpacity>
                <View style={Style.newsfeed.ArticleCaption}>
                    <Text style={Style.newsfeed.ArticleCaptionContent}>
                        {post.content}
                    </Text>
                </View>
                <View style={Style.newsfeed.ArticleImageList}>
                    <Image
                        style={[
                            {
                                position: 'absolute',
                                left: scale(10, Horizontal),
                                top: scale(-10, Vertical),
                            },
                            Style.newsfeed.ArticleImage,
                        ]}
                        source={WHITE_BACKGROUND}
                    />
                    <FlatList
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        horizontal
                        data={post.listImage}
                        keyExtractor={(item) => item.id + ''}
                        pagingEnabled={true}
                        renderItem={({ item }) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => this.onPressImage(post, item)}>
                                    <View style={Style.newsfeed.ArticleImageStyle}>
                                        <Image
                                            style={Style.newsfeed.ArticleImage}
                                            source={{ uri: Const.assets_domain + item.url }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }}
                    />
                </View>
                <View style={Style.newsfeed.ArtileMore}>
                    <View style={Style.newsfeed.ArticleAction}>
                        <TouchableOpacity
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                flexDirection: 'row',
                            }}
                            onPress={() => this.onPressLikePost(post)}>
                            <MaterialCommunityIcons
                                name={post.isLiked ? 'heart' : 'heart-outline'}
                                size={30}
                                color={post.isLiked ? '#308099' : '#232323'}
                            />
                        </TouchableOpacity>

                        <Text style={Style.newsfeed.ArticleNumberOfReact}>
                            {post.numberOfLike}
                        </Text>
                        <TouchableOpacity
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                flexDirection: 'row',
                            }}
                            onPress={() => this.onPressCommentIcon(post)}>
                            <FontAwesome
                                style={Style.newsfeed.ArticleIconOfReact}
                                name="comments"
                                size={30}
                                color={'#308099'}
                            />
                            <Text style={Style.newsfeed.ArticleNumberOfReact}>
                                {post.numberOfComment}
                            </Text>
                        </TouchableOpacity>
                        <View style={Style.newsfeed.ArticleIconOfReact}>
                            <Rating
                                ratingCount={5}
                                imageSize={30}
                                type="custom"
                                ratingColor="rgba(48,128,153,1)"
                                tintColor="#E6F3FC"
                                readonly={!this.state.isLogin}
                                //ratingBackgroundColor='#FFF2D1'
                                onFinishRating={(rating) => this.ratingCompleted(post, rating)}
                                startingValue={post.myRatePoint}
                            />
                            <Text style={Style.newsfeed.ArticleNumberOfReact}>
                                {Utils.isInteger(post.rateAverage)}
                            </Text>
                            <Text style={Style.newsfeed.ArticleNumberOfReact}>{'/5.0'}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { isShowMenu, listPost, account, currentPostSelect, listPostRefreshing, listInfo, listFashionType, info, isLoading } = this.state;
        const infoFields = [
            { id: 'name', name: 'Tiêu đề', unit: '' },
            { id: 'height', name: 'Chiều cao', unit: 'cm' },
            { id: 'weight', name: 'Cân nặng', unit: 'kg' },
            { id: 'bustSize', name: 'Vòng 1', unit: 'cm' },
            { id: 'waistSize', name: 'Vòng 2', unit: 'cm' },
            { id: 'hipSize', name: 'Vòng 3', unit: 'cm' },
            { id: 'skinColor', name: 'Màu da', unit: '' },
        ]
        return (
            <View style={Style.common.container}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />

                <ImageBackground
                    source={OCEAN_BACKGROUND}
                    style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                    <View style={[Style.newsfeed.Header]}>
                        <View>
                            <Text style={[Style.newsfeed.SofaTitle, { color: 'white', position: 'absolute', top: -2, left: -2 }]}>Recommend</Text>
                            <Text style={Style.newsfeed.SofaTitle}>Recommend</Text>

                        </View>
                    </View>
                    <View style={Style.newsfeed.listArticle}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={listPost}
                            keyExtractor={(item, index) => item.id + ''}
                            renderItem={({ item, index }) => <this.Article data={item} />}
                            onEndReached={() => {
                                //this.setState({ listPostRefreshing: true });
                                this.getAllRecommendPost(this.state.page + 1, 1);
                                this.setState({ page: this.state.page + 1 });
                            }}
                            onEndReachedThreshold={0.8}
                            refreshing={listPostRefreshing}
                            onRefresh={() => {
                                this.setState({ page: 1, listPostRefreshing: true });
                                this.getSimilarInfo(info.id, 1);
                            }}
                        />
                        <PostMenu
                            ref={(child) => {
                                this.postMenu = child;
                            }}
                            post={this.state.currentPostSelect}
                            visible={this.state.isShowMenu}
                            onRequestClose={() => {
                                this.setState({ isShowMenu: false });
                            }}
                            onMarkupPost={(response) => {
                                this.updatePostByID(
                                    response.listMarkup[0].postID,
                                    'isMarked',
                                    true,
                                );
                            }}
                            onUnmarkupPost={(response) => {
                                this.updatePostByID(
                                    response.listMarkup[0].postID,
                                    'isMarked',
                                    false,
                                );
                            }}
                            onPressDeletePost={(response) => {
                                this.deletePost(this.state.currentPostSelect.id);
                            }}
                            onPressEditPost={(postID) => {
                                this.props.navigation.navigate('EditPost', { 'postID': postID })
                            }}
                            onPressBuyPlace={(post) => {
                                this.props.navigation.navigate("SellPlace", { 'post': post, 'newRequest': true });
                            }}
                            onPressReportPost={(postID) => this.props.navigation.navigate('Report', { toPostID: postID, reportType: 1 })}
                            onPressReportUser={(accountID) => this.props.navigation.navigate('Report', { toAccountID: accountID, reportType: 2 })}
                        />
                        <ViewImageModal
                            image={this.state.currentShowImage}
                            post={this.state.currentShowImagePost}
                            visible={this.state.isShowImage}
                            onRequestClose={() => {
                                this.setState({ isShowImage: false });
                                this.setState({ currentShowImage: {}, currentShowImagePost: {} });
                            }}
                        />
                    </View>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.isSelectInfo}
                        onRequestClose={() => {
                            this.setState({ isSelectInfo: false });
                            this.props.navigation.goBack();
                        }}
                    >
                        <View style={{
                            height: scale(460, Vertical),
                            width: scale(300, Horizontal),
                            backgroundColor: 'white',
                            borderWidth: 0.5,
                            borderRadius: 10,
                            alignSelf: 'center',
                            marginTop: scale(150, Vertical)
                        }}>
                            <View style={{
                                paddingHorizontal: scale(10, Horizontal),
                                paddingVertical: scale(10, Vertical)
                            }}>
                                <Text>Bộ số đo người mẫu trong bài</Text>
                                <DropDownPicker
                                    defaultValue={listInfo[0] ? listInfo[0].id : null}
                                    containerStyle={{ width: scale(150, Horizontal), height: scale(30, Vertical) }}
                                    items={listInfo}
                                    style={styles().DropdownInfo}
                                    onChangeItem={(item) => {
                                        this.setState({ info: item.data })
                                    }}
                                    placeholder={'Chọn số đo sẵn có'}
                                />
                                <ScrollView>
                                    {infoFields.map(item => (
                                        <InfoField
                                            editable={false}
                                            key={item.id}
                                            name={item.name}
                                            id={item.id}
                                            value={info[item.id]}
                                            unit={item.unit}
                                            onChange={(value) => {
                                                let temp = info;
                                                temp[item.id] = value;
                                                this.setState({ info: temp })
                                            }}

                                        />
                                    ))}

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: scale(10, Vertical)
                                    }}>
                                        <TouchableOpacity
                                            style={{ marginLeft: 'auto', }}
                                            onPress={() => {
                                                this.setState({ isSelectInfo: false });
                                                this.props.navigation.navigate('CreateInfo')
                                            }}
                                        >
                                            <LinearGradient
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                colors={['#91DFFF', '#2A7EA0']}
                                                style={{
                                                    height: scale(30, Vertical),
                                                    width: scale(60, Horizontal),
                                                    paddingVertical: scale(5, Vertical),
                                                    paddingHorizontal: scale(5, Horizontal),
                                                    borderRadius: 5,
                                                    alignItems: 'center'
                                                }}>
                                                <Text style={styles().ButtonPostText}>Mới</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            disabled={!(info && info.id && info.id != 0)}

                                            style={{ marginLeft: 'auto', marginRight: 'auto', }}
                                            onPress={() => {
                                                this.setState({ isSelectInfo: false });
                                                this.getSimilarInfo(info.id);
                                            }}
                                        >
                                            <LinearGradient
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                colors={['#91DFFF', '#2A7EA0']}
                                                style={{
                                                    height: scale(30, Vertical),
                                                    width: scale(60, Horizontal),
                                                    paddingVertical: scale(5, Vertical),
                                                    paddingHorizontal: scale(5, Horizontal),
                                                    borderRadius: 5,
                                                    alignItems: 'center'
                                                }}>
                                                <Text style={styles().ButtonPostText}>Chọn</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>


                                    </View>
                                </ScrollView>
                            </View>

                        </View>
                    </Modal>

                    {isLoading ? (
                        <View style={{
                            height: scale(711, Vertical),
                            width: scale(400, Horizontal),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            top: 0
                        }}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>) :
                        (<View></View>)}
                </ImageBackground>
            </View>
        );
    }
}
const styles = (props) => StyleSheet.create({

    IconClose: { marginLeft: scale(15, Horizontal) },
    HeaderText: { marginLeft: 'auto' },
    ButtonPost: {
        marginLeft: 'auto',
        marginRight: scale(15, Horizontal),
        borderRadius: 5,
        paddingVertical: scale(3, Vertical),
        paddingHorizontal: scale(10, Horizontal)
    },
    ButtonPostActiveColor: {
        backgroundColor: '#4489FF'
    },
    ButtonPostInactiveColor: {
        backgroundColor: '#c1c1c1'
    },
    ButtonPostText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
    ArticleHeader: {
        flexDirection: 'row',
        marginTop: scale(10, Vertical)
    },
    ArticlePrivacy: {
        borderRadius: 5,
        borderColor: '#9E9E9E'
    },
    ArticleCaption: {
        backgroundColor: 'white',
        borderColor: '#9E9E9E',
        marginHorizontal: scale(10, Horizontal),
        marginVertical: scale(10, Vertical),
        borderRadius: 5
    },
    ToolArea: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 0,
        height: scale(40, Vertical)
    },
    ToolAreaBackground: { height: null, width: null, flex: 1, resizeMode: 'stretch' },
    IconTool: { marginLeft: 'auto', marginRight: 'auto' },
    ArticleImageBounder: {
        marginLeft: scale(10, Horizontal),
    },
    ArticleImage: {
        width: scale(180, Horizontal),
        height: scale(320, Horizontal),
        resizeMode: 'cover',
        borderRadius: 10
    },
    ArticleEditImage: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 5,
        top: scale(5, Vertical),
        left: scale(5, Horizontal),
        flexDirection: 'row'
    },
    ArticleEditImageText: { marginLeft: scale(5, Horizontal) },
    ArticleDeleteImage: {
        position: 'absolute',
        borderRadius: 5,
        left: scale(150, Horizontal),
    },
    PostingIndicator: {
        height: scale(711, Vertical),
        width: scale(400, Horizontal),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    DropdownInfo: {
        borderRadius: 5,
        borderColor: '#9E9E9E',
        width: scale(200, Horizontal)
    },
})