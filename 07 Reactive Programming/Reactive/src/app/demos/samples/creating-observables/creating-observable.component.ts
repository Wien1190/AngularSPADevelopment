import { Component, OnInit } from "@angular/core";
import { Subscription, Observable, from, of } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-simple-observable",
  templateUrl: "./creating-observable.component.html",
  styleUrls: ["./creating-observable.component.scss"]
})
export class CreatingObservableComponent implements OnInit {
  constructor() {}

  url = "/assets/vouchers.json";
  numbers = [2, 5, 9, 12, 22];

  result$: Observable<any>;
  nbrSubscription: Subscription;

  errHandler = err => {
    console.log(err);
  };

  complete = () => console.log("complete");

  ngOnInit() {}

  useNewObs() {
    this.result$ = new Observable(observer => {
      let idx = 0;

      let getNumber = () => {
        observer.next(this.numbers[idx++]);

        if (idx < this.numbers.length) {
          setTimeout(getNumber, 250);
        } else {
          observer.complete();
        }
      };

      getNumber();
    });

    this.result$.subscribe((
      data: number //onNext
    ) => console.log("useObsCreate: ", data));
    this.errHandler; //onErr
    this.complete; //onComplete
  }

  useObsFrom() {
    this.result$ = from(this.numbers);

    this.nbrSubscription = this.result$.subscribe(
      (data: number) => console.log("useObsFrom: ", data), //onNext
      this.errHandler, //onErr
      this.complete //onComplete
    );

    //Same as above using chaining
    // this.nbrSubscription = from(this.numbers).subscribe((data: number) =>
    //   console.log("useObsFrom: ", data)
    // );
  }

  useOf() {
    this.result$ = of(this.numbers);
    this.result$.subscribe(data => console.log(data));
  }

  // Wraps an Object that uses Callbacks
  wrapXMLHttpRequest(): Observable<any> {
    return new Observable(observer => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          observer.next(data);
          observer.complete();
        } else {
          observer.error(xhr.statusText);
        }
      });

      xhr.open("GET", this.url);
      xhr.send();
    });
  }

  //Use the wrapped Callback
  wrappingCallbacks() {
    this.wrapXMLHttpRequest().subscribe(data => {
      console.log("wrappingCallbacks:", data);
      this.result$ = data;
    });
  }

  //Create a mock promise
  mockPromise(succeed: boolean): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      setTimeout(() => {
        console.log("Async Task Complete");
        if (succeed) {
          resolve(this.numbers);
        } else {
          reject("Outcome: Promise rejected");
        }
      }, 1000);
    });
  }

  //Use the mock Promise
  usePromiseToObs() {
    from(this.mockPromise(true)).subscribe(data =>
      console.log("usePromiseToObs:", data)
    );
  }

  useOperator() {
    from([2, 5, 9, 12, 22])
      .pipe(
        filter(n => n > 6),
        map(n => n * 2)
      )
      .subscribe((data: number) => console.log("useOperator: ", data));
  }
}
