import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { Text, TextProps } from '@rneui/themed';

import { useStyles } from './styles';

type Props = TextProps;

const TextLink: FC<Props> = ({ children, style, onPress, ...props }) => {
	const styles = useStyles();

	return (
		<TouchableOpacity onPress={onPress}>
			<Text {...props} style={[styles.link, style]}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

export { TextLink };
