import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { PhotodetailService } from "./photodetail.service";
import { EmailAndPhotoIDService } from "./email-and-photo-id.service";

@Component({
  selector: "app-photodetail",
  templateUrl: "./photodetail.component.html",
  styleUrls: ["./photodetail.component.css"]
})
export class PhotodetailComponent implements OnInit, OnDestroy {
  @Input() photo:any;

  email: String;
  photoID: any;
  routeParamsSub: any;
  data: any;

  addCommentButton = true;
  postCommentButton = false;
  feedbackText = false;

  fname;
  lname;
  likes;
  comments;
  photo_url;
  user_photo;
  description;
  category;
  price;
  commentTextbox = false;

  commentList;
  input;

  likeable = true;

  liked = false;
  disliked = false;

  constructor(
    private route: ActivatedRoute,
    public photoService: PhotodetailService,
    public http: HttpClient,
    public photoInfo: EmailAndPhotoIDService
  ) {}

  ngOnInit() {
    this.photoID = "5d88f3bc1264c40b56c25a52";
    this.email = "hau@mum.edu";

    //read ids from url
    this.routeParamsSub = this.route.params.subscribe(params => {
      //this.userID = params["user_id"];
      //this.photoID = params["photo_id"];
    });
    //send user id and photo id to server and return photo details object
    this.photoService
      .getPhotoDetails(this.email, this.photoID)
      .subscribe(response => {
        this.data = response;
        console.log(response);

        this.fname = response.fname;
        this.lname = response.lname;
        this.likes = response.photo_likes;
        this.comments = response.photo_comments;
        this.photo_url = response.photo_url;
        this.user_photo = response.profile_picture;
        this.description = response.photo_description;
        this.category = response.photo_category;
        this.price = response.photo_price;

        this.commentList = response.photo_comments;

        console.log("first name: " + this.fname);
        console.log("last name: " + this.lname);
        console.log("likes: " + this.likes);
        console.log("comments:" + this.commentList);
        //console.log("comments: " + this.comments);
      });
  }
  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

  onComment() {
    console.log("clicked.");
    this.addCommentButton = false;
    this.postCommentButton = true;
    this.commentTextbox = true;
    this.feedbackText = false;
  }

  onCommentPost() {
    console.log("posted.");
    this.addCommentButton = true;
    this.postCommentButton = false;
    this.commentTextbox = false;
    this.feedbackText = true;

    let commentObject = {
      comment: this.input,
      date: new Date(Date.now()).toLocaleString()
    };
    this.commentList.push(commentObject);
    console.log("comments after push : " + this.commentList);

    this.photoService
      .postComment(this.email, this.photoID, this.input)
      .subscribe(response => {
        console.log(response);
      });
  }

  onKey(event) {
    this.input = event.target.value;
  }

  onLike() {
    if (this.likeable) {
      this.likes++;
      this.photoService
        .postLike(this.email, this.photoID)
        .subscribe(response => {
          console.log(response);
        });
      this.disliked = false;
      this.liked = true;
    } else {
      this.likes--;
      this.photoService
        .postDislike(this.email, this.photoID)
        .subscribe(response => {
          console.log(response);
        });
      this.liked = false;
      this.disliked = true;
    }
    this.likeable = !this.likeable;
  }
}
