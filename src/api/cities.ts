import AsyncStorage from '@react-native-async-storage/async-storage';

import { City } from '@app/models';

import client from './client';

export const apiSearchCities = async (query: string, signal?: AbortSignal) => {
	const { data } = await client.get<City[]>('/search', {
		params: { query: query.toLowerCase() },
		signal
	});
	return data;
};

export const apiAddBookmark = async (bookmark: City) => client.post('/bookmark', { bookmark });

export const apiRemoveBookmark = async (bookmark: City) =>
	client.delete(`/bookmark/${bookmark._id}`);

export const apiGetBookmarks = async () => {
	const { data } = await client.get<City[]>('/bookmarks');
	return data;
};

export const apiGetCurrentCity = async (): Promise<City | undefined> => {
	const cityStr = await AsyncStorage.getItem('city');
	if (cityStr) {
		JSON.parse(cityStr);
	}
	return undefined;
};

export const apiUpdateCurrentCity = async (city: City) => {
	await AsyncStorage.setItem('city', JSON.stringify(city));
};
