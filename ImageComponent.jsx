import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { globalVars } from './style';
import ImageZoom from 'react-native-image-pan-zoom';


class ImageComponent extends Component
{
    state = {
        imgWidth: 0,
        imgHeight: 0
    }
    componentDidMount()
    {
        Image.getSize(this.props.href,
            (w, h) =>
            {
                const screenWidth = globalVars.screenWidth
                const scaleFactor = screenWidth / w
                const imageHeight = h * scaleFactor
                this.setState({ imgWidth: screenWidth, imgHeight: imageHeight })

            })
    }
    render()
    {
        const { imgHeight, imgWidth } = this.state
        return (
            <View style={ {
                position: 'relative'
            } }>

                <Image

                    style={ {
                        width: imgWidth,
                        height: imgHeight,
                    } }
                    source={ { uri: this.props.href } }>

                </Image>

                <TouchableOpacity activeOpacity={ 0.1 } style={ {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: -1500,
                    width: '30%',
                    zIndex: 999,
                } }

                    onPress={ this.props.onPreviousChapterClicked }
                >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={ 0.1 } style={ {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: -1500,
                    width: '30%',
                    zIndex: 999,

                } }

                    onPress={ this.props.onNextChapterClicked }
                >
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={ 0.1 } style={ {
                    position: 'absolute',
                    top: 0,
                    right: '30%',
                    left: '30%',
                    bottom: 0,
                    zIndex: 999,
                } }

                    onPress={ this.props.onSwitchHeaderShown }
                >
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default ImageComponent;
