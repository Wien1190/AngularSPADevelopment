import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
	declarations: [ AppComponent, NavbarComponent, ShoppingListComponent, AboutComponent, FooterComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FormsModule,
		HttpClientModule,
		StoreModule.forRoot({}),
		StoreDevtoolsModule.instrument({
			name: 'Shopping App',
			maxAge: 25,
			logOnly: environment.production
		}),
		ShoppingModule,
		EffectsModule.forRoot([])
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
