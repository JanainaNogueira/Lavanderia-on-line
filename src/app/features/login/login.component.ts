import { LoginService } from './../../services/login.service';
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
    private funcionarioService: FuncionarioService,
    private loginService: LoginService
  ) { }

  onSubmit() {
        sessionStorage.removeItem("clienteId")
        sessionStorage.removeItem("adminId")
        if (this.loginService.validateLoginClient(this.email, this.senha)) {
          this.router.navigate(['/home']);
        } else  if (this.loginService.validateLoginFunc(this.email, this.senha)) {
          this.router.navigate(['/admin']);
        } else {
          alert("Email ou senha invalidos");
        }
  }


}
