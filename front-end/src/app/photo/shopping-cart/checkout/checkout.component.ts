import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { CartService } from "../cart.service";
import { Subscription, BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/account/auth.service";
import { Router } from "@angular/router";
import { UserState } from "src/app/model/user_state";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: Photo[];
  subTotal: number = 0;
  total: number = 0;
  tax: number = 0.07;

  cartItemSubscription: Subscription;
  cartItem$: BehaviorSubject<Photo>;

  userStateSubscription: Subscription;
  userState$: BehaviorSubject<UserState>;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userState$ = this.authService.getUserState();
    console.log("Logged in user: ", this.userState$);
    this.cartService.getCarts().subscribe(carts => {
      console.log("Cart items:", carts.cart);
      this.cartItems = carts.cart;
    });
  }

  getSubTotal() {
    console.log("Items before reduce:", this.cartItems);
    return this.cartItems.reduce((preVal, curVal) => preVal + curVal.price, 0);
  }

  getOrderTotal() {
    const subTotal = this.getSubTotal();
    return this.tax * subTotal + subTotal;
  }

  getTax() {
    return this.tax * this.getSubTotal();
  }

  // .subscribe(cartItems => {
  //   console.log("user id:", userState.userId);
  //   console.log("cart items:", cartItems);
  //   if (!cartItems) {
  //     this.cart = [];
  //   }
  //   this.cart = cartItems.cart;
  //   this.cartUpdated$.next([...this.cart]);
  // });

  ngOnDestroy() {
    // this.cartItemSubscription.unsubscribe();
    // this.userStateSubscription.unsubscribe();
  }

  addBoughtPhotos() {
    this.userState$.subscribe(userState => {
      const photoDetail = {
        userId: userState.userId,
        photos: this.cartItems
      };

      console.log("Photo detail: ", photoDetail);
      this.cartService.addBoughtPhotos(photoDetail);

      this.router.navigate([
        "/checkout-confirmation",
        photoDetail.photos[0].url
      ]);
    });
  }
}
