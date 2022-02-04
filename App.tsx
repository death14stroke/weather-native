import React, { FC, useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import {
	useFonts,
	Quicksand_400Regular,
	Quicksand_700Bold
} from '@expo-google-fonts/quicksand';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
	ThemeProvider,
	ThemeContext,
	WeatherProvider,
	PreferenceProvider
} from '@context';
import { AuthStackParamList, UserStackParamList } from '@navigation';
import { HomeScreen, LoginScreen, SignupScreen } from '@screens';

const authScreens = () => {
	const Stack = createStackNavigator<AuthStackParamList>();

	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="Signup">
			<Stack.Screen name="Signup" component={SignupScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	);
};

const userScreens = () => {
	const Stack = createStackNavigator<UserStackParamList>();

	return (
		<WeatherProvider>
			<PreferenceProvider>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{ headerTransparent: true }}>
					<Stack.Screen name="Home" component={HomeScreen} />
				</Stack.Navigator>
			</PreferenceProvider>
		</WeatherProvider>
	);
};

const App: FC = () => {
	let [fontsLoaded] = useFonts({ Quicksand_400Regular, Quicksand_700Bold });
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged(user => {
			setUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	if (!fontsLoaded || loading) {
		return <AppLoading />;
	}

	// TODO: remove WeatherProvider and PreferenceProvider from here and add so they are called only when logged in
	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<ThemeContext.Consumer>
					{({ state }) => (
						<NavigationContainer theme={state}>
							{user ? userScreens() : authScreens()}
						</NavigationContainer>
					)}
				</ThemeContext.Consumer>
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export default App;
