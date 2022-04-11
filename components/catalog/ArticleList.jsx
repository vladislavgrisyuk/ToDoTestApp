import { useNavigation } from "@react-navigation/core";
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { useState } from "react";
import { RefreshControl, View, StyleSheet, Text } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";

import Article from '../catalog/Article'
import { OpenLeftDrawer } from '../../NavigationService'
import { SetOpenDrawerRight } from '../../NavigationService'

import 
{
    Montserrat_500Medium,
    Montserrat_400Regular
} from '@expo-google-fonts/montserrat'


const ArticleList = () =>
{
    const navigation = useNavigation()
    SetOpenDrawerRight(() =>
    {
        navigation.openDrawer()
    })
    const [state, setState] = useState([

        { key: 1, title: 'Manga_1', description: 'Description', sourceImg: require('../../images/img.jpg') },
        { key: 2, title: 'Manga_2', description: 'Description', sourceImg: require('../../images/img.jpg') },
        { key: 3, title: 'Manga_3', description: 'Description', sourceImg: require('../../images/img.jpg') },
        { key: 4, title: 'Manga_4', description: 'Description', sourceImg: require('../../images/img.jpg') },
    ]);
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
                            fontFamily: 'Montserrat_400Regular',
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
                <View style={ style.articleContainer }>
                    {
                        state.map((value) =>
                        {

                            return (
                                <Article data={ value } key={ value.key } />
                            )
                        })
                    }
                </View>
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
        padding: 5,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%'
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