import React, { FC } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Card, Image } from 'react-native-elements';
import { utcToZonedTime, format } from 'date-fns-tz';
import { CurrentWeather } from '@models';
import { Text } from '@components/theme';
import { styles } from './styles';

interface Props {
	weather: CurrentWeather;
	style?: StyleProp<ViewStyle>;
	timezone: string;
}

const HourlyWeatherCard: FC<Props> = ({ weather, style, timezone }) => {
	const time = utcToZonedTime(weather.dt * 1000, timezone);

	return (
		<Card containerStyle={[styles.card, style]}>
			<Text style={styles.time}>{format(time, 'h:mm aaa')}</Text>
			<View style={styles.imageContainer}>
				<Image
					source={{
						uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
					}}
					style={styles.image}
					resizeMode="contain"
				/>
			</View>
			<Text h3 h3Style={styles.temp}>
				{`${weather.temp.toFixed(1)}\u00b0`}
			</Text>
		</Card>
	);
};

export { HourlyWeatherCard };
