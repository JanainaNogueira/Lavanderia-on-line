import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[idadeMinima]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DataDirective,
    multi: true
  }]
})
export class DataDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const idadeMinima = 16;
    const dataNascimento = new Date(control.value);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade >= idadeMinima ? null : { idadeMinima: { requiredAge: idadeMinima, actualAge: idade } };
  }
}
