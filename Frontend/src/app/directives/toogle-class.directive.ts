import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appToogleClass]'
})
export class ToogleClassDirective {
  @HostBinding('class.hidden') hidden=true;

  constructor() { }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.hidden=!this.hidden;
  }
}
