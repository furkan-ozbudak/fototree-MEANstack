import { Component, OnInit, Input } from "@angular/core";
import { EmailAndPhotoIDService } from "../../photodetail/email-and-photo-id.service";

@Component({
  selector: "app-onephoto",
  templateUrl: "./onephoto.component.html",
  styleUrls: ["./onephoto.component.css"]
})
export class OnephotoComponent implements OnInit {
  @Input() photo: any;
  constructor(public service: EmailAndPhotoIDService) {}

  ngOnInit() {}

  // onPhotoClick() {
  //   console.log("In photo click event.");
  //   console.log(this.photo.email);
  //   console.log(this.photo._id);
  //   this.service.setData({ email: this.photo.email, photo_id: this.photo._id });
  // }
}
