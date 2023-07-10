import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[listDropdownDirective]'
})
export class DropdownDirectiveDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }
}
