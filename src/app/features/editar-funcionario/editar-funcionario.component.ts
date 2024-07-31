import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../shared/models/Funcionario';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { EmailDirective } from '../../shared/directive/email.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { NomeDirective } from '../../shared/directive/nome.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';
import { length4Directive } from '../../shared/directive/length4.directive';


@Component({
  selector: 'app-editar-funcionario',
  standalone: true,
  imports: [CommonModule, MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,
    DeleteDialog,RouterModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule, EmailDirective, NumericoDirective, NomeDirective, RequiredFieldDirective, length4Directive],
  templateUrl: './editar-funcionario.component.html',
  styleUrl: './editar-funcionario.component.css'
})


export class EditarFuncionarioComponent implements OnInit {
  FormularioRegistroFunc: FormGroup;
  funcionario: Funcionario | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.createForm();
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.funcionario = this.funcionarioService.getFuncionarioByEmail(email);
      if (!this.funcionario) {
        this.router.navigate(['/listar-funcionarios']);
      } else {
        const nascimentoDate = this.parseDate(this.funcionario.nascimento);
        this.FormularioRegistroFunc.patchValue({
          nome: this.funcionario.nome,
          nascimento: nascimentoDate,
          email: this.funcionario.email,
          senha: this.funcionario.senha
        });
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      }
    } else {
      this.router.navigate(['/listar-funcionarios']);
  }
}
  createForm() {
    this.FormularioRegistroFunc = this.formBuilder.group({
      nome: null,
      nascimento: null,
      email: null,
      senha: null
    });
  }

  onSubmit() {
    if (this.FormularioRegistroFunc.valid && this.funcionario) {
      this.funcionario.nome = this.FormularioRegistroFunc.value.nome;
      this.funcionario.nascimento = this.formatDate(this.FormularioRegistroFunc.value.nascimento);
      this.funcionario.email = this.FormularioRegistroFunc.value.email;
      this.funcionario.senha = this.FormularioRegistroFunc.value.senha;
      this.funcionarioService.editarFuncionario(this.funcionario);
      this.router.navigate(['./listar-funcionario']);
    }
  }

  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.FormularioRegistroFunc.patchValue({
      nascimento: event.value
    });
}

}
