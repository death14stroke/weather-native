import { Dimensions } from 'react-native';

import { makeStyles } from '@rneui/themed';
import { ms } from 'react-native-size-matters';

import { Dimens, FontFamily } from '@app/styles';
import { ds, fs } from '@app/utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const useStyles = makeStyles(({ colors }) => ({
	gradient: { flex: 1 },
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingBottom: ds(4)
	},
	imageContainer: {
		height: ms(300),
		aspectRatio: 1,
		alignSelf: 'center',
		marginTop: ds(44)
	},
	image: { height: '100%', width: '100%', borderRadius: SCREEN_WIDTH },
	tempContainer: {
		backgroundColor: colors.white,
		width: ms(80),
		aspectRatio: 1,
		borderRadius: ms(40),
		elevation: ds(16),
		shadowOffset: { width: ds(0), height: ds(2) },
		shadowOpacity: 0.8,
		shadowRadius: ds(4),
		position: 'absolute',
		top: ms(40),
		right: -ms(20),
		justifyContent: 'center'
	},
	temperature: {
		color: colors.black,
		textAlign: 'center',
		fontFamily: FontFamily.BOLD
	},
	weather: {
		color: colors.black,
		fontFamily: FontFamily.BOLD,
		textTransform: 'uppercase',
		alignSelf: 'center',
		marginTop: Dimens.PADDING_CONTENT,
		marginBottom: Dimens.ITEM_SEPARATOR
	},
	day: {
		alignSelf: 'center',
		fontFamily: FontFamily.BOLD
	},
	time: {
		alignSelf: 'center',
		fontSize: fs(16)
	},
	hourlyList: { flexGrow: 0 },
	hourlyListContainer: {
		marginStart: Dimens.PADDING_SCREEN,
		marginVertical: Dimens.ITEM_SEPARATOR
	},
	statsRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: Dimens.PADDING_CONTENT
	},
	bottomSheetLabel: {
		fontFamily: FontFamily.BOLD,
		alignSelf: 'center',
		fontSize: fs(16)
	}
}));
