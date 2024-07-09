import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[NomeValido]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NomeDirective,
    multi: true
  }]
})
export class NomeDirective implements Validator {

  constructor() { }

  validate(c: FormControl): ValidationErrors | null {
    let nome: string = c.value;
    const nameRegex = new RegExp('^[A-Za-zÀ-ÿ]+\\s[A-Za-zÀ-ÿ\\s]*$', 'g');
    const valid = nameRegex.test(nome);
    if (nome == null || nome.trim() === "" || !valid) {
      return { 'NomeValido': true, 'requiredValue': 'Nome' };
    } else {
      return null;
    }
  }

}