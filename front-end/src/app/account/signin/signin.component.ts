import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription, Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { UserState } from "src/app/model/user_state";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;
  userStateSubscription: Subscription;

  userState$: BehaviorSubject<UserState>;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.userState$ = this.authService.getUserState();
    this.userStateSubscription = this.userState$.subscribe(userState => {
      //console.log({ userState });
      if (userState.token) {
        this.isLoading = false;
        //console.log({ token: userState.token });

        this.authService.setUserState(this.userState$);

        this.router.navigate(["/viewphoto"]);
      }
    });
  }

  onSubmit() {
    const account = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };

    this.isLoading = true;

    this.authService.signIn(account).subscribe(response => {
      let newUserStateInfo;
      if (!response) {
        newUserStateInfo = null;
      } else {
        newUserStateInfo = {
          userId: response.userId,
          token: response.token,
          message: response.message
        };
      }

      this.userState$.next(newUserStateInfo);
    });
  }

  ngOnDestroy() {
    this.userStateSubscription.unsubscribe();
  }
}
