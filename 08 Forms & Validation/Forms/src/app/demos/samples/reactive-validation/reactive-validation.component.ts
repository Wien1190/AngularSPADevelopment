import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { emptyPerson, wealthOpts } from "../empty-person";
import { Person } from "../person";
import { PersonService } from "../person.service";

@Component({
  selector: "app-reactive-validation",
  templateUrl: "./reactive-validation.component.html",
  styleUrls: ["./reactive-validation.component.scss"]
})
export class ReactiveValidationComponent implements OnInit {
  person: Person = emptyPerson;
  wealthOpts = wealthOpts;

  personForm: FormGroup;

  constructor(private fb: FormBuilder, private ps: PersonService) {}

  ngOnInit() {
    this.loadData();
    this.initForm();
    this.subscribeChanges();
  }

  private loadData() {
    this.ps.getPerson().subscribe(p => {
      this.personForm.setValue(p);
    });
  }

  private initForm() {
    this.personForm = this.fb.group({
      name: [
        this.person.name,
        [Validators.required, Validators.minLength(4), this.validateName]
      ],
      age: [this.person.age, [Validators.min(18), Validators.max(99)]],
      gender: [this.person.gender],
      email: [
        this.person.email,
        [Validators.required, Validators.email],
        [this.validateMailNotRegistered]
      ],
      wealth: [this.person.wealth]
    });
  }

  private subscribeChanges() {
    this.personForm.valueChanges.subscribe(vals => {
      console.log("changes happening @form: ", vals);
    });
  }

  savePerson(personForm): void {
    this.ps.save(personForm);
  }

  //Sample for custom Validator
  validateName(control: FormControl): { [s: string]: boolean } {
    if (control.value === "Hugo") {
      return { nameError: true };
    }
    return null;
  }

  violatesMinLenght() {
    let result = false;
    let errs: ValidationErrors = this.personForm.controls.name.errors;

    if (errs != null) {
      console.log("Errors in Name field: ", errs);
      if (errs["minlength"]) {
        result = true;
      }
    }
    return result;
  }

  //Sample for async Validator
  validateMailNotRegistered(
    control: FormControl
  ): Promise<any> | Observable<any> {
    //Mocking Http Call to service to check weather user exists

    // return new Observable(observer => {
    //   if (control.value === "alexander.pajer@integrations.at") {
    //     observer.next({ mailexists: true });
    //   } else {
    //     observer.next(null);
    //   }
    // });

    const result = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "alexander.pajer@integrations.at") {
          resolve({ mailexists: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return result;
  }

  validateForm(form) {
    form.updateValueAndValidity();
    form.controls["name"].updateValueAndValidity();
  }
}
