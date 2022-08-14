import { makeStyles } from '@rneui/themed';

import { fs } from '@app/utils';

export const useStyles = makeStyles(({ colors }) => ({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	text: {
		color: colors.black,
		fontSize: fs(18),
		textAlignVertical: 'center',
		textAlign: 'center'
	}
}));
