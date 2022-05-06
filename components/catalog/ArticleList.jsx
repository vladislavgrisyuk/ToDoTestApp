import { useNavigation } from "@react-navigation/core";
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import React, { useState } from "react";
import { RefreshControl, View, StyleSheet, Text, Dimensions } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";

import Article from '../catalog/Article'
import { OpenLeftDrawer } from '../../NavigationService'
import { SetOpenDrawerRight } from '../../NavigationService'

import { getCatalog } from "../../API/API";


const ArticleList = () =>
{
    const navigation = useNavigation()
    const [value, setValue] = useState([]);

    React.useEffect(() =>
    {
        getCatalog('https://mangapoisk.ru/manga', 1).then(
            v =>
            {
                setValue(v)
            }
        ).catch(r =>
        {
            console.log('FUCK')
        })
    }, [])
    SetOpenDrawerRight(() =>
    {
        navigation.openDrawer()
    })
    return (
        <View style={ { height: '100%', position: "relative" } }>
            <ScrollView>
                <View style={
                    {
                        padding: 10
                    }
                }>
                    <Text
                        style={ {
                            color: '#212524',
                            fontSize: 22,
                            // fontFamily: 'Montserrat_400Regular',
                            marginBottom: 15,
                            fontWeight: "bold"

                        } }>Каталог</Text>
                    <TextInput
                        placeholder='Поиск по названию...'
                        style={ {
                            borderWidth: 1,
                            paddingLeft: 12,
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingRight: 12,
                            textAlignVertical: 'center',
                            height: 36,
                            borderColor: '#dcdcdc',
                            borderRadius: 4,
                            fontSize: 14

                        } }
                    >

                    </TextInput>
                </View>
                <FlatList
                    numColumns={ 3 }
                    style={ style.articleContainer }
                    data={ value }
                    renderItem={ ({ item }) => <Article data={ item } /> }
                    keyExtractor={ item => item.id }
                />
                <RefreshControl />
            </ScrollView>
            <View style={ {
                position: 'absolute',
                bottom: 30,
                left: 0,
                right: 0,
                padding: 5
            } }>
                <View style={ {
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'stretch',
                    justifyContent: 'space-evenly',
                    flexBasis: '100%',
                    flexGrow: 1
                } }>
                    <View style={ style.bottomButtons }>
                        <TouchableOpacity onPress={ OpenLeftDrawer } style={ style.bottomButtonSuper }>
                            <Text style={ style.bottomButtonText }>Меню</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ style.bottomButtons }>
                        <TouchableOpacity onPress={ () =>
                        {
                            setTimeout(() =>
                            {
                                navigation.dispatch(DrawerActions.toggleDrawer())
                            }, 0)
                        } } style={ style.bottomButtonSuper }>
                            <Text style={ style.bottomButtonText }>Фильтр</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    )
}

const style = StyleSheet.create({
    articleContainer: {
        padding: 5
    },
    bottomButtons: {
        height: '100%',
        flexGrow: 1,
        margin: 5,

    },
    bottomButtonText: {
        color: 'rgba(33,37,41,.8)',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold'
    },
    bottomButtonSuper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e1e2',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 6
    }
})

export default ArticleList