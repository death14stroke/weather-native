import { StyleSheet } from 'react-native';
import { FontFamily } from '@styles';

export const styles = StyleSheet.create({
	title: {
		fontFamily: FontFamily.QUICKSAND_BOLD,
		textAlignVertical: 'center',
		textAlign: 'center'
	},
	container: {
		borderRadius: 16
	},
	button: {
		paddingVertical: 12,
		borderRadius: 16
	}
});
