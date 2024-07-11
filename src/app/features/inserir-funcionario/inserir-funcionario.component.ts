import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-inserir-funcionario',
  standalone: true,
  imports: [CommonModule, MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,
    DeleteDialog,RouterModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './inserir-funcionario.component.html',
  styleUrl: './inserir-funcionario.component.css'
})
export class InserirFuncionarioComponent{
  FormularioRegistroFunc = this.fb.group({
    nome: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/)]],
    nascimento: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(4)]]
  });
  constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService, 
    private router: Router) {}

  onSubmit() {
    if (this.FormularioRegistroFunc.valid) {
      const nome = this.FormularioRegistroFunc.get('nome')?.value!;
      const dataNascimento = this.FormularioRegistroFunc.get('nascimento')?.value!;
      const email = this.FormularioRegistroFunc.get('email')?.value!;
      const senha = this.FormularioRegistroFunc.get('senha')?.value!;
      this.funcionarioService.addFuncionario(email, nome, dataNascimento, senha);
      this.router.navigate(['/listar-funcionarios']);
    } else {
      this.FormularioRegistroFunc.markAllAsTouched();
  }
 
}

}

