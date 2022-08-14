import { makeStyles } from '@rneui/themed';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Dimens } from '@app/styles';
import { ds } from '@app/utils';

export const useStyles = makeStyles(({ colors }, { top, left, right }: EdgeInsets) => ({
	container: {
		flex: 1,
		borderBottomLeftRadius: Dimens.BORDER_RADIUS,
		borderBottomRightRadius: Dimens.BORDER_RADIUS,
		zIndex: 1,
		backgroundColor: colors.popup,
		paddingTop: top,
		paddingLeft: left,
		paddingRight: right
	},
	contentContainer: {
		marginStart: ds(28),
		flexGrow: 1
	},
	appBar: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Dimens.PADDING_CONTENT
	}
}));
