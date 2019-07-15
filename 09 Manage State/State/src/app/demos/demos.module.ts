import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MarkdownModule } from "ngx-markdown";
import { MaterialModule } from "../material.module";
import { DemoContainerComponent } from "./demo-container/demo-container.component";
import { DemoService } from "./demo.service";
import { StatefulComponent } from "./samples/stateful/stateful.component";
import { SimpleDataStoreComponent } from "./samples/simple-data-store/simple-data-store.component";
import { EvtBusComponent } from "./samples/evt-bus/evt-bus.component";
import { SimpleCalcComponent } from "./samples/ngrx/simple.calc.component";
import { VouchersService } from "./samples/voucher.service";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./samples/ngrx/reducers";
import { EffectsModule } from "@ngrx/effects";
import { CurrencyEffects } from "./samples/ngrx/effects/currencyEffects";
import { FixerService } from "./samples/ngrx/fixer.service";
import { VouchersListComponent } from "./samples/simple-data-store/voucher-list/vouchers-list.component";
import { KpiBarComponent } from "./samples/simple-data-store/kpi-bar/kpi-bar.component";
import { MarkdownEditorComponent } from "./markdown-editor/markdown-editor.component";

const demoRoutes: Routes = [
  {
    path: "",
    component: DemoContainerComponent,

    children: [
      { path: "stateful", component: StatefulComponent },
      { path: "simpleds", component: SimpleDataStoreComponent },
      { path: "evtbus", component: EvtBusComponent },
      { path: "ngrx", component: SimpleCalcComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DemoContainerComponent,
    StatefulComponent,
    SimpleDataStoreComponent,
    EvtBusComponent,
    SimpleCalcComponent,
    VouchersListComponent,
    KpiBarComponent,
    MarkdownEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(demoRoutes),
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CurrencyEffects]),
    MarkdownModule.forRoot({
      loader: HttpClient
    })
  ],
  providers: [DemoService, VouchersService, FixerService]
})
export class DemosModule {}
