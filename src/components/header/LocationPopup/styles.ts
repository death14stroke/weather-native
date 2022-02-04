import { StyleSheet } from 'react-native';
import { FontFamily } from '@styles';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'hidden'
	},
	contentContainer: {
		marginLeft: 30,
		flexGrow: 1
	},
	addContainer: {
		flexDirection: 'row',
		marginTop: 4,
		marginBottom: 16,
		height: 30,
		alignItems: 'center'
	},
	addLocationText: {
		color: 'black',
		fontSize: 18,
		fontFamily: FontFamily.QUICKSAND_BOLD,
		marginLeft: 8
	},
	locationItem: {
		color: 'gray',
		fontSize: 18,
		alignSelf: 'flex-start'
	},
	itemTouch: {
		marginVertical: 8
	}
});
