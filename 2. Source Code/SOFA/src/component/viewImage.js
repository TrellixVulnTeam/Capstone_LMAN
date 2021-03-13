import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableHighlight, Alert, FlatList, TouchableWithoutFeedback, Modal, Image, ScrollView } from 'react-native';
import { createImageProgress } from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import { Rating } from 'react-native-ratings';
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
import { AVATAR } from '../../image/index';

const ImageProgress = createImageProgress(Image);

export default class ViewImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            isLogin: false,
            post: {
                id: 0,
                content: '',
                privacyID: 0,
                time: '',
                accountPost: 0,
                firstName: '',
                lastName: '',
                avatar: '',
                gender: 0,
                listImage: [],
                listLike: [],
                listComment: [],
                listRate: [],
                numberOfLike: 0,
                numberOfComment: 0,
                rateAverage: 0,
                isLiked: false,
                myRatePoint: 0,
            },
            image: {},
            isShowDetail: true,
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
            this.checkLoginToken();
            const { post, image } = this.props.route.params;
            this.setState({ post: post, image: image })
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
            this.setState({
                token: '',
                account: {},
                isLogin: false,
                isShowDetail: true
            });
        })
    }

    updatePostByID(key, value) {
        let post = this.state.post;
        post[key] = value;
        this.setState({ post: post });
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
                        this.updatePostByID('numberOfLike', response.listPost[0].numberOfLike);
                        this.updatePostByID('isLiked', response.listPost[0].isLiked);
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

    getContentDemo(content) {

    }

    render() {
        const { post, image, isShowDetail, isShowMore } = this.state;
        return (
            <View>
                <StatusBar hidden={true} />
                <TouchableWithoutFeedback
                    onPress={() => this.setState({ isShowDetail: !isShowDetail, isShowMore: false })}
                >
                    <View style={{ backgroundColor: 'rgba(26,26,26,1)' }}>
                        <Image
                            source={{ uri: Const.assets_domain + image.url }}
                            style={{
                                width: scale(400, Horizontal),
                                height: scale(711, Vertical),
                                resizeMode: 'contain'
                            }} />
                    </View>
                </TouchableWithoutFeedback>
                {isShowDetail ? (
                    <ScrollView style={{
                        position: 'absolute',
                        bottom: scale(10, Vertical),
                        backgroundColor: 'rgba(26,26,26,0.4)',
                        paddingLeft: scale(10, Horizontal)
                    }}>
                        <View>
                            <Text
                                onPress={() => this.navigateProfile(post.accountPost)}
                                style={{
                                    color: 'white',
                                    fontFamily: 'SanFranciscoText-Bold'
                                }}>{post.firstName + ' ' + post.lastName}</Text>
                            <Text style={{
                                color: '#B8B8B8'
                            }}>{Utils.calculateTime(post.time)}</Text>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({ isShowMore: !isShowMore })}
                        >

                            <View style={{
                                paddingTop: scale(10, Vertical),
                                flexDirection: 'row',
                                alignItems: 'flex-end'
                            }}>
                                <Text style={{
                                    color: 'white'
                                }}>{isShowMore ? post.content : post.content.substring(0, 40)}</Text>
                                <TouchableHighlight
                                    underlayColor={'£9E9E9E'}
                                    onPress={() => this.setState({ isShowMore: !isShowMore })}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        {!isShowMore ? (
                                            <View>
                                                <Text style={{
                                                    color: '#B8B8B8'
                                                }}> ...Xem thêm</Text>
                                            </View>
                                        ) : (<View></View>)}
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={Style.newsfeed.ArticleAction}>
                            <MaterialCommunityIcons
                                onPress={() => this.onPressLikePost(post)}
                                name={post.isLiked ? 'heart' : 'heart-outline'}
                                size={30}
                                color={post.isLiked ? '#dc3f1c' : 'white'} />
                            <Text style={
                                [Style.newsfeed.ArticleNumberOfReact,
                                {
                                    color: 'white'
                                }
                                ]}>{post.numberOfLike}</Text>
                            <FontAwesome5
                                onPress={() => this.onPressCommentIcon(post)}
                                style={Style.newsfeed.ArticleIconOfReact}
                                name='comment-dots' size={30}
                                color={'white'} />
                            <Text
                                style={
                                    [Style.newsfeed.ArticleNumberOfReact,
                                    {
                                        color: 'white'
                                    }
                                    ]}
                            >{post.numberOfComment}</Text>
                        </View>
                    </ScrollView>
                ) : (<View></View>)
                }
            </View>
        )
    }
}