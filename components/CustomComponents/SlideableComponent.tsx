import React, { Component } from 'react';
import { View, Easing, StyleSheet, Modal, Animated } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

type Props = {
	isModalVisible: boolean;
};

type State = {
	isModalVisible: boolean;
	dragStartPoint: number;
	dragDeltaY: number;
	fadeAnim: Animated.Value;
	customMarginBottom: number;
	isFinished: boolean;
	startedTouch: boolean;
	currentAnimValue: number;
	skips: number;
	goesTo: number;
};

class SlideableComponent extends Component<Props, State> {
	open = () => {
		this.state.fadeAnim.setValue(0);
		this.setState({ isModalVisible: true });
	};
	fadeIn = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(this.state.fadeAnim, {
			toValue: -this.state.dragDeltaY,
			duration: 16,
			useNativeDriver: false,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
		}).start(({ finished }) => {});
	};
	fadeOut = () => {
		this.setState({
			isFinished: false,
		});
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(this.state.fadeAnim, {
			toValue: this.state.goesTo,
			duration: 300,
			useNativeDriver: false,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
		}).start(({ finished }) => {
			this.setState({
				isFinished: finished,
			});
		});
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			isModalVisible: props.isModalVisible,
			dragStartPoint: 0,
			dragDeltaY: 0,
			fadeAnim: new Animated.Value(0),
			customMarginBottom: 0,
			isFinished: true,
			startedTouch: false,
			currentAnimValue: 0,
			skips: 1,
			goesTo: 0,
		};
		this.state.fadeAnim.addListener(({ value }) =>
			this.setState({ currentAnimValue: value })
		);
	}

	render() {
		return (
			<GestureRecognizer
				style={{ flex: 1 }}
				onSwipeUp={() => this.setState({ isModalVisible: true })}
				onSwipeDown={() => this.setState({ isModalVisible: false })}
				onTouchStart={e => {
					this.setState({
						dragStartPoint:
							e.nativeEvent.pageY + this.state.currentAnimValue,
					});
					this.setState({
						skips: 1,
					});
				}}
				onTouchMove={e => {
					this.setState({
						dragDeltaY:
							e.nativeEvent.pageY - this.state.dragStartPoint,
					});
					if (this.state.skips == 0) {
						this.fadeIn();
					} else {
						this.setState({
							skips: 0,
						});
					}
				}}
				onTouchEnd={() => {
					this.setState({
						startedTouch: false,
					});
					this.fadeOut();
				}}
			>
				<Modal
					style={{
						flex: 1,
						margin: 0,
					}}
					animationType='slide'
					visible={this.state.isModalVisible}
					transparent={true}
					collapsable={true}
					onRequestClose={() => {}}
				>
					<View style={styles.sliderContainer}>
						<Animated.View
							style={[
								{
									width: '100%',
									height: 300,
									backgroundColor: 'green',
								},
								{
									marginBottom: this.state.fadeAnim,
								},
							]}
						></Animated.View>
					</View>
				</Modal>
			</GestureRecognizer>
		);
	}
}

const styles = StyleSheet.create({
	sliderContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
});

export default SlideableComponent;
