import { CurrentWeather } from './CurrentWeather';

export interface DailyWeather extends Omit<CurrentWeather, 'temp'> {
	temp: {
		day: number;
		eve: number;
		max: number;
		min: number;
		morn: number;
		night: number;
	};
}
