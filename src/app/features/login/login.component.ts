import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmailDirective } from '../../shared/directive/email.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { ClienteService } from '../../services/cliente/cliente.service';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EmailDirective, FormsModule, NumericoDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService
  ) { }

  onSubmit() {
    if (this.clienteService.isCliente(this.email)) {
      if (this.clienteService.validateLogin(this.email, this.senha)) {
        this.router.navigate(['/home']);
      } else {
        alert('Email ou senha inválidos para cliente');
      }
    } else if (this.funcionarioService.isFuncionario(this.email)) {
      if (this.funcionarioService.validateLogin(this.email, this.senha)) {
        this.router.navigate(['/admin']);
      } else {
        alert('Email ou senha inválidos para funcionário');
      }
    } else {
      alert('Email não encontrado');
    }
  }


}
