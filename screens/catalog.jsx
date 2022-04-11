import { View, Text, StyleSheet, Image, ImageBackground, RefreshControl, TouchableHighlight } from 'react-native'
import React, { useMemo, useState } from 'react'


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';

import { FlatList, ScrollView } from 'react-native-gesture-handler'

import ArticleList from '../components/catalog/ArticleList'
import { OpenLeftDrawer } from '../NavigationService'
import { SetOpenDrawer } from '../NavigationService'



const ScrollCatalog = () =>
{
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen options={ { headerShown: false } } name='allArticles' component={ ArticleList }>

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
    const navigation = useNavigation()

    let nn = () =>
    {
        navigation.openDrawer()
    }

    SetOpenDrawer(nn)

    return (
        <Drawer.Navigator
            useLegacyImplementation
            initialRouteName='OpenDrawer'
            screenOptions={ { drawerPosition: 'right', headerShown: false } }>
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