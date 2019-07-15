import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-mouse-dom-observables",
  templateUrl: "./mouse-dom-observables.component.html",
  styleUrls: ["./mouse-dom-observables.component.scss"]
})
export class MouseDomObservablesComponent implements OnInit, OnDestroy {
  @ViewChild("signPad", { static: false }) signPad: ElementRef;
  @ViewChild("searchBox", { static: false }) searchBox: ElementRef;

  mouseSubs: Subscription;
  result: { X: number; Y: number } = { X: 0, Y: 0 };

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.subscribeSearchBox();
  }

  ngOnDestroy() {
    if (this.mouseSubs) {
      this.mouseSubs.unsubscribe();
    }
  }

  subscribeMouse() {
    let mouse$ = fromEvent(this.signPad.nativeElement, "mousemove").pipe(
      map((evt: MouseEvent) => {
        return { X: evt.clientX, Y: evt.clientY };
      })
    );

    // const rect = this.canvas.getBoundingClientRect();

    this.mouseSubs = mouse$.subscribe(point => {
      this.result = point;
      console.log("Mouse Moved @: ", point);
    });
  }

  unsubscribeMouseEvt() {
    this.mouseSubs.unsubscribe();
    console.log("unsubscribed from Mouse Event");
  }

  subscribeSearchBox() {
    fromEvent(this.searchBox.nativeElement, "keyup").subscribe(
      (ke: KeyboardEvent) => {
        console.log("Event received from Keyboard:", ke);
      }
    );
  }
}
