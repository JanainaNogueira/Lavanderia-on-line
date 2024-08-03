import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../Funcionario';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmailDirective } from '../../shared/directive/email.directive';
import { length4Directive } from '../../shared/directive/length4.directive';
import { NomeDirective } from '../../shared/directive/nome.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';

@Component({
  selector: 'app-inserir-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EmailDirective,
    NumericoDirective,
    NomeDirective,
    RequiredFieldDirective,
    length4Directive,
    MenuAdminComponent,
    MatDialogModule
  ],
  templateUrl: './inserir-funcionario.component.html',
  styleUrls: ['./inserir-funcionario.component.css']
})
export class InserirFuncionarioComponent implements OnInit {

  @ViewChild('formFuncionario') formFuncionario!: NgForm;
  novoFuncionario: boolean = true;
  funcionario: Funcionario = { email: '', nome: '', nascimento: '', senha: '', id: 0 };
  id!: string;
  loading: boolean = false;
  senhaAntiga: string = "";
  mensagem: string = "";
  mensagem_detalhes: string = "";
  botaoDesabilitado: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  
  openDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: {
        mensagem: this.mensagem,
        mensagem_detalhes: this.mensagem_detalhes
      },
      width: '250px'
    });
  }

  ngOnInit(): void {
    this.loading = false;

    this.id = this.route.snapshot.params['id'];
    this.novoFuncionario = !this.id;

    if (!this.novoFuncionario) {
      this.funcionarioService.buscarPorId(+this.id).subscribe({
        next: (funcionario) => {
          if (funcionario == null) {
            this.mensagem = `Erro buscando funcionário ${this.id}`;
            this.mensagem_detalhes = `Usuário não encontrado ${this.id}`;
            this.botaoDesabilitado = true;
          } else {
            this.funcionario = funcionario;
            this.senhaAntiga = funcionario.senha ? funcionario.senha : "";
            this.funcionario.senha = "";
            this.botaoDesabilitado = false;
          }
        },
        error: (err) => {
          this.mensagem = `Erro buscando usuário ${this.id}`;
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          this.openDialog();
          this.botaoDesabilitado = true;
        }
      });
    }
  }

  salvar(): void {
    this.loading = true;
    if (this.formFuncionario.form.valid) {
      if (this.novoFuncionario) {
        this.funcionarioService.inserir(this.funcionario).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(["/listar-funcionario"]);
          },
          error: (err) => {
            this.loading = false;
            this.mensagem = `Erro inserindo usuário ${this.funcionario.nome}`;
            if (err.status == 409) {
              this.mensagem_detalhes = `Usuário já existente`;
            } else {
              this.mensagem_detalhes = `[${err.status}] ${err.message}`;
              this.openDialog();
            }
          }
        });
      }
    } else {
      this.loading = false;
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
