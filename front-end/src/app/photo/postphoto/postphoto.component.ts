import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { UploadService } from "src/app/upload/upload.service";
// import { UploadService } from '../../upload/upload.service';

@Component({
  selector: "app-postphoto",
  templateUrl: "./postphoto.component.html",
  styleUrls: ["./postphoto.component.css"]
})
export class PostphotoComponent implements OnInit {
  postPhotoForm: FormGroup;
  cats = ["Animal/WildLife", "Beauty/Fashion", "Holiday", "Sports/Recreation"];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public uploadService: UploadService
  ) {
    this.postPhotoForm = formBuilder.group({
      title: [""],
      desc: [""],
      price: 0,
      category: "None",
      filename: [""]
    });
  }

  selectedFile: File = null;
  public onFileSeclected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onSubmit(f: NgForm) {
    if (this.postPhotoForm.valid) {
      let newPhoto = {
        email: "hau@mum.edu", //loggedUser.email
        photo: {
          title: this.postPhotoForm.value.title,
          url: this.selectedFile.name,
          category: this.postPhotoForm.value.category,
          description: this.postPhotoForm.value.desc,
          price: this.postPhotoForm.value.price,
          likes: 0,
          comments: []
        }
      };

      //post to API

      const url = "http://localhost:3000/fototree-api/photos";

      this.http.post(url, newPhoto).subscribe(response => {
        console.log("Response:", response);

        //upload photo
        this.uploadService.uploadFile(this.selectedFile);
      });
    }
  }

  ngOnInit() {}
}
