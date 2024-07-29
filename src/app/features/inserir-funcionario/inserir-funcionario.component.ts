import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { FuncionarioService } from '../../services/funcionario.service';
import { EmailDirective } from '../../shared/directive/email.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { NomeDirective } from '../../shared/directive/nome.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';
import { length4Directive } from '../../shared/directive/length4.directive';
import { Funcionario } from '../../Funcionario';

@Component({
  selector: 'app-inserir-funcionario',
  standalone: true,
  imports: [
    CommonModule, MatCommonModule, MatButtonModule, MatInputModule,
    MatIconModule, MatDatepickerModule, MatNativeDateModule, 
    MenuAdminComponent, DeleteDialog, EmailDirective, 
    NumericoDirective, NomeDirective, RequiredFieldDirective, length4Directive
  ],
  templateUrl: './inserir-funcionario.component.html',
  styleUrls: ['./inserir-funcionario.component.css']
})
export class InserirFuncionarioComponent {
  FormularioRegistroFunc: FormGroup;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {
    this.FormularioRegistroFunc = this.fb.group({
      nome: [null, Validators.required],
      nascimento: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.FormularioRegistroFunc.valid) {
      const funcionario: Funcionario = {
        nome: this.FormularioRegistroFunc.get('nome')?.value,
        nascimento: this.formatarData(this.FormularioRegistroFunc.get('nascimento')?.value),
        email: this.FormularioRegistroFunc.get('email')?.value,
        senha: this.FormularioRegistroFunc.get('senha')?.value,
        id: 0 // Ajuste conforme necessário, se a ID for gerada automaticamente
      };

      this.funcionarioService.addFuncionario(funcionario).subscribe(
        () => {
          this.router.navigate(['/listar-funcionarios']);
        },
        error => {
          console.error('Erro ao adicionar funcionário', error);
        }
      );
    } else {
      this.FormularioRegistroFunc.markAllAsTouched();
    }
  }

  formatarData(data: Date): string {
    if (!data) return '';
    const day = String(data.getDate()).padStart(2, '0');
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const year = data.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
