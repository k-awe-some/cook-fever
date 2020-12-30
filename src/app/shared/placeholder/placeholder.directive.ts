import { Directive, ViewContainerRef } from "@angular/core";

// helper/anchor directive
// https://angular.io/guide/dynamic-component-loader
@Directive({
  selector: "[appPlaceholder]",
})
export class PlaceholderDirective {
  // expose viewContainerRef so it can be accessed
  // from other components via ViewChild()
  constructor(public viewContainerRef: ViewContainerRef) {}
}
