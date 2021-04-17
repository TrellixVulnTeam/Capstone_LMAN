import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
export default class InfoField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onChange, name, value, unit, keyboardType, editable } = this.props;
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: scale(10, Vertical),
                paddingLeft: scale(10, Horizontal)
            }}>
                <Text>{name}</Text>
                <TextInput
                    editable={editable ? editable : false}
                    keyboardType={keyboardType}
                    value={value + ''}
                    onChangeText={(text) => {
                        onChange(text);
                    }}
                    style={{
                        height: scale(40, Vertical),
                        width: scale(150, Horizontal),
                        backgroundColor: '#E6E6E6',
                        marginLeft: 'auto',
                        marginRight: scale(10, Horizontal),
                        borderRadius: 5
                    }}
                />
                <Text style={{
                    position: 'absolute',
                    right: scale(20, Horizontal)
                }}>{unit}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
});