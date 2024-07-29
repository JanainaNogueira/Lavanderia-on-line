import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailDirective } from '../../shared/directive/email.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { NomeDirective } from '../../shared/directive/nome.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';
import { length11Directive } from '../../shared/directive/length11.directive';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../../Cliente';  // Importar o modelo Cliente

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, EmailDirective, NumericoDirective, NomeDirective, RequiredFieldDirective, length11Directive],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  FormularioRegistro = this.fb.group({
    cpf: [null, [Validators.required, Validators.minLength(11)]],
    nome: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    endereco: [null, Validators.required],
    numero: [null, Validators.required],
    telefone: [null, Validators.required]
  });
  
  estado: string = "";
  rua: string = "";

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

  async criarCliente() {
    if (this.FormularioRegistro.valid) {
      const novoCliente: {
        cpf: string;
        nome: string;
        email: string;
        endereço: string;
        telefone: string;
      } = {
        cpf: this.cpf.value ?? '',
        nome: this.nome.value ?? '',
        email: this.email.value ?? '',
        endereço: `${this.rua} ${this.numero.value ?? ''} ${this.estado}`.trim(),
        telefone: this.telefone.value ?? ''
      };

      try {
        const cliente = await this.clienteService.createCliente(novoCliente).toPromise();
        if (cliente) {
          alert('Cliente criado com sucesso. Verifique o email para a senha.');
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error('Erro ao criar cliente', error);
        alert('Erro ao criar cliente. Tente novamente mais tarde.');
      }
    }
  }


  async validateCEP() {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${this.endereco.value}/json`);
      const data = await response.json();
      this.estado = data.uf;
      this.rua = data.logradouro;
    } catch (error) {
      this.estado = "";
      this.rua = "";
    }
  }
}
