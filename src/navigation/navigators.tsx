import React from 'react';

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, SignupScreen } from '@app/screens';

import { RootStackParamList } from './paramsList';

export const stackNavigation = (user?: FirebaseAuthTypes.User | null) => {
	const Stack = createStackNavigator<RootStackParamList>();

	return (
		<Stack.Navigator>
			{user ? (
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ headerTransparent: true }}
				/>
			) : (
				<Stack.Screen
					name='Signup'
					component={SignupScreen}
					options={{ headerShown: false }}
				/>
			)}
		</Stack.Navigator>
	);
};
