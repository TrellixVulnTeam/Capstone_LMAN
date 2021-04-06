import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Modal, ActivityIndicator, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Style from '../style/style';
import * as Const from "../common/const";
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';

import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';
import { TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native';


export default class PostMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            account: {},
            isLogin: false,
            isReady: false,
            isFollowed: false,
        }
    }


    actionArticleNotOwn = [
        {
            key: 'buyplace',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Tìm shop',
            detail: () => 'Tìm shop có bán sản phẩm này',
            onPress: () => {

            }
        },
        {
            key: 'savepost',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => !this.props.post.isMarked ? 'Lưu bài viết' : 'Bỏ lưu bài viết',
            detail: () => !this.props.post.isMarked ? 'Thêm vào danh sách các mục đã lưu' : 'Xóa khỏi danh sách các mục đã lưu',
            onPress: () => {
                console.log(this.props.post);
                if (!this.props.post.isMarked) {
                    console.log('save post', this.props.post.id);
                    MarkupPostService.markupPost(this.props.post.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.props.onMarkupPost(response);
                                ToastAndroid.show("Đã lưu bài viết này. Bạn có thể tim trong danh sách bài viết đã lưu.", ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Lưu bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Lưu bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                } else {
                    MarkupPostService.unmarkupPost(this.props.post.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.props.onUnmarkupPost(response);
                                ToastAndroid.show("Đã xóa bài viết khỏi danh sách.", ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Xóa bài viết khỏi danh sách không thành công! Hãy thử lại!", ToastAndroid.LONG);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Xóa bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                }
                this.props.onRequestClose()
            }
        },
        {
            key: 'hidepost',
            icon: () => <AntDesign name='closesquareo' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Ẩn bài viết',
            detail: () => 'Ẩn bài viết này khỏi newsfeed của bạn',
            onPress: () => {
                console.log('hide post', this.props.post.id);
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
            }
        },
        {
            key: 'reportpost',
            icon: () => <Octicons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo bài viết này',
            detail: () => 'Tôi lo ngại về bài viết này',
            onPress: () => {
                console.log('report post', this.props.post.id);
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
                this.props.onRequestClose()
            }
        },
        {
            key: 'followuserpost',
            icon: () => <SimpleLineIcons name='user-follow' size={scale(30, Horizontal)} color={'black'} />,
            title: () => !this.state.isFollowed ? 'Theo dõi ' : 'Bỏ theo dõi' + this.props.post.lastName,
            detail: () => !this.state.isFollowed ? 'Thêm người này vào danh sách theo dõi' : 'Xóa người này khỏi danh sách theo dõi',
            onPress: () => {
                if (!this.state.isFollowed) {
                    FollowService.followSomeone(this.props.post.accountPost)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                ToastAndroid.show("Đã thêm " + this.props.post.lastName + ' vào danh sách follow', ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Thêm " + this.props.post.lastName + ' vào danh sách follow Không thành công', ToastAndroid.LONG);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Thêm " + this.props.post.lastName + ' vào danh sách follow Không thành công', ToastAndroid.LONG);
                            }
                        })
                } else {
                    FollowService.unfollowSomeone(this.props.post.accountPost)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                ToastAndroid.show("Đã xóa " + this.props.post.lastName + ' khỏi danh sách follow', ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Xóa " + this.props.post.lastName + ' khỏi danh sách follow Không thành công', ToastAndroid.LONG);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Xóa " + this.props.post.lastName + ' khỏi danh sách follow Không thành công', ToastAndroid.LONG);
                            }
                        })
                }
                this.props.onRequestClose()
            }
        },
        {
            key: 'reportuser',
            icon: () => <MaterialIcons name='report' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Báo cáo ' + this.props.post.lastName,
            detail: () => 'Tôi lo ngại về người dùng này',
            onPress: () => {
                console.log('report user', this.props.post.id);
                ToastAndroid.show("Tính năng này đang trong quá trình phát triển!", ToastAndroid.LONG);
                this.props.onRequestClose()
            }
        },


    ]
    actionArticleOwn = [
        {
            key: 'savepost',
            icon: () => <Ionicons name='ios-bookmark-outline' size={scale(30, Horizontal)} color={'black'} />,
            title: () => !this.props.post.isMarked ? 'Lưu bài viết' : 'Bỏ lưu bài viết',
            detail: () => !this.props.post.isMarked ? 'Thêm vào danh sách các mục đã lưu' : 'Xóa khỏi danh sách các mục đã lưu',
            onPress: () => {
                console.log(this.props.post);
                if (!this.props.post.isMarked) {
                    console.log('save post', this.props.post.id);
                    MarkupPostService.markupPost(this.props.post.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.props.onMarkupPost(response);
                                ToastAndroid.show("Đã lưu bài viết này. Bạn có thể tim trong danh sách bài viết đã lưu.", ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Lưu bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Lưu bài viết không thành công!", ToastAndroid.SHORT);
                            }
                        })
                } else {
                    MarkupPostService.unmarkupPost(this.props.post.id)
                        .then(response => {
                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                this.props.onUnmarkupPost(response);
                                ToastAndroid.show("Đã xóa bài viết khỏi danh sách.", ToastAndroid.LONG);
                            } else {
                                console.log(response.errorMessage);
                                ToastAndroid.show("Xóa bài viết khỏi danh sách không thành công! Hãy thử lại!", ToastAndroid.LONG);
                            }
                        })
                        .catch(reason => {
                            console.log(reason);
                            if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                                ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                            } else {
                                ToastAndroid.show("Xóa bài viết khỏi danh sách không thành công! Hãy thử lại!", ToastAndroid.LONG);
                            }
                        })
                }
                this.props.onRequestClose()
            }
        },
        {
            key: 'deletepost',
            icon: () => <AntDesign name='delete' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Xóa bài viết',
            detail: () => 'Xóa bài viết này khỏi danh sách bài viết của bạn',
            onPress: () => {
                console.log('delete post', this.props.post.id);
                this.props.onRequestClose()
                this.props.onPressDeletePost(this.props.post.id);
            }
        },
        {
            key: 'editpost',
            icon: () => <MaterialIcons name='mode-edit' size={scale(30, Horizontal)} color={'black'} />,
            title: () => 'Chỉnh sửa bài viết',
            detail: () => 'Chỉnh sửa nội dung của bài viết',
            onPress: () => {
                this.props.onPressEditPost(this.props.post.id);
                this.props.onRequestClose()
            }
        },

    ]

    checkFollow() {
        FollowService.checkFollowed(this.props.post.accountPost)
            .then(response => {
                this.setState({ isReady: true });
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ isFollowed: response.isFollowed });
                }
            })
            .catch(reason => {
                this.setState({ isReady: true });
                console.log(reason);
            })
    }

    onPrepare() {
        this.setState({ isReady: false });
        AuthService.getProfile()
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    this.setState({ account: response, isLogin: true });
                    this.checkFollow();
                } else {
                    this.setState({ account: {}, isLogin: false });
                    this.setState({ isReady: true });
                }
            })
            .catch(reason => {
                this.setState({ isReady: true });
                console.log(reason);
                this.setState({ account: {}, isLogin: false });
            })
    }

    render() {
        const { account, isReady } = this.state;
        const { visible, onRequestClose, post } = this.props;

        return (
            <View            >
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                        onRequestClose();
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressOut={() => onRequestClose()}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: scale(661, Vertical),
                            width: scale(400, Horizontal),
                            backgroundColor: 'transparent',
                        }}
                    >
                        {isReady ? (
                            <View
                                style={Style.newsfeed.articleMenu}>
                                {account.accountID != post.accountPost ?
                                    this.actionArticleNotOwn.map(item =>
                                        <TouchableHighlight
                                            key={item.key}
                                            onPress={() => item.onPress()}
                                            underlayColor={'#9E9E9E'}
                                        >
                                            <View
                                                style={Style.newsfeed.articleMenuItem}>
                                                {item.icon()}
                                                <View style={Style.newsfeed.articleMenuItemText} >
                                                    <Text>{item.title()}</Text>
                                                    <Text style={Style.newsfeed.articleMenuItemTextDetail}>{item.detail()}</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    ) :
                                    this.actionArticleOwn.map(item =>
                                        <TouchableHighlight
                                            key={item.key}
                                            onPress={() => item.onPress()}
                                            underlayColor={'#9E9E9E'}
                                        >
                                            <View
                                                style={Style.newsfeed.articleMenuItem}>
                                                {item.icon()}
                                                <View style={Style.newsfeed.articleMenuItemText} >
                                                    <Text>{item.title()}</Text>
                                                    <Text style={Style.newsfeed.articleMenuItemTextDetail}>{item.detail()}</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                }
                            </View>
                        ) :
                            (<View style={{
                                width: scale(400, Horizontal),
                                height: scale(300, Vertical),
                                position: 'absolute',
                                backgroundColor: 'white',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                bottom: scale(0, Vertical),
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ActivityIndicator size="large" color="#00ff00" />
                            </View>)}

                    </TouchableOpacity>
                </Modal>
            </View >
        )
    }
}