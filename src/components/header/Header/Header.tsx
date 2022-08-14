import React, { FC, memo, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import { Icon, Text, useTheme } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vs } from 'react-native-size-matters';

import { signOut, useCurrentCityQuery } from '@app/hooks';

import LocationPopup from '../LocationPopup/LocationPopup';
import SearchPopup from '../SearchPopup/SearchPopup';
import { iconStyles, useStyles } from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HEADER_HEIGHT = vs(120);

interface Props {
	onCurrentLocationSelected?: () => void;
}

const Header: FC<Props> = ({ onCurrentLocationSelected }) => {
	const [open, setOpen] = useState(false);
	const {
		theme: { colors, gradient }
	} = useTheme();
	const styles = useStyles({ insets: useSafeAreaInsets(), open });

	const { data: current } = useCurrentCityQuery();

	const animatedValue = useSharedValue(0);
	const slideValue = useSharedValue(SCREEN_WIDTH);

	const animatedIconStyle = useAnimatedStyle(() => {
		const rotate = interpolate(animatedValue.value, [0, 1], [0, -180], Extrapolate.CLAMP);
		return { transform: [{ rotate: `${rotate}deg` }] };
	});

	const animatedDropdownStyle = useAnimatedStyle(() => {
		const height = interpolate(
			animatedValue.value,
			[0, 1],
			[0, HEADER_HEIGHT],
			Extrapolate.CLAMP
		);

		return { height };
	});

	const searchPopupStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: slideValue.value }]
	}));

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
			console.error('Signout error:', err);
		}
	};

	const onSearchClose = () => {
		slideValue.value = withSpring(SCREEN_WIDTH);
	};

	return (
		<View style={styles.container}>
			<StatusBar
				backgroundColor={open ? colors.popup : gradient[0]}
				translucent
				style='dark'
			/>
			<View style={styles.innerContainer}>
				<View style={styles.appBar}>
					<TouchableOpacity onPress={onCurrentLocationSelected}>
						<Icon type='ionicon' name='location-sharp' {...iconStyles} />
					</TouchableOpacity>
					<Text style={styles.header}>{current?.name || 'Unknown'}</Text>
					<Animated.View style={animatedIconStyle}>
						<TouchableOpacity onPress={toggleDropDown}>
							<Icon type='ionicon' name='chevron-down' {...iconStyles} />
						</TouchableOpacity>
					</Animated.View>
				</View>
				<TouchableOpacity onPress={signoutUser}>
					<Icon type='materialicons' name='logout' {...iconStyles} />
				</TouchableOpacity>
			</View>
			<Animated.View style={[styles.dropdown, animatedDropdownStyle]}>
				<LocationPopup
					onSearch={() => {
						slideValue.value = withSpring(0);
					}}
				/>
			</Animated.View>
			<Animated.View style={[styles.searchPopupContainer, searchPopupStyle]}>
				<SearchPopup onClose={onSearchClose} />
			</Animated.View>
		</View>
	);
};

export default memo(Header);
