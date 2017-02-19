import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {
  private isOpen = false;

  //binds the 'opened' property attribute onto the hosting element
  //since it's 'get', opened is a read only property
  //The ('class.open') means that the  'open' css class will only be added to the hosting element
  //if 'this.isOpen' returns true
  @HostBinding('class.show') get opened(){
    return this.isOpen;
  }

  @HostListener('mouseenter') open(){
    this.isOpen = true;
  }

  @HostListener('mouseleave') close(){
    this.isOpen=false;
  }

}
