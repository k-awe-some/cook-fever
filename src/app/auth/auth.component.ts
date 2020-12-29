import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.service";

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

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    authObservable = !this.isLogInMode
      ? this.authService.signUp(form.value)
      : this.authService.logIn(form.value);

    authObservable.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.error = null;
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
