import { Theme } from '@react-navigation/native';

export interface CustomTheme extends Theme {
	colors: Theme['colors'] & {
		gradient: [string, string];
		popup: string;
	};
}
