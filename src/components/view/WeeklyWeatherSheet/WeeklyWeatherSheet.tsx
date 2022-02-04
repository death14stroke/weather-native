import React, { FC } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { WeeklyWeatherCard } from '@components/list';
import { DailyWeather } from '@models';
import { useStyles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
	onCollapsePress: () => void;
	daily: DailyWeather[];
	timezone: string;
}

const WeeklyWeatherSheet: FC<Props> = ({
	onCollapsePress,
	daily,
	timezone
}) => {
	const styles = useStyles(useSafeAreaInsets());

	const renderDailyCard = (weather: DailyWeather) => {
		return (
			<WeeklyWeatherCard
				key={weather.dt}
				weather={weather}
				timezone={timezone}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<View>{daily.map(weather => renderDailyCard(weather))}</View>
			<Icon
				type="font-awesome"
				name="angle-double-up"
				color="white"
				style={styles.collapseBtn}
				onPress={onCollapsePress}
				tvParallaxProperties={undefined}
			/>
		</View>
	);
};

export { WeeklyWeatherSheet };
