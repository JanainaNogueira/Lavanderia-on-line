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
import {Roupa} from '../../shared/models/Pedido';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { map } from 'rxjs';

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
  mensagem: string = ""
  mensagem_detalhes: string=""
  constructor(
    private RoupasService: RoupasService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRoupas();
    this.ordenarNome();
  }

  getRoupas():void {
    this.RoupasService.getRoupas().pipe(
      map(roupas => roupas?roupas.filter(roupa => roupa.descricao !== 'DELETADO'):[])
    ).subscribe({
      next:(data:Roupa[]|null)=>{
        if(data==null){
          this.roupas=data ??[];

        }else{
          this.roupas=data;
          this.ordenarNome();
        }
      },
      error:(err)=>{
        this.mensagem="Erro ao buscar lista de roupas";
        this.mensagem_detalhes = `${err.status} ${err.message}`;
        this.openDialog();
      }
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
      this.roupas = this.roupas.filter(roupa =>
        roupa.tipo.toLowerCase().includes(pesquisaNome)
      );
    }
  }

  openDialog(){
    this.dialog.open(AlertDialogComponent, {
      data: {
        mensagem: this.mensagem,
        mensagem_detalhes: this.mensagem_detalhes
      },
      width: '250px'
    });
  }
  excluirRoupa($event:any,roupa:Roupa):void{
    $event.preventDefault();
    this.mensagem="";
    this.mensagem_detalhes="";
    if(confirm(`Deseja realmente remover a roupa ${roupa.tipo}?`)){
      this.RoupasService.excluirRoupa(roupa.id!).subscribe({
        complete:()=> {
          this.getRoupas();},
        error:(err)=>{
          this.mensagem=`Erro ao remover a roupa ${roupa.tipo}`;
          this.mensagem_detalhes=`[${err.status}] ${err.message}`;
          this.openDialog();
        }
    });
  }
}
}
