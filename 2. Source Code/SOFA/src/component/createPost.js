import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Alert, FlatList, TouchableWithoutFeedback, StyleSheet, TextInput, ActivityIndicator, TouchableHighlight, Modal, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient'


import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import { AVATAR, ADD_PRIMARY_IMAGE, BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';
import InfoField from './infoField';

import * as PostService from '../service/postService';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {
                firstName: '',
                lastName: '',
            },
            content: '',
            privacy: 3,
            type: 0,
            listPrimaryImage: [],
            listShirtImage: [],
            listTrousersImage: [],
            listAccessoriesImage: [],
            isLoading: false,
            isPrePosting: false,
            info: {
                id: 0,
                name: '',
                accountID: 0,
                height: 0,
                weight: 0,
                bustSize: 0,
                waistSize: 0,
                hipSize: 0,
                skinColor: 0
            },
            listInfo: [],
            isShowIntro: true
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
    imageHeight = 1200;
    imageWidth = 900;

    checkLoginToken = async () => {
        this.setState({ isLoading: true });
        await this.getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    var uri = Const.domain + 'api/profile';
                    Request.Get(uri, header)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.setState({ isLoading: false });
                                this.setState({ account: response, isLogin: true, token: token });
                            } else {
                                this.setState({ isLoading: false });
                                this.setState({ account: {}, isLogin: false, token: '' });
                                ToastAndroid.show(
                                    'Hãy đăng nhập để thực hiện việc này',
                                    ToastAndroid.LONG,
                                );
                                this.props.navigation.goBack();
                            }
                        })
                        .catch(reason => {
                            this.setState({ isLoading: false });
                            this.setState({ account: {}, isLogin: false, token: '' });
                            ToastAndroid.show(
                                'Hãy đăng nhập để thực hiện việc này',
                                ToastAndroid.LONG,
                            );
                            this.props.navigation.goBack();
                        })
                } else {
                    this.setState({ isLoading: false });
                    ToastAndroid.show(
                        'Hãy đăng nhập để thực hiện việc này',
                        ToastAndroid.LONG,
                    );
                    this.props.navigation.goBack();
                }
            })
            .catch(reason => {
                this.setState({ isLoading: false });
                this.setState({ token: '' });
                console.log(reason);
                ToastAndroid.show(
                    'Hãy đăng nhập để thực hiện việc này',
                    ToastAndroid.LONG,
                );
                this.props.navigation.goBack();
            })
    }

    getListInfo = () => {
        const { token } = this.state;
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
            "Authorization": 'Bearer ' + token,
        };
        var uri = Const.domain + 'api/info';
        Request.Get(uri, header)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listItem = [];
                    let listTemp = response.listInfo;
                    for (let i = 0; i < listTemp.length; i++) {
                        let info = listTemp[i];
                        let item = {
                            value: info.id,
                            label: info.name + '',
                            icon: () => null,
                            data: info
                        }
                        listItem.push(item);
                    }
                    this.setState({ listInfo: listItem });
                }
            })
            .catch(reason => {
                console.log(reason);
                Alert.alert('Lỗi rồi', 'Có lỗi xảy ra');
            })
    }

    editImage = (image, index, imageType) => {
        this.props.navigation.navigate('EditImage', {
            'image': image,
            onGoBack: (result) => {
                if (imageType == 'primary') {
                    let images = this.state.listPrimaryImage;
                    images[index] = { 'data': result.data, 'path': result.path };
                    this.setState({ listPrimaryImage: images });
                } else if (imageType == 'shirt') {
                    let images = this.state.listShirtImage;
                    images[index] = { 'data': result.data, 'path': result.path };
                    this.setState({ listShirtImage: images });
                }
                else if (imageType == 'trousers') {
                    let images = this.state.listTrousersImage;
                    images[index] = { 'data': result.data, 'path': result.path };
                    this.setState({ listTrousersImage: images });
                }
                else if (imageType == 'accessories') {
                    let images = this.state.listAccessoriesImage;
                    images[index] = { 'data': result.data, 'path': result.path };
                    this.setState({ listAccessoriesImage: images });
                }
            }
        })
    }

    removeIndex = (index, list = []) => {
        let listTemp = list;
        for (let i = index; i < listTemp.length; i++) {
            listTemp[i] = listTemp[i + 1];
        }
        listTemp.pop();
        return listTemp;
    }

    deleteImage = (imageType, index) => {
        if (imageType == 'primary') {
            this.setState({ listPrimaryImage: this.removeIndex(index, this.state.listPrimaryImage) });
        } else if (imageType == 'shirt') {
            this.setState({ listShirtImage: this.removeIndex(index, this.state.listShirtImage, index) });
        }
        else if (imageType == 'trousers') {
            this.setState({ listTrousersImage: this.removeIndex(this.state.listTrousersImage, index) });
        }
        else if (imageType == 'accessories') {
            this.setState({ listAccessoriesImage: this.removeIndex(this.state.listAccessoriesImage, index) });
        }
    }

    selectImage = (imageType) => {
        ImagePicker.openPicker({
            width: this.imageWidth,
            height: this.imageHeight,
            compressImageMaxHeight: this.imageHeight,
            compressImageMaxWidth: this.imageWidth,
            includeBase64: true,
            cropping: true
        })
            .then(result => {
                if (imageType == 'primary') {
                    this.setState({ listPrimaryImage: [...this.state.listPrimaryImage, { 'data': result.data, 'path': result.path }] });
                } else if (imageType == 'shirt') {
                    this.setState({ listShirtImage: [...this.state.listShirtImage, { 'data': result.data, 'path': result.path }] });
                }
                else if (imageType == 'trousers') {
                    this.setState({ listTrousersImage: [...this.state.listTrousersImage, { 'data': result.data, 'path': result.path }] });
                }
                else if (imageType == 'accessories') {
                    this.setState({ listAccessoriesImage: [...this.state.listAccessoriesImage, { 'data': result.data, 'path': result.path }] });
                }
            })
            .catch(reason => {
                console.log(reason);
            })
    }
    takePicture = (imageType) => {
        ImagePicker.openCamera({
            width: this.imageWidth,
            height: this.imageHeight,
            compressImageMaxHeight: this.imageHeight,
            compressImageMaxWidth: this.imageWidth,
            includeBase64: true,
            cropping: true
        })
            .then(result => {
                if (imageType == 'primary') {
                    this.setState({ listPrimaryImage: [...this.state.listPrimaryImage, { 'data': result.data, 'path': result.path }] });
                } else if (imageType == 'shirt') {
                    this.setState({ listPrimaryImage: [...this.state.listShirtImage, { 'data': result.data, 'path': result.path }] });
                }
                else if (imageType == 'trousers') {
                    this.setState({ listTrousersImage: [...this.state.listTrousersImage, { 'data': result.data, 'path': result.path }] });
                }
                else if (imageType == 'accessories') {
                    this.setState({ listAccessoriesImage: [...this.state.listAccessoriesImage, { 'data': result.data, 'path': result.path }] });
                }
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    postStatus = () => {
        const { content, privacy, listPrimaryImage, listShirtImage, listTrousersImage, listAccessoriesImage, info, type } = this.state;
        this.setState({ isLoading: true, isPrePosting: false });
        PostService.createPost(content, privacy, listPrimaryImage, listShirtImage, listTrousersImage, listAccessoriesImage, info.id, type)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ isLoading: false });
                    if (response.listPost && response.listPost.length > 0) {
                        this.props.navigation.dangerouslyGetParent().setOptions({
                            tabBarVisible: true
                        });
                        this.setState({
                            token: '',
                            account: {},
                            content: '',
                            privacy: 3,
                            listPrimaryImage: [],
                            listShirtImage: [],
                            listTrousersImage: [],
                            listAccessoriesImage: [],
                            isPrePosting: false
                        })
                        this.props.navigation.navigate('Newsfeed', { 'preScreen': 'CreatePost' });
                    }
                } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                    this.setState({ isLoading: true });
                    console.log(response.errorMessage);
                    Alert.alert('Thông báo', 'Đăng bài không thành công');
                }
            })
            .catch(reason => {
                this.setState({ isLoading: true });
                console.log(reason);
                Alert.alert('Thông báo', 'Đăng bài không thành công');
            });
    }

    onPressPostButton() {
        if (this.state.type == 0) {
            this.getListInfo();
            this.setState({ isPrePosting: true });
        } else {
            this.postStatus();
        }
    }

    componentDidMount() {
        this.checkLoginToken();
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: false
            });
        });
        this._screenFocus = this.props.navigation.addListener('blur', () => {
            this.setState({ isShowIntro: false });
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: false
            });
        });
    }

    render() {
        const { account, listPrimaryImage, listAccessoriesImage, listShirtImage, listTrousersImage, content, privacy, isLoading, isPrePosting, info, listInfo, type } = this.state;
        const privacies = [
            {
                value: 1,
                label: 'Chỉ mình tôi',
                icon: () => <FontAwesome5 name='user-shield' size={20} color={'#9E9E9E'} />
            },
            {
                value: 2,
                label: 'Chỉ bạn bè',
                icon: () => <FontAwesome5 name='user-friends' size={20} color={'#9E9E9E'} />

            },
            {
                value: 3,
                label: 'Công khai',
                icon: () => <MaterialIcons name='public' size={20} color={'#9E9E9E'} />

            }
        ]
        const postTypes = [
            {
                value: 0,
                label: 'Chia sẻ cá nhân',
                icon: () => <FontAwesome5 name='user-shield' size={20} color={'#9E9E9E'} />
            },
            {
                value: 1,
                label: 'Đăng sản phẩm',
                icon: () => <FontAwesome5 name='user-friends' size={20} color={'#9E9E9E'} />

            }
        ]
        const infoFields = [
            { id: 'name', name: 'Tiêu đề', unit: '' },
            { id: 'height', name: 'Chiều cao', unit: 'cm' },
            { id: 'weight', name: 'Cân nặng', unit: 'kg' },
            { id: 'bustSize', name: 'Vòng 1', unit: 'cm' },
            { id: 'waistSize', name: 'Vòng 2', unit: 'cm' },
            { id: 'hipSize', name: 'Vòng 3', unit: 'cm' },
        ]
        return (
            <View style={styles().Container}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <View style={styles().Header}>
                    <Ionicons
                        onPress={() => this.props.navigation.goBack()}
                        style={styles().IconClose}
                        name='close' size={40} color={'black'} />
                    <Text style={styles().HeaderText}>Tạo bài viết</Text>
                    <TouchableHighlight
                        style={[
                            styles().ButtonPost,
                            listPrimaryImage.length > 0 && content.length > 0 ? styles().ButtonPostActiveColor : styles().ButtonPostInactiveColor
                        ]}
                        underlayColor={'#0000FF'}
                        disabled={isLoading || listPrimaryImage.length == 0 || content.length == 0}
                        onPress={() => this.onPressPostButton()}>
                        <View>

                            <Text style={styles().ButtonPostText}>Đăng</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles().ArticleHeader}>
                    <TouchableWithoutFeedback
                        onPress={() => this.navigateProfile(account.accountID)}
                    >
                        <Image
                            source={account.avatarUri && account.avatarUri.length > 0 ?
                                { uri: Const.assets_domain + account.avatarUri } : AVATAR}
                            style={Style.newsfeed.ArticleAvatar} />
                    </TouchableWithoutFeedback>
                    <View style={Style.newsfeed.ArticleHeader}>
                        <Text
                            onPress={() => this.navigateProfile(account.accountID)}
                            style={{
                                fontFamily: 'SanFranciscoText-Bold',
                                color: 'black'
                            }}>{account.firstName + ' ' + account.lastName}</Text>
                        <DropDownPicker
                            defaultValue={3}
                            containerStyle={{ width: scale(190, Horizontal), height: scale(35, Vertical) }}
                            items={privacies}
                            style={styles().ArticlePrivacy}
                            onChangeItem={(item) => this.setState({ privacy: item.value })}
                        />
                        <DropDownPicker
                            defaultValue={0}
                            containerStyle={{ width: scale(190, Horizontal), height: scale(35, Vertical) }}
                            items={postTypes}
                            style={styles().ArticlePrivacy}
                            onChangeItem={(item) => this.setState({ type: item.value })}
                        />
                    </View>
                </View>
                <FlatList
                    data={listPrimaryImage}
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={2}
                    keyExtractor={(item, index) => index + ''}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles().ArticleImageBounder}>
                                <Image
                                    style={styles().ArticleImage}
                                    source={{ uri: 'data:image/png;base64,' + item.data }} />
                                <TouchableWithoutFeedback
                                    onPress={() => this.editImage(item, index, 'primary')}
                                >
                                    <View
                                        style={styles().ArticleEditImage}>
                                        <FontAwesome5 name='edit' color='#5E5E5E' size={20} />
                                        <Text style={styles().ArticleEditImageText}>Chỉnh sửa</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => this.deleteImage('primary', index)}
                                >
                                    <View
                                        style={styles().ArticleDeleteImage}>
                                        <Ionicons name='close-circle' color='#5E5E5E' size={30} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    }}
                    ListHeaderComponent={(
                        <View >
                            <TextInput
                                multiline={true}
                                onChangeText={(text) => this.setState({ content: text })}
                                placeholder={'Hãy nói gì đó về phong cách này...'}
                                value={content}
                                style={styles().ArticleCaption}
                            />
                        </View>
                    )}
                />
                <View style={styles().ToolArea}>
                    <TouchableWithoutFeedback onPress={() => this.selectImage('primary')}>
                        <MaskedView
                            style={{ flex: 1 }}
                            maskElement={
                                <FontAwesome5 style={styles().IconTool} name='file-image' size={30} color={'black'} />
                            }
                        >
                            <Image style={styles().ToolAreaBackground} source={OCEAN_BACKGROUND} />
                        </MaskedView>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.takePicture('primary')}>
                        <MaskedView
                            style={{ flex: 1 }}
                            maskElement={
                                <Entypo style={styles().IconTool} name='camera' size={30} color={'black'} />
                            }
                        >
                            <Image style={styles().ToolAreaBackground} source={OCEAN_BACKGROUND} />
                        </MaskedView>
                    </TouchableWithoutFeedback>
                </View>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={isPrePosting}
                    onRequestClose={() => {
                        this.setState({ isPrePosting: false });
                    }}
                >
                    <View style={{
                        height: scale(460, Vertical),
                        width: scale(300, Horizontal),
                        backgroundColor: 'white',
                        borderWidth: 0.5,
                        borderRadius: 10,
                        alignSelf: 'center',
                        marginTop: scale(150, Vertical)
                    }}>
                        <View style={{
                            paddingHorizontal: scale(10, Horizontal),
                            paddingVertical: scale(10, Vertical)
                        }}>
                            <Text>Bộ số đo người mẫu trong bài</Text>
                            <DropDownPicker
                                defaultValue={listInfo[0] ? listInfo[0].id : null}
                                containerStyle={{ width: scale(150, Horizontal), height: scale(30, Vertical) }}
                                items={listInfo}
                                style={styles().DropdownInfo}
                                onChangeItem={(item) => {
                                    this.setState({ info: item.data })
                                }}
                                placeholder={'Chọn số đo sẵn có'}
                            />
                            <ScrollView>
                                {infoFields.map(item => (
                                    <InfoField
                                        key={item.id}
                                        name={item.name}
                                        id={item.id}
                                        value={info[item.id]}
                                        unit={item.unit}
                                        onChange={(value) => {
                                            let temp = info;
                                            temp[item.id] = value;
                                            this.setState({ info: temp })
                                        }}

                                    />
                                ))}

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: scale(10, Vertical)
                                }}>
                                    <TouchableOpacity
                                        style={{ marginLeft: 'auto', }}
                                        onPress={() => {
                                            this.setState({ isPrePosting: false });
                                            this.props.navigation.navigate('CreateInfo')
                                        }}
                                    >
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['#fbb897', '#ff8683']}
                                            style={{
                                                height: scale(30, Vertical),
                                                width: scale(60, Horizontal),
                                                paddingVertical: scale(5, Vertical),
                                                paddingHorizontal: scale(5, Horizontal),
                                                borderRadius: 5,
                                                alignItems: 'center'
                                            }}>
                                            <Text style={styles().ButtonPostText}>Mới</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ marginLeft: 'auto', marginRight: 'auto', }}
                                        onPress={() => this.postStatus()}
                                    >
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['#fbb897', '#ff8683']}
                                            style={{
                                                height: scale(30, Vertical),
                                                width: scale(60, Horizontal),
                                                paddingVertical: scale(5, Vertical),
                                                paddingHorizontal: scale(5, Horizontal),
                                                borderRadius: 5,
                                                alignItems: 'center'
                                            }}>
                                            <Text style={styles().ButtonPostText}>Đăng</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>


                                </View>
                            </ScrollView>
                        </View>

                    </View>
                </Modal>
                {isLoading ? (
                    <View style={styles().PostingIndicator}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) :
                    (<View></View>)}
                <Modal
                    transparent={true}
                    visible={this.state.isShowIntro}
                    onRequestClose={() => this.setState({ isShowIntro: false })}
                >
                    <View style={{
                        height: scale(400, Vertical),
                        width: scale(300, Horizontal),
                        backgroundColor: 'white',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        borderRadius: 10,
                        elevation: 10,
                        paddingHorizontal: scale(20, Horizontal),
                        paddingVertical: scale(20, Vertical),
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>Thông báo này chỉ hiển thị lần đầu</Text>
                        <Text>Có 2 dạng bài viết:</Text>
                        <Text style={{
                            marginLeft: scale(10, Horizontal),
                            marginTop: scale(5, Vertical),
                        }}>Dạng 1: Bài viết chia sẻ cá nhân là bài đăng thông thường chia sẻ phong cách thời trang của bạn.</Text>
                        <Text style={{
                            marginLeft: scale(10, Horizontal),
                            marginTop: scale(5, Vertical),
                        }}                        >Dạng 2: Bài viết giới thiệu sản phẩm cho việc kinh doanh là bài viết đăng thông tin sản phẩm thời trang. Với loại bài đăng này bạn sẽ mất phí. Người dùng sẽ dế tìm thấy sản phẩm của qua tính năng tìm nơi bán</Text>
                        <Text>Lưu ý: Trong bài viết yêu cầu phải có hình ảnh và tiêu đề. Nội dung sẽ được kiểm định, chỉ được phép đăng nội dung về thời trang và hợp lệ.</Text>
                        <TouchableOpacity
                            onPress={() => this.setState({ isShowIntro: false })}
                            style={{
                                height: scale(30, Vertical),
                                width: scale(80, Horizontal),
                                backgroundColor: '#2a7ea0',
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: scale(10, Vertical),
                                marginLeft: 'auto',
                                marginRight: scale(0, Horizontal)
                            }}
                        ><Text style={{ color: 'white' }}>Đã đọc</Text></TouchableOpacity>
                    </View>
                </Modal>
            </View >
        )
    }
}

