import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import
{
	Text,
	TouchableOpacity,
	View,
} from 'react-native';


import 
{
	Montserrat_400Regular,
	Montserrat_500Medium,
	useFonts
} from '@expo-google-fonts/montserrat'


import
{
	Exo2_400Regular,
	Exo2_500Medium,
	Exo2_600SemiBold,

} from '@expo-google-fonts/exo-2'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Catalog from './screens/catalog';
import { OpenDrawerRight } from './NavigationService'
import ArticleAbout from './screens/articleAbout';

export default function App()
{

	const Stack = createStackNavigator()
	const Drawer = createDrawerNavigator()
	let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_500Medium,
		Exo2_400Regular,
		Exo2_500Medium,
		Exo2_600SemiBold,
	});

	const Cat = ({ route }) =>
	{
		return (<ArticleAbout />)
	}

	const MainDrawer = () =>
	{

		return (
			<Drawer.Navigator useLegacyImplementation screenOptions={ {
				headerStyle: {
					backgroundColor: '#e48f13',
					height: 100,

				},
				swipeEdgeWidth: 400,
				headerTintColor: '#fff',
				title: '',

				headerRight: () =>
				{
					return (
						<View style={ {
							marginRight: 15,
							display: 'flex',
							flexDirection: 'row'
						} }>
							<TouchableOpacity style={ {
								marginRight: 15
							} }>
								<Feather name="moon" size={ 22 } color="white" />
							</TouchableOpacity>
							<TouchableOpacity onPress={ OpenDrawerRight }>
								<FontAwesome name="filter" size={ 22 } color="white" />
							</TouchableOpacity>
						</View>
					)
				}

			} }>

				<Drawer.Screen name='catalog' component={ Catalog }></Drawer.Screen>
			</Drawer.Navigator>
		)
	}
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={ {
				headerShown: false,
			} }>
				<Stack.Screen name='MainDrawer' component={ MainDrawer }>

				</Stack.Screen>
				<Stack.Group screenOptions={ { presentation: 'modal', headerShown: false, gestureEnabled: true, gestureResponseDistance: 300 } }>
					<Stack.Screen options={ { headerShown: false } } name='catalog2' component={ Cat }>

					</Stack.Screen>
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
}