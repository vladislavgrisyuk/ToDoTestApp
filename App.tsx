import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useFonts } from '@expo-google-fonts/montserrat';

import {
	Exo2_400Regular,
	Exo2_500Medium,
	Exo2_600SemiBold,
} from '@expo-google-fonts/exo-2';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Catalog from './screens/catalog';
import { OpenDrawerRight } from './NavigationService';
import ArticleAbout from './screens/articleAbout';
import Readerview from './screens/ReaderView';
import ReaderView from './screens/ReaderView';
import { LogBox } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { createContext, FC, useState } from 'react';
import UserContext from './UserContext';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App: FC = () => {
	const Stack = createStackNavigator();
	const Drawer = createDrawerNavigator();
	const [isLight, setIsLight] = useState(true);
	const [isHorizontal, setIsHorizontal] = useState(false);
	let [fontsLoaded] = useFonts({
		Exo2_400Regular,
		Exo2_500Medium,
		Exo2_600SemiBold,
	});

	const MainDrawer = () => {
		return (
			<Drawer.Navigator
				useLegacyImplementation
				screenOptions={{
					headerStyle: {
						backgroundColor: '#e48f13',
						height: 100,
					},
					swipeEdgeWidth: 400,
					headerTintColor: '#fff',
					title: '',

					headerRight: () => {
						return (
							<View
								style={{
									marginRight: 15,
									display: 'flex',
									flexDirection: 'row',
								}}
							>
								<TouchableOpacity
									style={{
										marginRight: 15,
									}}
								>
									<Feather
										name='moon'
										size={22}
										color='white'
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										OpenDrawerRight();
									}}
								>
									<FontAwesome
										name='filter'
										size={22}
										color='white'
									/>
								</TouchableOpacity>
							</View>
						);
					},
				}}
			>
				<Drawer.Screen
					name='catalog'
					component={Catalog}
				></Drawer.Screen>
			</Drawer.Navigator>
		);
	};
	return (
		<UserContext.Provider value={{ isHorizontal, setIsHorizontal }}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen
						name='MainDrawer'
						component={MainDrawer}
					></Stack.Screen>
					<Stack.Group
						screenOptions={{
							presentation: 'card',
							headerShown: false,
							gestureEnabled: true,
							gestureResponseDistance: 70,
						}}
					>
						<Stack.Screen
							options={{
								headerShown: false,
								detachPreviousScreen: false,
							}}
							name='catalog2'
							component={ArticleAbout}
						></Stack.Screen>
						<Stack.Screen
							options={{ headerShown: false }}
							name='read'
							component={ReaderView}
						></Stack.Screen>
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
		</UserContext.Provider>
	);
};

export default App;
