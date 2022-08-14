import React, { FC, memo, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { Button, Text } from '@rneui/themed';
import { useFormik } from 'formik';

import { Input } from '@app/components/core';
import { forgotPassword, loginWithEmail } from '@app/hooks';
import { loginValidationSchema } from '@app/models';
import { useFormStyles } from '@app/styles';
import { showToast } from '@app/utils';

import { useStyles } from './styles';

interface FormValue {
	email: string;
	password: string;
}

const initialValues: FormValue = { email: '', password: '' };

const LoginForm: FC = () => {
	const styles = useStyles();
	const formStyles = useFormStyles();
	const passwordInput = useRef<TextInput>(null);

	const [loading, setLoading] = useState(false);

	const onSubmit = async ({ email, password }: FormValue) => {
		setLoading(true);

		try {
			await loginWithEmail({ email, password });
		} catch (err: any) {
			setLoading(false);
			showToast(err.message);
		}
	};

	const onForgotPassword = async () => {
		try {
			if (!errors.email) {
				await forgotPassword(values.email);
				showToast('Password reset email has been sent');
			} else {
				showToast(errors.email);
			}
		} catch (err: any) {
			showToast(err.message);
		}
	};

	const onEmailNext = () => passwordInput.current?.focus();

	const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
		useFormik<FormValue>({ validationSchema: loginValidationSchema, initialValues, onSubmit });

	return (
		<View>
			<Input.Email
				onChangeText={handleChange('email')}
				onBlur={handleBlur('email')}
				value={values.email}
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
			<TouchableOpacity activeOpacity={0.7} onPress={onForgotPassword}>
				<Text style={styles.resetPassword}>Forgot password?</Text>
			</TouchableOpacity>
			<Button
				title='Log in'
				containerStyle={formStyles.button}
				onPress={handleSubmit}
				loading={loading}
			/>
		</View>
	);
};

export default memo(LoginForm);
