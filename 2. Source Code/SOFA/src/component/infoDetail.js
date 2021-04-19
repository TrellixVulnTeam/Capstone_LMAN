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
import LinearGradient from 'react-native-linear-gradient';


import * as Request from '../common/request';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Style from '../style/style';
import * as Const from "../common/const";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import { AVATAR, ADD_PRIMARY_IMAGE, BACKGROUND } from '../../image/index';
import InfoField from './infoField';
import { Item } from 'native-base';
import Session from '../common/session';
import * as InfoService from '../service/infoService';
export default class InfoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {
                firstName: '',
                lastName: '',
            },
            info: {
                id: 0,
                accountID: 0,
                height: 0,
                weight: 0,
                bustSize: 0,
                waistSize: 0,
                hipSize: 0,
                skinColor: 0,
                name: ''
            },
            isLoading: false,
        }
    }

    checkLoginToken = async () => {
        this.setState({ account: Session.getInstance().account })
    }

    componentDidMount() {
        this.checkLoginToken();
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.checkLoginToken();
            const { info } = this.props.route.params;
            this.setState({ info: info });
        });
        this._screenFocus = this.props.navigation.addListener('blur', () => {
            this.setState({
                account: {},
                info: {
                    id: 0,
                    accountID: 0,
                    height: 0,
                    weight: 0,
                    bustSize: 0,
                    waistSize: 0,
                    hipSize: 0,
                    skinColor: 0,
                    name: ''
                },
                isLoading: false,
            })
        });
    }

    deleteInfo() {
        InfoService.deleteInfo(this.state.info.id)
            .then(response => {
                if (response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.props.navigation.goBack();
                } else {
                    ToastAndroid.show('Xóa không thành công', ToastAndroid.LONG);
                }
            })
            .catch(reason => {
                console.log(reason);
                ToastAndroid.show('Xóa không thành công', ToastAndroid.LONG);
            })
    }

    render() {
        const { account, info, isLoading } = this.state;
        const infoFields = [
            { id: 'name', name: 'Tiêu đề', unit: '', keyboardType: 'default', onChange: (value) => this.setState({ info: { ...this.state.info, name: value.length > 0 ? value : '' } }) },
            { id: 'height', name: 'Chiều cao', unit: 'cm', keyboardType: 'decimal-pad', onChange: (value) => this.setState({ info: { ...this.state.info, height: parseFloat(value.trim().length > 0 ? value.trim() : 0) } }) },
            { id: 'weight', name: 'Cân nặng', unit: 'kg', keyboardType: 'decimal-pad', onChange: (value) => this.setState({ info: { ...this.state.info, weight: parseFloat(value.trim().length > 0 ? value.trim() : 0) } }) },
            { id: 'bustSize', name: 'Vòng 1', unit: 'cm', keyboardType: 'decimal-pad', onChange: (value) => this.setState({ info: { ...this.state.info, bustSize: parseFloat(value.trim().length > 0 ? value.trim() : 0) } }) },
            { id: 'waistSize', name: 'Vòng 2', unit: 'cm', keyboardType: 'decimal-pad', onChange: (value) => this.setState({ info: { ...this.state.info, waistSize: parseFloat(value.trim().length > 0 ? value.trim() : 0) } }) },
            { id: 'hipSize', name: 'Vòng 3', unit: 'cm', keyboardType: 'decimal-pad', onChange: (value) => this.setState({ info: { ...this.state.info, hipSize: parseFloat(value.trim().length > 0 ? value.trim() : 0) } }) },
        ]
        return (
            <View style={styles().Container}>
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />
                <View style={styles().Header}>
                    <Ionicons
                        onPress={() => this.props.navigation.goBack()}
                        style={styles().IconClose}
                        name='close' size={40} color={'black'} />
                    <Text style={styles().HeaderText}>Chi tiết</Text>
                    <TouchableOpacity
                        style={{ marginLeft: 'auto', marginRight: scale(20, Horizontal), }}
                        onPress={() => this.deleteInfo()}
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
                            <Text style={styles().ButtonPostText}>Xóa</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
                    </View>
                </View>
                <View style={{
                    height: scale(585, Vertical),
                    width: scale(400, Horizontal),
                    backgroundColor: 'white',
                    borderWidth: 0.5,
                    borderRadius: 10,
                    alignSelf: 'center',
                    marginTop: scale(20, Vertical)
                }}>
                    <View style={{
                        paddingHorizontal: scale(10, Horizontal),
                        paddingVertical: scale(10, Vertical)
                    }}>
                        <ScrollView>
                            {infoFields.map(item => (
                                <InfoField
                                    editable={false}
                                    key={item.id}
                                    name={item.name}
                                    id={item.id}
                                    value={info[item.id]}
                                    unit={item.unit}
                                    keyboardType={item.keyboardType}
                                />
                            ))}
                        </ScrollView>
                    </View>

                </View>
                {isLoading ? (
                    <View style={styles().PostingIndicator}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) :
                    (<View></View>)}
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
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    DropdownInfo: {
        borderRadius: 5,
        borderColor: '#9E9E9E',
        width: scale(200, Horizontal)
    },
})