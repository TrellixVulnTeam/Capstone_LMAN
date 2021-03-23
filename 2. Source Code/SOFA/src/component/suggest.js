import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, Alert, FlatList, TouchableWithoutFeedback, Modal, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
import { AVATAR } from '../../image/index';
import ViewImageModal from './viewImageModel';

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
                                this.setState({ isLoading: false });
                                this.getListInfo();
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


    getAllRecommendPost = async (page, type = 0) => {
        const { similarInfoID, token } = this.state;
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
            "Authorization": 'Bearer ' + token,
        };
        for (let i = 0; i < similarInfoID.length; i++) {
            console.log('get recommend post', similarInfoID[i])
            var uri = Const.domain + 'api/post/recommend?infoid=' + similarInfoID[i].itemID + '&page=' + page + '&rowsOfPage=' + Const.NEWSFEED_ROWS_OF_PAGE;
            Request.Get(uri, header)
                .then(response => {
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
                    console.log(reason);
                })
        }

    }

    getSimilarInfo = (infoID, page) => {
        const { token } = this.state;
        this.setState({ isLoading: true });

        let header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
            "Authorization": 'Bearer ' + token,
        };
        let uri = 'https://chientranhvietnam.org/Python/recommendation/getsimilar/' + infoID;
        Request.Get(uri, header)
            .then(response => {
                if (response && response.length > 0) {
                    this.setState({ similarInfoID: response });
                    console.log(this.state.similarInfoID);
                    this.setState({ isLoading: false });

                    this.getAllRecommendPost(1);
                }
            })
            .catch(reason => {
                console.log(reason);
                Alert.alert('Lỗi!!!', 'Có lỗi xảy ra rồi!!!');
            })


    }

    getListInfo = () => {
        const { token } = this.state;
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
            "Authorization": 'Bearer ' + token,
        };
        var uri = Const.domain + 'api/info';
        Request.Get(uri, header)
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
                }
            })
            .catch(reason => {
                console.log(reason);
                Alert.alert('Lỗi rồi', 'Có lỗi xảy ra');
            })
    }

    componentDidMount() {
        this.checkLoginToken();
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            console.log(this.props.route);
            if (this.props.route && this.props.route.params && this.props.route.params.isRefresh == true) { this.checkLoginToken() }
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
        // this.props.navigation.navigate('ViewImage', { 'post': post, 'image': image });
        this.setState({ currentShowImage: image, currentShowImagePost: post });
        this.setState({ isShowImage: true });
    }

    Article = ({ data }) => {
        let post = data;
        return (
            <View
                style={{
                    backgroundColor: '#f8e5d6',
                    marginBottom: scale(20, Vertical),
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    paddingVertical: scale(10, Vertical),
                    paddingLeft: scale(5, Horizontal),
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
                            style={Style.newsfeed.ArticleAuthor}>{post.firstName + ' ' + post.lastName}</Text>
                        <Text style={Style.newsfeed.ArticleTime}>{Utils.calculateTime(post.time)}</Text>
                    </View>
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
                        <MaterialCommunityIcons
                            onPress={() => this.onPressLikePost(post)}
                            name={post.isLiked ? 'heart' : 'heart-outline'}
                            size={30}
                            color={post.isLiked ? '#dc3f1c' : '#232323'} />
                        <Text style={Style.newsfeed.ArticleNumberOfReact}>{post.numberOfLike}</Text>
                        <FontAwesome5
                            onPress={() => this.onPressCommentIcon(post)}
                            style={Style.newsfeed.ArticleIconOfReact}
                            name='comment-dots' size={30}
                            color={'#232323'} />
                        <Text style={Style.newsfeed.ArticleNumberOfReact}>{post.numberOfComment}</Text>
                        <Rating
                            style={Style.newsfeed.ArticleIconOfReact}
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
                        <Text style={Style.newsfeed.ArticleNumberOfReact}>{post.rateAverage + '/5'}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { isShowMenu, listPost, account, currentPostSelect, listPostRefreshing, isLoading, info, listInfo } = this.state;
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
                <View style={{
                    height: scale(670, Vertical)
                }}>
                    <FlatList
                        data={listPost}
                        keyExtractor={(item, index) => item.id + ''}
                        renderItem={({ item, index }) => <this.Article data={item} />}
                        onEndReached={() => {
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

                </View>
                <ViewImageModal
                    image={this.state.currentShowImage}
                    post={this.state.currentShowImagePost}
                    visible={this.state.isShowImage}
                    onRequestClose={() => {
                        this.setState({ isShowImage: false });
                        this.setState({ currentShowImage: {}, currentShowImagePost: {} })
                    }}
                />
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
                                            colors={['#fbb897', '#ff8683']}
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
                                        style={{ marginLeft: 'auto', marginRight: 'auto', }}
                                        onPress={() => {
                                            this.setState({ isSelectInfo: false });
                                            this.getSimilarInfo(info.id, 1);
                                        }}
                                    >
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['#fbb897', '#ff8683']}
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
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) :
                    (<View></View>)}

            </View>
        )
    }
}
const styles = (props) => StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        flex: 1
    },
    Header: {
        height: scale(50, Vertical),
        borderBottomWidth: 1,
        borderBottomColor: '#9E9E9E',
        alignItems: 'center',
        flexDirection: 'row'
    },
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