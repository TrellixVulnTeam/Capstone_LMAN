import React, { Component } from 'react';
import { Text, SafeAreaView, View, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';

import * as Style from '../style/style';
import * as Const from '../common/const';
import { scale, getContentDemo } from '../common/utils';

export default class SearchPostTab extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    navigation = {};
    componentWillUnmount() {
    }
    componentDidMount() {
    }

    Article({ data, onPressPost }) {
        return (
            <TouchableOpacity
                onPress={() => onPressPost(data.id)}
                style={[styles.articleBounder]}>
                <View style={[styles.imageListBounder]}>
                    <FlatList
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        horizontal
                        data={data.listImage}
                        keyExtractor={(item, index) => item.id + ''}
                        pagingEnabled={true}
                        renderItem={({ item, index }) => {
                            return (
                                <Image
                                    source={{ uri: Const.assets_domain + item.url }}
                                    style={[styles.articleImage]}
                                />
                            )
                        }}
                    />
                    <Text style={[styles.articleTitle]}>{getContentDemo(data.content).content}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { listPost, onPressPost, loadMore, isLoading } = this.props;
        return (
            <View style={[styles.container]}>
                {!isLoading ?
                    (
                        <View>
                            <FlatList
                                data={listPost}
                                keyExtractor={(item, index) => item.id + ''}
                                renderItem={({ item, index }) => <this.Article data={item} onPressPost={onPressPost} />}
                                onEndReachedThreshold={0.5}
                                onEndReached={() => loadMore()}
                            />
                        </View>
                    ) : (
                        <View style={[styles.loadingBounder]}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>)
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
        paddingHorizontal: scale(18, Const.Vertical),
    },
    imageListBounder: {
        elevation: 10
    },
    articleImage: {
        height: scale(200, Const.Horizontal),
        width: scale(360, Const.Horizontal),
        resizeMode: 'cover',
        borderRadius: 20,
    },
    articleTitle: {
        position: 'absolute',
        left: scale(30, Const.Horizontal),
        bottom: scale(10, Const.Vertical),
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    loadingBounder: {
        alignItems: 'center',
        justifyContent: 'center'
    }

});