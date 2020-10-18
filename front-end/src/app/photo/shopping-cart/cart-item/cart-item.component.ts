import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Photo } from "src/app/model/photo";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.css"]
})
export class CartItemComponent implements OnInit {
  @Input() photo: Photo[];
  deleteId: number;
  @Output() deletePhotoEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  deletePhoto(photoId) {
    this.deleteId = photoId;
    this.deletePhotoEmitter.emit(this.deleteId);
  }
}
