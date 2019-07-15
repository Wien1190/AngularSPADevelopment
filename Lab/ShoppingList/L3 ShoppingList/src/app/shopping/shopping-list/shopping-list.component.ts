import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../shared/shopping.service';
import { ShoppingItem } from '../ShoppingItem';
import { Store, select } from '@ngrx/store';
import * as appActions from '../state/action.creator';
import * as fromApp from '../state/shopping.reducer';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: [ './shopping-list.component.scss' ]
})
export class ShoppingListComponent implements OnInit {
	constructor(private store: Store<fromApp.ShoppingState>) {}

	items: ShoppingItem[];
	current: ShoppingItem;

	ngOnInit() {
		this.loadData();
	}

	private loadData() {
		this.store.dispatch(new appActions.Load());

		this.store.select(fromApp.getItems).subscribe((data) => {
			this.items = data;
		});
	}

	deleteItem(i) {
		// this.shops.deleteItem(i).subscribe();
	}

	newItem() {
		this.current = { id: 0, name: '', price: 0 };
	}

	addItem() {
		// this.shops.addItem(this.current).subscribe();
	}

	editItem(i: ShoppingItem) {
		this.current = { ...i };
	}
}
