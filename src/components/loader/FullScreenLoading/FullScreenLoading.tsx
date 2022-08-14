import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { Text } from '@rneui/themed';
import AnimatedLottieView from 'lottie-react-native';

import { useStyles } from './styles';

const FullScreenLoading: FC = () => {
	const styles = useStyles();

	return (
		<View style={styles.container}>
			<AnimatedLottieView
				source={require('@app/assets/loading.json')}
				autoPlay
				loop
				style={styles.anim}
			/>
			<Text h3 h3Style={styles.text}>
				Loading Weather
			</Text>
		</View>
	);
};

export default memo(FullScreenLoading);
