import { Dispatch } from 'react';
import { createDataContext, ReducerAction } from '@hooks/context';
import { getThemeForWeather } from '@hooks/theme';
import { CustomTheme, Weather } from '@models';
import { ClearTheme } from '@styles';

interface Action extends ReducerAction {
	type: 'update_theme';
}

type State = CustomTheme;

const INITIAL_STATE: State = ClearTheme;

const themeReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'update_theme':
			return action.payload;
		default:
			return state;
	}
};

const updateTheme = (dispatch: Dispatch<Action>) => (weather: Weather) => {
	dispatch({ type: 'update_theme', payload: getThemeForWeather(weather) });
};

export const { Context: ThemeContext, Provider: ThemeProvider } =
	createDataContext(themeReducer, { updateTheme }, INITIAL_STATE);
