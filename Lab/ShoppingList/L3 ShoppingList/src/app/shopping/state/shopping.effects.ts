import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ShoppingService } from '../../shared/shopping.service';
import * as shoppingActions from './action.creator';
import { ShoppingItem } from '../ShoppingItem';

@Injectable()
export class ShoppingEffects {
	constructor(private actions$: Actions, private shopservice: ShoppingService) {}

	@Effect()
	loadItems$: Observable<Action> = this.actions$.pipe(
		ofType(shoppingActions.ActionTypes.Load),
		mergeMap((action) =>
			this.shopservice
				.getItems()
				.pipe(
					tap((data) => console.log('received data from service in effect', data)),
					map((items: ShoppingItem[]) => new shoppingActions.LoadSuccess(items)),
					catchError((err) => of(new shoppingActions.LoadErr(err)))
				)
		)
	);
}
