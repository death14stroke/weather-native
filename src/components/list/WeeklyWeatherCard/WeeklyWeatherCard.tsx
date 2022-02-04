import React, { FC } from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-elements';
import { utcToZonedTime, format } from 'date-fns-tz';
import { DailyWeather } from '@models';
import { Text } from '@components/theme';
import { styles } from './styles';

interface Props {
	weather: DailyWeather;
	timezone: string;
}

const WeeklyWeatherCard: FC<Props> = ({ weather, timezone }) => {
	const time = utcToZonedTime(weather.dt * 1000, timezone);

	return (
		<View style={{ flexDirection: 'row' }}>
			<View style={styles.imageContainer}>
				<Image
					source={{
						uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
					}}
					style={styles.image}
				/>
			</View>
			<View style={styles.dataContainer}>
				<Text h3 h3Style={styles.temp}>
					{`${weather.temp.morn.toFixed(0)}\u00b0`}
				</Text>
				<View style={styles.dateContainer}>
					<Text style={styles.day}>{format(time, 'EEEE')}</Text>
					<Text>{format(time, 'd MMMM')}</Text>
				</View>
			</View>
		</View>
	);
};

export { WeeklyWeatherCard };
