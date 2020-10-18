import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Router } from "@angular/router";
import { FooterComponent } from "./navigation/footer/footer.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NavigationModule } from "./navigation/navigation.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./account/auth.interceptor";
import { GlobalItems } from "./model/BASE_URL";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
    SidenavListComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    NavigationModule,
    RouterModule.forRoot([
      { path: "fototree", loadChildren: "./navigation/navigation.module" },
      { path: "**", component: PageNotFoundComponent }
    ])
  ],
  providers: [
    GlobalItems
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
