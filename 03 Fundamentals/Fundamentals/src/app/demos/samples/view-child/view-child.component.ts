import {
  Component,
  ViewChildren,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { AlertComponent } from "./alert/alert.component";

@Component({
  selector: "app-view-child",
  templateUrl: "./view-child.component.html",
  styleUrls: ["./view-child.component.css"]
})
export class ViewChildComponent implements AfterViewInit {
  @ViewChild("title", { static: true }) title: ElementRef;
  @ViewChildren(AlertComponent) alerts: AlertComponent[];

  constructor() {}

  ngAfterViewInit() {
    console.log("title:", this.title.nativeElement);
    this.alerts.forEach(item => console.log("Found View Child: ", item));
  }

  setTitle() {
    let el: HTMLElement = this.title.nativeElement;
    el.innerHTML = "<b>Roses are red</b>";
  }
}
