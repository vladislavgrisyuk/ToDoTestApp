import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({});

const globalVars = {
	varColorBlack: '#212529',
	varColorGray: '#868e96',
	varColorOrange: '#f77519',
	varColorLightWhite: '#DDDDDD',
	fontExo400: 'Exo2_400Regular',
	fontExo500: 'Exo2_500Medium',
	fontExo600: 'Exo2_600SemiBold',
	screenWidth: width,
};

export { styles, globalVars };
