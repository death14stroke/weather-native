import React, { FC } from 'react';
import { Button as NativeButton, ButtonProps } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@styles';
import { styles } from './styles';

type Props = ButtonProps;

const Button: FC<Props> = ({ containerStyle, ...props }) => {
	return (
		<NativeButton
			raised
			titleStyle={styles.title}
			containerStyle={[styles.container, containerStyle]}
			buttonStyle={styles.button}
			ViewComponent={LinearGradient}
			activeOpacity={0.8}
			linearGradientProps={{
				colors: [Colors.fuchsiaPink, Colors.sweetPink],
				start: [0.0, 0.5],
				end: [1.0, 0.5],
				locations: [0.1, 0.8]
			}}
			{...props}
		/>
	);
};

export { Button };
