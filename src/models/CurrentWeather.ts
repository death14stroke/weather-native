export interface CurrentWeather {
	dt: number;
	temp: number;
	humidity: number;
	uvi: number;
	wind_speed: number;
	rain: { '1h': number };
	snow: { '1h': number };
	weather: {
		id: number;
		main: Weather;
		description: string;
		icon: string;
	}[];
}

export type Weather =
	| 'Thunderstorm'
	| 'Drizzle'
	| 'Rain'
	| 'Snow'
	| 'Mist'
	| 'Smoke'
	| 'Haze'
	| 'Dust'
	| 'Fog'
	| 'Sand'
	| 'Dust'
	| 'Ash'
	| 'Squall'
	| 'Tornado'
	| 'Clear'
	| 'Clouds';
