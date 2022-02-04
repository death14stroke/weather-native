import { Dimensions, StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const useStyles = (insets: EdgeInsets) => {
	return StyleSheet.create({
		container: {
			height: SCREEN_HEIGHT - insets.top - insets.bottom,
			justifyContent: 'space-between',
			marginHorizontal: 16
		},
		collapseBtn: {
			alignSelf: 'center',
			padding: 4,
			backgroundColor: '#00000066',
			borderRadius: 8
		}
	});
};
