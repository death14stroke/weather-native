import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from '@components/theme';
import { styles } from './styles';

const ListEmptyText: FC = ({ children }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{children}</Text>
		</View>
	);
};

export { ListEmptyText };
