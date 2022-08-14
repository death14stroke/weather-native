import { makeStyles } from '@rneui/themed';

import { Dimens } from './dimens';

export const useFormStyles = makeStyles(() => ({
	button: { marginTop: Dimens.PADDING_SCREEN }
}));

export const useContainerStyles = makeStyles(() => ({
	gradient: { flex: 1 },
	container: {
		flex: 1,
		justifyContent: 'space-between'
	}
}));
