import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PhotoService } from "../../../services/photo.service";
import { User } from "../../../model/user";

@Component({
  selector: "app-listphoto",
  templateUrl: "./listphoto.component.html",
  styleUrls: ["./listphoto.component.css"]
})
export class ListphotoComponent implements OnInit {
  fotos: any;
  fotosByEmail: any;
  user: User;

  constructor(private http: HttpClient, private photoService: PhotoService) {}

  ngOnInit() {
    console.log("init.....");

    this.getFotosByEmail();
  }

  getFotos() {
    this.photoService.getPhotos().subscribe(res => {
      JSON.stringify(res);
      console.log("fotos", res);
      this.fotos = res;
    });
  }

  getFotosByEmail() {
    this.photoService.getPhotosByEmail().subscribe(res => {
      JSON.stringify(res);
      console.log("fotosByEmail", res);
      this.fotosByEmail = res;
    });
  }

  ngOnDestroy(): void {}
}
