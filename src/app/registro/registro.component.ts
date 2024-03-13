import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  
  FormularioRegistro=this.fb.group({
    cpf: ['', [Validators.required, Validators.pattern(/^\d*$/), Validators.minLength(11),Validators.maxLength(11)]],
    nome: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/)]],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9\s,'-]*$/), Validators.minLength(7)]],
    telefone: ['', [Validators.required, Validators.pattern(/^\d*$/), Validators.minLength(11), Validators.maxLength(11)]],
 })

  constructor(private fb: FormBuilder){}

  get cpf () {
    return this.FormularioRegistro.controls['cpf'];
  }

  get nome () {
    return this.FormularioRegistro.controls['nome'];
  }

  get email () {
    return this.FormularioRegistro.controls['email'];
  }

  get endereco () {
    return this.FormularioRegistro.controls['endereco'];
  }

  get telefone () {
    return this.FormularioRegistro.controls['telefone'];
  }

}
