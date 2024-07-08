import { Component } from '@angular/core';
import { FormBuilder,FormsModule,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmailDirective } from '../../shared/directive/email.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule, EmailDirective, FormsModule, NumericoDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public cliente = {email: null, senha: null};
  constructor () { 

  }
      
  
  
  }





