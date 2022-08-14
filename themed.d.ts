import '@rneui/themed';

declare module '@rneui/themed' {
	export interface Colors {
		popup: string;
	}

	export interface Theme {
		gradient: string[];
	}
}
