import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmailDirective } from '../../shared/directive/email.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EmailDirective, FormsModule, NumericoDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  onSubmit() {
    this.loginService.login(this.email, this.senha).subscribe(
      response => {
        sessionStorage.removeItem("clienteId");
        sessionStorage.removeItem("adminId");

        if ('role' in response) { 
          if (response.role === 'Funcionario') {
            this.router.navigate(['/admin']);
          } else if (response.role === 'Cliente') {
            this.router.navigate(['/home']);
          } else {
            alert('Email ou senha inválidos');
          }
        } else {
          alert('Email ou senha inválidos');
        }
      },
      error => {
        alert('Erro ao fazer login');
      }
    );
  }
}
