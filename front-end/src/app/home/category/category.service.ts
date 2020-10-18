import { Injectable } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { GlobalItems } from "src/app/model/BASE_URL";
import { PhotoDetails } from "src/app/model/photo_details";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  photoList$: BehaviorSubject<PhotoDetails[]>;

  constructor(private http: HttpClient, private globalItems: GlobalItems) {}

  getPhotos() {
    return this.http.get(`${this.globalItems.BASE_URL}/photos`);
  }

  getPhotoListListener() {
    return this.photoList$;
  }
}
