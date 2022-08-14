import { Alert, Platform, ToastAndroid } from 'react-native';

import { CreateThemeOptions } from '@rneui/themed';
import * as NavigationBar from 'expo-navigation-bar';

import { Weather } from '@app/models';
import {
	ClearTheme,
	CloudsTheme,
	DrizzleTheme,
	DustTheme,
	MistTheme,
	RainTheme,
	SandTheme,
	SnowTheme,
	ThunderTheme,
	TornadoTheme
} from '@app/styles';

export const showToast = (message: string) => {
	if (Platform.OS === 'android') {
		ToastAndroid.show(message, ToastAndroid.SHORT);
	} else if (Platform.OS === 'ios') {
		Alert.alert(message);
	}
};

export const getThemeForWeather = (weather: Weather): CreateThemeOptions => {
	switch (weather) {
		case 'Thunderstorm':
			return ThunderTheme;
		case 'Drizzle':
			return DrizzleTheme;
		case 'Rain':
			return RainTheme;
		case 'Snow':
			return SnowTheme;
		case 'Mist':
		case 'Smoke':
		case 'Haze':
		case 'Fog':
			return MistTheme;
		case 'Dust':
			return DustTheme;
		case 'Sand':
			return SandTheme;
		case 'Ash':
		case 'Squall':
		case 'Tornado':
			return TornadoTheme;
		case 'Clouds':
			return CloudsTheme;
		default:
			return ClearTheme;
	}
};

export const getImageUri = (weather: Weather) => {
	switch (weather) {
		case 'Thunderstorm':
			return require('@app/assets/thunderstorm.jpg');
		case 'Drizzle':
			return require('@app/assets/drizzle.jpg');
		case 'Rain':
			return require('@app/assets/rain.jpg');
		case 'Snow':
			return require('@app/assets/snow.jpg');
		case 'Mist':
		case 'Smoke':
		case 'Haze':
		case 'Fog':
			return require('@app/assets/mist.jpg');
		case 'Dust':
			return require('@app/assets/dust.jpg');
		case 'Sand':
			return require('@app/assets/sand.jpg');
		case 'Ash':
		case 'Squall':
		case 'Tornado':
			return require('@app/assets/tornado.jpg');
		case 'Clouds':
			return require('@app/assets/clouds.jpg');
		default:
			return require('@app/assets/clear.jpg');
	}
};

export const uvIndexLabel = (uvi: number): string => {
	switch (true) {
		case uvi >= 0 && uvi <= 2:
			return 'Low';
		case uvi <= 5:
			return 'Mod';
		case uvi <= 7:
			return 'High';
		case uvi <= 10:
			return 'V. High';
		case uvi >= 11:
			return 'Extreme';
		default:
			return 'Invalid UVI';
	}
};

export const setupNavBar = async (color: string) => {
	if (Platform.OS === 'android') {
		await NavigationBar.setBackgroundColorAsync(color);
	}
};
