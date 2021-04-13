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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as Style from '../style/style';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import { scale, getData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';
import ViewImageModal from './viewImageModel';

import * as PostService from '../service/postService';
import * as ProfileService from '../service/profileService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';

import Session from '../common/session';

import SearchPostTab from '../tabs/searchPostTab';
import SearchUSerTab from '../tabs/searchUserTab';

const Tab = createMaterialTopTabNavigator();


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPost: [],
            listUser: [],
            currentTextSearch: '',
            searchText: '',
            postTabPage: 1,
            userTabPage: 1,
            postTabLoading: false,
            userTabLoading: false,
        }
    }

    async searchPost(type) {
        const { searchText, currentTextSearch } = this.state;
        let queryText = type == 1 ? searchText : currentTextSearch;
        if (type == 1) {
            this.setState({ postTabLoading: true });
            await this.setState({ postTabPage: 1 });
        }
        if (queryText.length > 0) {
            console.log(queryText, this.state.postTabPage);
            PostService.searchPostByKeyword(queryText, this.state.postTabPage)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        let listPostRes = response.listPost;
                        if (type == 1) {
                            this.setState({ listPost: listPostRes });
                            if (listPostRes.length > 0) {
                                this.setState({ postTabPage: this.state.postTabPage + 1 });
                            }
                            this.setState({ postTabLoading: false });
                        } else {
                            if (listPostRes.length > 0) {
                                this.setState({ listPost: [...this.state.listPost, ...listPostRes], postTabPage: this.state.postTabPage + 1 })
                                console.log('load more post', this.state.listPost);

                            }
                        }
                        console.log('after post', this.state.postTabPage + '-' + this.state.userTabPage);

                    } else {
                        ToastAndroid.show('Lỗi trong quá trình tìm kiếm', ToastAndroid.LONG);
                        console.log(response.errorMessage);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                    ToastAndroid.show('Lỗi trong quá trình tìm kiếm', ToastAndroid.LONG);
                });
        }

    }
    async searchUser(type) {
        const { searchText, currentTextSearch } = this.state;
        if (type == 1) {
            await this.setState({ userTabPage: 1 });
            this.setState({ userTabLoading: true });
        }
        let queryText = type == 1 ? searchText : currentTextSearch;
        if (queryText.length > 0) {
            ProfileService.searchUserByName(queryText, this.state.userTabPage)
                .then(response => {
                    if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                        let listProfileRes = response.listProfile;
                        if (type == 1) {
                            this.setState({ listUser: listProfileRes });
                            if (listProfileRes.length > 0) {
                                this.setState({ userTabPage: this.state.userTabPage + 1 });
                                this.setState({ userTabLoading: false });
                            }
                        } else {
                            if (listProfileRes.length > 0) {
                                this.setState({ listUser: [...this.state.listUser, ...listProfileRes], userTabPage: this.state.userTabPage + 1 })
                                console.log('load more user', this.state.listUser);
                            }
                        }
                        console.log('after user', this.state.postTabPage + '-' + this.state.userTabPage);


                    } else {
                        ToastAndroid.show('Lỗi trong quá trình tìm kiếm', ToastAndroid.LONG);
                        console.log(response.errorMessage);
                    }
                })
                .catch(reason => {
                    console.log(reason);
                    ToastAndroid.show('Lỗi trong quá trình tìm kiếm', ToastAndroid.LONG);
                });
        }

    }

    navigateProfile(accountID) {
        console.log('searcg', Session.getInstance().account);
        if (account && account.accountID && account.accountID == accountID) {
            this.props.navigation.navigate('Profile');
        } else {
            this.props.navigation.navigate('OtherProfile', { 'accountID': accountID });
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

    render() {
        const { listPost, listUser, searchText, postTabLoading, userTabLoading } = this.state;
        return (
            <View style={[styles.container]}>

                <Text style={[styles.title, { color: 'white', position: 'absolute', top: -2, left: -2 }]}>Tìm kiếm</Text>
                <Text style={[styles.title]}>Tìm kiếm</Text>

                <View style={[styles.header]}>
                    <TextInput
                        onChangeText={(text) => this.setState({ searchText: text })}
                        value={searchText}
                        onSubmitEditing={() => {
                            this.setState({ currentTextSearch: searchText });
                            this.searchPost(1);
                            this.searchUser(1);
                        }}
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
                <Tab.Navigator
                    swipeEnabled={false}
                    tabBarOptions={{
                        activeTintColor: '#2a7ea0',
                        indicatorStyle: {
                            backgroundColor: '#2a7ea0'
                        }
                    }}
                    backBehavior='initialRoute'
                >
                    <Tab.Screen
                        name="SearchPostTab"
                        children={() =>
                            <SearchPostTab
                                listPost={listPost}
                                onPressPost={(postID) => this.props.navigation.navigate('PostDetail', { 'postID': postID })}
                                loadMore={() => this.searchPost(0)}
                                isLoading={postTabLoading}
                            />}
                        options={{
                            title: 'Bài viết'
                        }} />
                    <Tab.Screen
                        name="SearchUserTab"
                        children={() =>
                            <SearchUSerTab
                                listUser={listUser}
                                onPressUser={(accountID) => this.navigateProfile(accountID)}
                                loadMore={() => this.searchUser(0)}
                                isLoading={userTabLoading}
                            />}
                        options={{
                            title: 'Mọi người'
                        }}
                    />
                </Tab.Navigator>
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
    },

})