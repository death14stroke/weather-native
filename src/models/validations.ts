import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
	email: Yup.string().email('Please enter valid email').required('Email is required'),
	password: Yup.string()
		.min(6, ({ min }) => `Password must be at least ${min} characters`)
		.required('Password is required')
});

export const signupValidationSchema = loginValidationSchema.shape({
	username: Yup.string()
		.max(20, ({ max }) => `Username cannot be more than ${max} characters`)
		.required('Username is required'),
	accepted: Yup.boolean()
		.oneOf([true], 'Please accept the terms and conditions')
		.required('Please accept the terms and conditions')
});
