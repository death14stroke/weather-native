import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomSheet, Icon, Text, useTheme } from '@rneui/themed';
import { format, utcToZonedTime } from 'date-fns-tz';
import * as Location from 'expo-location';
import FastImage from 'react-native-fast-image';

import { Header } from '@app/components/header';
import { withWeatherTheme } from '@app/components/hoc';
import { WeeklyWeatherSheet } from '@app/components/list';
import { HourlyWeatherCard, StatsView } from '@app/components/listitem';
import { FullScreenLoading, ListSeparator } from '@app/components/loader';
import { useCurrentCityMutation, useCurrentCityQuery, useWeatherQuery } from '@app/hooks';
import { CurrentWeather } from '@app/models';
import { RootStackParamList } from '@app/navigation';
import { Colors, Dimens } from '@app/styles';
import { fs, getImageUri, getThemeForWeather, showToast, uvIndexLabel } from '@app/utils';

import { useStyles } from './styles';

interface Props {
	navigation: StackNavigationProp<RootStackParamList>;
}

const HomeScreen: FC<Props> = ({ navigation }) => {
	const styles = useStyles();
	const { replaceTheme } = useTheme();
	const [showNextWeek, setShowNextWeek] = useState(false);

	const { data: currentCity, isLoading: isLoadingCity } = useCurrentCityQuery();
	const { data, isLoading: isLoadingWeather } = useWeatherQuery(currentCity);
	const { mutate: updateCurrentCity } = useCurrentCityMutation();

	const fetchLocation = useCallback(async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			showToast('Permission to access location was denied');
			return;
		}

		try {
			let location;
			let enabled = await Location.hasServicesEnabledAsync();

			if (enabled) {
				location = await Location.getCurrentPositionAsync({
					accuracy: Location.LocationAccuracy.Low
				});
			} else {
				location = await Location.getLastKnownPositionAsync();
			}

			if (location === null) {
				showToast('Could not fetch location. Please turn on Location Services');
				return;
			}

			const { coords } = location;
			let address = (await Location.reverseGeocodeAsync(coords))[0];
			updateCurrentCity({
				_id: '0',
				name: address.city || address.region || address.country || 'Unknown',
				coords: { lat: coords.latitude, lon: coords.longitude }
			});
		} catch (err) {
			console.error('Error in location:', err);
		}
	}, [updateCurrentCity]);

	useEffect(() => {
		if (currentCity === undefined) {
			fetchLocation();
		}
	}, [currentCity, fetchLocation]);

	useEffect(() => {
		if (data) {
			const theme = getThemeForWeather(data.current.weather[0].main);
			replaceTheme(theme);
		}
	}, [data, replaceTheme]);

	const renderHourlyWeather: ListRenderItem<CurrentWeather> = ({ item }) => (
		<HourlyWeatherCard weather={item} timezone={timezone} />
	);

	const showBottomSheet = () => setShowNextWeek(true);
	const hideBottomSheet = () => setShowNextWeek(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			header: () => <Header onCurrentLocationSelected={fetchLocation} />
		});
	}, [navigation, fetchLocation]);

	const getItemLayout = (_: unknown, index: number) => {
		const length = Dimens.CARD_HOURLY_WEATHER;
		const separatorLength = Dimens.ITEM_SEPARATOR;

		return {
			length,
			index,
			offset: index * (length + 2 * separatorLength)
		};
	};

	if (isLoadingCity || isLoadingWeather || data === undefined || currentCity === undefined) {
		return <FullScreenLoading />;
	}

	const { current, hourly, daily, timezone } = data!;
	const currentTime = utcToZonedTime(current.dt * 1000, timezone);

	return (
		<>
			<View style={styles.imageContainer}>
				<FastImage
					source={getImageUri(current.weather[0].main)}
					style={styles.image}
					resizeMode={FastImage.resizeMode.stretch}
				/>
				<View style={styles.tempContainer}>
					<Text h2 h2Style={styles.temperature}>
						{`${current.temp.toFixed(0)}\u00b0`}
					</Text>
				</View>
			</View>
			<Text h3 h3Style={styles.weather}>
				{current.weather[0].main}
			</Text>
			<Text h4 h4Style={styles.day}>
				{format(currentTime, 'EEEE')}{' '}
			</Text>
			<Text style={styles.time}>{format(currentTime, 'd MMM - h:mm aaa')}</Text>
			<View style={styles.statsRow}>
				<StatsView
					title='Humidity'
					value={`${current.humidity}%`}
					icon={{ type: 'simple-line-icon', name: 'drop' }}
				/>
				<StatsView
					title='Wind'
					value={`${(current.wind_speed * 3.6).toFixed(2)} Km/h`}
					icon={{ type: 'fontisto', name: 'wind' }}
				/>
				<StatsView
					title='UV Index'
					value={`${current.uvi} ${uvIndexLabel(current.uvi)}`}
					icon={{ type: 'fontisto', name: 'day-sunny' }}
				/>
			</View>
			<FlatList
				data={hourly}
				keyExtractor={weather => weather.dt.toString()}
				renderItem={renderHourlyWeather}
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.hourlyList}
				ItemSeparatorComponent={ListSeparator}
				contentContainerStyle={styles.hourlyListContainer}
				getItemLayout={getItemLayout}
			/>
			<TouchableOpacity onPress={showBottomSheet}>
				<Text style={styles.bottomSheetLabel}>Next week weather</Text>
				<Icon
					type='simple-line-icon'
					name='arrow-down'
					color={Colors.white}
					size={fs(12)}
				/>
			</TouchableOpacity>
			<BottomSheet isVisible={showNextWeek} modalProps={{}}>
				<WeeklyWeatherSheet
					onCollapsePress={hideBottomSheet}
					daily={daily}
					timezone={timezone}
				/>
			</BottomSheet>
		</>
	);
};

export default withWeatherTheme(HomeScreen);
