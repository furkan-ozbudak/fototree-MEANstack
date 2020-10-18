import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { AuthService } from "src/app/account/auth.service";
import { Subscription, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { CartService } from "src/app/photo/shopping-cart/cart.service";
import { UserState } from "src/app/model/user_state";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"]
})
export class CategoryListComponent implements OnInit, OnDestroy {
  @Input() photo: Photo[];
  loggedIn: boolean;

  userStateSubscription: Subscription;

  userState$: BehaviorSubject<UserState>;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userState$ = this.authService.getUserState();
    //console.log("User state$", this.userState$);
    this.userStateSubscription = this.userState$.subscribe(userState => {
      this.loggedIn = userState.token ? true : false;
      //console.log("Logged in user", { token: userState.token });
    });
  }

  addToCart(photo) {
    this.userState$ = this.authService.getUserState();
    this.userStateSubscription = this.userState$.subscribe(userState => {
      this.loggedIn = userState.token ? true : false;

      if (!this.loggedIn) {
        this.router.navigate(["/signin"]);
      } else {
        console.log("reached the addCart()");

        this.cartService.addToCart(photo).subscribe(response => {
          console.log(response);
        });
      }
    });
  }

  ngOnDestroy() {
    //this.userStateSubscription.unsubscribe();
  }
}
