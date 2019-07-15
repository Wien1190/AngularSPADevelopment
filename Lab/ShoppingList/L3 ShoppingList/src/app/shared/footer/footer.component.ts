import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/shared/shopping.service';
import { ShoppingItem } from 'src/app/shopping/ShoppingItem';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: [ './footer.component.scss' ]
})
export class FooterComponent implements OnInit {
	constructor(private shop: ShoppingService) {}

	ct: number;

	ngOnInit() {
		this.shop.getItems().subscribe((data: ShoppingItem[]) => {
			this.ct = data.length;
		});
	}
}
