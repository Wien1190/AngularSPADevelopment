import { AmountChangeAction } from "./actions/amount";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromRoot from "./reducers";

import { Currency } from "./model/currency.model";
import { CurrenciesUpdateAction } from "./actions/currency";
import { Observable } from "rxjs";

@Component({
  selector: "app-simplecal",
  templateUrl: "./simple.calc.component.html",
  styleUrls: ["./simple.calc.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleCalcComponent {
  public amount$: Observable<number>;
  public currencyRates$: Observable<Currency[]>;

  constructor(public store: Store<fromRoot.State>) {
    this.amount$ = store.select(fromRoot.getAmountState);
    this.currencyRates$ = store.select(fromRoot.getCurrnecyRates);
  }

  // Dispatch the Action
  ngOnInit() {
    this.store.dispatch(new CurrenciesUpdateAction());
  }

  onAmountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) this.store.dispatch(new AmountChangeAction(number));
  }
}
