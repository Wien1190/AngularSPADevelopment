import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import * as currency from "../actions/currency";
import { FixerService } from "../fixer.service";
import { CurrenciesUpdatedAction } from "./../actions/currency";
import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";

@Injectable()
export class CurrencyEffects {
  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(currency.CURRENCIESUPDATE),
    switchMap(() =>
      this.fs.getRates().pipe(map(data => new CurrenciesUpdatedAction(data)))
    )
  );

  constructor(private fs: FixerService, private actions$: Actions) {}
}
