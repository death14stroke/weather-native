import { DefaultTheme, Theme } from '@react-navigation/native';
import { CustomTheme } from '@models';
import { Colors } from './colors';

const BaseTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: Colors.sweetPink
	}
};

export const ThunderTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.razzleDazzleRose, Colors.loulou],
		popup: Colors.lavenderRose
	}
};

export const DrizzleTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.atlantis, Colors.japaneseLaurel],
		popup: Colors.primrose
	}
};

export const MistTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.mischka, Colors.gunPowder],
		popup: Colors.athensGray
	}
};

export const RainTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.towerGray, Colors.pickledBluewood],
		popup: Colors.geyser
	}
};

export const SnowTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.heather, Colors.baliHai],
		popup: Colors.mystic
	}
};

export const DustTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.silk, Colors.irishCoffee],
		popup: Colors.wafer
	}
};

export const SandTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.chalky, Colors.kabul],
		popup: Colors.givry
	}
};

export const TornadoTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.ash, Colors.scarpaFlow],
		popup: Colors.westar
	}
};

export const ClearTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.sail, Colors.pictonBlue],
		popup: Colors.hawkesBlue
	}
};

export const CloudsTheme: CustomTheme = {
	...BaseTheme,
	colors: {
		...BaseTheme.colors,
		gradient: [Colors.quillGray, Colors.manatee],
		popup: Colors.mercury
	}
};
