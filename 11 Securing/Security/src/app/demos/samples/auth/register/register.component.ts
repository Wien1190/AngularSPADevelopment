import { Component, OnInit } from "@angular/core";
import { FBAuthService } from "../FBAuthService";
import { LoginCredentials } from "../loginCred";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private as: FBAuthService) {}
  ngOnInit() {}

  login: LoginCredentials = {
    email: "",
    pwd: "",
    pwdRepeat: ""
  };

  registerUser() {
    console.log("creating user", this.login.email);
    this.as.createUser(this.login.email, this.login.pwd);
  }
}
