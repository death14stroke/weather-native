import { StyleSheet } from 'react-native';

import { IconProps, makeStyles } from '@rneui/themed';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Dimens, FontFamily } from '@app/styles';
import { ds, fs } from '@app/utils';

type Props = {
	insets: EdgeInsets;
	open: boolean;
};

export const useStyles = makeStyles(({ colors }, { insets: { top }, open }: Props) => ({
	container: {
		paddingTop: top,
		backgroundColor: open ? colors.popup : 'transparent',
		borderBottomLeftRadius: Dimens.BORDER_RADIUS,
		borderBottomRightRadius: Dimens.BORDER_RADIUS
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Dimens.PADDING_SCREEN,
		backgroundColor: open ? colors.popup : 'transparent'
	},
	appBar: {
		flexDirection: 'row',
		alignItems: 'center',
		height: ds(40),
		flex: 1
	},
	header: {
		color: colors.black,
		fontFamily: FontFamily.BOLD,
		marginHorizontal: ds(4),
		fontSize: fs(28)
	},
	dropdown: {
		paddingHorizontal: Dimens.PADDING_SCREEN,
		borderBottomLeftRadius: Dimens.BORDER_RADIUS,
		borderBottomRightRadius: Dimens.BORDER_RADIUS,
		backgroundColor: colors.popup
	},
	searchPopupContainer: {
		...StyleSheet.absoluteFillObject,
		elevation: ds(16),
		zIndex: 4
	}
}));

export const iconStyles: Partial<IconProps> = {
	size: fs(28)
};
