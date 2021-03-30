import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, TouchableOpacity, Alert, FlatList, TouchableWithoutFeedback, Modal, ScrollView, StyleSheet, TextInput } from 'react-native';
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
import { scale, calculateTime } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR } from '../../image/index';
import ViewImageModal from './viewImageModel';
import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';

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
                isVerified: true
            },
            currentShowImage: {},
            currentShowImagePost: {},
            isShowImage: false,
            isShowMenu: false,
            commentPage: 1,
            isRefresing: false,
            commentText: '',
        }
    }
    actionArticleNotOwn = [
        {
            key: 'savepost',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Lưu bài viết',
            detail: () => 'Thêm vào danh sách các mục đã lưu',
            onPress: () => {
                console.log('save post', this.state.post.id);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'hidepost',
            icon: () => <AntDesign name='closesquareo' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Ẩn bài viết',
            detail: () => 'Ẩn bài viết này khỏi newsfeed của bạn',
            onPress: () => {
                console.log('hide post', this.state.post.id);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'reportpost',
            icon: () => <Octicons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo bài viết này',
            detail: () => 'Tôi lo ngại về bài viết này',
            onPress: () => {
                console.log('report post', this.state.post.id);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'followuserpost',
            icon: () => <SimpleLineIcons name='user-follow' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Theo dõi ' + this.state.post.lastName,
            detail: () => 'Xem những bài viết từ người này',
            onPress: () => {
                console.log('follow user', this.state.post.id);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'reportuser',
            icon: () => <MaterialIcons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo ' + this.state.post.lastName,
            detail: () => 'Tôi lo ngại về người dùng này',
            onPress: () => {
                console.log('report user', this.state.post.id);
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
                console.log('save post', this.state.post.id);
                this.setState({ isShowMenu: false });
            }
        },
        {
            key: 'deletepost',
            icon: () => <AntDesign name='delete' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Xóa bài viết',
            detail: () => 'Xóa bài viết này khỏi danh sách bài viết của bạn',
            onPress: () => {
                console.log('delete post', this.state.post.id);
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
                console.log('edit post', this.state.post.id);
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
                    this.setState({ post: response.listPost[0] });
                }
            })
            .catch(reason => {
                console.log(reason);
                Alert.alert("Lỗi rồi!!!", "Opps!!! có lỗi rồi! Thử lại nhé <3");
            });
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
                    Alert.alert('Thông báo', 'Hãy đăng nhập để thực hiện việc này');
                } else {
                    Alert.alert("Lỗi rồi!!!", "Opps!!! có lỗi rồi! Thử lại nhé <3");
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
                    console.log(response.errorMessage);
                }
            })
            .catch(reason => {
                console.log(reason);
                this.setState({ commentText: '' });

                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    Alert.alert('Thông báo', 'Hãy đăng nhập để thực hiện việc này');
                } else {
                    Alert.alert("Lỗi rồi!!!", "Opps!!! có lỗi rồi! Thử lại nhé <3");
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
                        Alert.alert('Thông báo', 'Hãy đăng nhập để thực hiện việc này');
                    } else {
                        Alert.alert("Lỗi rồi!!!", "Opps!!! có lỗi rồi! Thử lại nhé <3");
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
                        Alert.alert('Thông báo', 'Hãy đăng nhập để thực hiện việc này');
                    } else {
                        Alert.alert("Lỗi rồi!!!", "Opps!!! có lỗi rồi! Thử lại nhé <3");
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
                    Alert.alert('Thông báo', 'Hãy đăng nhập để thực hiện việc này');
                } else {
                    Alert.alert("Lỗi rồi!!!", "Opps!!! có lỗi rồi! Thử lại nhé <3");
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

    GetAllComment(post, page) {
        PostService.getCommentOfPost(post.id, page)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    if (response.listPost.length > 0) {
                        let listComment = response.listPost[0].listComment;
                        if (page == 1) {
                            if (listComment.length > 0) {
                                this.setState({ listComment: listComment, isRefresing: false });
                            } else {
                                this.setState({ isRefresing: false });
                            }
                        } else {
                            if (listComment.length > 0) {
                                this.setState({ listComment: [...this.state.listComment, ...listComment], isRefresing: false })
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
            });

    }

    componentDidMount() {
        this.checkLoginToken();
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken()
            let { postID } = this.props.route.params;
            this.setState({ post: { ...this.state.post, id: postID } });
            this.getPostDetail(postID);
        });
    }

    render() {
        const { isShowMenu, post, account, listPostRefreshing, isShowImage, currentShowImage, commentText } = this.state;
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
                                        // marginTop: scale(20, Vertical),
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        paddingVertical: scale(10, Vertical),
                                        height: scale(711, Vertical)
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
                                                this.setState({ isShowMenu: true });
                                            }}
                                            style={Style.newsfeed.ArticleMenu}
                                            name='dots-horizontal' size={30} color={'black'} />

                                    </View>
                                    <View style={Style.newsfeed.ArticleCaption}>
                                        <Text style={Style.newsfeed.ArticleCaptionContent}>{post.content}</Text>
                                    </View>
                                    <View style={[Style.newsfeed.ArticleImageList, {
                                        height: scale(534, Vertical)
                                    }]}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal
                                            data={post.listImage}
                                            keyExtractor={item => item.id + ''}
                                            pagingEnabled={true}
                                            renderItem={({ item }) => {
                                                console.log(item);
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
                                    <View style={[Style.newsfeed.ArtileMore]}>
                                        <View style={[Style.newsfeed.ArticleAction,
                                        {
                                            borderTopWidth: 0.5,
                                            borderBottomWidth: 0.5,
                                            marginTop: scale(5, Vertical),
                                            paddingVertical: scale(5, Vertical)
                                        }]}>
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row' }}
                                                activeOpacity={0.2}
                                                onPress={() => this.onPressLikePost(post)}
                                            >
                                                <MaterialCommunityIcons
                                                    name={post.isLiked ? 'heart' : 'heart-outline'}
                                                    size={30}
                                                    color={post.isLiked ? '#dc3f1c' : '#232323'} />
                                                <Text style={Style.newsfeed.ArticleNumberOfReact}>Yêu thích</Text>
                                            </TouchableOpacity>

                                            <Rating
                                                style={Style.newsfeed.ArticleIconOfReact}
                                                ratingCount={5}
                                                imageSize={30}
                                                type='custom'
                                                ratingColor='#dc3f1c'
                                                tintColor='white'
                                                readonly={!this.state.isLogin}
                                                ratingBackgroundColor='#FFF2D1'
                                                onFinishRating={(rating) => this.ratingCompleted(post, rating)}
                                                startingValue={post.myRatePoint}
                                            />
                                            <Text style={Style.newsfeed.ArticleNumberOfReact}>{post.rateAverage + '/5'}</Text>
                                        </View>
                                        <View>
                                            {post.listLike.length > 0 ? (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <MaterialCommunityIcons
                                                        name={'heart'}
                                                        size={16}
                                                        color={'#dc3f1c'} />
                                                    <Text>{post.listLike[0].firstName + ' ' + post.listLike[0].lastName}</Text>
                                                    {post.listLike.length > 1 ? (
                                                        <View>
                                                            <Text>{' và ' + (post.numberOfLike - 1) + ' Người khác '}</Text>
                                                        </View>
                                                    ) : (<View></View>)}
                                                </View>
                                            ) : (<View></View>)}
                                        </View>
                                    </View>

                                </View>

                            )}
                            ListFooterComponent={(
                                <View>
                                    <Text style={[{
                                        color: '#787878'
                                    }, styles.CommentItemBounder]}>Xem thêm bình luần</Text>
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
                        <View
                            style={{
                                paddingVertical: scale(5, Vertical),
                                width: scale(400, Horizontal),
                                height: scale(50, Vertical),
                                backgroundColor: 'white',
                                shadowColor: "black",
                                shadowOffset: {
                                    width: 0,
                                    height: 0.6
                                },
                                shadowOpacity: 1,
                                shadowRadius: 0.6,
                                elevation: 5
                            }}
                        >
                            <TextInput
                                placeholder={'Viết bình luận'}
                                returnKeyLabel={'Gửi'}
                                returnKeyType={'send'}
                                value={commentText}
                                onChangeText={text => this.setState({ commentText: text })}
                                onSubmitEditing={() => this.onPressComment(post.id, commentText)}
                                style={{
                                    marginLeft: scale(10, Horizontal),
                                    height: scale(40, Vertical),
                                    width: scale(360, Horizontal),
                                    backgroundColor: '#E2E2E2',
                                    borderRadius: 20,
                                    paddingLeft: scale(15, Horizontal),
                                }}
                            />
                        </View>
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={isShowMenu}
                            onRequestClose={() => {
                                this.setState({ isShowMenu: false });
                            }}
                        >
                            <View style={Style.newsfeed.articleMenu}>
                                {account.accountID != post.accountPost ?
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
                    </View>)}

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
        backgroundColor: 'white',
        borderRadius: 10
    },
    CommentAction: {
        marginTop: scale(5, Vertical),
        flexDirection: 'row',
        marginLeft: scale(50, Horizontal)
    }
})