import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]'
})
export class StopPropagationDirective {
  constructor() {}

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
}
