import React, {
	createRef,
	FC,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react';
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	Image,
	Button,
	Modal,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';
import {
	ScrollView,
	TouchableHighlight,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
	ArticleImage,
	ChapterElement,
	getCatalog,
	getImages,
} from '../API/API';
import ImageComponent from '../ImageComponent';
import { globalVars } from '../style';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import SlideableComponent from '../components/CustomComponents/SlideableComponent';
import { RouteProp, useRoute } from '@react-navigation/native';

import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetFlatList,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import UserContext from '../UserContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type renderItem = {
	item: ArticleImage;
	index: number;
};

type MyRoute = {
	href: string;
	item: ChapterElement;
	chapterList: ChapterElement[] | undefined;
};

const ReaderView: FC = () => {
	const route = useRoute<RouteProp<{ params: MyRoute }>>();
	const chapterList = route.params.chapterList;
	const [href, setHref] = useState('');
	const { top, bottom } = useSafeAreaInsets();
	const TOP_HEADER_HEIGHT = 100;
	let scrollLastPositionY = 1;
	const [isHeaderShown, setisHeaderShown] = useState(route.params.href);
	const [chapterData, setChapterData] = useState<ChapterElement>(
		route.params.item
	);
	let isShown = true;

	function showHeaders() {
		topHeaderOffsetY.value = 0;
		isShown = true;
	}

	function hideHeaders() {
		topHeaderOffsetY.value = -TOP_HEADER_HEIGHT;
		isShown = false;
	}
	const topHeaderOffsetY = useSharedValue(0);
	const [extra, setExtra] = useState(false);
	const [images, setImages] = useState<ArticleImage[] | undefined>([]);

	React.useEffect(() => {
		console.log('fetchimg');
		getImages(href == '' ? chapterData.href : href)
			.then(result => {
				setImages(result);
			})
			.catch(er => {
				console.log(er);
			});
		console.log('loaded');
	}, [chapterData]);
	const context = useContext(UserContext);

	let index = 0;
	const [myr, setMyr] = useState<FlatList<ArticleImage> | null>(null);
	const renderBackdrop = useCallback(
		props => (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
			/>
		),
		[]
	);
	const headerScrollHideController:
		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
		| undefined = e => {
		if (context.isHorizontal) {
			if (scrollLastPositionY - e.nativeEvent.contentOffset.y > 10)
				showHeaders();
			if (scrollLastPositionY - e.nativeEvent.contentOffset.y < -10)
				hideHeaders();
		}
		scrollLastPositionY = e.nativeEvent.contentOffset.y;
	};

	const renderItem = ({ item, index }: renderItem) => {
		return (
			<ScrollView
				keyboardShouldPersistTaps='always'
				bounces={false}
				scrollEventThrottle={16}
				onScroll={headerScrollHideController}
				maximumZoomScale={context.isHorizontal ? 2 : 1}
				minimumZoomScale={1}
				bouncesZoom={false}
			>
				<ImageComponent
					key={index}
					href={item.href}
					onSwitchHeaderShown={() => {
						isShown ? hideHeaders() : showHeaders();
					}}
					onNextChapterClicked={() => {
						if (context.isHorizontal) {
							myr?.scrollToIndex({
								index:
									index + 1 >= (images?.length ?? 0)
										? index
										: index + 1,
							});
						}
					}}
					onPreviousChapterClicked={() => {
						if (context.isHorizontal) {
							myr?.scrollToIndex({
								index: index - 1 < 0 ? index : index - 1,
							});
						}
					}}
				/>
			</ScrollView>
		);
	};
	const strechFooter = true;
	const isHorizontal = true;
	const flHeight = useSharedValue(0);
	const layout = useSharedValue(0);
	const sheetRef = React.useRef<SlideableComponent | null>(null);

	const bottomSheetRef = useRef<BottomSheet>(null);
	const navigation = useNavigation<any>();
	const [zoomsc, setZoomsc] = useState(1);

	return (
		<>
			<View
				style={{
					position: 'relative',
					zIndex: 9999,
					backgroundColor: 'rgba(1, 1, 255, 0)',
				}}
			>
				<AnimatedHeader
					chapterData={chapterData}
					topHeaderOffsetY={topHeaderOffsetY}
					sheetRef={sheetRef}
					bottomSheetRef={bottomSheetRef}
				/>
			</View>
			<FlatList
				onTouchMove={e => {
					e.nativeEvent.touches.length;
				}}
				maximumZoomScale={context.isHorizontal ? 1 : 2}
				minimumZoomScale={1}
				bouncesZoom={false}
				extraData={images}
				style={[
					{
						height: '50%',
						backgroundColor: '#141414',
					},
				]}
				ref={ref => setMyr(ref)}
				onScroll={e => {
					// if (e.nativeEvent.zoomScale != 1) return;
					if (!context.isHorizontal) {
						if (
							scrollLastPositionY -
								e.nativeEvent.contentOffset.y >
							10
						)
							showHeaders();
						if (
							scrollLastPositionY -
								e.nativeEvent.contentOffset.y <
							-10
						)
							hideHeaders();
						scrollLastPositionY = e.nativeEvent.contentOffset.y;
					}
				}}
				onLayout={e => {
					layout.value = e.nativeEvent.layout.height;
				}}
				bounces={false}
				horizontal={context.isHorizontal}
				keyboardShouldPersistTaps='always'
				showsVerticalScrollIndicator={true}
				removeClippedSubviews={true}
				initialNumToRender={2}
				maxToRenderPerBatch={1}
				disableVirtualization={true}
				updateCellsBatchingPeriod={100}
				windowSize={7}
				data={images}
				renderItem={renderItem}
				pagingEnabled={context.isHorizontal}
				ListEmptyComponent={() => (
					<View
						style={{
							backgroundColor: 'red',
						}}
					>
						<Text>Loading...</Text>
					</View>
				)}
				onMomentumScrollEnd={event => {
					index = Math.floor(
						event.nativeEvent.contentOffset.x /
							event.nativeEvent.layoutMeasurement.width
					);
					Image.getSize(images![index].href, (w, h) => {
						const screenWidth = globalVars.screenWidth;
						const scaleFactor = screenWidth / w;
						const imageHeight = h * scaleFactor;
						flHeight.value = imageHeight - layout.value;
					});
					// work with: index
				}}
			></FlatList>
			{/* <Animated.View
                style={ [{
                    flex: 1,
                    zIndex: 999,
                    backgroundColor: 'yellow'
                }, strechFooter ? articleCommentSection : {}] }
            >
                <Text>dsfsdfdssdfsdfa</Text>
            </Animated.View> */}
			<View
				style={{
					position: 'absolute',
					zIndex: 999,
					left: 0,
					top: 0,
					bottom: 0,
					width: 20,
				}}
			></View>

			<BottomSheet
				snapPoints={['70%']}
				ref={bottomSheetRef}
				enablePanDownToClose={true}
				index={-1}
				backdropComponent={renderBackdrop}
				backgroundStyle={{
					backgroundColor: globalVars.varColorHeaderBlack,
				}}
				handleStyle={{
					height: 30,
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
				}}
				handleIndicatorStyle={{
					width: 100,
					backgroundColor: 'white',
					// height: 5,
				}}
			>
				<View
					style={{
						justifyContent: 'center',
						paddingBottom: 10,
					}}
				>
					<Text
						style={{
							color: globalVars.varColorLightWhite,
							textAlign: 'center',
							fontFamily: globalVars.fontExo400,
							fontSize: 20,
						}}
					>
						????????????????????
					</Text>
				</View>
				<BottomSheetFlatList
					data={chapterList}
					renderItem={item => {
						return (
							<TouchableOpacity
								style={{
									borderBottomWidth: 1,
									borderTopWidth: 1,
									borderBottomColor: 'rgba(255,255,255,0.05)',
									borderTopColor: 'rgba(255,255,255,.08)',
									paddingHorizontal: 10,
									paddingVertical: 12,
								}}
								onPress={() => {
									if (item.item === chapterData) {
										bottomSheetRef.current?.close();
										return;
									}
									myr?.setNativeProps({
										zoomScale: 1,
									});
									bottomSheetRef.current?.close();
									setImages([]);
									setChapterData(item.item);
									// setHref(item.item.href);

									try {
										myr?.scrollToIndex({
											animated: false,
											index: 0,
										});
									} catch (e) {
										console.log(e);
									}
								}}
							>
								<Text
									style={{
										fontSize: 15,
										color: globalVars.varColorLightWhite,
									}}
								>
									{item.item.title}
								</Text>
							</TouchableOpacity>
						);
					}}
				/>
			</BottomSheet>
		</>
	);
};

