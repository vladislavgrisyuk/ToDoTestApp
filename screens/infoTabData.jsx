import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { globalVars } from '../style'


const blackColor = '#212529'


const InfoTabData = () =>
{
    const description = '10 лет назад, после того, как «Врата», соединившие реальный мир с параллельным, открылись, некоторые из людей получили силу охотиться на монстров внутри «Врат». Они известны как охотники. Однако не все охотники сильные. Меня зовут Сон Джин Ву — охотник E-ранга. Я тот, кто рискует своей жизнью в самых низких уровнях подземелья. Не имея никаких сверхсильных навыков, я едва зарабатывал необходимые деньги, сражаясь в низкоуровневых подземельях... по крайней мере, пока я не нашел скрытое подземелье с самыми трудными проблемами в подземельях D-ранга! В конце концов, когда я умер, я внезапно получил странную силу, журнал заданий, который мог видеть только я, секрет для поднятия уровня, о котором знаю только я! Если я тренировался в соответствии с моими заданиями и охотился на монстров, мой уровень повышался. Переход от самого слабого охотника к самому сильному, охотнику S-ранга!'
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
        header: 'Издатель',
        value: 'D&C Media'
    },
    ]);

    const [genres, setGenres] = useState(
        [
            {
                id: i++,
                name: 'Боевик'
            },
            {
                id: i++,
                name: 'Приключения'
            },
            {
                id: i++,
                name: 'Сёнен'
            },
            {
                id: i++,
                name: 'Фэнтези'
            },
            {
                id: i++,
                name: 'Демоны'
            },
            {
                id: i++,
                name: 'Магия'
            },
            {
                id: i++,
                name: 'Призраки / Духи'
            },
            {
                id: i++,
                name: 'Монсты'
            },
            {
                id: i++,
                name: 'Выживание'
            },
            {
                id: i++,
                name: 'Армия'
            },
            {
                id: i++,
                name: 'Артефакты'
            },
            {
                id: i++,
                name: 'Бои на мечах'
            },
            {
                id: i++,
                name: 'Волшебные существа'
            },
            {
                id: i++,
                name: '...'
            },
        ]
    );

    const [isMoreDescription, setisMoreDescription] = useState(false);

    return (
        <ScrollView showsVerticalScrollIndicator={ false } style={ { backgroundColor: 'white' } } contentContainerStyle={ { flexGrow: 1, backgroundColor: 'white', paddingVertical: 8 } }>
            <View style={ {

            } }>
                {
                    articelData.map((item) =>
                    {
                        return (
                            <View key={ item.id } style={ {
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                paddingVertical: 3,
                                paddingHorizontal: 13,
                            } }>
                                <View style={ [styles.artcleMainData] }>
                                    <Text style={
                                        {
                                            color: globalVars.varColorGray,
                                            fontFamily: globalVars.fontExo500
                                        }
                                    }>{ item.header }</Text>
                                </View>
                                <View style={ [styles.artcleMainData] }>
                                    <Text style={ {
                                        color: blackColor,
                                        fontFamily: globalVars.fontExo400
                                    } }>{ item.value }</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
            <View style={ {
                marginTop: 10,
                marginHorizontal: 13,
                flex: 1,

            } }>
                <Text numberOfLines={ isMoreDescription ? 100 : 5 } style={ {
                    fontFamily: globalVars.exo400,
                    color: blackColor
                } }>
                    { description }
                </Text>
                <TouchableOpacity
                    onPress={
                        () =>
                        {
                            setisMoreDescription(!isMoreDescription)
                        }
                    }
                    style={ {
                        marginTop: 5
                    } }>
                    <Text style={ {
                        color: globalVars.varColorOrange,
                        textAlign: 'center'
                    } }>{ isMoreDescription ? 'Спрятать' : 'Подробнее...' }</Text>
                </TouchableOpacity>
            </View>
            <View style={ {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 12,
                marginTop: 15,
                paddingBottom: 308

            } }>
                {
                    genres.map((it) =>
                    {
                        return (
                            <TouchableOpacity key={ it.id } style={ {
                                borderWidth: 1,
                                borderColor: '#e5e5e5',
                                borderRadius: 4,
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                backgroundColor: 'hsla(240,5%,48%,.05)',
                                marginRight: 8,
                                marginBottom: 8
                            } }>
                                <Text style={ {
                                    color: 'rgba(60, 60, 67, .6)',
                                    fontSize: 13,
                                    fontFamily: globalVars.fontExo400
                                } }>{ it.name }</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    artcleMainData: {
        width: '50%'
    }
})

export default InfoTabData;
