import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { Icon, Text } from '@rneui/themed';

import { Colors } from '@app/styles';

import { useStyles } from './styles';

interface Props {
	title: string;
	value: string;
	icon: { name: string; type: string };
}

const StatsView: FC<Props> = ({ title, value, icon }) => {
	const styles = useStyles();

	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.iconContainer}>
				<Icon {...icon} color={Colors.white} style={styles.icon} />
				<Text style={styles.value}>{value}</Text>
			</View>
		</View>
	);
};

export default memo(StatsView, (prevProps, nextProps) => prevProps.value === nextProps.value);
