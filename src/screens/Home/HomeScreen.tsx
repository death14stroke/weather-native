/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	FC,
	useContext,
	useEffect,
	useLayoutEffect,
	useState
} from 'react';
import { View, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { BottomSheet, Icon, Image } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { utcToZonedTime, format } from 'date-fns-tz';
import { Header } from '@components/header';
import { Text } from '@components/theme';
import { HourlyWeatherCard } from '@components/list';
import { StatsView, WeeklyWeatherSheet } from '@components/view';
import { uvIndexLabel, getImageUri, showToast } from '@hooks/ui';
import { useTheme } from '@hooks/theme';
import { CurrentWeather } from '@models';
import { ThemeContext, CityContext } from '@context';
import { UserStackParamList } from '@navigation';
import { styles } from './styles';
import { useQuery } from 'react-query';
import { apiWeather } from '@api';

interface Props {
	navigation: StackNavigationProp<UserStackParamList>;
}

const HomeScreen: FC<Props> = ({ navigation }) => {
	const {
		state: currentCity,
		actions: { updateCurrent }
	} = useContext(CityContext);
	const {
		actions: { updateTheme }
	} = useContext(ThemeContext);
	const { colors } = useTheme();
	const [showNextWeek, setShowNextWeek] = useState(false);

	const { data } = useQuery(
		['weather', currentCity],
		({ signal }) => {
			if (currentCity === undefined) {
				return undefined;
			}
			return apiWeather(currentCity.coords, signal);
		},
		{
			staleTime: 10 * 60 * 1000,
			onError: err => {
				console.error('apiWeather: ', err);
			}
		}
	);

	const fetchLocation = async () => {
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
				showToast(
					'Could not fetch location. Please turn on Location Services'
				);
				return;
			}

			const { coords } = location;
			let address = (await Location.reverseGeocodeAsync(coords))[0];
			updateCurrent({
				_id: '0',
				name:
					address.city ||
					address.region ||
					address.country ||
					'Unknown',
				coords: { lat: coords.latitude, lon: coords.longitude }
			});
		} catch (err) {
			console.log(err);
		}
	};

	const renderHourlyWeather: ListRenderItem<CurrentWeather> = ({ item }) => (
		<HourlyWeatherCard
			weather={item}
			timezone={timezone}
			style={styles.hourlyWeather}
		/>
	);

	const showBottomSheet = () => {
		setShowNextWeek(true);
	};

	const hideBottomSheet = () => {
		setShowNextWeek(false);
	};

	useEffect(() => {
		fetchLocation();
	}, []);

	useEffect(() => {
		if (data) {
			updateTheme(data.current.weather[0].main);
		}
	}, [data?.current]);

	useLayoutEffect(() => {
		navigation.setOptions({
			header: () => <Header onCurrentLocationSelected={fetchLocation} />
		});
	}, [navigation]);

	if (data === undefined) {
		return null;
	}

	const { current, hourly, daily, timezone } = data;
	const currentTime = utcToZonedTime(current.dt * 1000, timezone);

	return (
		<LinearGradient colors={colors.gradient} style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						source={getImageUri(current.weather[0].main)}
						style={styles.image}
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
					{format(currentTime, 'EEEE')}
				</Text>
				<Text style={styles.time}>
					{format(currentTime, 'd MMM - h:mm aaa')}
				</Text>
				<View style={styles.statsRow}>
					<StatsView
						title="Humidity"
						value={`${current.humidity}%`}
						icon={{ type: 'simple-line-icon', name: 'drop' }}
					/>
					<StatsView
						title="Wind"
						value={`${(current.wind_speed * 3.6).toFixed(2)} Km/h`}
						icon={{ type: 'fontisto', name: 'wind' }}
					/>
					<StatsView
						title="UV Index"
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
					style={{ flexGrow: 0 }}
					contentContainerStyle={{ paddingVertical: 8 }}
				/>
				<TouchableOpacity onPress={showBottomSheet}>
					<Text style={styles.bottomSheetLabel}>
						Next week weather
					</Text>
					<Icon
						type="simple-line-icon"
						name="arrow-down"
						color="white"
						size={16}
						tvParallaxProperties={undefined}
					/>
				</TouchableOpacity>
				<BottomSheet isVisible={showNextWeek} modalProps={{}}>
					<LinearGradient
						colors={colors.gradient}
						style={{ flex: 1 }}>
						<WeeklyWeatherSheet
							onCollapsePress={hideBottomSheet}
							daily={daily}
							timezone={timezone}
						/>
					</LinearGradient>
				</BottomSheet>
			</SafeAreaView>
		</LinearGradient>
	);
};

export { HomeScreen };
