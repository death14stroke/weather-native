import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { CustomTheme } from '@models';
import { FontFamily } from '@styles';

export const useStyles = (
	{ colors }: CustomTheme,
	insets: EdgeInsets,
	isOpen: boolean
) => {
	return StyleSheet.create({
		container: {
			paddingTop: insets.top,
			paddingLeft: insets.left,
			paddingRight: insets.right,
			backgroundColor: isOpen ? colors.popup : 'transparent',
			borderBottomLeftRadius: 16,
			borderBottomRightRadius: 16
		},
		innerContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 16,
			backgroundColor: isOpen ? colors.popup : 'transparent'
		},
		appBar: {
			flexDirection: 'row',
			alignItems: 'center',
			height: 50,
			flex: 1
		},
		header: {
			color: 'black',
			fontFamily: FontFamily.QUICKSAND_BOLD,
			marginHorizontal: 4,
			fontWeight: 'normal'
		},
		dropdown: {
			paddingHorizontal: 16,
			borderBottomLeftRadius: 16,
			borderBottomRightRadius: 16,
			backgroundColor: colors.popup
		},
		searchPopupContainer: {
			...StyleSheet.absoluteFillObject,
			elevation: 16,
			zIndex: 4
		}
	});
};
