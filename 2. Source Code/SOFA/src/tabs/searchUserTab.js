import React, { Component } from 'react';
import { Text, SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import * as Request from '../common/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Style from '../style/style';
import * as Const from '../common/const';

export default class SearchPostTab extends Component {
    static navigationOptions = {
        title: 'Mọi người',
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillUnmount() { }
    componentDidMount() {
        
    }
    render() {

    }
}