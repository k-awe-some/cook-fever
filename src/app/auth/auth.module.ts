import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{ path: "auth", component: AuthComponent }]),
    FormsModule,
    SharedModule, // importing CommonModule and LoadingSpinnerComponent
  ],
})
export class AuthModule {}
