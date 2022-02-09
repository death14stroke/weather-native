import { City } from '@models';
import client from './client';

export const apiSearchCities = async (
	query: string,
	signal: AbortSignal | undefined
) => {
	const { data } = await client.get<City[]>('/search', {
		params: { query: query.toLowerCase() },
		signal
	});

	return data;
};

export const apiAddBookmark = async (bookmark: City) =>
	client.post('/bookmark', { bookmark });

export const apiGetBookmarks = async () => {
	const { data } = await client.get<City[]>('/bookmarks');
	return data;
};
