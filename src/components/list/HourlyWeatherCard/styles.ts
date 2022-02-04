import { StyleSheet } from 'react-native';
import { FontFamily } from '@styles';

export const styles = StyleSheet.create({
	card: {
		backgroundColor: '#ffffff80',
		borderRadius: 16,
		borderWidth: 0,
		padding: 4,
		elevation: 0,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 4
	},
	time: {
		fontFamily: FontFamily.QUICKSAND_BOLD,
		color: 'black',
		textAlign: 'center',
		fontSize: 16
	},
	imageContainer: {
		width: '80%',
		alignSelf: 'center',
		aspectRatio: 1,
		marginVertical: 4
	},
	image: {
		height: '100%',
		aspectRatio: 1
	},
	temp: {
		fontFamily: FontFamily.QUICKSAND_BOLD,
		color: 'black',
		textAlign: 'center',
		fontWeight: 'normal'
	}
});
