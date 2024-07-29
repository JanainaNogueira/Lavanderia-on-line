import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { Router, RouterModule } from '@angular/router';
import { RoupasService } from '../../services/roupas.service';
import { Roupa } from '../../Pedido';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-roupas',
  standalone: true,
  imports: [CommonModule, MatCommonModule, MatButtonModule, MatInputModule,
    MatIconModule, FormsModule, MenuAdminComponent, DeleteDialog, RouterModule],
  templateUrl: './listar-roupas.component.html',
  styleUrls: ['./listar-roupas.component.css']
})
export class ListarRoupasComponent implements OnInit {
  roupas: Roupa[] = [];
  nome: string;

  constructor(
    private roupasService: RoupasService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRoupas();
  }

  getRoupas() {
    this.roupasService.getRoupas().subscribe({
      next: (data) => {
        this.roupas = data;
        this.ordenarNome();
      },
      error: (err) => console.error('Erro ao obter roupas:', err)
    });
  }

  ordenarNome() {
    this.roupas.sort((a, b) => {
      const tipoA = a.tipo ? a.tipo.toUpperCase() : '';
      const tipoB = b.tipo ? b.tipo.toUpperCase() : '';
      if (tipoA < tipoB) {
        return -1;
      }
      if (tipoA > tipoB) {
        return 1;
      }
      return 0;
    });
  }

  pesquisarPorNome() {
    if (!this.nome || this.nome.trim() === '') {
      this.getRoupas();
    } else {
      const pesquisaNome = this.nome.trim().toLowerCase();
      this.roupasService.getRoupas().subscribe({
        next: (data) => {
          this.roupas = data.filter(roupa =>
            roupa.tipo.toLowerCase().includes(pesquisaNome)
          );
          this.ordenarNome();
        },
        error: (err) => console.error('Erro ao pesquisar por nome:', err)
      });
    }
  }

  openDialog(tipo: string) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '25vw',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { tipo }
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          return this.roupasService.excluirRoupa(tipo);
        }
        return [];
      })
    ).subscribe({
      next: () => {
        this.getRoupas();
        alert('Roupa excluída com sucesso');
      },
      error: (err) => console.error('Erro ao excluir roupa:', err)
    });
  }
}
