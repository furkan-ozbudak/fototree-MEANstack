import { Component, OnInit, OnDestroy } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { CartService } from "../cart.service";
import { Subscription, BehaviorSubject } from "rxjs";
import { UserState } from "src/app/model/user_state";
import { AuthService } from "src/app/account/auth.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Photo[];
  cartItemSubscription: Subscription;

  // userStateSubscription: Subscription;
  // userState$: BehaviorSubject<UserState>;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    //this.userState$ = this.authService.getUserState();

    this.cartService.getCarts().subscribe(carts => {
      this.cartItems = carts.cart;

      console.log("Cart items:", carts);
    });
  }

  deletePhoto(photoId) {
    console.log("Delete photo id:", photoId);
    this.cartService.deleteCartItem(photoId);
  }

  ngOnDestroy() {
    //this.cartItemSubscription.unsubscribe();
  }
}
