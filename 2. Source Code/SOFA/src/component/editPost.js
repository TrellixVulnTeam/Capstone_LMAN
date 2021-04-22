import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Alert, FlatList, StyleSheet, TextInput, ActivityIndicator, TouchableHighlight, TouchableOpacity, ToastAndroid } from 'react-native';
import { StackActions } from '@react-navigation/native'
import MaskedView from '@react-native-community/masked-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient'


import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import { AVATAR, ADD_PRIMARY_IMAGE, BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';
import InfoField from './infoField';

import * as AuthService from '../service/authService';
import * as PostService from '../service/postService';

export default class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {
                firstName: '',
                lastName: '',
            },
            post: {},
            isLoading: false,
            isPrePosting: false,
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
        this.setState({ isLoading: true });
        AuthService.getProfile()
            .then((response) => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ account: response, isLogin: true, isLoading: false });
                } else {
                    this.setState({ account: {}, isLogin: false, isLoading: false });
                }
            })
            .catch((reason) => {
                console.log(reason);
                this.setState({ account: {}, isLogin: false, isLoading: false });
            });
    }


    postStatus = () => {
        const { post } = this.state;
        console.log(post.id);
        console.log(post.content);
        console.log(post.privacyID);
        PostService.updatePost(post.id, post.content, post.privacyID)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ isLoading: false });
                    if (response.listPost && response.listPost.length > 0) {
                        this.setState({
                            token: '',
                            post: { privacyID: 3 },
                            isPrePosting: false,
                            isLoading: false,
                        })
                        // this.props.navigation.dispatch(
                        //     StackActions.replace('Newsfeed', { 'isRefresh': true })
                        // )
                        this.props.navigation.navigate('Newsfeed', { 'isRefresh': true });
                    }
                } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                    this.setState({ isLoading: true });
                    console.log(response.errorMessage);
                    ToastAndroid.show('Cập nhật bài viết thất bại!', ToastAndroid.LONG);
                }
            })
            .catch(reason => {
                console.log(reason);
                if ((reason.code == Const.REQUEST_CODE_NOT_LOGIN)) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Cập nhật bài viết thất bại!', ToastAndroid.LONG);
                }
            })
    }

    getPost = (postID) => {
        PostService.getPostDetail(postID)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let post = response.listPost[0];
                    this.setState({ post: post });
                } else {
                    ToastAndroid.show('Tải bài viết không thành công! Hãy thử lại!', ToastAndroid.LONG);
                }
            })
            .catch(reason => {
                console.log(reason);
                ToastAndroid.show('Tải bài viết không thành công! Hãy thử lại!', ToastAndroid.LONG);
            })
    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
            const { postID } = this.props.route.params;
            this.getPost(postID);
        });
        this._screenFocus = this.props.navigation.addListener('blur', () => {
            this.setState({
                token: '',
                post: { privacyID: 3 },
                isPrePosting: false,
                isLoading: false,
            })
        });
    }

    render() {
        const { account, isLoading, post } = this.state;
        const privacies = [
            {
                value: 1,
                label: 'Chỉ mình tôi',
                icon: () => <FontAwesome5 name='user-shield' size={20} color={'#9E9E9E'} />
            },
            {
                value: 2,
                label: 'Chỉ bạn bè',
                icon: () => <FontAwesome5 name='user-friends' size={20} color={'#9E9E9E'} />

            },
            {
                value: 3,
                label: 'Công khai',
                icon: () => <MaterialIcons name='public' size={20} color={'#9E9E9E'} />

            }
        ]
        return (
            <View style={styles().Container}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <View style={styles().Header}>
                    <Ionicons
                        onPress={() => this.props.navigation.goBack()}
                        style={styles().IconClose}
                        name='close' size={40} color={'black'} />
                    <Text style={styles().HeaderText}>Chỉnh sửa bài viết</Text>
                    <TouchableHighlight
                        style={[
                            styles().ButtonPost,
                            post && post.listImage && post.content && post.listImage.length > 0 && post.content.trim().length > 0 ?
                                styles().ButtonPostActiveColor : styles().ButtonPostInactiveColor
                        ]}
                        disabled={isLoading || post.content.trim().length == 0}
                        underlayColor={'#0000FF'}
                        // disabled={isLoading || post.listImage.length == 0 || post.content.length == 0}
                        onPress={() => this.postStatus()}>
                        <View>
                            <Text style={styles().ButtonPostText}>Cập nhật</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles().ArticleHeader}>
                    <Image
                        source={account.avatarUri && account.avatarUri.length > 0 ?
                            { uri: Const.assets_domain + account.avatarUri } : AVATAR}
                        style={Style.newsfeed.ArticleAvatar} />
                    <View style={Style.newsfeed.ArticleHeader}>
                        <Text
                            style={{
                                fontFamily: 'SanFranciscoText-Bold',
                                color: 'black'
                            }}>{account.firstName + ' ' + account.lastName}</Text>
                        <DropDownPicker
                            defaultValue={post.privacyID}
                            containerStyle={{ width: scale(150, Horizontal), height: scale(30, Vertical) }}
                            items={privacies}
                            style={styles().ArticlePrivacy}
                            onChangeItem={(item) => this.setState({ post: { ...this.state.post, privacyID: item.value } })}
                        />
                    </View>
                </View>
                <FlatList
                    data={post.listImage}
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    keyExtractor={(item, index) => index + ''}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles().ArticleImageBounder}>
                                <Image
                                    style={styles().ArticleImage}
                                    source={{ uri: Const.assets_domain + item.url }} />
                            </View>
                        )
                    }}
                    ListHeaderComponent={(
                        <View >
                            <TextInput
                                multiline={true}
                                onChangeText={(text) => this.setState({ post: { ...this.state.post, content: text } })}
                                value={post.content}
                                style={styles().ArticleCaption}
                            />
                        </View>
                    )}
                />
                {isLoading ? (
                    <View style={styles().PostingIndicator}>
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
        // marginLeft: scale(10, Horizontal),
    },
    ArticleImage: {
        width: scale(400, Horizontal),
        height: scale(400, Horizontal),
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0
    },
    DropdownInfo: {
        borderRadius: 5,
        borderColor: '#9E9E9E',
        width: scale(200, Horizontal)
    },
})