const styles = (props) => StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        flex: 1
    },
    Header: {
        height: scale(50, Vertical),
        borderBottomWidth: 1,
        borderBottomColor: '#9E9E9E',
        alignItems: 'center',
        flexDirection: 'row'
    },
    IconClose: { marginLeft: scale(15, Horizontal) },
    HeaderText: { marginLeft: 'auto' },
    ButtonPost: {
        marginLeft: 'auto',
        marginRight: scale(15, Horizontal),
        borderRadius: 5,
        paddingVertical: scale(3, Vertical),
        paddingHorizontal: scale(10, Horizontal)
    },
    ButtonPostActiveColor: {
        backgroundColor: '#4489FF'
    },
    ButtonPostInactiveColor: {
        backgroundColor: '#c1c1c1'
    },
    ButtonPostText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
    ArticleHeader: {
        flexDirection: 'row',
        marginTop: scale(10, Vertical)
    },
    ArticlePrivacy: {
        marginTop: scale(5, Vertical),
        borderRadius: 5,
        borderColor: '#9E9E9E'
    },
    ArticleCaption: {
        backgroundColor: 'white',
        borderColor: '#9E9E9E',
        marginHorizontal: scale(10, Horizontal),
        marginVertical: scale(10, Vertical),
        borderRadius: 5
    },
    ToolArea: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 0,
        height: scale(40, Vertical)
    },
    ToolAreaBackground: { height: null, width: null, flex: 1, resizeMode: 'stretch' },
    IconTool: { marginLeft: 'auto', marginRight: 'auto' },
    ArticleImageBounder: {
        marginLeft: scale(10, Horizontal),
    },
    ArticleImage: {
        width: scale(180, Horizontal),
        height: scale(320, Horizontal),
        resizeMode: 'cover',
        borderRadius: 10
    },
    ArticleEditImage: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 5,
        top: scale(5, Vertical),
        left: scale(5, Horizontal),
        flexDirection: 'row'
    },
    ArticleEditImageText: { marginLeft: scale(5, Horizontal) },
    ArticleDeleteImage: {
        position: 'absolute',
        borderRadius: 5,
        left: scale(150, Horizontal),
    },
    PostingIndicator: {
        height: scale(711, Vertical),
        width: scale(400, Horizontal),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0
    },
    DropdownInfo: {
        borderRadius: 5,
        borderColor: '#9E9E9E',
        width: scale(200, Horizontal)
    },
})