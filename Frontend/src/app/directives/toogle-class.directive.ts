import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appToogleClass]'
})
export class ToogleClassDirective {
  @HostBinding('class.hidden') hidden=true;

  constructor() { }

  @HostListener('click', ['$event.target'])
  onClick(target: any) {
    if(target.classList.toString().indexOf("expand") > 0)
      this.hidden=!this.hidden;
  }
}
