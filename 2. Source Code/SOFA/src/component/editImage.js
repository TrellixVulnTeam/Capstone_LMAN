import React, { Component, createRef } from 'react';
import { Dimensions, StyleSheet, View, Text, Button, ScrollView, FlatList, TouchableNativeFeedback } from 'react-native';
import { Surface } from 'gl-react-native';
import ImageFilters from 'react-native-gl-image-filters';
import { Presets } from 'react-native-gl-image-filters';
import ImagePicker from 'react-native-image-crop-picker';

import Filter from './filter';
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';

const width = Dimensions.get('window').width;
const settings = [
    {
        name: 'exposure',
        minValue: -1,
        maxValue: 1,
        step: 0.1,
        default: 0
    },
    {
        name: 'hue',
        minValue: 0,
        maxValue: 6,
        step: 0.1,
        default: 0
    },
    {
        name: 'blur',
        minValue: 0,
        maxValue: 2,
        step: 0.1,
        default: 0
    },
    {
        name: 'sepia',
        minValue: -5,
        maxValue: 5,
        step: 0.1,
        default: 0
    },
    {
        name: 'sharpen',
        minValue: 0,
        maxValue: 15,
        step: 0.5,
        default: 0
    },
    {
        name: 'negative',
        minValue: -2.0,
        maxValue: 2.0,
        step: 0.1,
        default: 0
    },
    {
        name: 'contrast',
        minValue: 0.0,
        maxValue: 2.0,
        step: 0.1,
        default: 1
    },
    {
        name: 'saturation',
        minValue: 0.0,
        maxValue: 2,
        step: 0.1,
        default: 1
    },
    {
        name: 'brightness',
        minValue: 0,
        maxValue: 5,
        step: 0.1,
        default: 1
    },
    {
        name: 'temperature',
        minValue: 3000.0,
        maxValue: 10000.0,
        step: 10,
        default: 6500
    },
];

