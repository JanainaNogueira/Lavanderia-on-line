import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[length11]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: length11Directive,
    multi: true
  }]
})
export class length11Directive implements Validator {

  constructor() { }

  validate(c: FormControl): ValidationErrors | null {
    const value: string = c.value;
    const length22Regex = new RegExp('^.{11}$');
    const valid = length22Regex.test(value);
    if (!valid) {
      return { 'length11': true };
    } else {
      return null;
    }
  }

}