import React, { FC, useContext, useState } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@components/theme';
import { LocationPopup } from '../LocationPopup/LocationPopup';
import { SearchPopup } from '../SearchPopup/SearchPopup';
import { signOut } from '@hooks/auth';
import { useTheme } from '@hooks/theme';
import { useBookmarkMutations } from '@hooks/mutations';
import { CityContext } from '@context';
import { useStyles } from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
	onCurrentLocationSelected?: () => void;
}

const Header: FC<Props> = ({ onCurrentLocationSelected }) => {
	const { state: current } = useContext(CityContext);
	const [open, setOpen] = useState(false);
	const styles = useStyles(useTheme(), useSafeAreaInsets(), open);
	const { colors } = useTheme();
	const [addCity] = useBookmarkMutations();

	const animatedValue = useSharedValue(0);
	const slideValue = useSharedValue(SCREEN_WIDTH);
	const animatedIconStyle = useAnimatedStyle(() => {
		const rotate = interpolate(
			animatedValue.value,
			[0, 1],
			[0, -180],
			Extrapolate.CLAMP
		);

		return { transform: [{ rotate: `${rotate}deg` }] };
	});
	const animatedDropdownStyle = useAnimatedStyle(() => {
		const height = interpolate(
			animatedValue.value,
			[0, 1],
			[0, 38 * 3 + 16],
			Extrapolate.CLAMP
		);

		return { height };
	});
	const searchPopupStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: slideValue.value }]
		};
	});

	const toggleDropDown = () => {
		if (open) {
			setOpen(false);
			animatedValue.value = withSpring(0);
		} else {
			setOpen(true);
			animatedValue.value = withSpring(1);
		}
	};

	const signoutUser = async () => {
		try {
			await signOut();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar
				backgroundColor={open ? colors.popup : colors.gradient[0]}
				translucent
				barStyle="dark-content"
			/>
			<View style={styles.innerContainer}>
				<View style={[styles.appBar]}>
					<Icon
						type="ionicon"
						name="location-sharp"
						color="black"
						onPress={onCurrentLocationSelected}
						tvParallaxProperties={undefined}
					/>
					<Text h3 h3Style={styles.header}>
						{current?.name}
					</Text>
					<Animated.View style={animatedIconStyle}>
						<Icon
							type="ionicon"
							name="chevron-down"
							color="black"
							onPress={toggleDropDown}
							tvParallaxProperties={undefined}
						/>
					</Animated.View>
				</View>
				<Icon
					type="materialicons"
					name="logout"
					color="black"
					onPress={signoutUser}
					tvParallaxProperties={undefined}
				/>
			</View>
			<Animated.View style={[styles.dropdown, animatedDropdownStyle]}>
				<LocationPopup
					onSearch={() => {
						slideValue.value = withSpring(0);
					}}
				/>
			</Animated.View>
			<Animated.View
				style={[styles.searchPopupContainer, searchPopupStyle]}>
				<SearchPopup
					onClose={() => {
						slideValue.value = withSpring(SCREEN_WIDTH);
					}}
					onSelect={city => {
						slideValue.value = withSpring(SCREEN_WIDTH);
						addCity(city);
					}}
				/>
			</Animated.View>
		</View>
	);
};

export { Header };
