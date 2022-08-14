import React, { FC, memo, useRef, useState } from 'react';
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { Button, CheckBox, Text } from '@rneui/themed';
import * as WebBrowser from 'expo-web-browser';
import { useFormik } from 'formik';
import Config from 'react-native-config';

import { Input, TextLink } from '@app/components/core';
import { signupWithEmail } from '@app/hooks';
import { signupValidationSchema } from '@app/models';
import { Colors, useFormStyles } from '@app/styles';
import { showToast } from '@app/utils';

import { useStyles } from './styles';

interface FormValue {
	username: string;
	email: string;
	password: string;
	accepted: boolean;
}

const initialValues: FormValue = { username: '', email: '', password: '', accepted: false };

const SignupForm: FC = () => {
	const styles = useStyles();
	const formStyles = useFormStyles();
	const emailInput = useRef<TextInput>(null);
	const passwordInput = useRef<TextInput>(null);

	const [loading, setLoading] = useState(false);

	const onSubmit = async ({ email, password, username }: FormValue) => {
		setLoading(true);

		try {
			await signupWithEmail({ email, password, username });
		} catch (err: any) {
			setLoading(false);
			showToast(err.message);
		}
	};

	const { handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue } =
		useFormik<FormValue>({ validationSchema: signupValidationSchema, initialValues, onSubmit });

	const onReadPolicy = () =>
		WebBrowser.openBrowserAsync(Config.POLICY_URL, {
			toolbarColor: Colors.victoria,
			secondaryToolbarColor: Colors.victoria
		});

	const onUsernameNext = () => emailInput.current?.focus();
	const onEmailNext = () => passwordInput.current?.focus();

	const TermsAndConditions = memo(() => (
		<Text style={styles.disclaimer}>
			I agree to all the{' '}
			<TextLink style={styles.link} onPress={onReadPolicy}>
				Terms and Privacy policy
			</TextLink>
		</Text>
	));

	return (
		<View>
			<Input.Username
				onChangeText={handleChange('username')}
				onBlur={handleBlur('username')}
				value={values.username}
				errorMessage={(touched.username && errors.username) || ''}
				onSubmitEditing={onUsernameNext}
			/>
			<Input.Email
				onChangeText={handleChange('email')}
				onBlur={handleBlur('email')}
				value={values.email}
				ref={emailInput}
				errorMessage={(touched.email && errors.email) || ''}
				onSubmitEditing={onEmailNext}
			/>
			<Input.Password
				onChangeText={handleChange('password')}
				onBlur={handleBlur('password')}
				value={values.password}
				ref={passwordInput}
				errorMessage={(touched.password && errors.password) || ''}
			/>
			<CheckBox
				title={<TermsAndConditions />}
				checked={values.accepted}
				Component={TouchableWithoutFeedback}
				onBlur={handleBlur('accepted')}
				onPress={() => setFieldValue('accepted', !values.accepted)}
			/>
			<Text style={styles.error}>{touched.accepted && errors.accepted}</Text>
			<Button
				title='Sign up'
				containerStyle={formStyles.button}
				onPress={handleSubmit}
				loading={loading}
			/>
		</View>
	);
};

export default memo(SignupForm);
