import React, { Component, createRef } from 'react';
import { View, Text, Image } from 'react-native';
import { StackActions } from '@react-navigation/native'

import * as Style from '../style/style';
import * as Const from "../common/const";
import * as Utils from "../common/utils";
import { scale, getData } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
import { color } from 'react-native-reanimated';
import { APP_LOGO } from '../../image/index';

import Session from '../common/session';

export default class Introduction extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    Session.getInstance().token = token
                    this.props.navigation.dispatch(
                        StackActions.replace('BottomNav', {
                            isRefreshing: true
                        })
                    )
                } else {
                    this.props.navigation.dispatch(
                        StackActions.replace('BottomNav', {
                            isRefreshing: true
                        })
                    )
                }
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={APP_LOGO}
                    style={{
                        flex: 1,
                        resizeMode: 'cover',
                        alignSelf: 'center'
                    }}
                />
            </View>
        )
    }
}