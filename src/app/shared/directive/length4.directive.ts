import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[length4]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: length4Directive,
    multi: true
  }]
})
export class length4Directive implements Validator {

  constructor() { }

  validate(c: FormControl): ValidationErrors | null {
    const value: string = c.value;
    const length22Regex = new RegExp('^{4}$');
    const valid = length22Regex.test(value);
    if (!valid) {
      return { 'length4': true };
    } else {
      return null;
    }
  }

}