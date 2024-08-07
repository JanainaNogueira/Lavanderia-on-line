import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailDirective } from '../../shared/directive/email.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { NomeDirective } from '../../shared/directive/nome.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';
import { length11Directive } from '../../shared/directive/length11.directive';
import { ClienteService } from '../../services/cliente/cliente.service';
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    EmailDirective,
    NumericoDirective,
    NomeDirective,
    RequiredFieldDirective,
    length11Directive,
    NgxMaskDirective
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  FormularioRegistro = this.fb.group({
    cpf: null,
    nome: null,
    email: null,
    endereco: null,
    numero: '',
    telefone: null,
  });
  estado: string = '';
  cidade:string='';
  rua: string = '';
  cepInvalido = true;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {}

  get cpf() {
    return this.FormularioRegistro.controls['cpf'];
  }

  get nome() {
    return this.FormularioRegistro.controls['nome'];
  }

  get email() {
    return this.FormularioRegistro.controls['email'];
  }

  get endereco() {
    return this.FormularioRegistro.controls['endereco'];
  }
  get numero() {
    return this.FormularioRegistro.controls['numero'];
  }

  get telefone() {
    return this.FormularioRegistro.controls['telefone'];
  }

  criarCliente() {
    if (this.FormularioRegistro.valid) {
      const novoCliente = {
        cpf: this.cpf.value ?? ('' as string),
        nome: this.nome.value ?? ('' as string),
        email: this.email.value ?? ('' as string),
        endereco: `${this.rua} ${this.numero.value ?? ''} ${this.cidade} ${this.estado}`.trim(),
        numero: this.numero.value ?? ('' as string),
        telefone: this.telefone.value ?? ('' as string),
      };
      if (this.cepInvalido) {
        return alert('Por favor, preencha um cep válido');
      }
      let c = this.clienteService.CreateCliente(
        novoCliente.nome,
        novoCliente.email,
        novoCliente.cpf,
        novoCliente.endereco,
        novoCliente.telefone
      );
      this.router.navigate(['/login']);
    }
  }
  async validateCEP() {
    this.estado = '';
    this.rua = '';
    this.cidade = '';
    this.cepInvalido = true;
    let response = await fetch(
      `https://viacep.com.br/ws/${this.endereco.value}/json`
    );
    response
      .json()
      .then((r) => {
        if (!r.erro) {
          this.estado = r.uf;
          this.rua = r.logradouro;
          this.cidade = r.localidade;
          this.cepInvalido = false;
        }
      })
      .catch((e) => {
        this.estado = '';
        this.rua = '';
      });
  }
}
