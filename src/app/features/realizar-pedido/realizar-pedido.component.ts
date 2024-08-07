import { PedidoService } from '../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from  '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Roupa } from '../../shared/models/Pedido';
import { RoupasService } from '../../services/roupas.service';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { OrcamentoDialogComponent } from '../../components/orcamento-dialog/orcamento-dialog.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-realizar-pedido',
  standalone: true,
  imports: [MatCardModule, MatIconModule, ReactiveFormsModule,
    CommonModule,FormsModule, MenuLateralComponent],
  templateUrl: './realizar-pedido.component.html',
  styleUrl: './realizar-pedido.component.css'
})

export class RealizarPedidoComponent {
  constructor(private pedidoService:PedidoService,private roupasService: RoupasService, private dialog: MatDialog ){}
  tiposRoupas: Roupa []= [];
  //lista de montagem parcial do pedido
  listaPedido: { roupa: Roupa, quantidade: number }[] = [];
  itemTemp:{roupa:Roupa, quantidade:number}[]=[];
  valorTotal:number=0;
  prazoDeEntrega:number=0;
  tecidoSelecionado:string="";
  //pega a opção selecionada no input
  queryField = new FormControl();
  //Busca o que foi escolhido na seleção e envia para listaPedido
  ngOnInit() {
    this.roupasService.getRoupas().pipe(
      map(roupas => roupas?roupas.filter(roupa => roupa.descricao !== 'DELETADO'):[])
    ).subscribe({
      next:(roupas:Roupa[]|null)=>{
        if(roupas==null){
          this.tiposRoupas=roupas??[];
        }else{
          this.tiposRoupas=roupas;
        }
      }
    });
  }

  onSearch(){
    const termoBusca=this.queryField.value;
    const itemEncontrado=this.tiposRoupas.find(
      item=>item.tipo.toLowerCase() === termoBusca.toLowerCase());

    if(itemEncontrado){
        this.listaPedido.push({roupa: itemEncontrado,quantidade: 1});
        this.valorTotal=this.CalculaValor();
        this.prazoDeEntrega=this.CalculaPrazo();

    }
    this.queryField.reset();
  }

  CalculaValor():number{
    return this.listaPedido.reduce((total, item) => total + item.roupa.precoRoupa*item.quantidade, 0);
  }

  CalculaPrazo():number{
    return this.listaPedido.reduce((max, item) => Math.max(max, item.roupa.tempo), 0);
  }
  addItem(tipo:string){
    const item =this.listaPedido.find(item=>item.roupa.tipo === tipo);
    if(item){
      item.quantidade++;
      this.valorTotal = this.CalculaValor();
      this.prazoDeEntrega = this.CalculaPrazo();
    }
  }
  removeItem(tipo:string){
    const item = this.listaPedido.find(item => item.roupa.tipo=== tipo);
    if (item && item.quantidade > 0) {
      item.quantidade--;
      if (item.quantidade === 0) {
        this.listaPedido = this.listaPedido.filter(i => i.roupa.tipo !== tipo);
      }
      this.valorTotal = this.CalculaValor();
      this.prazoDeEntrega = this.CalculaPrazo();
    }
  }
  FinalizarPedido(){
    const dialogRef = this.dialog.open(OrcamentoDialogComponent, {
      width: '450px',
      data: { valorTotal: this.valorTotal, prazoDeEntrega: this.prazoDeEntrega }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pedidoService.addItem(this.valorTotal, this.prazoDeEntrega, this.listaPedido, 'Em Aberto').subscribe({
          next: (pedido) => {
            if (pedido) {
              console.log('Pedido enviado com sucesso:', pedido);
              this.LimparLista();
            }
          },
          error: (error) => {
            console.error('Erro ao enviar o pedido aqui:', error);
          }
        });
      } else {
        this.pedidoService.addItem(this.valorTotal, this.prazoDeEntrega, this.listaPedido, 'Rejeitado').subscribe({
          next: (pedido) => {
            if (pedido) {
              console.log('Pedido rejeitado e enviado com sucesso:', pedido);
              this.LimparLista();
            }
          },
          error: (error) => {
            console.error('Erro ao enviar o pedido:', error);
          }
        });
      }
    });
  }
  LimparLista(){
    this.listaPedido=[];
    this.prazoDeEntrega=0;
    this.valorTotal=0
  }
}


