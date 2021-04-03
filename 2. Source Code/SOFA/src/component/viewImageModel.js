import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableHighlight, Alert, TouchableWithoutFeedback, Modal, Image, ScrollView } from 'react-native';
import { createImageProgress } from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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


export default class ViewImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            isLogin: false,
            isShowDetail: true,
            isShowMore: false,
        }
    }

    getContentDemo(content) {
        if (content) {
            if (content.length > 40) {
                let res = {
                    canShowMore: true,
                    content: content.substring(0, 40)
                }
                return res;
            }
            else {
                let res = {
                    canShowMore: false,
                    content: content
                }
                return res;
            }
        } else {
            let res = {
                canShowMore: false,
                content: ''
            }
            return res;
        }
    }

    render() {
        const { isShowDetail, isShowMore } = this.state;
        const { visible, post, image, onRequestClose } = this.props;
        return (
            <View>
                <Modal
                    visible={visible}
                    onRequestClose={() => onRequestClose()}
                >
                    <StatusBar hidden={true} />
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({ isShowDetail: !isShowDetail, isShowMore: false })}
                    >
                        <View style={{ backgroundColor: 'rgba(26,26,26,1)', flex: 1 }}>
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
                                    }}>{this.getContentDemo(post.content).content}</Text>
                                    <TouchableHighlight
                                        underlayColor={'£9E9E9E'}
                                        onPress={() => this.setState({ isShowMore: !isShowMore })}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            {!isShowMore && this.getContentDemo(post.content).canShowMore ? (
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

                            <View style={[Style.newsfeed.ArtileMore]}>
                                <View style={
                                    {
                                        marginTop: scale(5, Vertical),
                                        paddingVertical: scale(5, Vertical),
                                        flexDirection: 'row',
                                        width: scale(400, Horizontal),
                                        borderRadius: 10
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginLeft: scale(10, Horizontal),
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name={post.isLiked ? 'heart' : 'heart-outline'}
                                            size={30}
                                            color={post.isLiked ? '#308099' : '#232323'} />
                                        <Text style={[Style.newsfeed.ArticleNumberOfReact, { color: 'white' }]}>{post.numberOfLike}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginLeft: scale(10, Horizontal),
                                        }}
                                    >
                                        <FontAwesome
                                            style={Style.newsfeed.ArticleIconOfReact}
                                            name='comments' size={30}
                                            color={'#308099'} />
                                        <Text style={[Style.newsfeed.ArticleNumberOfReact, { color: 'white' }]}>{post.numberOfComment}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    ) : (<View></View>)
                    }
                </Modal>
            </View>
        )
    }
}