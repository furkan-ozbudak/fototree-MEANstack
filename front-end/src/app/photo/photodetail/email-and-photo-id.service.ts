import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EmailAndPhotoIDService {
  email;
  photo_id;
  constructor() {}

  getData() {
    return { email: this.email, photo_id: this.photo_id };
  }

  setData(data) {
    this.email = data.email;
    this.photo_id = data.photo_id;
  }

  test() {
    console.log("inside the email and photo id service.");
  }
}
