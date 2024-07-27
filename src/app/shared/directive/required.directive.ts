import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[RequiredField]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RequiredFieldDirective,
    multi: true
  }]
})
export class RequiredFieldDirective implements Validator {

  constructor() { }

  validate(c: FormControl): ValidationErrors | null {
    const value: string = c.value;
    if (typeof value === 'string' && value.trim() === "") {
      return { 'RequiredField': true, 'requiredValue': 'Field is required' };
    } else if (value == null || value === "") {
      return { 'RequiredField': true, 'requiredValue': 'Field is required' };
    } else {
      return null;
    }
  }

}
