import { View, Text, StyleSheet, Image, ImageBackground, RefreshControl, TouchableHighlight } from 'react-native'
import React, { useMemo, useState } from 'react'

import 
{
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic,
    useFonts
} from '@expo-google-fonts/montserrat'


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';

import { FlatList, ScrollView } from 'react-native-gesture-handler'
let navigationG

const Article = ({ data }) =>
{

    const navigation = useNavigation()
    console.log(data)
    return (
        <View style={ style.article }>
            <TouchableHighlight style={ {
                borderRadius: 6, shadowColor: '#171717',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
            } } onPress={ () => { navigation.navigate('catalog2') } }>
                <ImageBackground style={ { width: '100%', justifyContent: 'flex-end', height: '100%', borderRadius: 6, display: 'flex', overflow: 'hidden' } } source={ require('../images/img.jpg') }>
                    <View style={ { display: 'flex', flexDirection: 'column', height: 'auto', padding: 6, backgroundColor: 'rgba(0,0,0,0.5)' } }>
                        <Text style={ { fontSize: 13, color: '#fff', fontFamily: 'Montserrat_500Medium' } }>{ data.title }</Text>
                        <Text numberOfLines={ 2 } style={ { color: '#fff', fontWeight: 'bold', fontFamily: 'Montserrat_400Regular' } }>{ data.description }</Text>
                    </View>
                </ImageBackground>
            </TouchableHighlight>
        </View >

    )
}

const ScrollCatalog = () =>
{
    const Stack = createStackNavigator()
    const allArticles = () =>
    {
        const [state, setState] = useState([

            { key: 1, title: 'Manga_1', description: 'Description', sourceImg: '../images/img.jpg' },
            { key: 2, title: 'Manga_2', description: 'Description', sourceImg: '../images/img.jpg' },
            { key: 3, title: 'Manga_3', description: 'Description', sourceImg: '../images/img.jpg' },
            { key: 4, title: 'Manga_4', description: 'Description', sourceImg: '../images/img.jpg' },
        ]);

        return (
            <ScrollView>
                <View style={ style.articleContainer }>
                    {
                        state.map((value) =>
                        {

                            return (
                                <Article data={ value } />
                            )
                        })
                    }
                </View>
                <RefreshControl />

            </ScrollView>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen options={ { headerShown: false } } name='allArticles' component={ allArticles }>

                </Stack.Screen>
            </Stack.Group>
            <Stack.Group screenOptions={ { presentation: 'modal' } }>
                <Stack.Screen options={ { headerShown: false } } name='TextS' component={ TextS }></Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    )

}

const TextS = () =>
{
    return (<Text>Text</Text>)
}

const Catalog = () =>
{
    const Drawer = createDrawerNavigator()
    return (
        <Drawer.Navigator screenOptions={ { drawerPosition: 'right', headerShown: false } }>
            <Drawer.Screen options={ { headerShown: false } } name='filter' component={ ScrollCatalog }></Drawer.Screen>
        </Drawer.Navigator>
    )
}

const style = StyleSheet.create({
    article: {
        // backgroundColor: '#00f',
        padding: 5,
        height: 180,
        width: '33.3%',
        marginBottom: 5,
        borderRadius: 8,
    },
    articleContainer: {
        padding: 5,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    }
})

export default Catalog