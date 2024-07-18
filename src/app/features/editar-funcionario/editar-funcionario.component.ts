import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../Funcionario';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-editar-funcionario',
  standalone: true,
  imports: [CommonModule, MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,
    DeleteDialog,RouterModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule],
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
    private funcionarioService: FuncionarioService
  ) { }

  ngOnInit(): void {
    this.createForm();
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.funcionario = this.funcionarioService.getFuncionarioByEmail(email);
      if (!this.funcionario) {
        this.router.navigate(['/listar-funcionarios']);
      } else {
        this.FormularioRegistroFunc.patchValue({
          nome: this.funcionario.nome,
          nascimento: this.funcionario.nascimento,
          email: this.funcionario.email,
          senha: this.funcionario.senha
        });
      }
    } else {
      this.router.navigate(['/listar-funcionarios']);
  }
}
  createForm() {
    this.FormularioRegistroFunc = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ú ]+[ ]+[A-Za-zÀ-ú ]+$')]],
      nascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.FormularioRegistroFunc.valid && this.funcionario) {
      this.funcionario.nome = this.FormularioRegistroFunc.value.nome;
      this.funcionario.nascimento = this.FormularioRegistroFunc.value.nascimento;
      this.funcionario.email = this.FormularioRegistroFunc.value.email;
      this.funcionario.senha = this.FormularioRegistroFunc.value.senha;
      this.funcionarioService.editarFuncionario(this.funcionario);
      this.router.navigate(['./listar-funcionario']);
    }
  }
}


