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


const exo400 = 'Exo2_400Regular'
const exo500 = 'Exo2_500Medium'
const exo600 = 'Exo2_600SemiBold'

const colorPrimary = '#212529'

const Cat = () =>
{
    let i = 0
    const [articelData, setArticelData] = useState([{
        id: i++,
        header: 'Статус тайтла',
        value: 'Завершён'
    },
    {
        id: i++,
        header: 'Статус перевода',
        value: 'Завершён'
    },
    {
        id: i++,
        header: 'Загружено глав',
        value: '180'
    },
    {
        id: i++,
        header: 'Формат выпуска',
        value: 'В цвете'
    },
    {
        id: i++,
        header: 'Автор',
        value: 'GEE So-Lyung'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },
    {
        id: i++,
        header: 'Художник',
        value: 'Jung Sung-lak'
    },

    ]);
    return (
        <View style={ {
            backgroundColor: 'black',
            paddingTop: 10,
            height: 1000
        } }>
            {
                articelData.map((item) =>
                {
                    return (
                        <View key={ item.id } style={ {
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            paddingVertical: 3,
                            paddingHorizontal: 13
                        } }>
                            <View style={ [styles.artcleMainData] }>
                                <Text style={
                                    {
                                        color: '#868e96',
                                        fontFamily: exo500
                                    }
                                }>{ item.header }</Text>
                            </View>
                            <View style={ [styles.artcleMainData] }>
                                <Text style={ {
                                    color: '#212529',
                                    fontFamily: exo400
                                } }>{ item.value }</Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

const ArticleTabFooter = () =>
{
    const Tab = createMaterialTopTabNavigator();

    const tabLabels =
    {
        info: (focused) => (
            <AntDesign name="infocirlceo" size={ 20 } color={ focused ? '#212529' : '#818181' } />
        ),
        list: (focused) => (
            <Entypo name="list" size={ 23 } color="black" color={ focused ? '#212529' : '#818181' } />
        ),
        comments: (focused) => (
            <FontAwesome name="comments" size={ 24 } color={ focused ? '#212529' : '#818181' } />
        )
    }

    return (
        <Tab.Navigator style={ {
            height: 100
        } } screenOptions={ {
            tabBarIndicatorStyle: {
                backgroundColor: '#ff8c00',
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
            } } name="Информация" component={ Cat } />
            <Tab.Screen options={ {
                tabBarLabel: ({ focused }) => tabLabels.list(focused),
            } } name="Главы" component={ Cat } />
            <Tab.Screen
                options={ {
                    tabBarLabel: ({ focused }) => tabLabels.comments(focused)
                } }
                name="Комментарии" component={ Cat } />
            {/* <Tab.Screen name="Обсуждения" component={ Cat } /> */ }
        </Tab.Navigator>
    )
}


const ArticleAbout = () =>
{
    const [yOffset, setYOffset] = useState(0);
    return (
        <ScrollView style={
            [styles.container, {
                backgroundColor: 'red'
            }]
        }
        >
            <View style={ {
                width: '100%',
                zIndex: 1, position: 'relative',
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
            <View style={ { borderRadius: 18, backgroundColor: 'black', display: 'flex', flex: 1, flexDirection: 'column' } }>
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

            </View>
            <ArticleTabFooter />
        </ScrollView >
    )
}

export default ArticleAbout

const styles = StyleSheet.create({
    container: {

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

    },
    artcleMainData: {
        width: '50%'
    }
})