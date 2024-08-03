import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../shared/models/Funcionario';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { length4Directive } from '../../shared/directive/length4.directive';
import { EmailDirective } from '../../shared/directive/email.directive';
import { NomeDirective } from '../../shared/directive/nome.directive';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';

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
    MatFormFieldModule,
    MatLabel,
    MatError,MatIcon,
    MatDatepickerModule,
    MatInputModule,
    EmailDirective,
    NumericoDirective,
    NomeDirective,
    RequiredFieldDirective,
    length4Directive,
  ],
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css']
})
export class EditarFuncionarioComponent implements OnInit {

  @ViewChild('formFuncionario') formFuncionario!: NgForm;
  funcionario: Funcionario = { login: '', nome: '', nascimento: '', senha: '', id: 0 };
  id!: string;
  loading: boolean = false;
  senhaAntiga: string = "";
  mensagem: string = "";
  mensagem_detalhes: string = "";
  botaoDesabilitado: boolean = false;
  nascimentoDate: Date | null = null;

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
    this.id = this.route.snapshot.params['id'];
    console.log('Retrieved ID:', this.id);
    if (this.id) {
      this.funcionarioService.buscarPorId(+this.id).subscribe({
        next: (funcionario) => {
          console.log('Fetched Funcionario:', funcionario);
          if (funcionario) {
            this.funcionario = funcionario;
            this.senhaAntiga = funcionario.senha || "";
            this.funcionario.senha = "";
            this.nascimentoDate = this.parseDateString(funcionario.nascimento);
          } else {
            this.mensagem = `Funcionário com ID ${this.id} não encontrado.`;
            this.mensagem_detalhes = 'Verifique se o ID está correto.';
            this.openDialog();
          }
        },
        error: (err) => {
          this.mensagem = `Erro ao buscar funcionário com ID ${this.id}`;
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
          this.openDialog();
        }
      });
    } else {
      this.funcionario = { nome: '', nascimento: '', login: '', senha: '', id: 0 };
    }
  }

  salvar(): void {
    this.loading = true;
    if (this.formFuncionario.form.valid) {
      this.funcionario.nascimento = this.formatarData(this.nascimentoDate);
      console.log('ID:', this.id);
      console.log('Funcionario to save:', this.funcionario);
      if (this.id) {
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
            }
            this.openDialog();
          }
        });
      }
    } else {
      this.loading = false;
    }
  }

  formatarData(data: Date | null): string {
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
  
  parseDateString(dateString: string): Date | null {
    if (!dateString) return null;


    let date = new Date(dateString);
    if (!isNaN(date.getTime())) return date;

    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; 
      const year = parseInt(parts[2], 10);
      date = new Date(year, month, day);
      if (!isNaN(date.getTime())) return date;
    }

    return null;
  }
}