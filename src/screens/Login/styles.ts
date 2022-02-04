import { StyleSheet } from 'react-native';
import { CustomTheme } from '@models';
import { Colors, FontFamily } from '@styles';

export const useStyles = ({ colors }: CustomTheme) => {
	return StyleSheet.create({
		gradient: {
			flex: 1
		},
		container: {
			flex: 1,
			padding: 16,
			justifyContent: 'space-between'
		},
		title: {
			fontFamily: FontFamily.QUICKSAND_BOLD,
			color: colors.primary
		},
		image: {
			width: '70%',
			height: '30%',
			alignSelf: 'center'
		},
		resetPassword: {
			alignSelf: 'flex-end',
			color: Colors.nobel
		},
		button: {
			marginTop: 24
		},
		navText: {
			fontFamily: FontFamily.QUICKSAND_BOLD,
			color: colors.primary
		}
	});
};
