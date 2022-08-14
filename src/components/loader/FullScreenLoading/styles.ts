import { makeStyles } from '@rneui/themed';
import { ms } from 'react-native-size-matters';

import { FontFamily } from '@app/styles';

export const useStyles = makeStyles(({ colors }) => ({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: colors.black,
		fontFamily: FontFamily.BOLD
	},
	anim: {
		width: ms(400),
		aspectRatio: 1
	}
}));
