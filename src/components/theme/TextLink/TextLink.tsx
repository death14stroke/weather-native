import React, { FC } from 'react';
import { Text, TextProps } from 'react-native-elements';
import { styles } from './styles';

type Props = TextProps;

const TextLink: FC<Props> = ({ children, style, ...props }) => {
	return (
		<Text {...props} style={[styles.link, style]}>
			{children}
		</Text>
	);
};

export { TextLink };
