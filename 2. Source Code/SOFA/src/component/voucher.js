import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { createAppContainer } from 'react-navigation';
import * as Style from '../style/style';
import VoucherNavigator from '../tabs/VoucherRouter';
const AppIndex = createAppContainer(VoucherNavigator);
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default class Voucher extends Component {
    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={false} backgroundColor={Style.statusBarColor} />     
                <AppIndex />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        backgroundColor: 'red',
        paddingTop: 5,
    }
});