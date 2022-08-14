import React, { FC, memo } from 'react';

import { Card, Text } from '@rneui/themed';
import { format, utcToZonedTime } from 'date-fns-tz';
import FastImage from 'react-native-fast-image';

import { CurrentWeather } from '@app/models';

import { useStyles } from './styles';

interface Props {
	weather: CurrentWeather;
	timezone: string;
}

const HourlyWeatherCard: FC<Props> = ({ weather, timezone }) => {
	const styles = useStyles();
	const time = utcToZonedTime(weather.dt * 1000, timezone);

	return (
		<Card containerStyle={styles.card}>
			<Text style={styles.time}>{format(time, 'h:mm aaa')}</Text>
			<FastImage
				source={{
					uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
				}}
				style={styles.image}
				resizeMode={FastImage.resizeMode.contain}
			/>
			<Text h3 h3Style={styles.temperature}>
				{`${weather.temp.toFixed(1)}\u00b0`}
			</Text>
		</Card>
	);
};

export default memo(
	HourlyWeatherCard,
	(prevProps, nextProps) =>
		prevProps.weather === nextProps.weather && prevProps.timezone === nextProps.timezone
);
