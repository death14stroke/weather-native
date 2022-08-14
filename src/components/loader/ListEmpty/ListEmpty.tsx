import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { Text } from '@rneui/themed';

import { useStyles } from './styles';

interface Props {
	message: string;
}

const ListEmpty: FC<Props> = ({ message }) => {
	const styles = useStyles();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{message}</Text>
		</View>
	);
};

export default memo(ListEmpty);
