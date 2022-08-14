import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';

import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { asyncStoragePersister, queryClient } from '@app/data';
import { stackNavigation } from '@app/navigation';
import { ClearTheme, FontFamily } from '@app/styles';

const Screens = () => {
	const [appIsReady, setAppIsReady] = useState(false);
	const [authReady, setAuthReady] = useState(false);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged(user => {
			setUser(user);
			setAuthReady(true);
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		async function prepare() {
			try {
				await Font.loadAsync({
					[FontFamily.REGULAR]: Quicksand_400Regular,
					[FontFamily.BOLD]: Quicksand_700Bold
				});
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	useEffect(() => {
		async function hide() {
			await SplashScreen.hideAsync();
		}

		if (appIsReady && authReady) {
			hide();
		}
	}, [appIsReady, authReady]);

	if (!appIsReady || !authReady) {
		return null;
	}

	return <NavigationContainer>{stackNavigation(user)}</NavigationContainer>;
};

SplashScreen.preventAutoHideAsync();

persistQueryClient({
	queryClient,
	persister: asyncStoragePersister
});

export default function App() {
	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={ClearTheme}>
					<Screens />
				</ThemeProvider>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
}
