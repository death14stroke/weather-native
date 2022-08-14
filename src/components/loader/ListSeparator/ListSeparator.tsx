import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { useStyles } from './styles';

const ListSeparator: FC = () => {
	const styles = useStyles();

	return <View style={styles.itemSeparator} />;
};

export default memo(ListSeparator);
