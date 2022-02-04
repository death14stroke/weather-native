import React, { FC } from 'react';
import { Text as NativeText, TextProps } from 'react-native-elements';
import { styles } from './styles';

type Props = TextProps;

const Text: FC<Props> = ({ children, style, ...props }) => {
	return (
		<NativeText {...props} style={[styles.text, style]}>
			{children}
		</NativeText>
	);
};

export { Text };
