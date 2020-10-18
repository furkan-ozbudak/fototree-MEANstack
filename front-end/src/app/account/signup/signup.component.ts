import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { toFormData } from "src/app/photo/file-upload/form_data";
import { UploadService } from '../../upload/upload.service';
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error: string = null;
  isLoading: boolean = false;
  selectedFile: File = null;
  
  //card types
  cardTypes: string[] = ["PayPal", "Visa", "Master"];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uploadService: UploadService,
    private router: Router
  ) {
    this.signupForm = formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          )
        ]
      ],
      password: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      //profilePic: ["", [Validators.required, requiredFileType('png')]],
      profilePic: [""],
      cardType: [""],
      cardNumber: ["", Validators.nullValidator],
      secNumber: ["", Validators.nullValidator],
      expiryDate: ["", Validators.nullValidator],
      nameOnCard: ["", Validators.nullValidator]
    });
    console.log("Sign up page loaded");
  }

  ngOnInit() {}

  public onFileSeclected(event){
    this.selectedFile = <File> event.target.files[0]; 
  }

  onSubmit() {
    this.isLoading = true;
    const user = {
      fname: this.signupForm.value.fname,
      lname: this.signupForm.value.lname,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      profile_picture: this.selectedFile.name,
      payment_method: {
        card_type: this.signupForm.value.cardType,
        number: this.signupForm.value.cardNumber,
        secrete_no: this.signupForm.value.secNumber,
        expiry_date: this.signupForm.value.expiryDate,
        name_on_the_card: this.signupForm.value.nameOnCard
      }
    };

    console.log("Card type:", this.signupForm.value);

    
    this.isLoading = true;
    this.authService.signUp(user).subscribe(response => {
      if (response) {
        this.uploadService.uploadFile(this.selectedFile);
        this.isLoading = false;
        this.router.navigate(["/signin"]);
        console.log(response);
        
      }
     
    });
  }

}
