import { Action } from '@ngrx/store';
import { ShoppingItem } from '../ShoppingItem';

//Define the individual action types

export enum ActionTypes {
	Load = '[Items] Load',
	LoadSuccess = '[Items] Load Success',
	LoadError = '[Items] Load Error',
	DeleteItem = '[Item] Delete'
}

// Define the action creators

export class Load implements Action {
	readonly type = ActionTypes.Load;
}

export class LoadSuccess implements Action {
	readonly type = ActionTypes.LoadSuccess;
	constructor(public payload: ShoppingItem[]) {}
}

export class LoadErr implements Action {
	readonly type = ActionTypes.LoadError;
	constructor(public payload: string) {}
}

export class DeleteItem implements Action {
	readonly type = ActionTypes.DeleteItem;
	constructor(public payload: number) {}
}

// export class DeleteItemSuccess implements Action {
// 	readonly type = AppActionTypes.DeleteItemSuccess;

// 	constructor(public payload: number) {}
// }

// export class DeleteItemErr implements Action {
// 	readonly type = AppActionTypes.DeleteItemErr;

// 	constructor(public payload: string) {}
// }

// Create Union Type to serve as a second param for Reducer

export type ShoppingActions = Load | LoadSuccess | LoadErr | DeleteItem;
