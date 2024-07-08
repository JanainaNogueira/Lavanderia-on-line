import { Directive } from '@angular/core';

@Directive({
  selector: '[appEmail]',
  standalone: true
})
export class EmailDirective {

  constructor() { }

}
