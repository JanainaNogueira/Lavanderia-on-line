import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { Router, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../shared/models/Funcionario';
import { DeleteDialogW } from '../../components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-listar-funcionario',
  standalone: true,
  imports: [CommonModule,MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,DeleteDialogW,RouterModule],
  templateUrl: './listar-funcionario.component.html',
  styleUrl: './listar-funcionario.component.css'
})
export class ListarFuncionarioComponent {
  funcionario: Funcionario[] = [];
  nome: string;
  email: string;

  constructor(
    private FuncionarioService: FuncionarioService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getFuncionarios();
    this.ordenarNome();
  }

  getFuncionarios() {
    this.funcionario = this.FuncionarioService.getFuncionarios();
  }

  ordenarNome() {
    this.funcionario.sort((a, b) => {
      const nomeA = a.nome.toUpperCase();
      const nomeB = b.nome.toUpperCase();
      if (nomeA < nomeB) {
        return -1;
      }
      if (nomeA > nomeB) {
        return 1;
      }
      return 0;
    });
  }

  pesquisarPorNome() {
      if (!this.nome || this.nome.trim() === '') {
        this.getFuncionarios();
      } else {
        const pesquisaNome = this.nome.trim().toLowerCase();
        this.funcionario = this.FuncionarioService.getFuncionarios().filter(funcionario =>
          funcionario.nome.toLowerCase().includes(pesquisaNome)
        );
      }
    }

    excluirFuncionario(funcionario: Funcionario): void {

      const dialogRef = this.dialog.open(DeleteDialogW, {
        width: '25vw',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const index = this.funcionario.indexOf(funcionario);
          if (index >= 0) {
            this.funcionario.splice(index, 1);
            this.FuncionarioService.excluirFuncionario(funcionario.login);
          }
        }
      });
    }
  }
