import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../Funcionario';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-editar-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MenuAdminComponent,
    MatFormField,
    MatLabel,
    MatError,MatIcon,
    MatDatepickerModule
  ],
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css']
})
export class EditarFuncionarioComponent implements OnInit {

  @ViewChild('formFuncionario') formFuncionario!: NgForm;
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
    if (this.id) {
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
    } else {
      this.funcionario = { email: '', nome: '', nascimento: '', senha: '', id: 0 };
    }
  }

  salvar(): void {
    this.loading = true;
    if (this.formFuncionario.form.valid) {
      if (this.id) {
        this.funcionario.senha = this.senhaAntiga;
        this.funcionarioService.alterar(this.funcionario).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(["/listar-funcionario"]);
          },
          error: (err) => {
            this.loading = false;
            this.mensagem = `Erro atualizando usuário ${this.funcionario.nome}`;
            this.mensagem_detalhes = `[${err.status}] ${err.message}`;
            this.openDialog();
          }
        });
      } else {
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

  onDateChange(event: MatDatepickerInputEvent<Date | null>) {
    if (event.value) {
      this.funcionario.nascimento = this.formatarData(event.value);
    } else {
      this.funcionario.nascimento = ''; 
    }
  }
  
}
