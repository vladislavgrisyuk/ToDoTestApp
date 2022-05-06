const { useNavigation } = require('@react-navigation/core')
const { View, ImageBackground, Text, StyleSheet } = require('react-native')
const { TouchableHighlight } = require('react-native-gesture-handler')
import { Dimensions } from 'react-native';
import { globalVars } from '../../style';

const Article = ({ data }) =>
{
    const navigation = useNavigation()
    const articleOnPressHandler = () =>
    {
        navigation.navigate('catalog2', { text: 'asd', href: data.href })
    }



    return (
        <View
            style={ [style.article] }>
            <TouchableHighlight
                style={ style.articleShadow }
                onPress={ articleOnPressHandler }>
                <ImageBackground
                    resizeMode='cover'
                    style={ style.articleBackgroundImage }
                    source={ { uri: data.img } }>
                    <View
                        style={ style.articleData } >
                        <Text
                            numberOfLines={ 2 }
                            style={ style.articleDescription }>
                            { data.title }
                        </Text>
                        <Text
                            numberOfLines={ 2 }
                            style={ style.articleTitle }>
                            { data.chaptersCount }
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableHighlight>
        </View >

    )
}
let columns = 3
let width = globalVars.screenWidth
let height2 = width / columns * 1.45


const style = StyleSheet.create({
    article: {
        // backgroundColor: '#00f',
        padding: 5,
        width: 100 / columns + '%',
        height: height2,
        marginBottom: 5,
        borderRadius: 4,
    },
    articleData: {
        display: 'flex',
        flexDirection: 'column',
        padding: 6,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    articleTitle: {
        fontSize: 12,
        color: '#fff',
        // fontFamily: 'Montserrat_500Medium'
    },
    articleDescription: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13
        // fontFamily: 'Montserrat_400Regular'
    },
    articleShadow: {
        borderRadius: 6,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    articleBackgroundImage: {
        width: '100%',
        justifyContent: 'flex-end',
        height: '100%',
        borderRadius: 4,
        display: 'flex',
        overflow: 'hidden'
    }
})

export default Article