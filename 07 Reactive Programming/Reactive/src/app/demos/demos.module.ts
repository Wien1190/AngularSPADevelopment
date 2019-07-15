import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MarkdownModule } from "ngx-markdown";
import { MaterialModule } from "../material.module";
import { DemoContainerComponent } from "./demo-container/demo-container.component";
import { DemoService } from "./demo.service";
import { ObservableStreamComponent } from "./samples/observable-stream/observable-stream.component";
import { CreatingObservableComponent } from "./samples/creating-observables/creating-observable.component";
import { ObservableCrudComponent } from "./samples/observable-crud/observable-crud.component";
import { MouseDomObservablesComponent } from "./samples/mouse-dom-observables/mouse-dom-observables.component";
import { OperatorsComponent } from "./samples/operators/operators.component";
import { FlexLayoutApiComponent } from "./samples/flex-layout-api/flex-layout-api.component";
import { UnsubscribingComponent } from "./samples/unsubscribing/unsubscribing.component";
import { SubsinkComponent } from "./samples/subsink/subsink.component";
import { UsingStreamsComponent } from "./samples/using-streams/using-streams.component";
import { MovieRendererComponent } from "./samples/movie-renderer/movie-renderer.component";
import { DebouncedSearchComponent } from "./samples/operators/debounced-search/debounced-search.component";
import { VouchersService } from "./samples/voucher.service";
import { MovieService } from "./samples/movie.service";
import { SubjectsComponent } from "./samples/subjects/subjects.component";

const demoRoutes: Routes = [
  {
    path: "",
    component: DemoContainerComponent,

    children: [
      { path: "subjects", component: SubjectsComponent },
      { path: "creating", component: CreatingObservableComponent },
      { path: "observablescurd", component: ObservableCrudComponent },
      { path: "mousedomobs", component: MouseDomObservablesComponent },
      { path: "operators", component: OperatorsComponent },
      { path: "flexlayoutapi", component: FlexLayoutApiComponent },
      { path: "unsubscribe", component: UnsubscribingComponent },
      { path: "subsink", component: SubsinkComponent },
      { path: "streams", component: UsingStreamsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DemoContainerComponent,
    CreatingObservableComponent,
    ObservableCrudComponent,
    ObservableStreamComponent,
    MouseDomObservablesComponent,
    MovieRendererComponent,
    OperatorsComponent,
    FlexLayoutApiComponent,
    UnsubscribingComponent,
    DebouncedSearchComponent,
    SubsinkComponent,
    UsingStreamsComponent,
    SubjectsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(demoRoutes),
    MaterialModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient
    })
  ],
  providers: [DemoService, VouchersService, MovieService]
})
export class DemosModule {}
