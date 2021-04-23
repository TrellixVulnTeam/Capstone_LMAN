import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Image, TouchableWithoutFeedback, FlatList, ActivityIndicator, Modal, TouchableOpacity, ToastAndroid, ImageBackground, StyleSheet, TextInput, Switch } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient'


import * as Style from '../style/style';
import * as Const from '../common/const';
import { scale, getData, storeData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';

import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';
import * as ReportService from '../service/reportService';
import * as InfoService from '../service/infoService';

export default class ListInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listInfo: [],
            isLoading: false
        }
    }
    getListInfo() {
        InfoService.getListInfo()
            .then(response => {
                this.setState({ isLoading: false });
                if (response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ listInfo: response.listInfo });
                } else {
                    ToastAndroid.show('Có lỗi xảy ra! Vui lòng thử lại!', ToastAndroid.LONG,);
                }
            })
            .catch(reason => {
                this.setState({ isLoading: false });
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Bạn phải đăng nhập để sử dụng tính năng này!', ToastAndroid.LONG,);
                } else {
                    ToastAndroid.show('Có lỗi xảy ra! Vui lòng thử lại!', ToastAndroid.LONG,);
                    console.log(reason);
                }
            });
    }
    componentDidMount() {
        this._unsubcribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoading: true });
            this.getListInfo();
        });
        this._unfocus = this.props.navigation.addListener('blur', () => {
        });
    }
    componentWillUnmount() {

    }
    render() {
        const { listInfo } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ionicons
                        onPress={() => this.props.navigation.goBack()}
                        style={styles.iconClose}
                        name='close' size={40} color={'black'} />
                    <Text style={styles.headerText}>Danh sách</Text>
                    <TouchableOpacity
                        style={styles.ButtonCreate}
                        onPress={() => this.props.navigation.navigate('CreateInfo')}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#91DFFF', '#2A7EA0']}
                            style={{
                                height: scale(30, Vertical),
                                paddingVertical: scale(5, Vertical),
                                paddingHorizontal: scale(5, Horizontal),
                                borderRadius: 5,
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: 'white' }}>Tạo mới</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
                <View style={[styles.listInfoArea]}>
                    <FlatList
                        data={listInfo}
                        keyExtractor={(item, index) => item.id + ''}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('InfoDetail', { info: item })}
                                    style={[styles.itemBounder]}>
                                    <Text style={[styles.itemName]}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginBottom: scale(10, Vertical)
    },
    iconClose: {
        marginLeft: scale(10, Horizontal),
        marginRight: 'auto'
    },
    headerText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        fontWeight: 'bold'
    },
    listInfoArea: {
        flex: 1,
        paddingHorizontal: scale(10, Horizontal)
    },
    itemBounder: {
        width: scale(380, Horizontal),
        borderColor: 'gray',
        borderWidth: 0.5,
        marginTop: scale(10, Vertical),
        minHeight: scale(40, Vertical),
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: '#2a7ea0',
        justifyContent: 'center'
    },
    itemName: {
        color: 'white'
    },
    ButtonCreate: {
        marginLeft: 'auto',
        marginRight: scale(10, Horizontal),
        borderRadius: 5,
        paddingVertical: scale(5, Vertical)
    },
    ButtonCreateText: {
        color: 'white',
        fontWeight: 'bold'
    }
})