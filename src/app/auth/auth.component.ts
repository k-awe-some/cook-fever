import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import * as StoreType from "../store/store.model";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeAlertSubscription: Subscription = null;
  private storeSubscription: Subscription = null;

  isLogInMode: boolean = true;
  isLoading: boolean = false;

  ngOnInit() {
    this.storeSubscription = this.store
      .select("authentication")
      .subscribe((authState) => {
        this.isLoading = authState.loading;
        if (authState.authError) this.showErrorAlert(authState.authError);
      });
  }

  ngOnDestroy() {
    if (this.closeAlertSubscription) this.closeAlertSubscription.unsubscribe();
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
  }

  constructor(
    private store: Store<StoreType.IStore>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    !this.isLogInMode
      ? this.store.dispatch(new AuthActions.SignUpStart(form.value))
      : this.store.dispatch(new AuthActions.LogInStart(form.value));
    // these dispatches does not yield an observable as it's already subscribed by @Effect() authLogInHandler

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
