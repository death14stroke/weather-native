import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { Text } from '@rneui/themed';
import { format, utcToZonedTime } from 'date-fns-tz';
import FastImage from 'react-native-fast-image';

import { DailyWeather } from '@app/models';

import { useStyles } from './styles';

interface Props {
	weather: DailyWeather;
	timezone: string;
}

const WeeklyWeatherCard: FC<Props> = ({ weather, timezone }) => {
	const styles = useStyles();
	const time = utcToZonedTime(weather.dt * 1000, timezone);

	return (
		<View style={styles.root}>
			<FastImage
				source={{
					uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
				}}
				style={styles.image}
			/>
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

export default memo(
	WeeklyWeatherCard,
	(prevProps, nextProps) =>
		prevProps.weather === nextProps.weather && prevProps.timezone === nextProps.timezone
);
