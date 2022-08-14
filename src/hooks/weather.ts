import { useQuery } from '@tanstack/react-query';

import { apiWeather } from '@app/api';
import { City } from '@app/models';

export const useWeatherQuery = (currentCity?: City) =>
	useQuery(['weather', currentCity], ({ signal }) => {
		if (currentCity === undefined) {
			return undefined;
		}
		return apiWeather(currentCity.coords, signal);
	});
