import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserState } from "../model/user_state";
import { GlobalItems } from "../model/BASE_URL";

export interface AuthResponseData {
  email: string;

  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private initialState = {
    userId: null,
    message: null,
    token: null
  };
  public userStateInfo: UserState = this.initialState;

  public userState$: BehaviorSubject<UserState> = new BehaviorSubject<
    UserState
  >(this.userStateInfo);

  //baseUrl: string = "http://localhost:3000/fototree-api";

  constructor(
    private globalItems: GlobalItems,
    private http: HttpClient,
    private router: Router
  ) {}

  setUserState(userState$: BehaviorSubject<UserState>) {
    this.userState$ = userState$;
  }

  signIn(user) {
    //console.log("User info:", user);

    return this.http.post<{ userId: string; message: string; token: string }>(
      this.globalItems.BASE_URL + "/signin",
      user
    );
  }

  getUserState() {
    //console.log("User state on authService:", this.userState$);
    return this.userState$;
  }

  signUp(user) {
    return this.http.post(this.globalItems.BASE_URL + "/signup", user);
  }

  logOut() {
    this.userStateInfo = this.initialState;
    this.userState$.next(this.userStateInfo);
    this.router.navigate(["/home"]);
  }

  isAuthenticated() {
    return !this.userStateInfo.token;
  }
}
