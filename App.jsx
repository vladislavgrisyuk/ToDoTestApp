import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import
{
	Button,
	Modal,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';


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

import LoginForm from './LoginForm';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { styles } from './style'
import Catalog from './screens/catalog';

export default function App()
{

	const Stack = createStackNavigator()
	const Drawer = createDrawerNavigator()
	let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_500Medium
	});
	console.log('fonst: ' + fontsLoaded)

	const Cat = () =>
	{
		return (<Text>asd</Text>)
	}

	const Drawers = () =>
	{
		return (
			<Drawer.Navigator screenOptions={ {
				headerStyle: {
					backgroundColor: 'rgb(226, 141, 50)',

				},
				headerTintColor: '#fff',
				title: 'Каталог'
			} }>
				<Drawer.Screen name='catalog' component={ Catalog }></Drawer.Screen>
			</Drawer.Navigator>
		)
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={ { headerShown: false } }>
				<Stack.Screen name='Drawer' component={ Drawers }>

				</Stack.Screen>
				<Stack.Group screenOptions={ { presentation: 'modal', headerShown: true } }>
					<Stack.Screen name='catalog2' component={ Cat }>

					</Stack.Screen>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
}