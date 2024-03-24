import { PedidoService } from '../services/pedido.service';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from  '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Roupa } from '../Pedido';

@Component({
  selector: 'app-realizar-pedido',
  standalone: true,
  imports: [MatCardModule, MatIconModule, ReactiveFormsModule,CommonModule],
  templateUrl: './realizar-pedido.component.html',
  styleUrl: './realizar-pedido.component.css'
})


export class RealizarPedidoComponent {
  constructor(private pedidoService:PedidoService){}
  roupas: Roupa []= [
    {tipo:"calca", tecido:["Jeans","Moletom","Elastano"], tempo:5},
    {tipo:"camisa", tecido:["Jeans","Moletom","Elastano"],tempo:6},
    {tipo:"camiseta",tecido:["Jeans","Moletom","Elastano"],tempo: 5},
    {tipo:"cueca",tecido:["Jeans","Moletom","Elastano"],tempo:2},
    {tipo:"meia",tecido:["Jeans","Moletom","Elastano"],tempo:1}
  ];
  //lista de montagem parcial do pedido
  listaPedido:Roupa[]=[
  ]
  valorTotal:number=0;
  valorTotalFormatado=this.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  prazoDeEntrega:number=0;
  //pega a opção selecionada no input
  queryField = new FormControl();
  //Busca o que foi escolhido na seleção e envia para listaPedido
  onSearch(){
    const termoBusca=this.queryField.value;
    const itemEncontrado=this.roupas.find(item=>item.tipo.toLowerCase() === termoBusca.toLowerCase());
    if(itemEncontrado){
      this.listaPedido.push(itemEncontrado);
      this.valorTotal=this.CalculaValor();
      this.prazoDeEntrega=this.CalculaPrazo();
    }
    this.queryField.reset();
  }
  CalculaValor():number{

    return this.listaPedido.length*10;
  }
  CalculaPrazo():number{
    let maiorTempo=0;
    for(const item of this.listaPedido){
      let tempoDoItem = Number(item.tempo);
      if(tempoDoItem>maiorTempo){
        maiorTempo=tempoDoItem;
      }
    }
    return maiorTempo;
  }
  ButtonAddItem(){
    this.pedidoService.addItem(this.valorTotal,this.prazoDeEntrega,this.listaPedido)
  }
  LimparLista(){
    this.listaPedido=[];
    this.prazoDeEntrega=0;
}
}


