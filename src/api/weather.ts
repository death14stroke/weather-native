import { Response } from '@app/models';

import client from './client';

type Coordinates = { lat: number; lon: number };

export const apiWeather = async ({ lat, lon }: Coordinates, signal?: AbortSignal) => {
	const { data } = await client.get<Response>('/weather', {
		params: { latitude: lat, longitude: lon },
		signal
	});
	return data;
};
