import { StyleSheet } from 'react-native';
import { FontFamily } from '@styles';

export const styles = StyleSheet.create({
	imageContainer: {
		width: '22%',
		aspectRatio: 1
	},
	image: {
		height: '100%',
		aspectRatio: 1
	},
	dataContainer: {
		borderColor: 'white',
		borderRadius: 600,
		borderWidth: 2,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		marginVertical: 12,
		flexDirection: 'row'
	},
	temp: {
		fontFamily: FontFamily.QUICKSAND_BOLD,
		fontWeight: 'normal'
	},
	day: {
		fontFamily: FontFamily.QUICKSAND_BOLD
	},
	dateContainer: {
		alignItems: 'center'
	}
});
