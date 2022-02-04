import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { CustomTheme } from '@models';
import { FontFamily } from '@styles';

export const useStyles = ({ colors }: CustomTheme, insets: EdgeInsets) => {
	return StyleSheet.create({
		container: {
			flex: 1,
			borderBottomLeftRadius: 16,
			borderBottomRightRadius: 16,
			zIndex: 1,
			backgroundColor: colors.popup,
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right
		},
		contentContainer: {
			marginLeft: 30,
			flexGrow: 1
		},
		appBar: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: 8
		},
		header: {
			color: 'black',
			fontFamily: FontFamily.QUICKSAND_BOLD,
			marginHorizontal: 4,
			fontWeight: 'normal'
		},
		locationItem: {
			color: 'gray',
			fontSize: 18
		},
		leftIcon: {
			marginTop: 8,
			marginRight: 8,
			marginLeft: 0
		},
		input: {
			fontFamily: FontFamily.QUICKSAND_REGULAR
		},
		inputContainer: {
			borderBottomWidth: 0
		},
		activityIndicator: {
			marginRight: 8
		}
	});
};
