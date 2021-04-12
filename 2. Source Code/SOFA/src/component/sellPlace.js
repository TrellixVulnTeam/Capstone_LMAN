import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, FlatList, ActivityIndicator, Modal, TouchableOpacity, ToastAndroid, ImageBackground, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

import * as signalR from '@microsoft/signalr';
import * as Style from '../style/style';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import { scale, getData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';
import ViewImageModal from './viewImageModel';
import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';
import PostMenu from './postMenu';
import PushNotification from "react-native-push-notification";

export default class SellPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSelectImage: true,
            isError: false,
            errorMessage: '',
            currentImage: {},
            postQuery: {},
            listPost: [],
        }
    }

    imageHeight = 1334;
    imageWidth = 1000;


    processImageForSearch(image) {
        console.log(image);
        ImagePicker.openCropper({
            cropperToolbarTitle: 'Chọn hình ảnh của sản phẩm',
            includeBase64: true,
            cropping: true,
            path: Const.assets_domain + image.url
        })
            .then(item => {
                this.setState({ isLoading: true, isSelectImage: false })
                PostService.searchProductPostByImage(item.data)
                    .then(response => {
                        if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                            if (response.listPost.length > 0) {
                                this.setState({ listPost: response.listPost })
                                this.setState({ isLoading: false, isSelectImage: false })

                            }
                            else {
                                ToastAndroid.show('Không tìm thấy bài viết cho sản phẩm này!', ToastAndroid.SHORT);
                                this.setState({ isLoading: false, isSelectImage: true })
                            }
                        }
                    })
                    .catch(reason => {
                        console.log(reason);
                        if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                            ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                        } else {
                            ToastAndroid.show('Không tìm thấy bài viết cho sản phẩm này!', ToastAndroid.SHORT);
                            this.setState({ isLoading: false, isSelectImage: true })
                        }
                    })
            })
            .catch(reason => {
                console.log(reason);
            })
    }


    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoading: true });
            const { post } = this.props.route.params;
            if (post.id == 0) {
                this.setState({ isError: true, errorMessage: 'Lỗi không xác định', isLoading: false });
            } else {
                this.setState({ isSelectImage: true, isLoading: false, postQuery: post });
            }
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
        });
    }

    componentWillUnmount() {
    }

    Article = ({ data }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('PostDetail', { postID: data.id })}
            >
                <View style={[styles.articleBounder]}>
                    <View style={[styles.articleHeader]}>
                        <Image
                            source={data.avatar.length > 0 ? { uri: Const.assets_domain + data.avatar } : AVATAR}
                            style={[styles.articleAvatarImage]}
                        />
                        <View style={[styles.articleAuthorBounder]}>
                            <Text style={[styles.articleAuthor]}>{data.firstName + ' ' + data.lastName}</Text>
                            <Text style={[styles.articleTime]}> {Utils.calculateTime(data.time)}</Text>
                        </View>
                    </View>
                    <View style={[styles.articleContentBounder]}>
                        <Text style={[styles.articleContent]}>{data.content}</Text>
                    </View>
                    <View style={[styles.articleListImage]}>
                        <FlatList
                            contentContainerStyle={{ alignSelf: 'flex-start' }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={true}
                            horizontal
                            data={data.listImage}
                            keyExtractor={(item, index) => item.id + ''}
                            renderItem={({ item, index }) => {
                                return (
                                    <Image
                                        source={{ uri: Const.assets_domain + item.url }}
                                        style={[
                                            styles.articleImage,
                                            {
                                                marginLeft: index > 0 ? scale(5, Horizontal) : 0
                                            }
                                        ]}
                                    />
                                )
                            }}
                        />
                    </View>
                    <View style={[styles.articleAction]}>
                        <View style={[styles.articleActionRate]}>
                            <Text style={[styles.articleActionRateText]}>Điểm đánh giá: </Text>
                            <Text style={[styles.articleActionRateText]}>{Utils.isInteger(data.rateAverage)}</Text>
                            <Text style={[styles.articleActionRateText]}>{'/5.0'}</Text>
                        </View>
                    </View>
                </View >
            </TouchableOpacity>
        )
    }

    render() {
        const { isLoading, isSelectImage, isError, errorMessage, listPost, postQuery, currentImage } = this.state;
        return (
            <View style={[Style.common.container]}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <ImageBackground
                    source={OCEAN_BACKGROUND}
                    style={{ flex: 1, resizeMode: 'cover' }}>
                    {isLoading ? (
                        <View style={styles.postingIndicator}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                    ) : (
                        <View>
                            <FlatList
                                data={listPost}
                                keyExtractor={(item, index) => item.id + ''}
                                renderItem={({ item, index }) => <this.Article data={item} />}
                            />
                        </View>
                    )}
                </ImageBackground>
                <Modal
                    visible={isSelectImage}
                    onRequestClose={() => {
                        this.setState({ isSelectImage: false });
                        this.props.navigation.goBack();
                    }}
                >
                    <View style={[styles.modalSelectImage]}>
                        <View style={[styles.modalSelectImageHeader]}>
                            {/* <Ionicons
                                onPress={() => this.props.navigation.goBack()}
                                style={styles.modalSelectImageIconClose}
                                name='close' size={40} color={'black'} /> */}
                            <Text style={[styles.modalSelectImageText]}>Chọn hình ảnh</Text>
                            {/* <TouchableOpacity
                                style={[styles.modalSelectImageSelectButton]}
                                onPress={() => this.onPressPostButton()}>
                                <Text style={styles.modalSelectImageSelectButtonText}>Chọn</Text>
                            </TouchableOpacity> */}
                        </View>
                        <FlatList
                            numColumns={2}
                            data={postQuery.listImage}
                            keyExtractor={(item, index) => item.id + ''}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.processImageForSearch(item)}
                                    >
                                        <Image
                                            style={[styles.selectImage]}
                                            source={{ uri: Const.assets_domain + item.url }}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                </Modal>
                {isError ? (
                    <View style={[styles.errorBounder]}>
                        <Text>{errorMessage}</Text>
                    </View>
                ) : (
                    <View></View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    postingIndicator: {
        height: scale(711, Vertical),
        width: scale(400, Horizontal),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    errorBounder: {
        position: 'absolute',
        height: scale(711, Vertical),
        width: scale(400, Vertical),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    articleBounder: {
        backgroundColor: 'transparent',
        width: scale(360, Horizontal),
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: scale(20, Vertical),
        paddingHorizontal: scale(10, Horizontal),
        paddingVertical: scale(10, Vertical)
    },
    articleHeader: {
        flexDirection: 'row'
    },
    articleAvatarImage: {
        width: scale(50, Vertical),
        height: scale(50, Vertical),
        resizeMode: 'cover',
        borderRadius: 50,
    },
    articleAuthorBounder: {
        flexDirection: 'column',
    },
    articleAuthor: {
        color: 'white',
        fontSize: 18,
        paddingLeft: scale(10, Horizontal),
        fontWeight: 'bold'
    },
    articleTime: {
        color: 'white',
        fontSize: 14,
        paddingLeft: scale(10, Horizontal),
        paddingTop: scale(5, Horizontal),
    },
    articleContentBounder: {
        paddingTop: scale(10, Vertical)
    },
    articleContent: {
        color: 'white'
    },
    articleListImage: {
        marginTop: scale(10, Vertical)
    },
    articleImage: {
        borderRadius: 5,
        width: scale(60, Horizontal),
        height: scale(80, Vertical),
        resizeMode: 'cover',
    },
    articleAction: {
        flexDirection: 'row',
        marginTop: scale(10, Vertical)
    },
    articleActionLike: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    articleActionLikeNumber: {
        marginLeft: scale(5, Horizontal),
        color: 'white'
    },
    articleActionRate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scale(10, Vertical)
    },
    articleActionRateText: {
        color: 'white'
    },
    modalSelectImage: {
        height: scale(711, Vertical),
        width: scale(400, Horizontal)
    },
    modalSelectImageHeader: {
        flexDirection: 'row',
        marginTop: scale(10, Vertical),
        alignItems: 'center'
    },
    modalSelectImageIconClose: {
        marginLeft: scale(10, Horizontal),
        marginRight: 'auto'
    },
    modalSelectImageText: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    modalSelectImageSelectButton: {
        marginLeft: 'auto',
        marginRight: scale(10, Horizontal),
        backgroundColor: '#4489FF',
        height: scale(30, Vertical),
        width: scale(60, Horizontal),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalSelectImageSelectButtonText: {
        color: 'white',
    },
    modalSelectImageBounder: {
        flex: 1,
        backgroundColor: 'rgba(26,26,26,1)'
    },
    selectImage: {
        width: scale(160, Horizontal),
        height: scale(248, Vertical),
        resizeMode: 'contain',
        marginLeft: scale(20, Horizontal)
    },
})