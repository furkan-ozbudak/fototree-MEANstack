import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatDialogModule,
  MatChipList,
  MatChipsModule,
  MatRadioModule
} from "@angular/material";

//import {MatFileUploadModule} from 'angular-material-fileupload';

import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    //MatFileUploadModule,
    MatDialogModule,
    MatChipsModule,
    MatRadioModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,

    MatDialogModule,
    MatChipsModule
  ]
})
export class MaterialModule {}
