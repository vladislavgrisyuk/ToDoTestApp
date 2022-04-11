import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import 
{
    Montserrat_400Regular,
    Montserrat_500Medium,
    useFonts
} from '@expo-google-fonts/montserrat'
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import
{
    Exo2_400Regular,
    Exo2_500Medium,
    Exo2_600SemiBold,

} from '@expo-google-fonts/exo-2'

const exo400 = 'Exo2_400Regular'
const exo500 = 'Exo2_500Medium'
const exo600 = 'Exo2_600SemiBold'

const colorPrimary = '#212529'

const ArticleAbout = () =>
{
    const Tab = createMaterialTopTabNavigator();
    return (
        <View style={
            styles.container
        }>
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
            <View style={ { borderRadius: 18, overflow: 'hidden', marginTop: -30, zIndex: 999, position: 'relative', backgroundColor: 'white', display: 'flex', height: '100%' } }>
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
                <View>
                    <Tab.Navigator>
                        <Tab.Screen name="Home" component={ () => (<Text>Hello</Text>) } />
                        <Tab.Screen name="Settings" component={ () => (<Text>Hello</Text>) } />
                    </Tab.Navigator>
                </View>
            </View>
        </View >
    )
}

export default ArticleAbout

const styles = StyleSheet.create({
    container: {
        flex: 1,
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