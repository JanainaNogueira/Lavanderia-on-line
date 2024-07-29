import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { Router, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../Funcionario';
import { DeleteDialogW } from '../../components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    MatCommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MenuAdminComponent,
    DeleteDialogW,
    RouterModule
  ],
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.css']
})
export class ListarFuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  nome: string;
  email: string;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getFuncionarios();
  }

  getFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe({
      next: (data) => {
        this.funcionarios = data;
        this.ordenarNome();
      },
      error: (err) => console.error('Erro ao obter funcionários:', err)
    });
  }

  ordenarNome() {
    this.funcionarios.sort((a, b) => {
      const nomeA = a.nome.toUpperCase();
      const nomeB = b.nome.toUpperCase();
      if (nomeA < nomeB) return -1;
      if (nomeA > nomeB) return 1;
      return 0;
    });
  }

  pesquisarPorNome() {
    if (!this.nome || this.nome.trim() === '') {
      this.getFuncionarios();
    } else {
      const pesquisaNome = this.nome.trim().toLowerCase();
      this.funcionarioService.getFuncionarios().subscribe({
        next: (data) => {
          this.funcionarios = data.filter(funcionario =>
            funcionario.nome.toLowerCase().includes(pesquisaNome)
          );
        },
        error: (err) => console.error('Erro ao pesquisar por nome:', err)
      });
    }
  }

  excluirFuncionario(funcionario: Funcionario): void {
    const dialogRef = this.dialog.open(DeleteDialogW, {
      width: '25vw',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { funcionario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.funcionarioService.deleteFuncionario(funcionario.id).subscribe({
          next: () => {
            this.funcionarios = this.funcionarios.filter(f => f.id !== funcionario.id);
          },
          error: (err) => console.error('Erro ao excluir funcionário:', err)
        });
      }
    });
  }
}
