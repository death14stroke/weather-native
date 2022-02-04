import React, { FC, useMemo, useState } from 'react';
import { Image, View, Linking, TouchableWithoutFeedback } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Button, Text, TextLink } from '@components/theme';
import { AuthStackParamList } from '@navigation';
import { signupWithEmail } from '@hooks/auth';
import { useTheme } from '@hooks/theme';
import { showToast } from '@hooks/ui';
import { Colors } from '@styles';
import { useStyles } from './styles';

interface Props {
	navigation: StackNavigationProp<AuthStackParamList>;
}

interface FormValue {
	username: string;
	email: string;
	password: string;
	accepted: boolean;
}

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.max(20, ({ max }) => `Username cannot be more than ${max} characters`)
		.required('Username is required'),
	email: Yup.string()
		.email('Please enter valid email')
		.required('Email is required'),
	password: Yup.string()
		.min(6, ({ min }) => `Password must be at least ${min} characters`)
		.required('Password is required'),
	accepted: Yup.boolean()
		.oneOf([true], 'Please accept the terms and conditions')
		.required('Please accept the terms and conditions')
});

const SignupScreen: FC<Props> = ({ navigation }) => {
	const theme = useTheme();
	const { colors } = theme;
	const styles = useStyles(theme);
	const [loading, setLoading] = useState(false);

	const renderTermsAndConditionLabel = useMemo(() => {
		return (
			<Text style={styles.disclaimer}>
				I agree to all the{' '}
				<Text
					style={styles.link}
					onPress={() =>
						Linking.openURL(
							'https://www.behance.net/gallery/116972093/Weather-app'
						)
					}>
					Terms and Privacy policy
				</Text>
			</Text>
		);
	}, [styles]);

	const _onSubmit = async ({ email, password, username }: FormValue) => {
		setLoading(true);

		try {
			await signupWithEmail({ email, password, username });
		} catch (err: any) {
			setLoading(false);
			showToast(err.message);
		}
	};

	return (
		<LinearGradient
			colors={[Colors.victoria, Colors.portGore]}
			style={styles.gradient}
			locations={[0, 0.45]}>
			<StatusBar
				backgroundColor="transparent"
				translucent
				style="light"
			/>
			<SafeAreaView style={styles.container}>
				<Image
					source={require('@assets/images/welcome.png')}
					style={styles.image}
					resizeMode="contain"
				/>
				<Text h2 h2Style={styles.title}>
					Get started
				</Text>
				<Formik
					validationSchema={validationSchema}
					initialValues={{
						username: '',
						email: '',
						password: '',
						accepted: false
					}}
					onSubmit={_onSubmit}>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						touched,
						errors,
						setFieldValue
					}) => (
						<View>
							<Input.Username
								label="Name"
								placeholder="Username"
								onChangeText={handleChange('username')}
								onBlur={handleBlur('username')}
								value={values.username}
								errorMessage={
									(touched.username && errors.username) || ''
								}
							/>
							<Input.Email
								label="E-mail"
								placeholder="Email"
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								value={values.email}
								errorMessage={
									(touched.email && errors.email) || ''
								}
							/>
							<Input.Password
								label="Password"
								placeholder="Password"
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								value={values.password}
								errorMessage={
									(touched.password && errors.password) || ''
								}
							/>
							<CheckBox
								title={renderTermsAndConditionLabel}
								checked={values.accepted}
								Component={TouchableWithoutFeedback}
								checkedColor={colors.primary}
								onBlur={handleBlur('accepted')}
								onPress={() =>
									setFieldValue('accepted', !values.accepted)
								}
							/>
							<Text style={styles.error}>
								{touched.accepted && errors.accepted}
							</Text>
							<Button
								title="Sign up"
								containerStyle={styles.button}
								onPress={() => handleSubmit()}
								loading={loading}
							/>
						</View>
					)}
				</Formik>
				<View>
					<Text h4 h4Style={styles.navText}>
						Registered User?
					</Text>
					<TextLink onPress={() => navigation.navigate('Login')}>
						Log in
					</TextLink>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
};

export { SignupScreen };
