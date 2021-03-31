import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, FlatList, TouchableWithoutFeedback, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
import { Rating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Badge, Icon, withBadge } from 'react-native-elements';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { scale, getData, storeData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import { AVATAR } from '../../image/index';
import ViewImageModal from './viewImageModel';
import PushNotification from "react-native-push-notification";
import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import NotificationWSS from '../service/NotificationWSS';


const BadgedIcon = withBadge(1)(Icon)

export default class Newsfeed extends Component {
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
            numberUnreadNotification: 0,
        }
    }

    // notificationWSS = NotificationWSS.getInstance();

    actionArticleNotOwn = [
        {
            key: 'savepost',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => !this.state.currentPostSelect.isMarked ? 'Lưu bài viết' : 'Bỏ lưu bài viết',
            detail: () => !this.state.currentPostSelect.isMarked ? 'Thêm vào danh sách các mục đã lưu' : 'Xóa khỏi danh sách các mục đã lưu',
            onPress: () => {
                console.log(this.state.currentPostSelect);
                if (!this.state.currentPostSelect.isMarked) {
                    console.log('save post', this.state.currentPostSelect.id);
                    MarkupPostService.markupPost(this.state.currentPostSelect.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.updatePostByID(response.listMarkup[0].postID, 'isMarked', true);
                                ToastAndroid.show("Đã lưu bài viết này. Bạn có thể tim trong danh sách bài viết đã lưu.", ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Lưu bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Lưu bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                } else {
                    MarkupPostService.unmarkupPost(this.state.currentPostSelect.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.updatePostByID(response.listMarkup[0].postID, 'isMarked', false);
                                ToastAndroid.show("Đã xóa bài viết khỏi danh sách.", ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Xóa bài viết khỏi danh sách không thành công! Hãy thử lại!", ToastAndroid.LONG);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Xóa bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                }
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
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
            }
        },
        {
            key: 'reportpost',
            icon: () => <Octicons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo bài viết này',
            detail: () => 'Tôi lo ngại về bài viết này',
            onPress: () => {
                console.log('report post', this.state.currentPostSelect.id);
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
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
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
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
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
                this.setState({ isShowMenu: false });
            }
        },


    ]
    actionArticleOwn = [
        {
            key: 'savepost',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => !this.state.currentPostSelect.isMarked ? 'Lưu bài viết' : 'Bỏ lưu bài viết',
            detail: () => !this.state.currentPostSelect.isMarked ? 'Thêm vào danh sách các mục đã lưu' : 'Xóa khỏi danh sách các mục đã lưu',
            onPress: () => {
                console.log(this.state.currentPostSelect);
                if (!this.state.currentPostSelect.isMarked) {
                    console.log('save post', this.state.currentPostSelect.id);
                    MarkupPostService.markupPost(this.state.currentPostSelect.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.updatePostByID(response.listMarkup[0].postID, 'isMarked', true);
                                ToastAndroid.show("Đã lưu bài viết này. Bạn có thể tim trong danh sách bài viết đã lưu.", ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Lưu bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Lưu bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                } else {
                    MarkupPostService.unmarkupPost(this.state.currentPostSelect.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.updatePostByID(response.listMarkup[0].postID, 'isMarked', false);
                                ToastAndroid.show("Đã xóa bài viết khỏi danh sách.", ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Xóa bài viết khỏi danh sách không thành công! Hãy thử lại!", ToastAndroid.LONG);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Xóa bài viết khỏi danh sách không thành công! Hãy thử lại!", ToastAndroid.LONG);
                            }
                        })
                }
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


    loadUnreadNotification() {
        NotificationService.getUnreadNotification(this.state.account.accountID)
            .then(response => {
                // console.log('Unread notfication', response.listNoti.length);
                this.setState({ numberUnreadNotification: response.listNoti.length });
                this.notificationConnection();
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    notificationConnection() {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    console.log(this.connection);
                    if (typeof this.connection === 'undefined') {
                        this.connection = new signalR.HubConnectionBuilder()
                            .withUrl(Const.domain + 'notification', {
                                accessTokenFactory: () => token,
                                skipNegotiation: true,
                                transport: signalR.HttpTransportType.WebSockets
                            })
                            .build();
                        this.connection.start().then(() => {
                            console.log('Connected');
                        }).catch(function (err) {
                            return console.error(err.toString());
                        });
                        this.connection.on("NewNotification", data => {
                            console.log(data.fromAccountName + ' ' + data.content);
                            if (data) {
                                this.setState({ numberUnreadNotification: this.state.numberUnreadNotification + 1 })
                            }
                        });
                    }
                }
            })
            .catch(reason => {
                console.log(reason);
            })
    }


    checkLoginToken = async () => {

        AuthService.getProfile()
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ account: response, isLogin: true });
                } else {
                    this.setState({ account: {}, isLogin: false });
                }
            })
            .catch(reason => {
                console.log(reason);
                this.setState({ account: {}, isLogin: false });
            })
    }

    getAllPost = async (page) => {
        PostService.getAllPublicPost(page)
            .then(response => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listPostRes = response.listPost;
                    for (let i = 0; i < listPostRes.length; i++) {
                        listPostRes.isShowComment = false;
                    }
                    if (page > 1) {
                        console.log('load more', listPostRes.length);
                        if (listPostRes.length > 0) {
                            this.setState({ listPost: [...this.state.listPost, ...listPostRes], listPostRefreshing: false });
                        } else {
                            this.setState({ listPostRefreshing: false });
                        }
                    } else {
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
                console.log(reason);
            })
    }

    componentDidMount() {
        this.checkLoginToken();
        this.getAllPost(1);
        this.loadUnreadNotification()
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
            // console.log(this.props.route);
            if (this.props.route && this.props.route.params && this.props.route.params.preScreen == 'CreatePost') { this.getAllPost(1); }
        });
        // this._screenUnfocus = this.props.navigation.addListener('blur', () => {
        //     this.setState({
        //         token: '',
        //         account: {},
        //         isLogin: false,
        //         isKeyBoardShow: false,
        //         keyboardHeight: 0,
        //         isShowMenu: false,
        //         currentPostID: 0
        //     });
        // })
    }

    componentWillUnmount() {
        console.log('Will Unmount newsfeed');
        this.connection.stop();
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
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.removePost(response.listPost[0].id);
                    ToastAndroid.show("Đã xóa bài viết này tài khoản của bạn! Mọi người sẽ không thể tìm thấy cũng như xem lại bài viết này!", ToastAndroid.LONG);
                } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                    console.log(response.errorMessage);
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                }
            })
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
        if (!post.isLiked) {
            PostService.likePost(post.id)
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
                    if (reason.code = Const.REQUEST_CODE_NOT_LOGIN) {
                        ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                    }
                })
        } else {
            PostService.unlikePost(post.id)
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
                    if (reason.code = Const.REQUEST_CODE_NOT_LOGIN) {
                        ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                    }
                })
        }
    }
    /**
     * Process when user rate a post
     * @param {Data of the post} post 
     * @param {Rate point} rating 
     */
    ratingCompleted(post, rating) {
        PostService.ratePost(post.id, rating)
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
                if (reason.code = Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                }
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

    onPressImage(post, image) {
        //this.props.navigation.navigate('ViewImage', { 'post': post, 'image': image });
        this.setState({ currentShowImage: image, currentShowImagePost: post });
        this.setState({ isShowImage: true });
    }

    Article = ({ data }) => {
        let post = data;
        return (
            <View
                style={Style.newsfeed.Article}
            >
                <View style={Style.common.flexRow}>
                    <TouchableWithoutFeedback
                        onPress={() => this.navigateProfile(post.accountPost)}
                    >
                        <Image
                            source={post.avatar && post.avatar.length > 0 ?
                                { uri: Const.assets_domain + post.avatar } : AVATAR}
                            style={Style.newsfeed.ArticleAvatar} />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('PostDetail', { postID: post.id })}
                    >
                        <View style={Style.newsfeed.ArticleHeader}>
                            <Text
                                onPress={() => this.navigateProfile(post.accountPost)}
                                style={Style.newsfeed.ArticleAuthor}>{post.firstName + ' ' + post.lastName}</Text>
                            <Text style={Style.newsfeed.ArticleTime}>{Utils.calculateTime(post.time)}</Text>
                        </View>
                    </TouchableOpacity>
                    <MaterialCommunityIcons
                        onPress={() => {
                            this.setState({ currentPostSelect: post });
                            this.setState({ isShowMenu: true });
                        }}
                        style={Style.newsfeed.ArticleMenu}
                        name='dots-horizontal' size={30} color={'black'} />

                </View>
                <View style={Style.newsfeed.ArticleCaption}>
                    <Text style={Style.newsfeed.ArticleCaptionContent}>{post.content}</Text>
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
                                <TouchableWithoutFeedback
                                    onPress={() => this.onPressImage(post, item)}
                                >
                                    <View style={Style.newsfeed.ArticleImageStyle}>
                                        <Image
                                            style={Style.newsfeed.ArticleImage}
                                            source={{ uri: Const.assets_domain + item.url }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }}
                    />

                </View>
                <View style={Style.newsfeed.ArtileMore}>
                    <View style={Style.newsfeed.ArticleAction}>
                        <TouchableOpacity
                            onPress={() => this.onPressLikePost(post)}
                        >

                            <MaterialCommunityIcons
                                name={post.isLiked ? 'heart' : 'heart-outline'}
                                size={30}
                                color={post.isLiked ? '#dc3f1c' : '#232323'} />
                        </TouchableOpacity>

                        <Text style={Style.newsfeed.ArticleNumberOfReact}>{post.numberOfLike}</Text>
                        <TouchableOpacity
                            onPress={() => this.onPressCommentIcon(post)}
                        >
                            <FontAwesome5
                                style={Style.newsfeed.ArticleIconOfReact}
                                name='comment-dots' size={30}
                                color={'#232323'} />
                        </TouchableOpacity>
                        <Text style={Style.newsfeed.ArticleNumberOfReact}>{post.numberOfComment}</Text>
                        <Rating
                            style={Style.newsfeed.ArticleIconOfReact}
                            ratingCount={5}
                            imageSize={30}
                            type='custom'
                            ratingColor='#dc3f1c'
                            tintColor='#f8e5d6'
                            readonly={!this.state.isLogin}
                            //ratingBackgroundColor='#FFF2D1'
                            onFinishRating={(rating) => this.ratingCompleted(post, rating)}
                            startingValue={post.myRatePoint}
                        />
                        <Text style={Style.newsfeed.ArticleNumberOfReact}>{post.rateAverage + '/5'}</Text>
                    </View>
                </View>
            </View>
        )
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
                    <View
                        style={Style.newsfeed.notificationIcon}
                    >
                        <Ionicons
                            name={'notifications'} color={'#fef4ca'} size={30}
                            onPress={() => this.props.navigation.navigate('Notification')} />
                        {this.state.numberUnreadNotification > 0 ? (
                            <Badge
                                value={this.state.numberUnreadNotification}
                                status="error"
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                            />
                        ) : (<View></View>)}

                    </View>
                    <MaterialCommunityIcons
                        style={Style.newsfeed.notificationIcon}
                        name={'message-text-outline'} color={'#fef4ca'} size={30} />
                </View>
                <View style={Style.newsfeed.listArticle}>
                    <FlatList
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
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={isShowMenu}
                        onRequestClose={() => {
                            this.setState({ isShowMenu: false });
                        }}
                    >
                        <View style={Style.newsfeed.articleMenu}>
                            {account.accountID != currentPostSelect.accountPost ?
                                this.actionArticleNotOwn.map(item =>
                                    <TouchableHighlight
                                        key={item.key}
                                        onPress={() => item.onPress()}
                                        underlayColor={'#9E9E9E'}
                                    >
                                        <View
                                            style={Style.newsfeed.articleMenuItem}>
                                            {item.icon()}
                                            <View style={Style.newsfeed.articleMenuItemText} >
                                                <Text>{item.title()}</Text>
                                                <Text style={Style.newsfeed.articleMenuItemTextDetail}>{item.detail()}</Text>
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
                                            style={Style.newsfeed.articleMenuItem}>
                                            {item.icon()}
                                            <View style={Style.newsfeed.articleMenuItemText} >
                                                <Text>{item.title()}</Text>
                                                <Text style={Style.newsfeed.articleMenuItemTextDetail}>{item.detail()}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )
                            }
                        </View>
                    </Modal>
                    <ViewImageModal
                        image={this.state.currentShowImage}
                        post={this.state.currentShowImagePost}
                        visible={this.state.isShowImage}
                        onRequestClose={() => {
                            this.setState({ isShowImage: false });
                            this.setState({ currentShowImage: {}, currentShowImagePost: {} })
                        }}
                    />
                </View>
            </View >
        )
    }
}