import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, TouchableOpacity, FlatList, TouchableWithoutFeedback, Modal, StyleSheet, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import { Rating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import * as Style from '../style/style';
import { scale, calculateTime } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR } from '../../image/index';
import ViewImageModal from './viewImageModel';
import PostMenu from '../component/postMenu';
import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';


export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            account: {
                accountID: 0,
                username: '',
                AccountID: 0,
                FirstName: '',
                LastName: '',
                Gender: true,
                DOB: '',
                Email: '',
                Phone: '',
                Address: '',
                AvatarUri: '',
                Avatar: '',
                followerNumber: 0,
                postNumber: 0,
                UserName: 0,
                Role: '',
            },
            post: {
                id: 0,
                content: '',
                privacyID: 0,
                time: '',
                bodyInfoID: 0,
                accountPost: 0,
                firstName: '',
                lastName: '',
                avatar: '',
                gender: true,
                listImage: [],
                listLike: [],
                listComment: [],
                listRate: [],
                numberOfLike: 0,
                numberOfComment: 0,
                rateAverage: 0,
                isLiked: false,
                myRatePoint: 0,
                isVerified: true,
                isMarked: false
            },
            currentShowImage: {},
            currentShowImagePost: {},
            isShowImage: false,
            isShowMenu: false,
            commentPage: 1,
            isRefresing: false,
            commentText: '',
            isLoading: true,
            isLoadMoreComment: false,
        }
    }

    actionArticleNotOwn = [
        {
            key: 'savepost',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => !this.state.post.isMarked ? 'Lưu bài viết' : 'Bỏ lưu bài viết',
            detail: () => !this.state.post.isMarked ? 'Thêm vào danh sách các mục đã lưu' : 'Xóa khỏi danh sách các mục đã lưu',
            onPress: () => {
                if (!this.state.post.isMarked) {
                    MarkupPostService.markupPost(this.state.post.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.updatePost('isMarked', true);
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
                    MarkupPostService.unmarkupPost(this.state.post.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.updatePost('isMarked', false);
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
            key: 'hidepost',
            icon: () => <AntDesign name='closesquareo' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Ẩn bài viết',
            detail: () => 'Ẩn bài viết này khỏi newsfeed của bạn',
            onPress: () => {
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
            }
        },
        {
            key: 'reportpost',
            icon: () => <Octicons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo bài viết này',
            detail: () => 'Tôi lo ngại về bài viết này',
            onPress: () => {
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'followuserpost',
            icon: () => <SimpleLineIcons name='user-follow' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Theo dõi ' + this.state.post.lastName,
            detail: () => 'Xem những bài viết từ người này',
            onPress: () => {
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'reportuser',
            icon: () => <MaterialIcons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo ' + this.state.post.lastName,
            detail: () => 'Tôi lo ngại về người dùng này',
            onPress: () => {
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
                this.setState({ isShowMenu: false });
            }
        },


    ]
    actionArticleOwn = [
        {
            key: 'savepost',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => !this.state.post.isMarked ? 'Lưu bài viết' : 'Bỏ lưu bài viết',
            detail: () => !this.state.post.isMarked ? 'Thêm vào danh sách các mục đã lưu' : 'Xóa khỏi danh sách các mục đã lưu',
            onPress: () => {
                if (!this.state.post.isMarked) {
                    MarkupPostService.markupPost(this.state.post.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.updatePost(response.listMarkup[0].postID, 'isMarked', true);
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
                    MarkupPostService.unmarkupPost(this.state.post.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.updatePost(response.listMarkup[0].postID, 'isMarked', false);
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
                                ToastAndroid.show("Đã xóa bài viết khỏi danh sách.", ToastAndroid.LONG);
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
                this.setState({ isShowMenu: false });
                this.deletePost(this.state.post.id);
            }
        },
        {
            key: 'editpost',
            icon: () => <MaterialIcons name='mode-edit' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Chỉnh sửa bài viết',
            detail: () => 'Chỉnh sửa nội dung của bài viết',
            onPress: () => {
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
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


    checkLoginToken = () => {
        AuthService.getProfile()
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ account: response, isLogin: true });
                }
            })
            .catch(reason => {
                this.setState({ account: response, isLogin: false });
                console.log(reason);
            });
    }

    getPostDetail(postID) {
        PostService.getPostDetail(postID)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let post = response.listPost[0];
                    post.listComment = post.listComment.reverse();
                    this.setState({ post: response.listPost[0] });
                    this.setState({ isLoading: false });
                }
            })
            .catch(reason => {
                console.log(reason);
                ToastAndroid.show("Tải bài viết không thành công! Hãy thử lại!", ToastAndroid.LONG);
                this.setState({ isLoading: false });
            });
    }

    loadMoreComment() {
        const { post, commentPage } = this.state;
        this.setState({ isLoadMoreComment: true });
        PostService.getCommentOfPost(post.id, commentPage + 1)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    if (response.listPost[0].listComment.length > 0) {
                        let listComment = response.listPost[0].listComment;
                        listComment = listComment.reverse();
                        let temp = post.listComment;
                        listComment = listComment.concat(temp);
                        this.setState({ post: { ...this.state.post, listComment: listComment } });
                        this.setState({ isLoadMoreComment: false, commentPage: commentPage + 1 });
                    }
                }
            })
            .catch(reason => {
                console.log(reason);
                this.setState({ isLoadMoreComment: false });
                ToastAndroid.show("Lỗi khi tải thêm bình luận", ToastAndroid.LONG);
            })
    }

    updatePost(key, value) {
        let postTemp = this.state.post;
        postTemp[key] = value;
        this.setState({ post: postTemp });
    }

    deletePost(postID) {
        PostService.deletePost(postID)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.props.navigation.goBack();
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show("Xóa không thành công! Hãy thử lại!", ToastAndroid.LONG);
                }
            });
    }

    onPressComment(postID, comment) {
        PostService.commentPost(postID, comment)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let commentRes = response.listPost[0].listComment[0];
                    let listComment = this.state.post.listComment;
                    listComment.push(commentRes);
                    this.setState({ post: { ...this.state.post, listComment: listComment }, commentText: '' });
                } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                    ToastAndroid.show('Bình luận không thành công! Hãy thử lại!', ToastAndroid.LONG);
                    console.log(response.errorMessage);
                }
            })
            .catch(reason => {
                console.log(reason);
                this.setState({ commentText: '' });

                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show("Bình luận bài viết không thành công! Hãy thử lại!", ToastAndroid.LONG);
                }
            })
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
                        let listLike = response.listPost[0].listLike;
                        this.updatePost('listLike', listLike)
                        this.updatePost('numberOfLike', response.listPost[0].numberOfLike);
                        this.updatePost('isLiked', response.listPost[0].isLiked);
                    } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                        console.log(response.errorMessage);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                    if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                        ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                    } else {
                        ToastAndroid.show("Yêu thích bài viết không thành công! Hãy thử lại!", ToastAndroid.LONG);
                    }
                })
        } else {
            PostService.unlikePost(post.id)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        let listLike = response.listPost[0].listLike;
                        this.updatePost('listLike', listLike)
                        this.updatePost('numberOfLike', response.listPost[0].numberOfLike);
                        this.updatePost('isLiked', response.listPost[0].isLiked);
                    } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                        console.log(response.errorMessage);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                    if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                        ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                    } else {
                        ToastAndroid.show("Bỏ yêu thích không thành công! Hãy thử lại!", ToastAndroid.LONG);
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
                    this.updatePost('myRatePoint', response.listPost[0].myRatePoint);
                    this.updatePost('rateAverage', response.listPost[0].rateAverage);
                } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                    console.log(response.errorMessage);
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show("Đánh giá bài viết không thành công! Hãy thử lại!", ToastAndroid.LONG);
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
        this.setState({ currentShowImage: image, isShowImage: true });
    }

    componentDidMount() {
        this.checkLoginToken();
        this.setState({ post: { ...this.state.post, id: 85 } });
        this.getPostDetail(85);
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoading: true });
            this.checkLoginToken()
            let { postID } = this.props.route.params;
            this.setState({ post: { ...this.state.post, id: postID } });
            this.getPostDetail(postID);
        });
    }

    render() {
        const { post, isShowImage, currentShowImage, commentText, isLoading, isLoadMoreComment } = this.state;
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                {post.accountPost && post.accountPost != 0 ? (
                    <View>
                        <FlatList
                            ListHeaderComponent={(
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        paddingVertical: scale(10, Vertical),
                                    }}
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

                                        <View style={Style.newsfeed.ArticleHeader}>
                                            <Text
                                                onPress={() => this.navigateProfile(post.accountPost)}
                                                style={{ fontFamily: 'SanFranciscoText-Bold' }}>{post.firstName + ' ' + post.lastName}</Text>
                                            <Text style={{ fontFamily: 'SanFranciscoText-Regular' }}>{Utils.calculateTime(post.time)}</Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            onPress={() => {
                                                this.setState({ isShowMenu: true });
                                                this.postMenu.onPrepare();
                                            }}
                                            style={Style.newsfeed.ArticleMenu}
                                            name='dots-horizontal' size={30} color={'black'} />

                                    </View>
                                    <View style={Style.newsfeed.ArticleCaption}>
                                        <Text style={{
                                            fontSize: 16,
                                            textAlignVertical: 'center',
                                            marginLeft: scale(20, Horizontal),
                                            marginRight: scale(10, Horizontal),
                                            marginTop: scale(10, Horizontal),
                                            color: 'black'
                                        }}>{post.content}</Text>
                                    </View>
                                    <View style={{
                                        height: scale(400, Vertical),
                                        marginTop: scale(20, Vertical),
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                    }}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
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
                                                                style={{
                                                                    flex: 1,
                                                                    height: scale(400, Horizontal),
                                                                    width: scale(400, Horizontal),
                                                                    resizeMode: 'cover',
                                                                    borderRadius: 20,
                                                                }}
                                                                source={{ uri: Const.assets_domain + item.url }} />
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                            }}
                                        />

                                    </View>
                                    <View style={[Style.newsfeed.ArtileMore]}>
                                        <View style={
                                            {
                                                borderTopWidth: 0.5,
                                                borderBottomWidth: 0.5,
                                                marginTop: scale(5, Vertical),
                                                paddingVertical: scale(5, Vertical),
                                                flexDirection: 'row',
                                                width: scale(400, Horizontal),
                                                borderRadius: 10
                                            }}>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                }}
                                                activeOpacity={0.2}
                                                onPress={() => this.onPressLikePost(post)}
                                            >
                                                <MaterialCommunityIcons
                                                    name={post.isLiked ? 'heart' : 'heart-outline'}
                                                    size={30}
                                                    color={post.isLiked ? 'rgba(48,128,153,1)' : '#232323'} />
                                                <Text style={Style.newsfeed.ArticleNumberOfReact}>Yêu thích</Text>
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <Rating
                                                    ratingCount={5}
                                                    imageSize={30}
                                                    type='custom'
                                                    ratingColor='rgba(48,128,153,1)'
                                                    tintColor='white'
                                                    readonly={!this.state.isLogin}
                                                    ratingBackgroundColor='#FFF2D1'
                                                    onFinishRating={(rating) => this.ratingCompleted(post, rating)}
                                                    startingValue={post.myRatePoint}
                                                />
                                                <Text style={Style.newsfeed.ArticleNumberOfReact}>{post.rateAverage + '/5'}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            {post.listLike.length > 0 ? (
                                                <View style={{ flexDirection: 'row', marginLeft: scale(20, Horizontal) }}>
                                                    <MaterialCommunityIcons
                                                        name={'heart'}
                                                        size={16}
                                                        color={'rgba(48,128,153,1)'} />
                                                    <Text>{post.listLike[post.listLike.length - 1].firstName + ' ' + post.listLike[post.listLike.length - 1].lastName}</Text>
                                                    {post.listLike.length > 1 ? (
                                                        <View>
                                                            <Text>{' và ' + (post.numberOfLike - 1) + ' Người khác '}</Text>
                                                        </View>
                                                    ) : (<View></View>)}
                                                </View>
                                            ) : (<View></View>)}
                                        </View>
                                    </View>
                                    {post.numberOfComment > post.listComment.length ?
                                        (
                                            <TouchableOpacity
                                                disabled={isLoadMoreComment}
                                                onPress={() => this.loadMoreComment()}
                                            >
                                                <View>
                                                    {!isLoadMoreComment ? (
                                                        <View>
                                                            <Text style={[{
                                                                color: '#787878'
                                                            }, styles.CommentItemBounder]}>Xem thêm bình luần</Text>
                                                        </View>
                                                    ) : (<View>
                                                        <ActivityIndicator size="small" color="rgb(48,128,153)" />
                                                    </View>)}
                                                </View>
                                            </TouchableOpacity>
                                        ) : (<View></View>)}
                                </View>

                            )}
                            ListFooterComponent={(
                                <View>
                                    <TextInput
                                        placeholder={'Viết bình luận'}
                                        returnKeyLabel={'Gửi'}
                                        returnKeyType={'send'}
                                        value={commentText}
                                        onChangeText={text => this.setState({ commentText: text })}
                                        onSubmitEditing={() => this.onPressComment(post.id, commentText)}
                                        style={[styles.CommentTextBox]}
                                    />
                                </View>

                            )}
                            data={post.listComment}
                            keyExtractor={(item, index) => item.id + ''}
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
                                                    onPress={() => this.navigateProfile(item.accountID)}>{item.firstName + " " + item.lastName}
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
                        />
                        <PostMenu
                            ref={child => { this.postMenu = child }}
                            post={post}
                            visible={this.state.isShowMenu}
                            onRequestClose={() => {
                                this.setState({ isShowMenu: false });
                            }}
                            onMarkupPost={response => {
                                this.updatePost('isMarked', true);
                            }}
                            onUnmarkupPost={response => {
                                this.updatePost('isMarked', false);
                            }}
                            onPressDeletePost={response => {
                                this.deletePost(post.id);
                            }}
                            onPressEditPost={(postID) => {
                                this.props.navigation.navigate('EditPost', { 'postID': postID })
                            }}
                            onPressBuyPlace={(postRes) => {
                                this.props.navigation.navigate("SellPlace", { 'post': postRes });
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
                                this.setState({ currentShowImage: {}, currentShowImagePost: {} })
                            }}
                        />
                        <ViewImageModal
                            image={currentShowImage}
                            post={post}
                            visible={isShowImage}
                            onRequestClose={() => {
                                this.setState({ isShowImage: false });
                                this.setState({ currentShowImage: {} })
                            }}
                        />
                    </View>) : (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: scale(711, Vertical),
                        width: scale(400, Horizontal)
                    }}>
                        <Text>Nội dung này không tồn tại hoặc đã bị xóa!</Text>
                    </View>)
                }
                {
                    isLoading ? (
                        <View style={{ backgroundColor: 'white', position: 'absolute', height: scale(711, Vertical), width: scale(400, Horizontal), justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                    ) : <View></View>
                }
            </View >
        )
    }
}
const styles = StyleSheet.create({
    CommentItemBounder: {
        marginLeft: scale(10, Horizontal),
        marginTop: scale(10, Vertical),
    },
    CommentItem: {
        width: scale(300, Horizontal),
        minHeight: scale(50, Vertical),
        borderRadius: 10,
        backgroundColor: '#E6E6E6'
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
    CommentContent: { marginLeft: scale(10, Horizontal) },
    CommentTextBox: {
        backgroundColor: '#E6E6E6',
        borderRadius: 10,
        width: scale(300, Horizontal),
        minHeight: scale(50, Vertical),
        marginLeft: scale(50, Horizontal),
        marginTop: scale(10, Vertical),
        marginBottom: scale(10, Vertical)
    },
    CommentAction: {
        marginTop: scale(5, Vertical),
        flexDirection: 'row',
        marginLeft: scale(50, Horizontal)
    }
})