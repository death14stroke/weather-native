import { makeStyles } from '@rneui/themed';
import { vs } from 'react-native-size-matters';

import { Dimens, FontFamily } from '@app/styles';
import { ds } from '@app/utils';

export const useStyles = makeStyles(({ colors }) => ({
	root: { flexDirection: 'row' },
	image: {
		height: vs(72),
		aspectRatio: 1
	},
	dataContainer: {
		borderColor: colors.white,
		borderRadius: 1000,
		borderWidth: ds(2),
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: Dimens.PADDING_SCREEN,
		marginVertical: Dimens.PADDING_CONTENT,
		flexDirection: 'row'
	},
	temp: { fontFamily: FontFamily.BOLD },
	day: { fontFamily: FontFamily.BOLD },
	dateContainer: { alignItems: 'center' }
}));
