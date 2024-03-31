import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
FormularioLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')]]
  });

  constructor (private fb: FormBuilder) { }
      
    get email () {
        return this.FormularioLogin.controls['email'];
      }
    
    get senha () {
        return this.FormularioLogin.controls['senha'];
      }
  
  }





