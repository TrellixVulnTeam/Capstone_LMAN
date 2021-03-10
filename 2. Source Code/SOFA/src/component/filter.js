import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';
export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = { currentValue: props.initVal }
    }
    setValue = (value) => {
        this.setState({ currentValue: value });
    }

    render() {
        const { name, minimum, maximum, onChange, step } = this.props;
        const { currentValue } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.text}>{name}</Text>
                    <Text
                        style={{
                            width: scale(50, Horizontal),
                            backgroundColor: 'white',
                            marginLeft: 'auto',
                            marginRight: scale(40, Horizontal),
                            marginTop: scale(5, Vertical),
                            borderRadius: 10,
                            textAlign: 'center',
                            textAlignVertical: 'center'

                        }}
                    >{currentValue + ""}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', width: scale(33, Horizontal), textAlign: 'right' }}>{minimum}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={minimum}
                        maximumValue={maximum}
                        value={currentValue ? currentValue : 0}
                        step={step}
                        onValueChange={(value) => {
                            this.setState({ currentValue: Math.round((value + Number.EPSILON) * 10) / 10 })
                            onChange(value);
                        }}
                        thumbTintColor={'white'}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                    <Text style={{ color: 'white', width: scale(45, Horizontal) }}>{maximum}</Text>
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: scale(400, Horizontal),
        paddingHorizontal: scale(10, Horizontal),
    },
    text: {
        marginLeft: scale(40, Horizontal),
        color: 'white'
    },
    slider: {
        alignSelf: 'center',
        width: scale(310, Horizontal),
        height: scale(40, Vertical),
    },
});