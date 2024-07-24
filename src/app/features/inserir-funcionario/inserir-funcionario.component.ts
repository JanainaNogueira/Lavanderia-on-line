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
import { EmailDirective } from '../../shared/directive/email.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { NomeDirective } from '../../shared/directive/nome.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';
import { length4Directive } from '../../shared/directive/length4.directive';


@Component({
  selector: 'app-inserir-funcionario',
  standalone: true,
  imports: [CommonModule, MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,
    DeleteDialog,RouterModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule,
    EmailDirective, NumericoDirective, NomeDirective, RequiredFieldDirective, length4Directive],
  templateUrl: './inserir-funcionario.component.html',
  styleUrl: './inserir-funcionario.component.css'
})
export class InserirFuncionarioComponent{
  FormularioRegistroFunc = this.fb.group({
    nome: null,
    nascimento: null,
    email: null,
    senha: null
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
      this.router.navigate(['./listar-funcionario']);
    } else {
      this.FormularioRegistroFunc.markAllAsTouched();
      this.router.navigate(['./listar-funcionario']);
  }
 
}

}

