import React, { Component } from 'react';
import { View, Text, StatusBar, Button, Image, TouchableHighlight, Alert, PermissionsAndroid, FlatList, TouchableWithoutFeedback } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';

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
import { AVATAR, ADD_PRIMARY_IMAGE, BACKGROUND } from '../../image/index';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';


export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            content: '',
            privacy: 3,
            listPrimaryImage: [],
            listShirtImage: [],
            listTrousersImage: [],
            listAccessoriesImage: []
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

    checkLoginToken = async () => {
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

                                this.setState({ account: response, isLogin: true, token: token });
                            } else {
                                this.setState({ account: {}, isLogin: false, token: '' });
                                this.props.navigation.navigate('Newsfeed');
                            }
                        })
                        .catch(reason => {
                            this.setState({ account: {}, isLogin: false, token: '' });
                            this.props.navigation.navigate('Newsfeed');
                        })
                }
            })
            .catch(reason => {
                this.setState({ token: '' });
                console.log(reason);
                this.props.navigation.navigate('Newsfeed');
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

    removeIndex = (list = [], index) => {
        let listTemp = list;
        for (let i = index; i < listTemp.length; i++) {
            listTemp[i] = listTemp[i + 1];
        }
        listTemp.pop();
        return listTemp;
    }

    deleteImage = (imageType, index) => {
        if (imageType == 'primary') {
            this.setState({ listPrimaryImage: this.removeIndex(this.state.listPrimaryImage, index) });
        } else if (imageType == 'shirt') {
            this.setState({ listShirtImage: this.removeIndex(this.state.listShirtImage, index) });
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
            width: 1000,
            height: 1000,
            compressImageMaxHeight: 2160,
            compressImageMaxWidth: 2160,
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
            width: 1000,
            height: 1000,
            compressImageMaxHeight: 1000,
            compressImageMaxWidth: 1000,
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
        const { token, account, content, privacy, listPrimaryImage, listShirtImage, listTrousersImage, listAccessoriesImage } = this.state;
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            'Content-Type': 'multipart/form-data',
            "Accept": 'application/json',
            "Authorization": 'Bearer ' + token,
        };
        let data = new FormData();
        data.append('content', content);
        data.append('PrivacyID', privacy);
        let listImage = [];
        let count = 0;
        for (let i = 0; i < listPrimaryImage.length; i++) {
            data.append('ListImage[' + count + '].Image', listPrimaryImage[i].data);
            data.append('ListImage[' + count + '].ImageType', 1);
            count++;
        }
        for (let i = 0; i < listShirtImage.length; i++) {
            data.append('ListImage[' + count + '].Image', listShirtImage[i].data);
            data.append('ListImage[' + count + '].ImageType', 1);
            count++;
        }
        for (let i = 0; i < listTrousersImage.length; i++) {
            data.append('ListImage[' + count + '].Image', listTrousersImage[i].data);
            data.append('ListImage[' + count + '].ImageType', 1);
            count++;
        }
        for (let i = 0; i < listAccessoriesImage.length; i++) {
            data.append('ListImage[' + count + '].Image', listAccessoriesImage[i].data);
            data.append('ListImage[' + count + '].ImageType', 1);
            count++;
        }
        let uri = Const.domain + 'api/post/createpost';
        Request.Post(uri, header, data)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    if (response.listPost && response.listPost.length > 0) {
                        let post = response.listPost[0];
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
                            listAccessoriesImage: []
                        })
                        this.props.navigation.navigate('Newsfeed');
                    }
                } else if (response && response.code && response.code == Const.REQUEST_CODE_FAILED) {
                    console.log(response.errorMessage);
                    Alert.alert('Thông báo', 'Đăng bài không thành công');
                }
            })
            .catch(reason => {
                console.log(reason);
                Alert.alert('Thông báo', 'Đăng bài không thành công');
            })
    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: false
            });
        });
    }

    render() {
        const { account, listPrimaryImage, listAccessoriesImage, listShirtImage, listTrousersImage, content, privacy } = this.state;
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
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <StatusBar hidden={false} backgroundColor={'#FFF5F1'} />
                <View style={{
                    height: scale(50, Vertical),
                    borderBottomWidth: 1,
                    borderBottomColor: '#9E9E9E',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Ionicons onPress={() => this.props.navigation.goBack()} style={{ marginLeft: scale(15, Horizontal) }} name='close' size={40} color={'black'} />
                    <Text style={{ marginLeft: 'auto' }}>Tạo bài viết</Text>

                    <View style={{
                        marginLeft: 'auto',
                        marginRight: scale(15, Horizontal),
                        backgroundColor: (content.length > 0 || listPrimaryImage.length > 0) ? '#4489FF' : '#c1c1c1',
                        borderRadius: 5,
                        paddingVertical: scale(3, Vertical),
                        paddingHorizontal: scale(10, Horizontal)
                    }}>
                        <TouchableWithoutFeedback onPress={() => this.postStatus()}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>Đăng</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: scale(10, Vertical) }}>
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
                            style={Style.newsfeed.ArticleAuthor}>{account.firstName + ' ' + account.lastName}</Text>
                        <DropDownPicker
                            defaultValue={3}
                            containerStyle={{ width: scale(150, Horizontal), height: scale(30, Vertical) }}
                            items={privacies}
                            style={{ borderRadius: 5, borderColor: '#9E9E9E' }}
                            onChangeItem={(item) => this.setState({ privacy: item.id })}
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
                            <View style={{
                                marginLeft: scale(10, Horizontal),
                            }}>
                                <Image
                                    style={{
                                        width: scale(180, Horizontal),
                                        height: scale(180, Horizontal),
                                        resizeMode: 'stretch',
                                        borderRadius: 10
                                    }}
                                    source={{ uri: 'data:image/png;base64,' + item.data }} />
                                <TouchableWithoutFeedback
                                    onPress={() => this.editImage(item, index, 'primary')}
                                >
                                    <View
                                        style={{
                                            position: 'absolute',
                                            backgroundColor: 'rgba(255,255,255,0.6)',
                                            borderRadius: 5,
                                            top: scale(5, Vertical),
                                            left: scale(5, Horizontal),
                                            flexDirection: 'row'
                                        }}>

                                        <FontAwesome5 name='edit' color='#5E5E5E' size={20} />
                                        <Text style={{ marginLeft: scale(5, Horizontal) }}>Chỉnh sửa</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => this.deleteImage('primary', index)}
                                >
                                    <View
                                        style={{
                                            position: 'absolute',
                                            borderRadius: 5,
                                            left: scale(150, Horizontal),
                                        }}>

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
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: '#9E9E9E',
                                    marginHorizontal: scale(10, Horizontal),
                                    marginVertical: scale(10, Vertical),
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    )}
                />
                <View style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 'auto',
                    marginBottom: 0,
                    height: scale(40, Vertical)
                }}>
                    <TouchableWithoutFeedback onPress={() => this.selectImage('primary')}>
                        <MaskedView
                            style={{ flex: 1 }}
                            maskElement={
                                <FontAwesome5 style={{ marginLeft: 'auto', marginRight: 'auto' }} name='file-image' size={30} color={'black'} />
                            }
                        >
                            <Image style={{ height: null, width: null, flex: 1, resizeMode: 'stretch' }} source={BACKGROUND} />
                        </MaskedView>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.takePicture('primary')}>
                        <MaskedView
                            style={{ flex: 1 }}
                            maskElement={
                                <Entypo style={{ marginLeft: 'auto', marginRight: 'auto' }} name='camera' size={30} color={'black'} />
                            }
                        >
                            <Image style={{ height: null, width: null, flex: 1, resizeMode: 'stretch' }} source={BACKGROUND} />
                        </MaskedView>
                    </TouchableWithoutFeedback>
                </View>
            </View >
        )
    }
}