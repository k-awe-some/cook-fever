import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLogInMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;

    !this.isLogInMode
      ? this.authService.signUp(form.value).subscribe(
          (res) => {
            console.log(res);
            this.isLoading = false;
          },
          (errorMessage) => {
            this.error = errorMessage;
            this.isLoading = false;
          }
        )
      : null;

    form.reset();
  }
}
