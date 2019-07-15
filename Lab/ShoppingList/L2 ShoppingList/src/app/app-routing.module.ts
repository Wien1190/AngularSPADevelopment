import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
	{
		path: '',
		component: ShoppingListComponent
	},
	{
		path: 'about',
		component: AboutComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
