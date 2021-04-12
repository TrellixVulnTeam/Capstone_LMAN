import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, FlatList, TouchableWithoutFeedback, Modal, TouchableOpacity, ToastAndroid, ImageBackground, StyleSheet, TextInput } from 'react-native';
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
import { createAppContainer } from 'react-navigation';


import * as Style from '../style/style';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import { scale, getData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';
import ViewImageModal from './viewImageModel';

import SearchNavigator from '../tabs/SearchRouter';

import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';

const AppIndex = createAppContainer(SearchNavigator);


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPost: [
                {
                    "id": 85,
                    "content": "Sơ mi thanh lịch\nGiá: 189k",
                    "privacyID": 3,
                    "time": "2021-04-12T03:56:12.247",
                    "bodyInfoID": 0,
                    "accountPost": 7,
                    "firstName": "Mai Văn",
                    "lastName": "Viên",
                    "avatar": "VienMV/avatar/1.png",
                    "gender": true,
                    "listImage": [
                        {
                            "id": 78,
                            "postID": 85,
                            "url": "VienMV\\post_image\\85_78.png"
                        },
                        {
                            "id": 79,
                            "postID": 85,
                            "url": "VienMV\\post_image\\85_79.png"
                        },
                        {
                            "id": 80,
                            "postID": 85,
                            "url": "VienMV\\post_image\\85_80.png"
                        }
                    ],
                    "listLike": [],
                    "listComment": [],
                    "listRate": [],
                    "numberOfLike": 2,
                    "numberOfComment": 14,
                    "rateAverage": 4.5,
                    "isLiked": false,
                    "myRatePoint": 0,
                    "isVerified": true,
                    "isMarked": false,
                    "type": 1
                },
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
                    "numberOfLike": 2,
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
                    "numberOfComment": 2,
                    "rateAverage": 4.7,
                    "isLiked": false,
                    "myRatePoint": 0,
                    "isVerified": true,
                    "isMarked": false,
                    "type": 0
                }
            ]
        }
    }
    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
        });
    }
    componentWillUnmount() {

    }

    Article({ data }) {
        return (
            <View>
                <Text>{data.content}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Text style={[styles.title]}>Tìm kiếm</Text>
                <View style={[styles.header]}>
                    <TextInput
                        returnKeyType={'search'}
                        style={[styles.searchBox]}
                        placeholder={'Từ khóa tìm kiếm'}
                    />
                    <TouchableOpacity
                        style={styles.searchIcon}
                    >
                        <Ionicons name={'search-sharp'} color={'#C7C7C7'} size={30}
                        />
                    </TouchableOpacity>
                </View>
                <AppIndex />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontFamily: 'FS Playlist Script',
        fontSize: 60,
        marginLeft: scale(15, Horizontal)
    },
    header: {
        paddingVertical: scale(10, Vertical),
    },
    searchBox: {
        height: scale(50, Vertical),
        marginLeft: scale(10, Horizontal),
        marginRight: scale(10, Horizontal),
        borderWidth: 0.1,
        borderColor: 'white',
        borderRadius: 5,
        elevation: 1,
    },
    searchIcon: {
        position: 'absolute',
        top: scale(20, Vertical),
        right: scale(15, Horizontal)
    }

})