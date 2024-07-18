import { PedidoService } from '../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from  '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Roupa } from '../../Pedido';
import { RoupasService } from '../../services/roupas.service';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-realizar-pedido',
  standalone: true,
  imports: [MatCardModule, MatIconModule, ReactiveFormsModule,
    CommonModule,FormsModule, MenuLateralComponent],
  templateUrl: './realizar-pedido.component.html',
  styleUrl: './realizar-pedido.component.css'
})

export class RealizarPedidoComponent {
  constructor(private pedidoService:PedidoService,private roupasService: RoupasService){}
  tiposRoupas: Roupa []= [];
  tiposTecido: string[] = ["Elastano","Moletom","Jeans","Outro"]
  //lista de montagem parcial do pedido
  listaPedido: { roupa: Roupa,tecido:string, quantidade: number }[] = [];
  valorTotal:number=0;
  prazoDeEntrega:number=0;
  tecidoSelecionado:string="";
  //pega a opção selecionada no input
  queryField = new FormControl();
  //Busca o que foi escolhido na seleção e envia para listaPedido
  ngOnInit() {
    this.tiposRoupas = this.roupasService.getRoupas();
  }

  onSearch(){
    const termoBusca=this.queryField.value;
    const itemEncontrado=this.tiposRoupas.find(item=>item.tipo.toLowerCase() === termoBusca.toLowerCase());
    if(itemEncontrado){
      const tecidoSelecionado = this.tiposTecido.find(tecido => tecido === this.tecidoSelecionado);
      if(tecidoSelecionado){
        this.listaPedido.push({roupa: itemEncontrado, tecido:tecidoSelecionado, quantidade: 1});
        this.valorTotal=this.CalculaValor();
        this.prazoDeEntrega=this.CalculaPrazo();
      }

    }
    this.queryField.reset();
  }

  CalculaValor():number{
    let total=this.listaPedido.length*10
    return total;
  }

  CalculaPrazo():number{
    let maiorTempo=0;
    for(const item of this.listaPedido){
      let tempoDoItem = item.roupa.tempo;
      if(tempoDoItem>maiorTempo){
        maiorTempo=tempoDoItem;
      }
    }
    return maiorTempo;
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
    if(this.listaPedido)
    this.pedidoService.addItem(this.valorTotal,this.prazoDeEntrega,this.listaPedido,)
  }
  LimparLista(){
    this.listaPedido=[];
    this.prazoDeEntrega=0;
    this.valorTotal=0
  }
}


