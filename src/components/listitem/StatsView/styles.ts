import { makeStyles } from '@rneui/themed';

import { FontFamily } from '@app/styles';
import { ds, fs } from '@app/utils';

export const useStyles = makeStyles(() => ({
	icon: {
		marginTop: ds(4),
		marginRight: ds(4)
	},
	title: { fontFamily: FontFamily.BOLD },
	iconContainer: { flexDirection: 'row' },
	value: { fontSize: fs(16) }
}));
