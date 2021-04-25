import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, FlatList, TouchableWithoutFeedback, Modal, TouchableOpacity, ToastAndroid, ImageBackground, } from 'react-native';
import { Rating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Badge, Icon, withBadge } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import * as signalR from '@microsoft/signalr';
import * as Style from '../style/style';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import { scale, getData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';
import ViewImageModal from './viewImageModel';

import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as MessageService from '../service/messageService';
import * as FollowService from '../service/followService';
import Session from "../common/session";

import PostMenu from './postMenu';
import PushNotification from "react-native-push-notification";

const BadgedIcon = withBadge(1)(Icon);

export default class Hot extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        };
    }

    postMenu = createRef();

    checkLoginToken = async () => {
        AuthService.getProfile()
            .then((response) => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ account: response, isLogin: true });
                } else {
                    this.setState({ account: {}, isLogin: false });
                }
            })
            .catch((reason) => {
                console.log(reason);
                this.setState({ account: {}, isLogin: false });
            });
    };

    getAllPost = async (page) => {
        PostService.getFashionistaPost(page)
            .then((response) => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listPostRes = response.listPost;
                    for (let i = 0; i < listPostRes.length; i++) {
                        listPostRes.isShowComment = false;
                    }
                    if (page > 1) {
                        if (listPostRes.length > 0) {
                            this.setState({
                                listPost: [...this.state.listPost, ...listPostRes],
                                listPostRefreshing: false,
                            });
                        } else {
                            this.setState({ listPostRefreshing: false });
                        }
                    } else {
                        if (listPostRes.length > 0) {
                            this.setState({ listPost: listPostRes, listPostRefreshing: false });
                        } else {
                            this.setState({ listPostRefreshing: false });
                        }
                    }
                }
            })
            .catch((reason) => {
                console.log(reason);
            });
    };

    componentDidMount() {
        this.checkLoginToken();
        this.getAllPost(1);
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
            if (this.props.route && this.props.route.params && (this.props.route.params.preScreen == 'CreatePost' || this.props.route.params.isRefresh)) {
                this.getAllPost(1);
            }
        });
    }

    componentWillUnmount() {
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
            this.props.navigation.navigate('OtherProfile', { accountID: accountID });
        }
    }

    onPressImage(post, image) {
        //this.props.navigation.navigate('ViewImage', { 'post': post, 'image': image });
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
                    {post.listImage.length > 1 ? (
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
                    ) : (<View></View>)}

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
        const { isShowMenu, listPost, account, currentPostSelect, listPostRefreshing, } = this.state;
        return (
            <View style={Style.common.container}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <ImageBackground
                    source={OCEAN_BACKGROUND}
                    style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                    <View style={[Style.newsfeed.Header]}>
                        <View>
                            <Text style={[Style.newsfeed.SofaTitle, { color: 'white', position: 'absolute', top: -2, left: -2 }]}>Hot</Text>
                            <Text style={Style.newsfeed.SofaTitle}>Hot</Text>

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
                                this.getAllPost(this.state.page + 1);
                                this.setState({ page: this.state.page + 1 });
                            }}
                            onEndReachedThreshold={0.8}
                            refreshing={listPostRefreshing}
                            onRefresh={() => {
                                this.setState({ page: 1, listPostRefreshing: true });
                                this.getAllPost(1);
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
                </ImageBackground>
            </View>
        );
    }
}
