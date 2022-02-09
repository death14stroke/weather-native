import { Dispatch } from 'react';
import { createDataContext, ReducerAction } from '@hooks/context';
import { City } from '@models';

interface Action extends ReducerAction {
	type: 'update_current';
}

type State = City | undefined;

const INITIAL_STATE: State = undefined;

const cityReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'update_current':
			return action.payload;
		default:
			return state;
	}
};

const updateCurrent = (dispatch: Dispatch<Action>) => (current: City) => {
	dispatch({ type: 'update_current', payload: current });
};

export const { Context: CityContext, Provider: CityProvider } =
	createDataContext(cityReducer, { updateCurrent }, INITIAL_STATE);
