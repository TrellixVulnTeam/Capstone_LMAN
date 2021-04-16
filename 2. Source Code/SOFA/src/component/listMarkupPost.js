import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, FlatList, ActivityIndicator, Modal, TouchableOpacity, ToastAndroid, ImageBackground, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

import * as PostService from '../service/postService';
import * as MarkupPostService from '../service/markupPostService';
import * as ProfileService from '../service/profileService';
import * as AuthService from '../service/authService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';

import * as Style from '../style/style';
import { scale, getContentDemo } from '../common/utils';
import * as Const from '../common/const';

export default class ListMarkupPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            listPost: [],
            page: 1,
        }
    }

    getListMarkupPost(page) {
        MarkupPostService.getUserMarkupPost(page)
            .then(response => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listMarkupRes = response.listPost;
                    if (page == 1) {
                        this.setState({ listPost: listMarkupRes, page: 1 });
                    } else {
                        if (listMarkupRes.length > 0) {
                            this.setState({ listPost: [...this.state.listMarkup, ...listMarkupRes], page: page });
                        }
                    }
                } else {
                    console.log(response.errorMessage);
                    ToastAndroid.show('Tải danh sách bài viết không thành công!', ToastAndroid.LONG);
                }
                this.setState({ isLoading: false });
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    this.props.navigation.goBack();
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Tải danh sách bài viết không thành công!', ToastAndroid.LONG);
                    this.setState({ isLoading: false }); s
                }
            })

    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoading: true });
            this.getListMarkupPost(1);
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
        });
    }
    componentWillUnmount() {

    }
    render() {
        const { isLoading, listPost } = this.state;
        return (
            <View style={[styles.container]}>
                <View style={[Style.newsfeed.Header]}>
                    <View>
                        <Text style={[Style.newsfeed.SofaTitle, { color: 'white', position: 'absolute', top: -2, left: -2 }]}>Bookmark</Text>
                        <Text style={Style.newsfeed.SofaTitle}>Bookmark</Text>
                    </View>
                </View>
                <View style={[styles.listPostArea]}>
                    <FlatList
                        data={listPost}
                        keyExtractor={(item, index) => item.id + ''}
                        renderItem={({ item, index }) => <Article data={item} onPressPost={() => { this.props.navigation.navigate('PostDetail', { postID: item.id }) }} />}
                        onEndReached={() => this.getListMarkupPost(this.state.page + 1)}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </View>
        )
    }

}

const Article = ({ data, onPressPost }) => {
    return (
        <TouchableOpacity
            onPress={() => onPressPost(data.id)}
            style={[styles.articleBounder]}>
            <View style={[styles.imageListBounder]}>
                <Image
                    source={{ uri: Const.assets_domain + data.listImage[0].url }}
                    style={[styles.articleImage]}
                />
                <View style={[styles.articleTitleBounder]}>
                    <Text style={[styles.articleTitle]}>{getContentDemo(data.content).content}</Text>
                    <Text>{data.firstName + ' ' + data.lastName}</Text>
                    <Text>{'Bài viết'}</Text>
                    <Text>{data.listImage.length + ' ảnh'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    articleBounder: {
        marginTop: scale(10, Const.Vertical),
        paddingVertical: scale(10, Const.Vertical),
        paddingHorizontal: scale(18, Const.Vertical),
        width: scale(400, Const.Horizontal),
    },
    imageListBounder: {
        flexDirection: 'row'
    },
    articleImage: {
        height: scale(100, Const.Horizontal),
        width: scale(140, Const.Horizontal),
        resizeMode: 'cover',
        borderRadius: 10,
    },
    articleTitleBounder: {
        left: scale(30, Const.Horizontal)
    },
    articleTitle: {
        color: '#565656',
        fontWeight: 'bold',
        fontSize: 18,
        width: scale(200, Const.Horizontal),
    },
    loadingBounder: {
        alignItems: 'center',
        justifyContent: 'center'
    }

})