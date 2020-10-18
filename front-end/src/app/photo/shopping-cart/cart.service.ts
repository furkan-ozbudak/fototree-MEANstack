import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Photo } from "src/app/model/photo";
import { Subject, Subscription, BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/account/auth.service";
import { Router } from "@angular/router";
import { UserState } from "src/app/model/user_state";
import { GlobalItems } from "src/app/model/BASE_URL";

@Injectable({
  providedIn: "root"
})
export class CartService implements OnDestroy, OnInit {
  private initialCart: Photo[] = [];
  private cartUpdated$ = new Subject<Photo[]>();
  userStateSubscription: Subscription;

  userState$: BehaviorSubject<UserState>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private globalItems: GlobalItems
  ) {}

  ngOnInit() {
    this.userState$ = this.authService.getUserState();
  }

  getCarts() {
    this.userState$ = this.authService.getUserState();
    // this.userStateSubscription = this.userState$.subscribe(userState => {
    console.log("user state", this.userState$);

    //if (userState) {
    return this.http.get<{ message: string; cart: Photo[] }>(
      `${this.globalItems.BASE_URL}/cart/get/${this.userState$.value.userId}`
    );
    // .subscribe(cartItems => {
    //   console.log("user id:", userState.userId);
    //   console.log("cart items:", cartItems);
    //   if (!cartItems) {
    //     this.cart = [];
    //   }
    //   this.cart = cartItems.cart;
    //   this.cartUpdated$.next([...this.cart]);
    // });
    //}

    //console.log("Cart service: user not logged in", this.userState$.value);
    // });
  }

  deleteCartItem(photoId) {
    this.userStateSubscription = this.authService
      .getUserState()
      .subscribe(userState => {
        this.http
          .delete<{ message: string }>(
            `
          ${this.globalItems.BASE_URL}/cart/delete/${userState.userId}/${photoId}`
          )
          .subscribe(response => {
            console.log(response);

            this.getCarts();
          });
      });
  }

  getCartUpdated() {
    return this.cartUpdated$.asObservable();
  }

  addBoughtPhotos(photoDetail) {
    return this.http.post(
      `${this.globalItems.BASE_URL}/cart/checkout`,
      photoDetail
    );
  }
  addToCart(photo) {
    photo.userId = this.userState$.value.userId;

    return this.http.post(`${this.globalItems.BASE_URL}/cart/add`, photo);
  }

  ngOnDestroy() {
    this.userStateSubscription.unsubscribe();
  }
}
