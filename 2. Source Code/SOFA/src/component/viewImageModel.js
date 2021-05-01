import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableHighlight, Alert, TouchableWithoutFeedback, Modal, Image, ScrollView, PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from 'rn-fetch-blob';
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
import { scale, requestPermission } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class ViewImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            isLogin: false,
            isShowDetail: true,
            isShowMore: false,
            isShowMenu: false
        }
    }

    async hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    saveImage = async () => {
        await requestPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
        })
            .fetch('GET', Const.assets_domain + this.props.image.url)
            .then(res => {
                CameraRoll.save(res.data, { type: 'photo', album: 'Sofa' })
                    .then(res => { console.log(res); ToastAndroid.show("Đã lưu ảnh này", ToastAndroid.SHORT) })
                    .catch(err => { console.log(err); ToastAndroid.show("Lưu ảnh không thành công!", ToastAndroid.SHORT) })
            })
            .catch(error => { console.log(error); ToastAndroid.show("Lưu ảnh không thành công!", ToastAndroid.SHORT) });
        this.setState({ isShowMenu: false })
    }

    getContentDemo(content) {
        if (content) {
            if (content.length > 30) {
                let res = {
                    canShowMore: true,
                    content: content.substring(0, 30)
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
        const { isShowDetail, isShowMore, isShowMenu } = this.state;
        const { visible, post, image, onRequestClose } = this.props;
        return (
            <View>
                <Modal
                    visible={visible}
                    onRequestClose={() => onRequestClose()}
                >
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
                    <MaterialCommunityIcons
                        onPress={() => { this.setState({ isShowMenu: true, isShowDetail: false }) }}
                        style={{ position: 'absolute', right: scale(20, Horizontal), top: scale(20, Vertical) }}
                        name='dots-horizontal' size={30} color={'white'} />
                    {isShowDetail ? (
                        <ScrollView style={{
                            position: 'absolute',
                            bottom: scale(0, Vertical),
                            backgroundColor: 'rgba(26,26,26,0.4)',
                            paddingLeft: scale(10, Horizontal),
                            paddingBottom: scale(10, Vertical)
                        }}>
                            <View>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontFamily: 'SanFranciscoText-Bold'
                                    }}>{post.lastName + ' ' + post.firstName}</Text>
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
                                }}>
                                    <Text style={{
                                        width: scale(280, Horizontal),
                                        color: 'white'
                                    }}>{isShowMore ? post.content : this.getContentDemo(post.content).content}</Text>
                                    <TouchableHighlight
                                        underlayColor={'£9E9E9E'}
                                        onPress={() => this.setState({ isShowMore: !isShowMore })}
                                    >
                                        {!isShowMore && this.getContentDemo(post.content).canShowMore ? (
                                            <View>
                                                <Text style={{
                                                    color: '#B8B8B8'
                                                }}> ...Xem thêm</Text>
                                            </View>
                                        ) : (<View></View>)}
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
                    <Modal
                        animationType='slide'
                        visible={isShowMenu}
                        transparent={true}
                        onRequestClose={() => this.setState({ isShowMenu: false })}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressOut={() => this.setState({ isShowMenu: false, isShowDetail: true })}
                            style={{
                                paddingTop: scale(611, Vertical),
                                backgroundColor: 'transparent',
                            }}
                        >

                            <TouchableHighlight
                                onPress={() => this.saveImage()}
                                style={{
                                    marginBottom: scale(10, Vertical),
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    backgroundColor: '#AAAAAA',
                                    borderRadius: 10,
                                    width: scale(300, Horizontal),
                                    height: scale(35, Vertical),
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={{ color: 'white' }}>Lưu hình ảnh</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => this.setState({ isShowMenu: false })}

                                style={{
                                    marginBottom: scale(10, Vertical),
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    backgroundColor: '#AAAAAA',
                                    borderRadius: 10,
                                    width: scale(300, Horizontal),
                                    height: scale(35, Vertical),
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={{ color: 'white' }}>Hủy bỏ</Text>
                            </TouchableHighlight>
                        </TouchableOpacity>
                    </Modal>
                </Modal>
            </View>
        )
    }
}