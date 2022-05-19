import {
	Easing,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { ArticleData, getArticleData } from '../API/API';
import { Animated } from 'react-native';
import ArticleTabFooter from './ArticleTabFooter';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const exo400 = 'Exo2_400Regular';
const exo500 = 'Exo2_500Medium';
const exo600 = 'Exo2_600SemiBold';

const colorPrimary = '#212529';

type ArticleAboutProps = {
	route: RouteProp<{ params: { href: string } }>;
};

type ArticleAboutState = {
	articleData: ArticleData | undefined;
	widthAnim: Animated.Value;
};
class ArticleAbout extends React.Component<
	ArticleAboutProps,
	ArticleAboutState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			articleData: undefined,
			widthAnim: new Animated.Value(340),
		};
	} // Note that there is no comma after the method completion

	async componentDidMount() {
		console.log('beignLoad');
		await getArticleData(this.props.route.params.href)
			.then(result => {
				this.setState({
					articleData: result,
				});
			})
			.catch(er => {
				console.log(er);
			});
		console.log('OkLoad');
	}

	onChildrenScroll = (v: number) => {
		Animated.timing(this.state.widthAnim, {
			toValue: 340 - v,
			duration: 1,
			useNativeDriver: false,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
		}).start();
	};

	render() {
		return (
			<View
				style={{
					flex: 1,
					position: 'relative',
				}}
			>
				<View style={styles.container}>
					<Animated.View
						style={{
							height: 340,
							width: '100%',
							zIndex: 1,
							position: 'relative',
						}}
					>
						<ImageBackground
							style={{ width: '100%', height: '100%' }}
							blurRadius={8}
							resizeMode='cover'
							source={{
								uri: this.state.articleData?.img,
							}}
						>
							<View
								style={{
									backgroundColor: 'rgba(0,0,0,0.60)',
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
									overflow: 'hidden',
								}}
							>
								<View
									style={{
										borderRadius: 6,
										overflow: 'hidden',
										width: 220,
										height: 297,
										marginBottom: -120,
									}}
								>
									<Image
										source={{
											uri: this.state.articleData?.img,
										}}
										style={{
											width: 220,
											height: 350,
										}}
									/>
								</View>
							</View>
						</ImageBackground>
					</Animated.View>

					<Animated.View
						// onTouchStart={ e =>
						// {
						//     touchY = e.nativeEvent.pageY
						// } }
						// onTouchEnd={ e =>
						// {
						//     if (touchY - e.nativeEvent.pageY > 10)
						//         moveDetailsView('show')
						//     if (touchY - e.nativeEvent.pageY < -10)
						//         moveDetailsView('hide')
						//     console.log(touchY - e.nativeEvent.pageY)
						// } }
						style={[
							{
								position: 'absolute',
								left: 0,
								right: 0,
								bottom: 0,
								top: this.state.widthAnim,
								borderRadius: 18,
								zIndex: 999,
								backgroundColor: 'white',
								flex: 1,
								marginTop: -30,
							},
						]}
					>
						<View>
							<Text
								ellipsizeMode='tail'
								numberOfLines={1}
								style={{
									textAlign: 'center',
									fontSize: 18,
									fontFamily: exo600,
									color: colorPrimary,
									marginBottom: 5,
									marginTop: 7,
								}}
							>
								{this.state.articleData?.titleRu ?? '...'}
							</Text>
						</View>
						<View>
							<Text
								ellipsizeMode='tail'
								numberOfLines={1}
								style={{
									textAlign: 'center',
									fontFamily: exo400,
									color: colorPrimary,
									fontSize: 14,
								}}
							>
								{this.state.articleData?.titleEn ?? '...'}
							</Text>
						</View>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								height: 30,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{/* <Text style={ {
                            fontFamily: exo400
                        } }>16+</Text> */}
							<Text
								style={[
									styles.articleMetaDataText,
									styles.articleMetaDataPadding,
								]}
							>
								{this.state.articleData?.year ?? '...'} 
							</Text>
							<Text
								style={[
									styles.articleMetaDataText,
									styles.articleMetaDataPadding,
								]}
							>
								{this.state.articleData?.type}
							</Text>
							<View
								style={[
									{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'flex-start',
										alignContent: 'center',
									},
									styles.articleMetaDataPadding,
								]}
							>
								<FontAwesome
									style={{
										alignSelf: 'center',
									}}
									name='star'
									size={17}
									color='#ffb656'
								/>
								<Text
									style={[
										{
											alignSelf: 'center',
											fontFamily: exo500,
											color: '#868e96',
										},
										styles.articleMetaDataPadding,
									]}
								>
									{this.state.articleData?.rating ?? '...'}
								</Text>
								<Text
									style={{
										fontFamily: exo400,
										color: '#868e96',
										fontSize: 11,
										alignSelf: 'center',
										marginLeft: -3,
									}}
								>
									[{this.state.articleData?.reviews ?? '...'}]
								</Text>
							</View>
						</View>
						<ScrollView
							style={{
								flex: 1,
								backgroundColor: 'red',
								height: 100,
							}}
							scrollEventThrottle={16}
							onScroll={e => {
								this.onChildrenScroll(
									e.nativeEvent.contentOffset.y
								);
							}}
							contentContainerStyle={{ height: 500 }}
						></ScrollView>
						<ArticleTabFooter
							article={this.state.articleData}
							moveDetailsView={() => {}}
						/>
					</Animated.View>
				</View>
				<View
					style={{
						width: 30,
						position: 'absolute',
						left: 0,
						top: 0,
						bottom: 0,
					}}
				></View>
			</View>
		);
	}
}

export default ArticleAbout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	fc: {
		flex: 1,
	},
	articleMetaDataText: {
		color: '#868e96',
		fontFamily: exo400,
	},
	articleMetaDataPadding: {
		paddingLeft: 5,
		paddingRight: 5,
	},
});
