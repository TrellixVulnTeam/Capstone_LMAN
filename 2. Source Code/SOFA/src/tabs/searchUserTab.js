import React, { Component } from 'react';
import { Text, SafeAreaView, View, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Const from '../common/const';
import { scale, getContentDemo } from '../common/utils';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';


export default class SearchUSerTabTab extends Component {

    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
    }
    componentDidMount() {
    }
    UserItem({ data, onPressUser }) {
        return (
            <TouchableOpacity
                onPress={() => { onPressUser(data.accountID) }}
                style={[styles.articleBounder]}>
                <View style={[styles.userItemPrimary]}>
                    <Image
                        source={data.avatarUri && data.avatarUri.length > 0 ? { uri: Const.assets_domain + data.avatarUri } : AVATAR}
                        style={[styles.userItemPrimaryAvatar]}
                    />
                    <View style={[styles.userItemPrimaryInfo]}>
                        <Text style={[styles.userItemPrimaryName]}>{data.firstName + ' ' + data.lastName}</Text>
                        <Text>{data.isFollowed ? 'Đã theo dõi' : 'Chưa theo dõi'}</Text>
                    </View>
                </View>
                <View style={[styles.userItemMore]}>
                    <View style={[styles.userItemMoreItem]}>
                        <SimpleLineIcons name='user-following' size={18} color='gray' />
                        <Text>{'   ' + data.followerNumber + ' người theo dõi'}</Text>
                    </View>
                    <View style={[styles.userItemMoreItem]}>
                        <MaterialCommunityIcons name='post-outline' size={18} color='gray' />
                        <Text>{'   ' + data.postNumber + ' bài viết'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { listUser, onPressUser, loadMore, isLoading } = this.props;
        return (
            <View style={[styles.container]}>
                {!isLoading ?
                    (
                        <View>
                            <FlatList
                                data={listUser}
                                keyExtractor={(item, index) => item.accountID + ''}
                                renderItem={({ item, index }) => <this.UserItem data={item} onPressUser={onPressUser} />}
                                onEndReached={() => loadMore()}
                                onEndReachedThreshold={0.5}
                            />
                        </View>
                    ) : (
                        <View style={[styles.loadingBounder]}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                    )
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    articleBounder: {
        marginTop: scale(10, Const.Vertical),
        paddingVertical: scale(10, Const.Vertical),
        paddingHorizontal: scale(20, Const.Horizontal),
        backgroundColor: 'white'
    },
    userItemPrimary: {
        flexDirection: 'row'
    },
    userItemPrimaryAvatar: {
        height: scale(60, Const.Horizontal),
        width: scale(60, Const.Horizontal),
        resizeMode: 'cover',
        borderRadius: 50,
        backgroundColor: 'gray',
        borderWidth: 0.1,
        borderColor: 'black'
    },
    userItemPrimaryInfo: {
        flexDirection: 'column',
        marginLeft: scale(10, Const.Horizontal),
    },
    userItemPrimaryName: {
        marginTop: scale(5, Const.Vertical),
        fontSize: 17,
        fontWeight: 'bold'
    },
    userItemMore: {
        marginTop: scale(20, Const.Vertical)
    },
    userItemMoreItem: {
        flexDirection: 'row',
        marginTop: scale(5, Const.Vertical)
    },
    loadingBounder: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});