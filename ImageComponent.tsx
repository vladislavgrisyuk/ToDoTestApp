import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator } from 'react-native';
import {
	TouchableHighlight,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { globalVars } from './style';
import ImageZoom from 'react-native-image-pan-zoom';
import { GestureResponderEvent } from 'react-native-modal';

type Props = {
	href: string;
	onPreviousChapterClicked: () => void;
	onNextChapterClicked: () => void;
	onSwitchHeaderShown: () => void;
};
type State = {
	imgWidth: number;
	imgHeight: number;
	isLoading: boolean;
};

class ImageComponent extends Component<Props, State> {
	state: State = {
		imgWidth: 0,
		imgHeight: 0,
		isLoading: false,
	};

	componentDidMount() {
		Image.getSizeWithHeaders(
			this.props.href,
			{
				Accept: 'image/webp,image/png,image/svg+xml,image/*;q=0.8,video/*;q=0.8,*/*;q=0.5',
				'Accept-Language': 'ru',
				Referer: 'https://mangamen.com/',
				Host: 'img2.mangaimg.ru',
				'User-Agent':
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15',
			},
			(w, h) => {
				const screenWidth = globalVars.screenWidth;
				const scaleFactor = screenWidth / w;
				const imageHeight = h * scaleFactor;
				this.setState({
					imgWidth: screenWidth,
					imgHeight: imageHeight,
				});
			}
		);
	}
	render() {
		const { imgHeight, imgWidth } = this.state;
		return (
			<View
				style={{
					flex: 1,
					position: 'relative',
				}}
			>
				{this.state.isLoading && (
					<ActivityIndicator size='large' color='#FFD700' />
				)}
				<Image
					onLoadStart={() => {
						this.setState({
							isLoading: true,
						});
					}}
					onLoadEnd={() => {
						this.setState({
							isLoading: false,
						});
					}}
					progressiveRenderingEnabled={true}
					style={{
						width: imgWidth,
						height: imgHeight,
					}}
					source={{ uri: this.props.href }}
				></Image>

				<TouchableOpacity
					activeOpacity={0.1}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: -1500,
						width: '30%',
						zIndex: 999,
					}}
					onPress={() => {
						this.props.onPreviousChapterClicked();
					}}
				></TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.1}
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: -1500,
						width: '30%',
						zIndex: 999,
					}}
					onPress={() => {
						this.props.onNextChapterClicked();
					}}
				></TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.1}
					style={{
						position: 'absolute',
						top: 0,
						right: '30%',
						left: '30%',
						bottom: 0,
						zIndex: 999,
					}}
					onPress={this.props.onSwitchHeaderShown}
				></TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default ImageComponent;
