import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/account/auth.service";
import { CartService } from "src/app/photo/shopping-cart/cart.service";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"]
})
export class SidenavListComponent implements OnInit {
  loggedIn: boolean = false;
  totalItems: number = 0;

  ngOnInit() {
    this.authService.getUserState().subscribe(userState => {
      this.loggedIn = userState.token ? true : false;
    });

    this.cartService.getCartUpdated().subscribe(carts => {
      if (!carts || !this.loggedIn) {
        this.totalItems = 0;
      } else {
        this.totalItems = carts.length;
      }
    });
  }

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  logout() {
    this.totalItems = 0;
    this.authService.logOut();
  }
}
