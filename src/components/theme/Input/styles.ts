import { StyleSheet } from 'react-native';
import { Colors, FontFamily } from '@styles';

export const styles = StyleSheet.create({
	label: {
		color: Colors.sweetPink,
		fontFamily: FontFamily.QUICKSAND_BOLD,
		fontWeight: 'normal'
	},
	inputContainer: {
		borderColor: Colors.sweetPink
	},
	input: {
		color: 'white',
		fontFamily: FontFamily.QUICKSAND_REGULAR
	},
	error: {
		fontFamily: FontFamily.QUICKSAND_REGULAR
	}
});
