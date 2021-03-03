import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import * as signalR from '@microsoft/signalr';
import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import PostViewModel from '../Model/postViewModel';
import { AVATAR } from '../../image/index';
import { TextInput } from 'react-native-gesture-handler';

export default class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            listPost: []
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

    getAllPost() {
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json'
        };
        var data = {};
        var uri = Const.domain + 'api/post'
        Request.Get(uri, header, data)
            .then(response => {
                if (response && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listPostRes = response.listPost;
                    this.setState({ listPost: listPostRes });
                }
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    componentDidMount() {
        this.getAllPost();
    }

    Article = ({ data }) => {
        let post = new PostViewModel(data);
        return (
            <View
                style={Style.newsfeed.Article}
            >
                <View style={{ flexDirection: 'row' }}>

                    <Image
                        source={post.getAvatar() && post.getAvatar().length > 0 ?
                            { uri: Const.assets_domain + post.getAvatar() } : AVATAR}
                        style={Style.newsfeed.ArticleAvatar} />
                    <View style={Style.newsfeed.ArticleHeader}>
                        <Text style={Style.newsfeed.ArticleAuthor}>{post.getFirstName() + ' ' + post.getLastName()}</Text>
                        <Text>{post.getTime()}</Text>
                    </View>
                    <MaterialCommunityIcons
                        style={Style.newsfeed.ArticleMenu}
                        name='dots-horizontal' size={30} color={'#8B8B8B'} />

                </View>
                <View style={Style.newsfeed.ArticleImageList}>
                    <FlatList
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        horizontal
                        data={post.getListImage()}
                        keyExtractor={item => item.id + ''}
                        pagingEnabled={true}
                        renderItem={({ item }) => {
                            return (
                                <View style={Style.newsfeed.ArticleImageStyle}>
                                    <Image
                                        style={Style.newsfeed.ArticleImage}
                                        source={{ uri: Const.assets_domain + item.url }} />
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={Style.newsfeed.ArtileMore}>
                    <Text style={{ fontSize: 14 }}>{post.getContent()}</Text>
                    <View style={Style.newsfeed.ArticleAction}>
                        <MaterialCommunityIcons name='heart-outline' size={30} color={'#FBB897'} />
                        <Text style={{ marginLeft: scale(5, Horizontal), marginTop: scale(5, Horizontal) }}>{post.getNumberOfLike()}</Text>
                        <FontAwesome5 style={{ marginLeft: scale(10, Horizontal) }} name='comment-dots' size={30} color={'#FBB897'} />
                        <Text style={{ marginLeft: scale(5, Horizontal), marginTop: scale(5, Horizontal) }}>{post.getNumberOfComment()}</Text>
                        <Rating
                            style={{ marginLeft: scale(10, Horizontal) }}
                            ratingCount={5}
                            imageSize={30}
                            type='custom'
                            ratingColor='#FBB897'
                            onFinishRating={this.ratingCompleted}
                            startingValue={0}
                        />
                        <Text style={{ marginLeft: scale(5, Horizontal), marginTop: scale(5, Horizontal) }}>{post.getRateAverage()}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: scale(5, Vertical)
                        }}
                    >
                        <TextInput
                            placeholder={'Bình luận'}
                            style={{
                                width: scale(300, Horizontal),
                                backgroundColor: '#EEEEEE',
                                borderRadius: 10,
                            }} />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { account, listPost } = this.state;
        return (
            <View style={Style.common.container}>
                <StatusBar hidden={false} backgroundColor={'#FFF5F1'} />
                <View style={[Style.newsfeed.Header]}>
                    <Ionicons
                        style={{
                            marginLeft: 'auto',
                            marginRight: scale(5, Horizontal)
                        }}
                        name={'ios-search-circle'} color={'#707070'} size={30} />
                    <FontAwesome5
                        style={{
                            marginLeft: 0,
                            marginRight: scale(5, Horizontal)
                        }}
                        name={'plus'} color={'#707070'} size={30} />
                    <Entypo
                        style={{
                            marginLeft: 0,
                            marginRight: scale(10, Horizontal)
                        }}
                        name={'dots-three-horizontal'} color={'#707070'} size={30} />
                </View>
                <View>
                    <Text style={Style.newsfeed.FeedTitle}>Feed</Text>
                </View>
                <View style={{ height: scale(577, Vertical) }}>
                    <FlatList
                        data={listPost}
                        keyExtractor={(item, index) => item.id + ''}
                        pagingEnabled={true}
                        renderItem={({ item, index }) => <this.Article data={item} />}
                    />
                </View>
            </View>
        )
    }
}