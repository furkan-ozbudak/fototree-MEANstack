import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PhotodetailService {
  url = "http://localhost:3000/fototree-api/photodetail";

  constructor(public http: HttpClient) {}

  getPhotoDetails(email, photo_id): Observable<any> {
    return this.http.get(`${this.url}/${email}/${photo_id}`);
  }

  postComment(email, photo_id, com): Observable<any> {
    console.log("post comment service started.");
    console.log(`${email}/${photo_id}`);
    return this.http.patch(
      `http://localhost:3000/fototree-api/comment/${email}/${photo_id}`,
      {
        comment: com
      }
    );
  }

  postLike(email, photo_id) {
    return this.http.patch(`${this.url}/${email}/${photo_id}`, {});
  }

  postDislike(email, photo_id) {
    return this.http.patch(
      `http://localhost:3000/fototree-api/dislike/${email}/${photo_id}`,
      {}
    );
  }
}
