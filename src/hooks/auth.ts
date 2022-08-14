import auth from '@react-native-firebase/auth';

type LoginParams = { email: string; password: string };
type SignupParams = LoginParams & { username: string };

export const signupWithEmail = async ({ email, password, username }: SignupParams) => {
	try {
		const { user } = await auth().createUserWithEmailAndPassword(email, password);
		if (user) {
			await user.updateProfile({ displayName: username });
			return Promise.resolve();
		}
	} catch (err: any) {
		switch (err.code) {
			case 'auth/email-already-in-use':
				return Promise.reject({
					message: 'This email is already in use'
				});
			default:
				return Promise.reject({
					message: 'Something went wrong. Please try again later'
				});
		}
	}
};

export const loginWithEmail = async ({ email, password }: LoginParams) => {
	try {
		await auth().signInWithEmailAndPassword(email, password);
		return Promise.resolve();
	} catch (err: any) {
		switch (err.code) {
			case 'auth/user-not-found':
				return Promise.reject({
					message: 'Cannot find an account with this email'
				});
			case 'auth/invalid-email':
			case 'auth/wrong-password':
				return Promise.reject({
					message: 'Invalid email or password'
				});
			default:
				return Promise.reject({
					message: 'Something went wrong. Please try again later'
				});
		}
	}
};

export const signOut = async () => {
	try {
		await auth().signOut();
		return Promise.resolve();
	} catch (err) {
		return Promise.reject({ message: 'Could not sign out' });
	}
};

export const forgotPassword = async (email: string) => {
	try {
		await auth().sendPasswordResetEmail(email);
		return Promise.resolve();
	} catch (err) {
		return Promise.reject({ message: 'Could not send email' });
	}
};

export const useCurrentUser = () => auth().currentUser;
