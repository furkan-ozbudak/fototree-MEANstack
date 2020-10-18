import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PhotodetailComponent } from "./photodetail/photodetail.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { PostphotoComponent } from "./postphoto/postphoto.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ViewphotoComponent } from "./viewphoto/viewphoto.component";
import { ListphotoComponent } from "./viewphoto/listphoto/listphoto.component";
import { OnephotoComponent } from "./viewphoto/onephoto/onephoto.component";
import { PhotoService } from "../services/photo.service";
import { UploadService } from "../upload/upload.service";
//import { FileUploadComponent } from "./file-upload/file-upload.component";

import { FileUploadComponent } from "./file-upload/file-upload.component";
import { EmailAndPhotoIDService } from "./photodetail/email-and-photo-id.service";

@NgModule({
  declarations: [
    PhotodetailComponent,
    PostphotoComponent,
    ViewphotoComponent,
    ListphotoComponent,
    OnephotoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "postphoto", component: PostphotoComponent },
      { path: "viewphoto", component: ListphotoComponent },
      { path: "viewphoto/photodetail", component: PhotodetailComponent },
      { path: "", redirectTo: "home", pathMatch: "full" }
    ])
  ],
  providers: [PhotoService, UploadService, EmailAndPhotoIDService]
})
export class PhotoModule {
  declarations: [
    FileUploadComponent,
    PhotodetailComponent
    // CartComponent,
    // CheckoutComponent,
    // CheckoutConfirmationComponent
  ];
  imports: [CommonModule, RouterModule];
}
