import { Dispatch } from 'react';
import { weatherApi } from '@api';
import { createDataContext, ReducerAction } from '@hooks/context';
import { Response } from '@models';

interface Action extends ReducerAction {
	type: 'fetch_weather';
}

type State = Response | undefined;
type WeatherSearchParams = { lat: number; lon: number };

const INITIAL_STATE: State = undefined;

const weatherReducer = (_state: State, action: Action): State => {
	switch (action.type) {
		case 'fetch_weather':
			return action.payload;
	}
};

const fetchWeather =
	(dispatch: Dispatch<Action>) =>
	async ({ lat, lon }: WeatherSearchParams) => {
		try {
			let { data } = await weatherApi.get<Response>('/weather', {
				params: { latitude: lat, longitude: lon }
			});
			dispatch({ type: 'fetch_weather', payload: data });
		} catch (err) {
			console.error(err);
		}
	};

export const { Context: WeatherContext, Provider: WeatherProvider } =
	createDataContext(weatherReducer, { fetchWeather }, INITIAL_STATE);
