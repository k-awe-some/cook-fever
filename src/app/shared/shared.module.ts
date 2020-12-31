import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  // export all initialized features so they can be accessed
  // in other modules that import this SharedModule
  exports: [
    CommonModule, // to unlock ngIf and ngFor
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  // specify component(s) that will eventually need to be
  // created without a selector or a route config (Angular 8)
  entryComponents: [AlertComponent],
})
export class SharedModule {}
