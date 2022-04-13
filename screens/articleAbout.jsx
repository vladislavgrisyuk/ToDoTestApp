import { Image, ImageBackground, RefreshControl, RefreshControlBase, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import 
{
    Montserrat_400Regular,
    Montserrat_500Medium,
    useFonts
} from '@expo-google-fonts/montserrat'
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import
{
    Exo2_400Regular,
    Exo2_500Medium,
    Exo2_600SemiBold,

} from '@expo-google-fonts/exo-2'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import InfoTabData from './infoTabData';
import { globalVars } from '../style';
import ListChaptersTabData from './ListChaptersTabData';


const exo400 = 'Exo2_400Regular'
const exo500 = 'Exo2_500Medium'
const exo600 = 'Exo2_600SemiBold'

const colorPrimary = '#212529'


const ArticleTabFooter = () =>
{
    const Tab = createMaterialTopTabNavigator();

    const tabLabels =
    {
        info: (focused) => (
            <AntDesign name="infocirlceo" size={ 20 } color={ focused ? globalVars.varColorBlack : globalVars.varColorGray } />
        ),
        list: (focused) => (
            <Entypo name="list" size={ 23 } color="black" color={ focused ? globalVars.varColorBlack : globalVars.varColorGray } />
        ),
        comments: (focused) => (
            <FontAwesome name="comments" size={ 23 } color={ focused ? globalVars.varColorBlack : globalVars.varColorGray } />
        )
    }

    return (
        <Tab.Navigator style={ {
            backgroundColor: 'white'
        } } screenOptions={ {
            tabBarIndicatorStyle: {
                backgroundColor: '#ff8c00',
            },
            tabBarContentContainerStyle: {
                height: 50,
            },
            tabBarLabelStyle: {
                fontSize: 12
            },
            tabBarStyle: {
                paddingHorizontal: -10
            },
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: 'white',

        } }>
            <Tab.Screen options={ {
                tabBarLabel: ({ focused }) => tabLabels.info(focused),
            } } name="Информация" component={ ListChaptersTabData } />
            <Tab.Screen options={ {
                tabBarLabel: ({ focused }) => tabLabels.list(focused),
            } } name="Главы" component={ InfoTabData } />
            <Tab.Screen
                options={ {
                    tabBarLabel: ({ focused }) => tabLabels.comments(focused)
                } }
                name="Комментарии" component={ InfoTabData } />
            {/* <Tab.Screen name="Обсуждения" component={ Cat } /> */ }
        </Tab.Navigator>
    )
}


const ArticleAbout = () =>
{
    const [yOffset, setYOffset] = useState(0);
    return (
        <View style={ {
            flex: 1,
            position: 'relative'
        } }>
            <View style={
                styles.container
            }
            >
                <View style={ {
                    height: 340,
                    width: '100%',
                    zIndex: 1, position: 'relative'
                }
                }>
                    <ImageBackground style={ { width: '100%', height: '100%' } } blurRadius={ 8 } resizeMode='cover' source={ require('../images/img.jpg') }>
                        <View style={ {
                            backgroundColor: 'rgba(0,0,0,0.60)',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',

                        } }>
                            <View style={ { borderRadius: 6, overflow: 'hidden', width: 220, height: 297, overflow: 'hidden', marginBottom: -120 } }>
                                <Image source={ require('../images/img.jpg') } style={ {
                                    width: 220, height: 297,
                                } } />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={ { borderRadius: 18, zIndex: 999, backgroundColor: 'white', flex: 1, marginTop: -30 } }>
                    <View>
                        <Text ellipsizeMode='tail' numberOfLines={ 1 } style={ {
                            textAlign: 'center',
                            fontSize: 18,
                            fontFamily: exo600,
                            color: colorPrimary,
                            marginBottom: 5,
                            marginTop: 7
                        } }>Поднятие уровня в одиночку</Text>
                    </View>
                    <View>
                        <Text ellipsizeMode='tail' numberOfLines={ 1 } style={ {
                            textAlign: 'center',
                            fontFamily: exo400,
                            color: colorPrimary,
                            fontSize: 14
                        } }>Solo leveling</Text>
                    </View>
                    <View style={ {
                        display: 'flex',
                        flexDirection: 'row',
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                    } }>
                        <Text style={ {
                            color: '#f44336',
                            fontFamily: exo400
                        } }>16+</Text>
                        <Text style={ [styles.articleMetaDataText, styles.articleMetaDataPadding] }>2018 г.</Text>
                        <Text style={ [styles.articleMetaDataText, styles.articleMetaDataPadding] }>Манхва</Text>
                        <View style={ [{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignContent: 'center'
                        }, styles.articleMetaDataPadding] }>
                            <FontAwesome style={ {
                                alignSelf: 'center'
                            } } name="star" size={ 17 } color="#ffb656" />
                            <Text style={ [{
                                alignSelf: 'center',
                                fontFamily: exo500,
                                color: '#868e96',
                            }, styles.articleMetaDataPadding] }>4.88</Text>
                            <Text style={ {
                                fontFamily: exo400,
                                color: '#868e96',
                                fontSize: 11,
                                alignSelf: 'center',
                                marginLeft: -3
                            } }>[98.0K]</Text>
                        </View>
                    </View>
                    <ArticleTabFooter />
                </View>

            </View >
            <View style={ {
                width: 30,
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
            } }></View>
        </View>
    )
}

export default ArticleAbout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    fc: {
        flex: 1,
    },
    articleMetaDataText: {
        color: '#868e96',
        fontFamily: exo400
    },
    articleMetaDataPadding: {
        paddingLeft: 5,
        paddingRight: 5,

    }
})