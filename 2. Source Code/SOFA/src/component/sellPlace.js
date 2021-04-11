import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, FlatList, TouchableWithoutFeedback, Modal, TouchableOpacity, ToastAndroid, ImageBackground, StyleSheet } from 'react-native';
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
import { BoxShadow } from 'react-native-shadow';

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
            isSelectImage: false,
            isError: false,
            errorMessage: '',
            postQuery: {},
            listPost: [
                {
                    "id": 84,
                    "content": "Quần jean body\nGiá: 159k",
                    "privacyID": 3,
                    "time": "2021-04-08T03:35:03.363",
                    "bodyInfoID": 0,
                    "accountPost": 7,
                    "firstName": "Mai Văn",
                    "lastName": "Viên",
                    "avatar": "VienMV/avatar/1.png",
                    "gender": true,
                    "listImage": [
                        {
                            "id": 75,
                            "postID": 84,
                            "url": "VienMV\\post_image\\84_75.png"
                        },
                        {
                            "id": 76,
                            "postID": 84,
                            "url": "VienMV\\post_image\\84_76.png"
                        },
                        {
                            "id": 77,
                            "postID": 84,
                            "url": "VienMV\\post_image\\84_77.png"
                        }
                    ],
                    "listLike": [],
                    "listComment": [],
                    "listRate": [],
                    "numberOfLike": 1,
                    "numberOfComment": 0,
                    "rateAverage": 4.5,
                    "isLiked": false,
                    "myRatePoint": 0,
                    "isVerified": true,
                    "isMarked": false,
                    "type": 1
                },
                {
                    "id": 78,
                    "content": "Linh Ka",
                    "privacyID": 3,
                    "time": "2021-04-07T14:53:03.6",
                    "bodyInfoID": 11,
                    "accountPost": 7,
                    "firstName": "Mai Văn",
                    "lastName": "Viên",
                    "avatar": "VienMV/avatar/1.png",
                    "gender": true,
                    "listImage": [
                        {
                            "id": 69,
                            "postID": 78,
                            "url": "VienMV\\post_image\\78_69.png"
                        }
                    ],
                    "listLike": [],
                    "listComment": [],
                    "listRate": [],
                    "numberOfLike": 1,
                    "numberOfComment": 0,
                    "rateAverage": 5,
                    "isLiked": false,
                    "myRatePoint": 0,
                    "isVerified": true,
                    "isMarked": false,
                    "type": 0
                }
            ],
        }
    }



    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            console.log('sell place');
            this.setState({ isLoading: true });
            const { post } = this.props.route.params;
            if (post.id == 0) {
                this.setState({ isError: true, errorMessage: 'Lỗi không xác định', isLoading: false });
            } else {
                this.setState({ isLoading: false });
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
        const { isLoading, isSelectImage, isError, errorMessage, listPost, postQuery } = this.state;
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
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
    ,
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
    }
})