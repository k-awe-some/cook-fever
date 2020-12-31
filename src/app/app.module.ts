/* Modules */
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app.routing.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AlertComponent } from "./shared/alert/alert.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
  // specify component(s) that will eventually need to be
  // created without a selector or a route config (Angular 8)
  entryComponents: [AlertComponent],
})
export class AppModule {}
