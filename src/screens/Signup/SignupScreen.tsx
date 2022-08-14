import React, { FC, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import { Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import FastImage from 'react-native-fast-image';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextLink } from '@app/components/core';
import { LoginForm, SignupForm } from '@app/components/form';
import { Colors, useContainerStyles } from '@app/styles';
import { setupNavBar } from '@app/utils';

import { useStyles } from './styles';

interface UiStrings {
	title: string;
	navText: string;
	linkText: string;
}

const strings: UiStrings[] = [
	{
		title: 'Get started',
		navText: 'Registered User?',
		linkText: 'Log in'
	},
	{
		title: 'Welcome back',
		navText: 'New User?',
		linkText: 'Sign up'
	}
];

export const SignupScreen: FC = () => {
	const styles = useStyles();
	const containerStyles = useContainerStyles();
	const viewPager = useRef<PagerView>(null);
	const [page, setPage] = useState(0);

	const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
		setPage(event.nativeEvent.position);
	};

	const onNavigate = () => {
		viewPager.current?.setPage((page + 1) % 2);
	};

	useEffect(() => {
		setupNavBar(Colors.portGore);
	}, []);

	return (
		<LinearGradient
			colors={[Colors.victoria, Colors.portGore]}
			style={containerStyles.gradient}
			locations={[0, 0.45]}>
			<StatusBar backgroundColor='transparent' translucent style='light' />

			<SafeAreaView style={[containerStyles.container, styles.container]}>
				<KeyboardAvoidingView
					style={containerStyles.gradient}
					contentContainerStyle={containerStyles.gradient}
					behavior='position'>
					<FastImage
						source={require('@app/assets/welcome.png')}
						style={styles.image}
						resizeMode={FastImage.resizeMode.contain}
					/>
					<Text h2 h2Style={styles.title}>
						{strings[page].title}
					</Text>
					<PagerView
						style={styles.pagerView}
						initialPage={0}
						ref={viewPager}
						scrollEnabled={false}
						onPageSelected={onPageSelected}>
						<View key='1' style={styles.page}>
							<SignupForm />
						</View>
						<View key='2' style={styles.page}>
							<LoginForm />
						</View>
					</PagerView>
				</KeyboardAvoidingView>
				<View>
					<Text h4 h4Style={styles.navText}>
						{strings[page].navText}
					</Text>
					<TextLink onPress={onNavigate}>{strings[page].linkText}</TextLink>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
};
