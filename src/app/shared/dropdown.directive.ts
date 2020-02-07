import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  // bind to the "open" class
  @HostBinding("class.open") isOpen: boolean = false;

  // listen to a click event
  @HostListener("click") toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  constructor() {}
}
