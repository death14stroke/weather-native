import axios from 'axios';
import Config from 'react-native-config';

import { useCurrentUser } from '@app/hooks';

const instance = axios.create({
	baseURL: Config.API_URL
});

instance.interceptors.request.use(
	async config => {
		const token = await useCurrentUser()?.getIdToken();
		if (token) {
			config.headers!!.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	err => Promise.reject(err)
);

export default instance;
