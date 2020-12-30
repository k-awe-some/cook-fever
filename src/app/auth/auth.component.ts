import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeAlertSubscription: Subscription = null;

  isLogInMode: boolean = true;
  isLoading: boolean = false;
  // error: string = null;

  ngOnDestroy() {
    if (this.closeAlertSubscription) this.closeAlertSubscription.unsubscribe();
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.isLoading = false;
        // this.error = null;
        this.router.navigate(["/recipes"]);
      },
      (errorMessage) => {
        // this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  // onHandleError() {
  //   this.error = null;
  // }

  private showErrorAlert(message: string) {
    // resolveComponentFactory(Type) returns the component "factory"
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    // get viewContainerRef from placeholder directive
    // that allows interaction with such place in the DOM
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    // create a new (alert) component in such place
    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    // access such component instance's properties
    componentRef.instance.message = message;
    this.closeAlertSubscription = componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
      this.closeAlertSubscription.unsubscribe();
    });
  }
}
