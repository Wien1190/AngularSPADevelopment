import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { shopping, reducer } from './state/shopping.reducer';
import { ShoppingEffects } from './state/shopping.effects';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		StoreModule.forFeature(shopping, reducer),
		EffectsModule.forFeature([ ShoppingEffects ])
	]
})
export class ShoppingModule {}
