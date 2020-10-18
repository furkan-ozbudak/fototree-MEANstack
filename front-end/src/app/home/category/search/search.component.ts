import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      searchTerm: ["", Validators.required]
    });
  }

  ngOnInit() {}
}
