import { Component, OnInit, OnDestroy } from "@angular/core";
import { Photo } from "src/app/model/photo";
import { CategoryService } from "./category.service";
import { Subscription, BehaviorSubject } from "rxjs";
import { PhotoDetails } from "src/app/model/photo_details";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit, OnDestroy {
  photos: PhotoDetails[] = [];
  photoListSubscription: Subscription;
  photoList$: BehaviorSubject<PhotoDetails[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    //console.log("User state");

    this.photoListSubscription = this.categoryService
      .getPhotos()
      .subscribe(fetchedPhotos => {
        if (!fetchedPhotos) {
          this.photos = [];
          return;
        }
        for (let row of fetchedPhotos as PhotoDetails[]) {
          // const newPhoto = row.uploaded_photos as PhotoDetails;
          const newPhotos = row.uploaded_photos as PhotoDetails[];

          for (let photo of newPhotos) {
            this.photos.push(photo);
            // console.log("Fetched photos", photo);
          }
          //}
        }
        this.photoList$ = this.categoryService.getPhotoListListener();

        //this.photoList$.next([...this.photos]);
      });
  }

  ngOnDestroy() {
    this.photoListSubscription.unsubscribe();
  }
}
