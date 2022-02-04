import { Alert, Platform, ToastAndroid } from 'react-native';
import { Weather } from '@models';

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

export const getImageUri = (weather: Weather) => {
	const path = '../../assets/images';

	switch (weather) {
		case 'Thunderstorm':
			return require(`${path}/thunderstorm.jpg`);
		case 'Drizzle':
			return require(`${path}/drizzle.jpg`);
		case 'Rain':
			return require(`${path}/rain.jpg`);
		case 'Snow':
			return require(`${path}/snow.jpg`);
		case 'Mist':
		case 'Smoke':
		case 'Haze':
		case 'Fog':
			return require(`${path}/mist.jpg`);
		case 'Dust':
			return require(`${path}/dust.jpg`);
		case 'Sand':
			return require(`${path}/sand.jpg`);
		case 'Ash':
		case 'Squall':
		case 'Tornado':
			return require(`${path}/tornado.jpg`);
		case 'Clouds':
			return require(`${path}/clouds.jpg`);
		default:
			return require(`${path}/clear.jpg`);
	}
};

export const showToast = (message: string) => {
	if (Platform.OS === 'android') {
		ToastAndroid.show(message, ToastAndroid.SHORT);
	} else if (Platform.OS === 'ios') {
		Alert.alert(message);
	}
};
