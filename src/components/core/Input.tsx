import React, { FC, forwardRef, Ref, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';

import { Icon, InputProps, Input as NativeInput, useTheme } from '@rneui/themed';

type Props = InputProps;

const EmailInput = (props: Props, ref: Ref<TextInput>) => {
	const {
		theme: { colors }
	} = useTheme();

	return (
		<NativeInput
			label='E-mail'
			placeholder='Email'
			rightIcon={{
				type: 'feather',
				name: 'mail',
				color: colors.primary
			}}
			ref={ref}
			returnKeyType='next'
			autoComplete='email'
			autoCapitalize='none'
			keyboardType='email-address'
			{...props}
		/>
	);
};

const UsernameInput: FC<Props> = props => {
	const {
		theme: { colors }
	} = useTheme();

	return (
		<NativeInput
			label='Name'
			placeholder='Username'
			autoComplete='off'
			returnKeyType='next'
			rightIcon={{
				type: 'antdesign',
				name: 'user',
				color: colors.primary
			}}
			{...props}
		/>
	);
};

const PasswordInput = (props: Props, ref: Ref<TextInput>) => {
	const {
		theme: { colors }
	} = useTheme();
	const [hidePassword, setHidePassword] = useState(true);

	const togglePasswordVisibility = () => {
		setHidePassword(!hidePassword);
	};

	return (
		<NativeInput
			label='Password'
			placeholder='Password'
			secureTextEntry={hidePassword}
			autoCapitalize='none'
			autoComplete='password'
			ref={ref}
			rightIcon={
				<TouchableOpacity onPress={togglePasswordVisibility}>
					<Icon
						type='simple-line-icon'
						name={hidePassword ? 'lock-open' : 'lock'}
						color={colors.primary}
					/>
				</TouchableOpacity>
			}
			{...props}
		/>
	);
};

export const Input = {
	Email: forwardRef<TextInput, Props>(EmailInput),
	Username: UsernameInput,
	Password: forwardRef<TextInput, Props>(PasswordInput)
};
