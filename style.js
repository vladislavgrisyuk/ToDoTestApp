import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	styleButton: {
		backgroundColor: '#000',
	},
	loginScreenButton: {
		marginRight: 40,
		marginLeft: 40,
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#1E6738',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000',
	},
	input: {
		borderWidth: 1,
		padding: 5,
		borderRadius: 5,
		width: '100%',
		marginBottom: 10,
	},
	loginContainer: {
		width: '100%',
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 20,
	},
	loginHeaderText: {
		display: 'flex',
		alignSelf: 'center',
		fontSize: 18,
		marginBottom: 10,
	},
});

export { styles };
