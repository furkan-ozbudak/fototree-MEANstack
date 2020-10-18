import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-checkout-confirmation",
  templateUrl: "./checkout-confirmation.component.html",
  styleUrls: ["./checkout-confirmation.component.css"]
})
export class CheckoutConfirmationComponent implements OnInit {
  url: string = "";
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.url = this.activatedRoute.snapshot.paramMap.get("url");

    // route.data includes both `data` and `resolve`
    const user = this.activatedRoute.data.pipe(map(d => d.user));
  }
}
