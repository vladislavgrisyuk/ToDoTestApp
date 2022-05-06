import React, { createRef, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image, Button, Modal } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCatalog, getImages } from '../API/API'
import ImageComponent from '../ImageComponent';
import { globalVars } from '../style';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import SlideableComponent from '../components/CustomComponents/SlideableComponent';



const ReaderView = ({ route }) =>
{
    const TOP_HEADER_HEIGHT = 100
    let scrollLastPositionY = 1
    const topHeaderOffsetY = useSharedValue(0);
    const [isHeaderShown, setisHeaderShown] = useState(true);
    let isShown = true


    function showHeaders()
    {
        topHeaderOffsetY.value = 0
        isShown = true
    }

    function hideHeaders()
    {
        topHeaderOffsetY.value = -TOP_HEADER_HEIGHT
        isShown = false

    }

    const style = useAnimatedStyle(() =>
    {
        return {
            marginTop: withTiming(topHeaderOffsetY.value, {
                duration: 300,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
        }
    })

    const mainStyle = useAnimatedStyle(() =>
    {
        return {
            marginTop: withTiming(topHeaderOffsetY.value + 100, {
                duration: 300,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
        }
    })

    const footerStyle = useAnimatedStyle(() =>
    {
        return {
            bottom: withTiming(topHeaderOffsetY.value, {
                duration: 300,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
        }
    })

    const [images, setImages] = useState([]);
    React.useEffect(() =>
    {
        getImages(route.params.href).then(
            v =>
            {
                setImages(v)
            }
        ).catch(r =>
        {
            console.log('FUCK')
        })
    }, [])

    let index = 0
    const [myr, setMyr] = useState(null);
    const renderItem = ({ item, index }) =>
    {
        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
                bounces={ false }
                maximumZoomScale={ 2 }
                minimumZoomScale={ 1 }
                bouncesZoom={ false }
                scrollEventThrottle={ 16 }
                onScroll={ (e) =>
                {
                    if (!isHorizontal)
                    {
                        if (scrollLastPositionY - e.nativeEvent.contentOffset.y > 10)
                            showHeaders()
                        if (scrollLastPositionY - e.nativeEvent.contentOffset.y < -10)
                            hideHeaders()
                    }
                    scrollLastPositionY = e.nativeEvent.contentOffset.y
                } }
            >

                <ImageComponent key={ index } href={ item.href }
                    onSwitchHeaderShown={ () => { isShown ? hideHeaders() : showHeaders() } }
                    onNextChapterClicked={ () => myr?.scrollToIndex({ index: index + 1 >= images.length ? index : index + 1 }) }
                    onPreviousChapterClicked={ () => myr?.scrollToIndex({ index: index - 1 < 0 ? index : index - 1 }) }
                />

            </ScrollView>
        )
    }
    const strechFooter = true
    const isHorizontal = true
    const flHeight = useSharedValue(0)
    const layout = useSharedValue(0)
    const sheetRef = React.useRef(null);
    const articleCommentSection = useAnimatedStyle(() =>
    {
        return {
            marginTop: withTiming(flHeight.value, {
                duration: 300,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
        }
    })
    let modalSetting = createRef()
    return (
        <SafeAreaView style={ { flex: 1, position: 'relative', backgroundColor: '#1c1c1e' } }>
            <Animated.View style={ [{
                backgroundColor: '#1c1c1e',
            }, style] }>
                <View style={ {
                    alignContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    height: 42
                } }>
                    <View>
                        <Text>=</Text>
                    </View>
                    <View style={ {
                        display: 'flex',
                        flexGrow: 1
                    } }>
                        <View style={ {
                            display: 'flex',
                            flexGrow: 1
                        } }>
                            <Text numberOfLines={ 1 } ellipsizeMode='clip' style={ {
                                color: '#DDD',
                                fontSize: 15,
                                fontFamily: globalVars.fontExo400,
                                marginBottom: 2
                            } }>Название главы</Text>
                            <Text style={ {
                                color: '#DDD',
                                fontSize: 12,
                                fontFamily: globalVars.fontExo400,
                                opacity: .8
                            } }>Том 1 Глава 77</Text>
                        </View>
                    </View>
                    <View style={ [styles.topBarElements] }>
                        <TouchableOpacity style={ [styles.topHeaderButtons, styles.topHeaderButtons_firstChild] } onPress={ () =>
                        {
                            sheetRef.current.open()
                        } }>
                            <FontAwesome name="bookmark" size={ 19 } color="#DDD" />
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.topBarElements }>
                        <TouchableOpacity style={ [styles.topHeaderButtons] }>
                            <FontAwesome name="list-ol" size={ 18 } color="#DDD" />
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.topBarElements }
                    >
                        <TouchableOpacity style={ [styles.topHeaderButtons, styles.topHeaderButtons_lastChild] }>
                            <SimpleLineIcons name="options-vertical" size={ 17 } color="#DDD" />
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
            {/* <Animated.View style={ [{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 100,
                backgroundColor: 'red',
                zIndex: 9999
            }, footerStyle] } /> */}
            <FlatList
                style={ [{
                    flexGrow: 0,
                    backgroundColor: '#141414',
                }] }
                ref={ (ref) => setMyr(ref) }
                onScroll={ (e) =>
                {

                    if (scrollLastPositionY - e.nativeEvent.contentOffset.y > 10)
                        showHeaders()
                    if (scrollLastPositionY - e.nativeEvent.contentOffset.y < -10)
                        hideHeaders()
                    scrollLastPositionY = e.nativeEvent.contentOffset.y
                } }
                onLayout={ (e) =>
                {
                    layout.value = e.nativeEvent.layout.height

                } }
                bounces={ false }
                horizontal={ isHorizontal }
                keyboardShouldPersistTaps='always'
                showsVerticalScrollIndicator={ true }
                removeClippedSubviews={ true }
                initialNumToRender={ 2 }
                maxToRenderPerBatch={ 1 }
                disableVirtualization={ true }
                updateCellsBatchingPeriod={ 100 }
                windowSize={ 7 }
                data={ images }
                renderItem={ renderItem }
                pagingEnabled={ isHorizontal }
                ListEmptyComponent={ () => <Text>Loading...</Text> }
                onMomentumScrollEnd={ (event) =>
                {
                    index = Math.floor(
                        event.nativeEvent.contentOffset.x /
                        event.nativeEvent.layoutMeasurement.width
                    );

                    Image.getSize(images[index].href, (w, h) =>
                    {
                        const screenWidth = globalVars.screenWidth
                        const scaleFactor = screenWidth / w
                        const imageHeight = h * scaleFactor
                        flHeight.value = imageHeight - layout.value
                    })
                    // work with: index
                } }
            >
            </FlatList>
            <SlideableComponent isModalVisible={ true } ref={ (ref) =>
            {
                sheetRef.current = ref
            } }>

            </SlideableComponent>
            {/* <Animated.View
                style={ [{
                    flex: 1,
                    zIndex: 999,
                    backgroundColor: 'yellow'
                }, strechFooter ? articleCommentSection : {}] }
            >
                <Text>dsfsdfdssdfsdfa</Text>
            </Animated.View> */}
            <View style={ {
                position: 'absolute',
                zIndex: 999,
                left: 0,
                top: 0,
                bottom: 0,
                width: 20,
            } }>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topBarElements: {
        display: 'flex',
        justifyContent: 'center',

        // paddingLeft: 10,
        // paddingRight: 10,
    },
    topHeaderButtons_firstChild: {
    },
    topHeaderButtons_lastChild: {
        paddingRight: 18
    },
    topHeaderButtons: {
        paddingVertical: 12,
        paddingHorizontal: 9
    }

})

export default ReaderView;
