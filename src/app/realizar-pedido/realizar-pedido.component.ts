import { PedidoService } from '../services/pedido.service';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from  '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Roupa } from '../Pedido';

@Component({
  selector: 'app-realizar-pedido',
  standalone: true,
  imports: [MatCardModule, MatIconModule, ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './realizar-pedido.component.html',
  styleUrl: './realizar-pedido.component.css'
})

export class RealizarPedidoComponent {
  constructor(private pedidoService:PedidoService){}
  roupas: Roupa []= [
    {tipo:"calca", tecido:["Jeans","Moletom","Elastano","Outro"], tempo:5,quantidade:1,},
    {tipo:"camisa", tecido:["Jeans","Moletom","Elastano","Outro"],tempo:6,quantidade:1},
    {tipo:"camiseta",tecido:["Jeans","Moletom","Elastano","Outro"],tempo: 5,quantidade:1},
    {tipo:"cueca",tecido:["Jeans","Moletom","Elastano","Outro"],tempo:2,quantidade:1},
    {tipo:"meia",tecido:["Jeans","Moletom","Elastano","Outro"],tempo:1,quantidade:1}
  ];
  //lista de montagem parcial do pedido
  listaPedido:Roupa[]=[
  ]
  valorTotal:number=0;
  prazoDeEntrega:number=0;
  tecidoSelecionado:string="";
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
    let total=this.listaPedido.length*10
    return total;
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
    if(this.listaPedido)
    this.pedidoService.addItem(this.valorTotal,this.prazoDeEntrega,this.listaPedido)
  }
  LimparLista(){
    this.listaPedido=[];
    this.prazoDeEntrega=0;
    this.valorTotal=0
  }
}


