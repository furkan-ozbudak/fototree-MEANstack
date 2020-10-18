import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";

export class AuthInterceptor implements HttpInterceptor, OnDestroy {
  userStateSubscription = new Subscription();
  authRequest;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.userStateSubscription = this.authService
      .getUserState()
      .subscribe(userState => {
        console.log("Auth req", this.authRequest, userState.token);

        this.authRequest = req.clone({
          headers: req.headers.set("Authorization", `Bearer ${userState.token}`)
        });

        return next.handle(this.authRequest);
      });

    return next.handle(this.authRequest);
  }

  ngOnDestroy() {
    this.userStateSubscription.unsubscribe();
  }
}
