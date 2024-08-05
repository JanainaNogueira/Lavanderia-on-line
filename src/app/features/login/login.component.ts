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
import { Login } from '../../shared/models/login.model';
import { Funcionario } from '../../shared/models/Funcionario';
import { Cliente } from '../../shared/models/Cliente';

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
        this.loginService.login(new Login(this.email, this.senha)).subscribe(e => {
          if(e == null){
            alert("Email ou senha invalidos");
          } else {
            if('nascimento' in e){
              sessionStorage.setItem("adminId", String(e.id!))
              this.router.navigate(['admin'])
            } else {
              sessionStorage.setItem("clienteId", String(e.id!))
              this.router.navigate(['home'])
            }
          }
        })         
       
  }


}
