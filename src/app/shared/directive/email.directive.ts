import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';


  @Directive({
    selector: '[EmailValid]',
    standalone: true,
    providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailDirective,
    multi: true
    }]
    })

export class EmailDirective implements Validator {

  constructor() { }
  validate(c: FormControl): ValidationErrors | null {
    let email: string = c.value;
    const emailRegex = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}', 'g');
    const valid = emailRegex.test(email);
    if(email == (null || "") || !valid)
    {
      return {'EmailValid': true, 'requiredValue': 'Email'}
    } else return null
  }

}
