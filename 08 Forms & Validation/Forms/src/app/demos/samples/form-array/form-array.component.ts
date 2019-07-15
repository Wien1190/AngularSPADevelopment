import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-form-array",
  templateUrl: "./form-array.component.html",
  styleUrls: ["./form-array.component.scss"]
})
export class FormArrayComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: "Giro",
      skills: this.fb.array([])
    });
  }

  ngOnInit() {}

  addSkill() {
    const skills = this.form.controls.skills as FormArray;
    skills.push(
      this.fb.group({
        skillname: "",
        years: ""
      })
    );
  }
}
