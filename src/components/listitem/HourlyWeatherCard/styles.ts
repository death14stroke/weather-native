import { makeStyles } from '@rneui/themed';
import { ms } from 'react-native-size-matters';

import { Colors, Dimens, FontFamily } from '@app/styles';
import { ds, fs } from '@app/utils';

export const useStyles = makeStyles(({ colors }) => ({
	card: {
		backgroundColor: Colors.white50,
		borderRadius: Dimens.BORDER_RADIUS,
		width: Dimens.CARD_HOURLY_WEATHER,
		justifyContent: 'space-between'
	},
	time: {
		fontFamily: FontFamily.BOLD,
		color: colors.black,
		textAlign: 'center',
		fontSize: fs(16)
	},
	imageContainer: {
		width: '80%',
		alignSelf: 'center',
		aspectRatio: 1,
		marginVertical: ds(4)
	},
	image: {
		height: ms(72)
	},
	temperature: {
		fontFamily: FontFamily.BOLD,
		color: colors.black,
		textAlign: 'center'
	}
}));
