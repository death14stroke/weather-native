import React, { ComponentType, FC, useEffect } from 'react';

import { useTheme } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useContainerStyles } from '@app/styles';
import { setupNavBar } from '@app/utils';

export const withWeatherTheme =
	<T extends object>(Component: ComponentType<T>): FC<T> =>
	props => {
		const {
			theme: { gradient }
		} = useTheme();
		const containerStyles = useContainerStyles();

		useEffect(() => {
			setupNavBar(gradient[gradient.length - 1]);
		}, [gradient]);

		return (
			<LinearGradient colors={gradient} style={containerStyles.gradient}>
				<SafeAreaView style={containerStyles.container}>
					<Component {...props} />
				</SafeAreaView>
			</LinearGradient>
		);
	};
