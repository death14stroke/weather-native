import { makeStyles } from '@rneui/themed';

import { Dimens } from '@app/styles';
import { fs } from '@app/utils';

export const useStyles = makeStyles(({ colors }) => ({
	root: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	locationItem: {
		color: colors.grey3,
		fontSize: fs(16),
		marginEnd: Dimens.PADDING_SCREEN
	},
	delete: {
		color: colors.grey3,
		size: fs(16)
	}
}));
