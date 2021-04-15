import React, { Component, createRef } from 'react';
import { View, Text, StatusBar, Image, TouchableWithoutFeedback, FlatList, ActivityIndicator, Modal, TouchableOpacity, ToastAndroid, ImageBackground, StyleSheet, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

import * as Style from '../style/style';
import * as Const from '../common/const';
import { scale, getData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { AVATAR, WHITE_BACKGROUND, GALAXY_BACKGROUND, OCEAN_BACKGROUND } from '../../image/index';

import * as PostService from '../service/postService';
import * as AuthService from '../service/authService';
import * as MarkupPostService from '../service/markupPostService';
import * as NotificationService from '../service/notificationService';
import * as FollowService from '../service/followService';
import * as ReportService from '../service/reportService';

export default class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            reasons: [],
            reportType: 1,
            toAccountID: 0,
            toPostID: 85,
            toCommentID: 0,
            reportContent: '',
            reasonCount: 0
        }
    }

    filterList(reasons) {
        let listTemp = []
        for (let i = 0; i < reasons.length; i++) {
            if (reasons[i].reportTypeID == this.state.reportType) {
                listTemp.push(reasons[i]);
                listTemp[listTemp.length - 1].isSelect = false;
            }
        }
        this.setState({ reasons: listTemp, isLoading: false })
    }

    onPressOnReason(index) {
        let listTemp = this.state.reasons;
        if (listTemp[index].isSelect) {
            this.setState({ reasonCount: this.state.reasonCount - 1 });
        } else {
            this.setState({ reasonCount: this.state.reasonCount + 1 });

        }
        listTemp[index].isSelect = !listTemp[index].isSelect;
        this.setState({ reasons: listTemp });
    }

    getAllReason() {
        ReportService.getAllReason()
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    let listReasonRes = response.listReport[0].listReason;
                    this.filterList(listReasonRes);
                } else {
                    ToastAndroid.show("Tải danh sách lý do thất bại!", ToastAndroid.LONG);
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                    this.props.navigation.goBack();
                } else {
                    ToastAndroid.show("Tải danh sách lý do thất bại!", ToastAndroid.LONG);
                }
            })
    }
    createReport() {
        this.setState({ isLoading: true });
        const { toAccountID, toPostID, toCommentID, reportType, reportContent, reasons } = this.state;
        ReportService.createReport(toAccountID, toPostID, toCommentID, reportType, reportContent, reasons)
            .then(response => {
                if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                    ToastAndroid.show("Chúng tôi cảm ơn sự đóng góp của bạn!", ToastAndroid.LONG);
                    this.setState({ isLoading: false });
                } else {
                    ToastAndroid.show("Báo cáo không thành công!", ToastAndroid.LONG);
                    this.setState({ isLoading: false });
                }
            })
            .catch(reason => {
                console.log(reason);
                if (reason.code == Const.REQUEST_CODE_NOT_LOGIN) {
                    ToastAndroid.show('Hãy đăng nhập để thực hiện việc này', ToastAndroid.LONG);
                    this.props.navigation.goBack();
                } else {
                    ToastAndroid.show("Báo cáo không thành công!", ToastAndroid.LONG);
                    this.setState({ isLoading: false });
                }
            });
    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoading: true });
            const { reportType, toAccountID, toPostID, toCommentID } = this.props.route.params;
            switch (reportType) {
                case Const.REPORT_TYPE_POST:
                    this.setState({ toPostID: toPostID });
                    break;
                case Const.REPORT_TYPE_USER:
                    this.setState({ toAccountID: toAccountID });
                    break;
                case Const.REPORT_TYPE_COMMENT:
                    this.setState({ toCommentID: toCommentID });
                    break;
            }
            this.getAllReason();
        });
        this._screenUnfocus = this.props.navigation.addListener('blur', () => {
        });
    }
    componentWillUnmount() {

    }

    render() {
        const { isLoading, reasons, reportContent, reasonCount } = this.state;
        return (
            <View style={[styles.container]}>
                {!isLoading ? (
                    <View>
                        <View style={[styles.header]}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <FontAwesome style={[styles.headerCloseButton]} name='close' size={35} color='gray' />
                            </TouchableOpacity>
                            <Text style={[styles.headerText]}>Báo cáo</Text>
                            <TouchableOpacity
                                disabled={reasonCount == 0 || reportContent.trim().length == 0}
                                onPress={() => this.createReport()}
                            >
                                <Ionicons style={[styles.headerDoneButton]} name='md-checkmark-done-sharp' size={35} color={reasonCount > 0 && reportContent.trim().length > 0 ? '#2a7ea0' : 'gray'} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.body]}>
                            <View style={[styles.bodyTitleBounder]}>
                                <MaterialIcons name='label-important' size={35} color="#FFA45E" />
                                <Text style={[styles.bodyTitleText]}>Vui lòng chọn lý do để tiếp tục</Text>
                            </View>
                            <Text style={[styles.bodyTitleTextDetail]}>Bạn có thể thực hiện báo cáo sau khi đã chọn lý do</Text>
                            <View style={[styles.listReasonAre]}>
                                <FlatList
                                    data={reasons}
                                    keyExtractor={(item, index) => item.id + ''}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View
                                                style={[
                                                    styles.reasonItemBounder,
                                                    !item.isSelect ? { backgroundColor: '#ACACAC' } : { backgroundColor: '#2a7ea0' }
                                                ]}
                                            >
                                                <TouchableWithoutFeedback
                                                    onPress={() => this.onPressOnReason(index)}
                                                >
                                                    <View
                                                    >
                                                        <Text style={[styles.reasonItemName]}>{item.name}</Text>
                                                        <Text style={[styles.reasonItemDes]}>{item.description}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            <View style={[styles.reportContentBounder]}>
                                <TextInput
                                    placeholder={'Chi tiết hơn'}
                                    style={[styles.reportContentText]}
                                    value={reportContent}
                                    onChangeText={(text) => this.setState({ reportContent: text })}
                                />
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.loadingIndicator}>
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
        flex: 1
    },
    loadingIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    header: {
        flexDirection: 'row',
        paddingVertical: scale(10, Vertical),
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        width: scale(400, Horizontal),
    },
    headerCloseButton: {
        alignSelf: 'center',
        marginLeft: scale(20, Horizontal),
        marginRight: 'auto',
    },
    headerText: {
        alignSelf: 'center',
        fontFamily: 'Segeo UI',
        fontWeight: 'bold',
        color: '#313131',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 22
    },
    headerDoneButton: {
        alignSelf: 'center',
        marginRight: scale(20, Horizontal),
        marginLeft: 'auto',
    },
    body: {
        paddingVertical: scale(20, Vertical),
        paddingHorizontal: scale(20, Horizontal)
    },
    bodyTitleBounder: {
        flexDirection: 'row'
    },
    bodyTitleText: {
        fontFamily: 'Segeo UI',
        color: '#313131',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    listReasonAre: {
        height: scale(500, Vertical)
    },
    reasonItemBounder: {
        paddingVertical: scale(5, Vertical),
        paddingHorizontal: scale(10, Horizontal),
        marginVertical: scale(10, Vertical),
        borderRadius: 10
    },
    reasonItemName: {
        color: 'white',
        fontWeight: 'bold',
    },
    reasonItemDes: {
        fontSize: 14
    },
    reportContentText: {
        backgroundColor: 'white',
        marginVertical: scale(10, Vertical),
        borderRadius: 10
    }
})