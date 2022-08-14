import { Dimensions } from 'react-native';

import { makeStyles } from '@rneui/themed';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Colors, Dimens } from '@app/styles';
import { ds } from '@app/utils';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const useStyles = makeStyles((_, { top, bottom }: EdgeInsets) => ({
	container: {
		height: SCREEN_HEIGHT,
		paddingTop: top,
		paddingBottom: bottom,
		justifyContent: 'space-between',
		marginEnd: Dimens.PADDING_SCREEN
	},
	collapseBtn: {
		alignSelf: 'center',
		padding: ds(4),
		backgroundColor: Colors.black20,
		borderRadius: Dimens.BORDER_RADIUS
	}
}));
