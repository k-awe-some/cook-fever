import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  // bind to the "open" class
  @HostBinding("class.open") isOpen: boolean = false;

  // listen to a click event
  // @HostListener("click") toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  // constructor() {}

  // place listener not on the dropdown but on the document
  @HostListener("document:click", ["$event"]) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false; // always false if nativeElement does not contain event target (aka clicking outside of nativeElement)
  }
  constructor(private elRef: ElementRef) {}
}
