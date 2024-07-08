import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailDirective } from '../../shared/directive/email.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { NomeDirective } from '../../shared/directive/nome.directive';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule, EmailDirective, NumericoDirective, NomeDirective],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  FormularioRegistro=this.fb.group({
    cpf: ['', [Validators.required, Validators.pattern(/^\d*$/), Validators.minLength(11),Validators.maxLength(11)]],
    nome: null,
    email: null,
    endereco: ['', [Validators.required, Validators.pattern(/^\d*$/), Validators.minLength(8)]],
    numero:['', Validators.required, Validators.pattern(/^\d*$/)],
    telefone: ['', [Validators.required, Validators.pattern(/^\d*$/), Validators.minLength(11), Validators.maxLength(11)]],
 })
  estado: string = ""
  rua: string = ""
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
  get numero () {
    return this.FormularioRegistro.controls['numero'];
  }

  get telefone () {
    return this.FormularioRegistro.controls['telefone'];
  }
  
  async validateCEP(){
    let response = await fetch(`https://viacep.com.br/ws/${this.endereco.value}/json`)
    response.json().then((r) => {this.estado = r.uf; this.rua = r.logradouro} ).catch((e) => {this.estado = "" ;this.rua = ""})
  }
}
