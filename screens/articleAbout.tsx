import {
	Image,
	ImageBackground,
	RefreshControl,
	RefreshControlBase,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
	Exo2_400Regular,
	Exo2_500Medium,
	Exo2_600SemiBold,
} from '@expo-google-fonts/exo-2';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
	NavigationContainer,
	RouteProp,
	useRoute,
} from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import InfoTabData from './infoTabData';
import { globalVars } from '../style';
import ListChaptersTabData from './ListChaptersTabData';
import { ArticleData, getArticleData } from '../API/API';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import GestureRecognizer from 'react-native-swipe-gestures';

const exo400 = 'Exo2_400Regular';
const exo500 = 'Exo2_500Medium';
const exo600 = 'Exo2_600SemiBold';

const colorPrimary = '#212529';

type TabFooterProp = {
	article: ArticleData | undefined;
	moveDetailsView: (v: string) => void;
};

const ArticleTabFooter = ({ article, moveDetailsView }: TabFooterProp) => {
	const Tab = createMaterialTopTabNavigator();

	const [articleDataCurrent, setArticleDataCurrent] = useState<ArticleData>();

	useEffect(() => {
		setArticleDataCurrent(article);
		console.log('vakue' + articleDataCurrent);
	}, []);

	const tabLabels = {
		info: (focused: boolean) => (
			<AntDesign
				name='infocirlceo'
				size={20}
				color={
					focused ? globalVars.varColorBlack : globalVars.varColorGray
				}
			/>
		),
		list: (focused: boolean) => (
			<Entypo
				name='list'
				size={23}
				color={
					focused ? globalVars.varColorBlack : globalVars.varColorGray
				}
			/>
		),
		comments: (focused: boolean) => (
			<FontAwesome
				name='comments'
				size={23}
				color={
					focused ? globalVars.varColorBlack : globalVars.varColorGray
				}
			/>
		),
	};
	const screen1 = (props: any) => (
		<InfoTabData
			{...props}
			article={article}
			moveDetailsView={moveDetailsView}
		/>
	);

	const screen2 = (props: any) => (
		<ListChaptersTabData {...props} article={articleDataCurrent} />
	);
	return (
		<Tab.Navigator
			style={{
				backgroundColor: 'white',
			}}
			screenOptions={{
				tabBarIndicatorStyle: {
					backgroundColor: '#ff8c00',
				},
				tabBarContentContainerStyle: {
					height: 50,
				},
				tabBarLabelStyle: {
					fontSize: 12,
				},
				tabBarStyle: {
					paddingHorizontal: -10,
				},
				tabBarInactiveTintColor: 'black',
				tabBarActiveTintColor: 'white',
			}}
		>
			<Tab.Screen
				options={{
					tabBarLabel: ({ focused }) => tabLabels.info(focused),
				}}
				name='Информация'
			>
				{screen1}
			</Tab.Screen>
			<Tab.Screen
				options={{
					tabBarLabel: ({ focused }) => tabLabels.list(focused),
				}}
				name='Главы'
			>
				{screen2}
			</Tab.Screen>
			{/* <Tab.Screen
                options={ {
                    tabBarLabel: ({ focused }) => tabLabels.comments(focused)
                } }
                name="Комментарии" component={ InfoTabData } /> */}
			{/* <Tab.Screen name="Обсуждения" component={ Cat } /> */}
		</Tab.Navigator>
	);
};

type ArticleAboutProps = {
	route: RouteProp<{ params: { href: string } }>;
};

type ArticleAboutState = {
	articleData: ArticleData | undefined;
};

class ArticleAbout extends React.Component<
	ArticleAboutProps,
	ArticleAboutState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			articleData: undefined,
		};
		getArticleData(this.props.route.params.href)
			.then(result => {
				this.setState({
					articleData: result,
				});
			})
			.catch(er => {
				console.log(er);
			});
	} // Note that there is no comma after the method completion

	render() {
		return (
			<View
				style={{
					flex: 1,
					position: 'relative',
				}}
			>
				<View style={styles.container}>
					<View
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
					</View>
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
