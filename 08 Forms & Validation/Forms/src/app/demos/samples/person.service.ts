import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { Person } from "./person";
import { delay } from "rxjs/operators";
import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  constructor() {}

  getPerson(): Observable<Person> {
    return of({
      name: "Heinz",
      gender: "male",
      age: 20,
      email: "derschoeneheinz@xyz.at",
      wealth: "poor"
    }).pipe(delay(1500));
  }

  save(result: NgForm) {
    console.log("ngForm:", result);
    console.log("value:", result.value);
  }
}
