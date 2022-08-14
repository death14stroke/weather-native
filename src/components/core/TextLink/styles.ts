import { makeStyles } from '@rneui/themed';

import { FontFamily } from '@app/styles';

export const useStyles = makeStyles(() => ({
	link: {
		textDecorationLine: 'underline',
		fontFamily: FontFamily.BOLD
	}
}));
