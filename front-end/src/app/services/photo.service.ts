import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class PhotoService {
  user: User = {
    _id: "5d88f3a21264c40b56c25a51",
    email: "hau@mum.edu"
  };
  constructor(private http: HttpClient) {}

  getPhotos() {
    let phototUrl = "http://localhost:3000/fototree-api/photos";
    console.log("PhotoService is calling");
    return this.http.get(phototUrl, { responseType: "json" });
  }

  getPhotosByEmail() {
    let phototUrl =
      "http://localhost:3000/fototree-api/photos/" + this.user.email; //todo: replace by loggedUser.email
    return this.http.get(phototUrl, { responseType: "json" });
  }
}
