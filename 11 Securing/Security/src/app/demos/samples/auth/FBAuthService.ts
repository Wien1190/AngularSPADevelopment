import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
@Injectable({
  providedIn: "root"
})
export class FBAuthService {
  constructor(private fireAuth: AngularFireAuth) {
    this.onUserChanged();
  }
  private Token: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private fbUser: firebase.User = null;
  public User: BehaviorSubject<firebase.User> = new BehaviorSubject(null);
  private onUserChanged() {
    this.fireAuth.auth.onAuthStateChanged(user => {
      this.setUserToken(user);
    });
  }
  private setUserToken(user) {
    this.fbUser = user;
    this.User.next(user);
    if (user != null) {
      this.fbUser.getIdToken().then(token => {
        this.setToken(token);
      });
    } else {
      this.setToken(null);
    }
  }
  private setToken(token) {
    this.Token.next(token);
  }
  getToken(): Observable<string> {
    return this.Token;
  }
  isAuthenticated(): Observable<boolean> {
    this.User.subscribe(user => {
      let auth: boolean = user == null ? false : true;
      return of(auth);
    });
    return of(false);
  }

  createUser(email: string, password: string): Promise<any> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logOn(user, password, stayLoggedOn, onSuccess?) {
    return this.fireAuth.auth
      .signInWithEmailAndPassword(user, password)
      .then(onSuccess)
      .catch(err => {
        console.log("Error logging in", err);
        return err;
      });
  }

  logOff() {
    this.fireAuth.auth
      .signOut()
      .then(loggedOut => {
        this.fbUser = null;
      })
      .catch(err => console.log("Error logging out", err));
  }
}
