import { Component } from '@angular/core';
import { FormBuilder,FormsModule,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmailDirective } from '../../shared/directive/email.directive';
import {Cliente} from '../../Cliente'




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule, EmailDirective, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public cliente = {email: '', senha: -1};
  constructor () { 

  }
      
  
  
  }





