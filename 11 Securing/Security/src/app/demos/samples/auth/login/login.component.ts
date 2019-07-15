import { Component, OnInit } from "@angular/core";
import { FBAuthService } from "../FBAuthService";
import { LoginCredentials } from "../loginCred";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private as: FBAuthService) {}

  ngOnInit() {}

  login: LoginCredentials = {
    email: "",
    pwd: "",
    remember: false
  };

  logIn() {
    this.as.logOn(this.login.email, this.login.pwd, this.login.remember);
  }
}
