import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { Router, RouterModule } from '@angular/router';
import { RoupasService } from '../../services/roupas.service';
import {Roupa} from '../../Pedido';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-listar-roupas',
  standalone: true,
  imports: [CommonModule,MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,DeleteDialog,RouterModule, DeleteDialog ],
  templateUrl: './listar-roupas.component.html',
  styleUrl: './listar-roupas.component.css'
})
export class ListarRoupasComponent {
  roupas: Roupa[] = [];
  nome: string;

  constructor(
    private RoupasService: RoupasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRoupas();
    this.ordenarNome();
  }

  getRoupas() {
    this.roupas = this.RoupasService.getRoupas();
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
        this.roupas = this.RoupasService.getRoupas().filter(roupa =>
          roupa.tipo.toLowerCase().includes(pesquisaNome)
        );
      }
  }

  openDialog(num:string){

  }
  excluirRoupa(roupa:Roupa){
    const confirmacao = confirm(`Tem certeza que deseja excluir a roupa ${roupa.tipo}?`);
    if (confirmacao) {
      this.roupas = this.roupas.filter(r => r !== roupa);
      this.ordenarNome();
    }
  }
}