const styles = StyleSheet.create({
	topBarElements: {
		display: 'flex',
		justifyContent: 'center',

		// paddingLeft: 10,
		// paddingRight: 10,
	},
	topHeaderButtons_firstChild: {},
	topHeaderButtons_lastChild: {
		paddingRight: 18,
	},
	topHeaderButtons: {
		paddingVertical: 12,
		paddingHorizontal: 9,
	},
});

type RenderItemProp = {
	chapterList: ChapterElement[] | undefined;
};

const TempRenderItem = ({ chapterList }: RenderItemProp) => {
	return (
		<TouchableOpacity>
			<TouchableWithoutFeedback>
				<View>
					<FlatList
						data={chapterList}
						renderItem={({ item }) => {
							return <Text>{item.href}</Text>;
						}}
					/>
				</View>
			</TouchableWithoutFeedback>
		</TouchableOpacity>
	);
};

const AnimatedHeader = ({
	topHeaderOffsetY,
	sheetRef,
	bottomSheetRef,
	chapterData,
}) => {
	const style = useAnimatedStyle(() => {
		return {
			top: withTiming(topHeaderOffsetY.value, {
				duration: 500,
				easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			}),
		};
	});
	const { top } = useSafeAreaInsets();
	const context = useContext(UserContext);
	const navigation = useNavigation();
	return (
		<Animated.View
			style={[
				{
					paddingTop: top,
					backgroundColor: 'rgba(28,28,30,0.93)',
					position: 'absolute',
					left: 0,
					right: 0,
					zIndex: 9999999,
				},

				style,
			]}
		>
			<View
				style={{
					alignContent: 'center',
					display: 'flex',
					flexDirection: 'row',
					height: 42,
				}}
			>
				<View>
					<Text>=</Text>
				</View>
				<View
					style={{
						display: 'flex',
						flexGrow: 1,
					}}
				>
					<View
						style={{
							display: 'flex',
							flexGrow: 1,
						}}
					>
						<Text
							numberOfLines={1}
							ellipsizeMode='clip'
							style={{
								color: '#DDD',
								fontSize: 15,
								fontFamily: globalVars.fontExo400,
								marginBottom: 2,
							}}
						>
							{chapterData?.title}
						</Text>
						<Text
							style={{
								color: '#DDD',
								fontSize: 12,
								fontFamily: globalVars.fontExo400,
								opacity: 0.8,
							}}
						>
							admin
						</Text>
					</View>
				</View>
				<View style={[styles.topBarElements]}>
					<TouchableOpacity
						style={[
							styles.topHeaderButtons,
							styles.topHeaderButtons_firstChild,
						]}
						onPress={() => {
							context.setIsHorizontal(!context.isHorizontal);
						}}
					>
						<FontAwesome name='bookmark' size={19} color='#DDD' />
					</TouchableOpacity>
				</View>
				<View style={styles.topBarElements}>
					<TouchableOpacity
						style={[styles.topHeaderButtons]}
						onPress={() => {
							if (sheetRef != null) sheetRef?.current?.open();
							bottomSheetRef.current?.expand();
						}}
					>
						<FontAwesome name='list-ol' size={18} color='#DDD' />
					</TouchableOpacity>
				</View>
				<View style={styles.topBarElements}>
					<TouchableOpacity
						onPress={() => {
							// navigation.openDrawer();
						}}
						style={[
							styles.topHeaderButtons,
							styles.topHeaderButtons_lastChild,
						]}
					>
						<SimpleLineIcons
							name='options-vertical'
							size={17}
							color='#DDD'
						/>
					</TouchableOpacity>
				</View>
				{/* <Modal animationType="slide"
                        ref={ (ref) => { modealSettings = ref } }
                        collapsable={ true }
                        visible={ isModalVisible }
                        style={ {
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 0
                        } }
                    >

                    </Modal> */}
			</View>
		</Animated.View>
	);
};
export default ReaderView;
