import { makeStyles } from '@rneui/themed';

import { Colors, Dimens } from '@app/styles';
import { ds, fs } from '@app/utils';

export const useStyles = makeStyles(({ colors }) => ({
	link: { textDecorationLine: 'none' },
	disclaimer: {
		color: Colors.nobel,
		marginLeft: ds(Dimens.ITEM_SEPARATOR)
	},
	error: {
		color: colors.error,
		fontSize: fs(12)
	}
}));
