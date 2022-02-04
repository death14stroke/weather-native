import { CurrentWeather } from './CurrentWeather';
import { DailyWeather } from './DailyWeather';

export interface Response {
	current: CurrentWeather;
	hourly: CurrentWeather[];
	daily: DailyWeather[];
	timezone: string;
}
