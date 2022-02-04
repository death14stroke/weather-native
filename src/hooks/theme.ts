import { useTheme as useNavigationTheme } from '@react-navigation/native';
import { CustomTheme, Weather } from '@models';
import {
	ClearTheme,
	CloudsTheme,
	RainTheme,
	SnowTheme,
	ThunderTheme,
	DrizzleTheme,
	MistTheme,
	DustTheme,
	SandTheme,
	TornadoTheme
} from '@styles';

export const useTheme = () => useNavigationTheme() as CustomTheme;

export const getThemeForWeather = (weather: Weather): CustomTheme => {
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
