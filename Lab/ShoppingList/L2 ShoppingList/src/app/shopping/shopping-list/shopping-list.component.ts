import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { ShoppingItem } from '../ShoppingItem';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: [ './shopping-list.component.scss' ]
})
export class ShoppingListComponent implements OnInit {
	constructor(private shops: ShoppingService) {}

	items: ShoppingItem[];
	current: ShoppingItem;

	ngOnInit() {
		this.loadData();
		this.newItem();
	}

	private loadData() {
		this.shops.getItems().subscribe((data) => {
			this.items = data;
		});
	}

	deleteItem(i) {
		this.shops.deleteItem(i).subscribe();
	}

	newItem() {
		this.current = { name: '', price: 0 };
	}

	addItem() {
		this.shops.addItem(this.current).subscribe();
	}

	editItem(i: ShoppingItem) {
		this.current = { ...i };
	}
}
