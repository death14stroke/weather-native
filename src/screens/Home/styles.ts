import { Dimensions, StyleSheet } from 'react-native';
import { FontFamily } from '@styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingBottom: 4
	},
	imageContainer: {
		width: SCREEN_WIDTH * 0.8,
		alignSelf: 'center',
		marginTop: 50
	},
	image: {
		width: 'auto',
		aspectRatio: 1,
		borderRadius: SCREEN_WIDTH * 0.4
	},
	tempContainer: {
		backgroundColor: 'white',
		width: 80,
		aspectRatio: 1,
		borderRadius: 40,
		elevation: 4,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 4,
		position: 'absolute',
		top: SCREEN_WIDTH * 0.1,
		right: -SCREEN_WIDTH * 0.06,
		justifyContent: 'center'
	},
	temperature: {
		color: 'black',
		textAlign: 'center',
		fontFamily: FontFamily.QUICKSAND_BOLD,
		fontWeight: 'normal'
	},
	weather: {
		color: 'black',
		fontFamily: FontFamily.QUICKSAND_BOLD,
		fontWeight: 'normal',
		textTransform: 'uppercase',
		alignSelf: 'center',
		marginTop: 12,
		marginBottom: 8
	},
	day: {
		alignSelf: 'center',
		fontFamily: FontFamily.QUICKSAND_BOLD,
		fontWeight: 'normal'
	},
	time: {
		alignSelf: 'center',
		fontSize: 16
	},
	hourlyWeather: {
		marginHorizontal: 8,
		width: SCREEN_WIDTH * 0.33 - 8
	},
	statsRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 12
	},
	bottomSheetLabel: {
		fontFamily: FontFamily.QUICKSAND_BOLD,
		alignSelf: 'center',
		fontSize: 16
	}
});
