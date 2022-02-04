import React, { FC, useState } from 'react';
import { Icon, Input as NativeInput, InputProps } from 'react-native-elements';
import { useTheme } from '@hooks/theme';
import { Colors } from '@styles';
import { styles } from './styles';

type Props = InputProps;

const EmailInput: FC<Props> = props => {
	const { colors } = useTheme();

	return (
		<NativeInput
			rightIcon={{
				type: 'feather',
				name: 'mail',
				color: colors.primary
			}}
			autoCompleteType="email"
			autoCapitalize="none"
			keyboardType="email-address"
			{...BaseInputProps}
			{...props}
		/>
	);
};

const UsernameInput: FC<Props> = props => {
	return (
		<NativeInput
			autoCompleteType="off"
			rightIcon={{
				type: 'antdesign',
				name: 'user'
			}}
			{...BaseInputProps}
			{...props}
		/>
	);
};

const PasswordInput: FC<Props> = props => {
	const { colors } = useTheme();
	const [hidePassword, setHidePassword] = useState(true);

	const togglePasswordVisibility = () => {
		setHidePassword(!hidePassword);
	};

	return (
		<NativeInput
			secureTextEntry={hidePassword}
			autoCapitalize="none"
			autoCompleteType="password"
			rightIcon={
				<Icon
					type="simple-line-icon"
					name={hidePassword ? 'lock-open' : 'lock'}
					color={colors.primary}
					onPress={togglePasswordVisibility}
				/>
			}
			{...BaseInputProps}
			{...props}
		/>
	);
};

const BaseInputProps: InputProps = {
	selectionColor: Colors.sweetPink,
	labelStyle: styles.label,
	inputContainerStyle: styles.inputContainer,
	inputStyle: styles.input,
	autoCorrect: false,
	errorStyle: styles.error
};

export const Input = {
	Email: EmailInput,
	Username: UsernameInput,
	Password: PasswordInput
};
