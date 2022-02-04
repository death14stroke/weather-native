import React, {
	createContext,
	Dispatch,
	FC,
	useEffect,
	useReducer
} from 'react';
import _ from 'lodash';
import { weatherApi } from '@api';
import { ReducerAction } from '@hooks/context';
import { City } from '@models';

interface Action extends ReducerAction {
	type: 'fetch_preferences' | 'add_city' | 'update_current';
}

type State = {
	current?: City;
	bookmarks: City[];
};
type ContextValue = {
	state: State;
	actions: {
		[key in keyof typeof stateActions]: ReturnType<
			typeof stateActions[key]
		>;
	};
};

const INITIAL_STATE: State = {
	current: undefined,
	bookmarks: []
};

const preferenceReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'fetch_preferences':
			return { ...state, bookmarks: action.payload };
		case 'add_city':
			const bookmarks = [
				..._.filter(
					state.bookmarks,
					city => city._id !== action.payload._id
				),
				action.payload
			];
			return { ...state, bookmarks };
		case 'update_current':
			return { ...state, current: action.payload };
		default:
			return state;
	}
};

const addCity = (dispatch: Dispatch<Action>) => async (city: City) => {
	try {
		await weatherApi.post('/bookmark', { bookmark: city });
		dispatch({ type: 'add_city', payload: city });
	} catch (err) {
		console.log(err);
	}
};

const updateCurrent = (dispatch: Dispatch<Action>) => (current: City) => {
	dispatch({ type: 'update_current', payload: current });
};

const stateActions = {
	addCity,
	updateCurrent
};

const Context = createContext<ContextValue>(undefined!);

const Provider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(preferenceReducer, INITIAL_STATE);

	const fetchPreferences = async () => {
		try {
			const { data } = await weatherApi.get<City[]>('/bookmarks');
			dispatch({
				type: 'fetch_preferences',
				payload: data
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchPreferences();
	}, []);

	return (
		<Context.Provider
			value={{
				state,
				actions: {
					addCity: addCity(dispatch),
					updateCurrent: updateCurrent(dispatch)
				}
			}}>
			{children}
		</Context.Provider>
	);
};

export { Context as PreferenceContext, Provider as PreferenceProvider };
