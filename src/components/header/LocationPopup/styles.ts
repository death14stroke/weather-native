import { makeStyles } from '@rneui/themed';

import { Dimens } from '@app/styles';
import { ds, fs } from '@app/utils';

export const useStyles = makeStyles(({ colors }) => ({
	container: {
		flex: 1,
		overflow: 'hidden'
	},
	contentContainer: {
		marginLeft: ds(28),
		marginTop: Dimens.ITEM_SEPARATOR,
		flexGrow: 1
	},
	addContainer: {
		flexDirection: 'row',
		marginTop: ds(4),
		marginBottom: Dimens.PADDING_SCREEN,
		alignItems: 'center'
	},
	addLocationText: {
		color: colors.black,
		fontSize: fs(16),
		marginLeft: Dimens.ITEM_SEPARATOR
	},
	locationItem: {
		color: colors.grey3,
		fontSize: fs(16),
		alignSelf: 'flex-start'
	},
	itemTouch: {
		marginVertical: Dimens.ITEM_SEPARATOR
	}
}));
