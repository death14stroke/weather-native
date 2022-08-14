import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { Icon } from '@rneui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { withWeatherTheme } from '@app/components/hoc';
import { WeeklyWeatherCard } from '@app/components/listitem';
import { DailyWeather } from '@app/models';
import { Colors } from '@app/styles';

import { useStyles } from './styles';

interface Props {
	onCollapsePress: () => void;
	daily: DailyWeather[];
	timezone: string;
}

const WeeklyWeatherSheet: FC<Props> = ({ onCollapsePress, daily, timezone }) => {
	const styles = useStyles(useSafeAreaInsets());

	const renderDailyCard = (weather: DailyWeather) => (
		<WeeklyWeatherCard key={weather.dt} weather={weather} timezone={timezone} />
	);

	return (
		<View style={styles.container}>
			<View>{daily.map(weather => renderDailyCard(weather))}</View>
			<Icon
				type='font-awesome'
				name='angle-double-up'
				color={Colors.white}
				style={styles.collapseBtn}
				onPress={onCollapsePress}
			/>
		</View>
	);
};

const WrappedComponent = memo(
	WeeklyWeatherSheet,
	(prevProps, nextProps) =>
		prevProps.daily === nextProps.daily && prevProps.timezone === nextProps.timezone
);

export default withWeatherTheme(WrappedComponent);
