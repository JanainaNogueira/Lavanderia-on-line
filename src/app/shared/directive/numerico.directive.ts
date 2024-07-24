import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';


@Directive({
  selector: '[invalidNumeric]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NumericoDirective,
    multi: true
    }]
})
export class NumericoDirective implements Validator{

  constructor() { }
  validate(c: FormControl): ValidationErrors | null {
    let value = Number(c.value)
    if(isNaN(value))
    {
      return {'invalidNumeric': true}
    } else return null
  }

}
