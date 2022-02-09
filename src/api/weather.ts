import client from './client';
import { Response } from '@models';

type Coordinates = { lat: number; lon: number };

export const apiWeather = async (
	{ lat, lon }: Coordinates,
	signal: AbortSignal | undefined
) => {
	try {
		const { data } = await client.get<Response>('/weather', {
			params: { latitude: lat, longitude: lon },
			signal
		});
		return data;
	} catch (err) {
		console.log('apiWeather inner: ', err);
	}

	return undefined;
};
