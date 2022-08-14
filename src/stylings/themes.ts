import { DarkTheme } from '@react-navigation/native';
import { createTheme } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

import { ds, fs } from '@app/utils';

import { Colors } from './colors';
import { Dimens } from './dimens';
import { FontFamily } from './typography';

export const BaseComponentsTheme = createTheme({
	lightColors: {
		...DarkTheme.colors,
		primary: Colors.sweetPink
	},
	components: {
		Input: {
			labelStyle: {
				color: Colors.sweetPink,
				fontFamily: FontFamily.BOLD
			},
			inputContainerStyle: { borderColor: Colors.sweetPink },
			inputStyle: {
				color: Colors.white,
				fontFamily: FontFamily.REGULAR
			},
			errorStyle: { fontFamily: FontFamily.REGULAR }
		},
		CheckBox: {
			checkedColor: Colors.sweetPink
		},
		Text: {
			style: {
				color: Colors.white,
				fontSize: fs(14),
				fontFamily: FontFamily.REGULAR
			}
		},
		Button: {
			raised: true,
			titleStyle: {
				fontFamily: FontFamily.BOLD,
				textAlignVertical: 'center',
				textAlign: 'center'
			},
			containerStyle: {
				borderRadius: Dimens.BORDER_RADIUS,
				borderBottomWidth: 0,
				borderWidth: 0
			},
			buttonStyle: {
				borderRadius: Dimens.BORDER_RADIUS,
				paddingVertical: Dimens.PADDING_CONTENT,
				borderBottomWidth: 0,
				borderWidth: 0
			},
			style: { borderBottomWidth: 0, borderWidth: 0 },
			ViewComponent: LinearGradient,
			activeOpacity: 0.5,
			linearGradientProps: {
				colors: [Colors.fuchsiaPink, Colors.sweetPink],
				start: [0.0, 0.5],
				end: [1.0, 0.5],
				locations: [0.1, 0.8]
			}
		},
		Card: {
			containerStyle: {
				margin: 0,
				borderWidth: 0,
				elevation: 0,
				shadowOffset: { width: ds(4), height: ds(4) },
				shadowOpacity: 0.8,
				shadowRadius: ds(4)
			}
		},
		SearchBar: {
			lightTheme: true,
			inputStyle: { fontFamily: FontFamily.REGULAR },
			inputContainerStyle: { backgroundColor: 'transparent' },
			containerStyle: {
				flex: 1,
				backgroundColor: 'transparent',
				borderBottomWidth: 0,
				borderTopWidth: 0
			},
			searchIcon: {
				type: 'feather',
				name: 'search',
				color: Colors.black
			},
			autoComplete: 'off',
			loadingProps: { color: Colors.fuchsiaPink }
		}
	}
});

export const ThunderTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.lavenderRose
	},
	gradient: [Colors.razzleDazzleRose, Colors.loulou]
});

export const DrizzleTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.primrose
	},
	gradient: [Colors.atlantis, Colors.japaneseLaurel]
});

export const MistTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.athensGray
	},
	gradient: [Colors.mischka, Colors.gunPowder]
});

export const RainTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.geyser
	},
	gradient: [Colors.towerGray, Colors.pickledBluewood]
});

export const SnowTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.mystic
	},
	gradient: [Colors.heather, Colors.baliHai]
});

export const DustTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.wafer
	},
	gradient: [Colors.silk, Colors.irishCoffee]
});

export const SandTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.givry
	},
	gradient: [Colors.chalky, Colors.kabul]
});

export const TornadoTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.westar
	},
	gradient: [Colors.ash, Colors.scarpaFlow]
});

export const ClearTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.hawkesBlue
	},
	gradient: [Colors.sail, Colors.pictonBlue]
});

export const CloudsTheme = createTheme({
	...BaseComponentsTheme,
	lightColors: {
		...BaseComponentsTheme.lightColors,
		popup: Colors.mercury
	},
	gradient: [Colors.quillGray, Colors.manatee]
});
