import { StyleSheet } from 'react-native';
import { Colors, FontFamily } from '@styles';
import { CustomTheme } from '@models';

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
		link: {
			fontFamily: FontFamily.QUICKSAND_BOLD
		},
		navText: {
			fontFamily: FontFamily.QUICKSAND_BOLD,
			color: colors.primary
		},
		button: {
			marginTop: 24
		},
		disclaimer: {
			color: Colors.nobel,
			marginLeft: 8
		},
		image: {
			width: '70%',
			height: '30%',
			alignSelf: 'center'
		},
		error: {
			color: 'red',
			fontFamily: FontFamily.QUICKSAND_REGULAR,
			fontSize: 12
		}
	});
};
