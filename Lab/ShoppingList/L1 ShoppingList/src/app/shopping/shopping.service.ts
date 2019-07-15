import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ShoppingItem } from './ShoppingItem';

@Injectable({
	providedIn: 'root'
})
export class ShoppingService {
	constructor() {
		this.Items = new BehaviorSubject(this.items);
		this.Items.next(this.items);
	}

	private items: ShoppingItem[] = [
		{ name: 'Eier', price: 20 },
		{ name: 'Milch', price: 5 },
		{ name: 'Wurst', price: 8 }
	];
	private Items: BehaviorSubject<ShoppingItem[]> = new BehaviorSubject([]);

	getItems(): Observable<ShoppingItem[]> {
		return this.Items;
	}

	deleteItem(item: ShoppingItem): Observable<boolean> {
		this.items = this.items.filter((i: ShoppingItem) => i.name != item.name);
		this.Items.next(this.items);
		return of(true);
	}

	addItem(item: ShoppingItem): Observable<boolean> {
		this.items.push(item);
		this.Items.next(this.items);
		return of(true);
	}
}
