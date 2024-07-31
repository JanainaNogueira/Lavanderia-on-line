import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { Router, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../Funcionario';
import { DeleteDialogW } from '../../components/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-listar-funcionario',
  standalone: true,
  imports: [CommonModule,MatCommonModule,MatButtonModule,MatInputModule, 
    MatIconModule,FormsModule, MenuAdminComponent,DeleteDialogW,RouterModule,MatDialogModule,
  ],
  templateUrl: './listar-funcionario.component.html',
  styleUrl: './listar-funcionario.component.css'
})
export class ListarFuncionarioComponent implements OnInit {
  funcionario: Funcionario[] = [];
  mensagem: string = ""
  mensagem_detalhes: string=""
  nome: string;
  email: string;

  constructor(
    private FuncionarioService: FuncionarioService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  openDialog() {
    this.dialog.open(AlertDialogComponent, {
      data: {
        mensagem: this.mensagem,
        mensagem_detalhes: this.mensagem_detalhes
      },
      width: '250px'
    });
  }

  ngOnInit() {
    this.listarTodos();
    this.ordenarNome();
  }

  
listarTodos (): Funcionario[] {
  this.FuncionarioService.listarTodos().subscribe({ 
  next: (data: Funcionario[] | null) => { if (data == null) {
  this.funcionario = [];
  }
  else {
    this.funcionario = data;
  }
},
  error: (err) => {
    this.mensagem = "Erro buscando lista de funcionários"; 
    this.mensagem_detalhes = `[${err.status}} ${err.message}`;
    this.openDialog();
  }
  });
  return this.funcionario;
}

remover($event: any, funcionario: Funcionario): void {
  $event.preventDefault();
  this.mensagem = "";
  this.mensagem_detalhes = "";
  if (confirm (`Deseja realmente remover o funcionário ${funcionario.nome}?`)) { 
    this.FuncionarioService.remover (funcionario.id!).
  subscribe({
    complete: () => { this.listarTodos(); },
    error: (err) => {
    this.mensagem = `Erro removendo funcionário $(funcionario.id} - ${funcionario.nome}`; 
    this.mensagem_detalhes = `[${err.status}] ${err.message}`;
    this.openDialog();
    }
  });
  }
}

pesquisarPorNome() {
  if (!this.nome || this.nome.trim() === '') {
    this.FuncionarioService.listarTodos().subscribe(funcionarios => {
      this.funcionario = funcionarios || []; 
    });
  } else {
    const pesquisaNome = this.nome.trim().toLowerCase();
    this.FuncionarioService.listarTodos().subscribe(funcionarios => {
      this.funcionario = (funcionarios || []).filter(funcionario =>
        funcionario.nome.toLowerCase().includes(pesquisaNome)
      );
    });
  }
}

ordenarNome() {
  if (Array.isArray(this.funcionario)) {
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
  } else {
    console.warn('A lista de funcionários não está definida ou não é um array.');
  }
}



}

/*
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
            this.FuncionarioService.excluirFuncionario(funcionario.email);
          }
        }
      });
    }
  } */