export default class EditImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...settings,
            hue: 0,
            blur: 0,
            sepia: 0,
            sharpen: 0,
            negative: 0,
            contrast: 1,
            saturation: 1,
            brightness: 1,
            temperature: 6500,
            exposure: 0,
            filePath: '',
            index: 0,
            imageType: '',
            currentPress: 'NoPreset',
        };
    }

    sliderRef = {
        hue: createRef(),
        blur: createRef(),
        sepia: createRef(),
        sharpen: createRef(),
        negative: createRef(),
        contrast: createRef(),
        saturation: createRef(),
        brightness: createRef(),
        temperature: createRef(),
        exposure: createRef(),
    }
    presets = [
        'NoPreset',
        'AmaroPreset',
        'ClarendonPreset',
        'DogpatchPreset',
        'GinghamPreset',
        'GinzaPreset',
        'HefePreset',
        'LudwigPreset',
        'SkylinePreset',
        'SlumberPreset',
        'SierraPreset',
        'StinsonPreset',
    ]


    saveImage = async () => {
        if (!this.image) return;
        const result = await this.image.glView.capture();
        ImagePicker.openCropper({
            width: 1000,
            height: 1000,
            compressImageMaxHeight: 2160,
            compressImageMaxWidth: 2160,
            includeBase64: true,
            cropping: true,
            path: result.localUri
        })
            .then(item => {
                this.props.route.params.onGoBack(item);
                this.props.navigation.dangerouslyGetParent().setOptions({
                    tabBarVisible: true
                });
                this.props.navigation.goBack();
            })
            .catch(reason => console.log(reason));

    };

    setPreset(preset) {
        console.log(this.sliderRef.brightness);
        this.setState({
            hue: preset['hue'] ? preset['hue'] : 0,
            blur: preset['blur'] ? preset['blur'] : 0,
            sepia: preset['sepia'] ? preset['sepia'] : 0,
            sharpen: preset['sharpen'] ? preset['sharpen'] : 0,
            negative: preset['negative'] ? preset['negative'] : 0,
            contrast: preset['contrast'] ? preset['contrast'] : 1,
            saturation: preset['saturation'] ? preset['saturation'] : 1,
            brightness: preset['brightness'] ? preset['brightness'] : 1,
            temperature: preset['temperature'] ? preset['temperature'] : 6500,
            exposure: preset['exposure'] ? preset['exposure'] : 0,
        })
        this.sliderRef['hue'].current.setValue(preset['hue'] ? preset['hue'] : 0);
        this.sliderRef['blur'].current.setValue(preset['blur'] ? preset['blur'] : 0);
        this.sliderRef['sepia'].current.setValue(preset['sepia'] ? preset['sepia'] : 0);
        this.sliderRef['sharpen'].current.setValue(preset['sharpen'] ? preset['sharpen'] : 0);
        this.sliderRef['negative'].current.setValue(preset['negative'] ? preset['negative'] : 0);
        this.sliderRef['contrast'].current.setValue(preset['contrast'] ? preset['contrast'] : 1);
        this.sliderRef['saturation'].current.setValue(preset['saturation'] ? preset['saturation'] : 1);
        this.sliderRef['brightness'].current.setValue(preset['brightness'] ? preset['brightness'] : 1);
        this.sliderRef['temperature'].current.setValue(preset['temperature'] ? preset['temperature'] : 6500);
        this.sliderRef['exposure'].current.setValue(preset['exposure'] ? preset['exposure'] : 0);
    }

    componentDidMount() {
        this._screenFocus = this.props.navigation.addListener('focus', () => {
            this.props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: false
            });
            let { image, imageType, index } = this.props.route.params;
            this.setState({
                hue: 0,
                blur: 0,
                sepia: 0,
                sharpen: 0,
                negative: 0,
                contrast: 1,
                saturation: 1,
                brightness: 1,
                temperature: 6500,
                exposure: 0,
                filePath: '',
            });
            this.setState({ filePath: image.path, imageType: imageType, index: index });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Surface style={{ width, height: width }} ref={ref => (this.image = ref)}>
                    <ImageFilters {...this.state} width={width} height={width}>
                        {{ uri: this.state.filePath }}
                    </ImageFilters>
                </Surface>
                <ScrollView
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={true}
                    horizontal
                    style={styles.presetArea}
                >
                    {this.presets.map(item =>
                        <TouchableNativeFeedback
                            onPress={() => this.setPreset(Presets[item])}
                        >
                            <Surface style={styles.presetItem}>
                                <ImageFilters {...Presets[item]} width={scale(70, Horizontal)} height={scale(70, Horizontal)}>
                                    {{ uri: this.state.filePath }}
                                </ImageFilters>
                            </Surface>
                        </TouchableNativeFeedback>

                    )}

                </ScrollView>
                <ScrollView
                    style={styles.editArea}>
                    {settings.map(filter => (
                        <Filter
                            ref={this.sliderRef[filter.name]}
                            key={filter.name}
                            name={filter.name}
                            minimum={filter.minValue}
                            maximum={filter.maxValue}
                            initVal={filter.default}
                            step={filter.step}
                            onChange={value => {
                                this.setState({ [filter.name]: value })
                            }}
                        />
                    ))}

                </ScrollView>
                <Button
                    rounded={false}
                    style={styles.button}
                    title={'Crop'}
                    onPress={this.saveImage}>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#9E9E9E' },
    content: { marginTop: 20, marginHorizontal: 20 },
    button: { marginVertical: 20, borderRadius: 0 },
    presetArea: {
        height: scale(90, Vertical),
        backgroundColor: 'white'
    },
    presetItem: {
        marginHorizontal: scale(5, Horizontal),
        marginVertical: scale(5, Vertical),
        width: scale(80, Horizontal),
        height: scale(80, Horizontal),
        borderTopLeftRadius: 25,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 15
    },
    editArea: { height: scale(230, Vertical) }
});