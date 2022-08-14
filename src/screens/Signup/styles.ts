import { makeStyles } from '@rneui/themed';

import { Dimens, FontFamily } from '@app/styles';

export const useStyles = makeStyles(({ colors }) => ({
	pagerView: { flex: 1 },
	page: { justifyContent: 'center' },
	container: { padding: Dimens.PADDING_SCREEN },
	title: {
		fontFamily: FontFamily.BOLD,
		color: colors.primary,
		marginVertical: Dimens.ITEM_SEPARATOR
	},
	image: {
		height: '32%',
		aspectRatio: 1,
		alignSelf: 'center'
	},
	navText: {
		fontFamily: FontFamily.BOLD,
		color: colors.primary,
		marginBottom: Dimens.ITEM_SEPARATOR
	}
}));
