import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ShoppingActions, ActionTypes as ShoppingActionTypes } from './action.creator';
import * as fromRoot from '../../state/app.state';

//Slice

export const shopping = 'shopping_slice';

// Shopping State

import { ShoppingItem } from '../ShoppingItem';

export interface ShoppingState {
	items: ShoppingItem[];
}

export interface State extends fromRoot.State {
	shopping: ShoppingState;
}

//Initial App State

export const initialShoppingState: ShoppingState = {
	items: [
		{ id: 1, name: 'Eier', price: 20 },
		{ id: 2, name: 'Milch', price: 5 },
		{ id: 3, name: 'Wurst', price: 8 }
	]
};

// //Selectors

const getShoppingState = createFeatureSelector<ShoppingState>(shopping);

export const getItems = createSelector(getShoppingState, (state) => state.items);

// Reducers

export function reducer(state: ShoppingState = initialShoppingState, action: ShoppingActions) {
	switch (action.type) {
		case ShoppingActionTypes.LoadSuccess: {
			return {
				...state,
				items: action.payload
			};
		}
		case ShoppingActionTypes.DeleteItem: {
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload)
			};
		}
	}
}
