import React, { FC, useState } from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Button, Text, TextLink } from '@components/theme';
import { AuthStackParamList } from '@navigation';
import { forgotPassword, loginWithEmail } from '@hooks/auth';
import { useTheme } from '@hooks/theme';
import { showToast } from '@hooks/ui';
import { Colors } from '@styles';
import { useStyles } from './styles';

interface Props {
	navigation: StackNavigationProp<AuthStackParamList>;
}

interface FormValue {
	email: string;
	password: string;
}

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Please enter valid email')
		.required('Email is required'),
	password: Yup.string()
		.min(6, ({ min }) => `Password must be at least ${min} characters`)
		.required('Password is required')
});

const LoginScreen: FC<Props> = ({ navigation }) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [loading, setLoading] = useState(false);

	const _onSubmit = async ({ email, password }: FormValue) => {
		setLoading(true);

		try {
			await loginWithEmail({ email, password });
		} catch (err: any) {
			setLoading(false);
			showToast(err.message);
		}
	};

	const onForgotPassword = async (email: string) => {
		try {
			await forgotPassword(email);
			showToast('Password reset email has been sent');
		} catch (err: any) {
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
					Welcome back
				</Text>
				<Formik
					validationSchema={validationSchema}
					initialValues={{ email: '', password: '' }}
					onSubmit={_onSubmit}>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						touched,
						errors
					}) => (
						<View>
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
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => {
									if (!errors.email) {
										onForgotPassword(values.email);
									} else {
										showToast(errors.email);
									}
								}}>
								<Text style={styles.resetPassword}>
									Forgot password?
								</Text>
							</TouchableOpacity>
							<Button
								title="Log in"
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
					<TextLink onPress={() => navigation.navigate('Signup')}>
						Sign up
					</TextLink>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
};

export { LoginScreen };
