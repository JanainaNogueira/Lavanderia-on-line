import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from  '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realizar-pedido',
  standalone: true,
  imports: [MatCardModule, MatIconModule, ReactiveFormsModule,CommonModule],
  templateUrl: './realizar-pedido.component.html',
  styleUrl: './realizar-pedido.component.css'
})

export class RealizarPedidoComponent {
  roupas: (string | number) [][]= [
    ["calca", 3, "Jeans","Moletom","Elastano",5],
    ["camisa",2, "Jeans","Moletom","Elastano",6],
    ["camiseta",1, "Jeans","Moletom","Elastano",5],
    ["cueca",1, "Jeans","Moletom","Elastano",2],
    ["meia",1, "Jeans","Moletom","Elastano",1]
  ];
  //lista de montagem parcial do pedido
  listaPedido:(string|number)[][]=[
  ]
  valorTotal:number=0;
  valorTotalFormatado=this.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  prazoDeEntrega:number=0;
  //pega a opção selecionada no input
  queryField = new FormControl();
  //Busca o que foi escolhido na seleção e envia para listaPedido
  onSearch(){
    const termoBusca=this.queryField.value;
    const itemEncontrado=this.roupas.find(item=>item[0] === termoBusca);
    if(itemEncontrado){
      this.listaPedido.push(itemEncontrado)
      this.valorTotal=this.CalculaValor();
      this.prazoDeEntrega=this.CalculaPrazo();
    }
    this.queryField.reset;
  }
  CalculaValor():number{

    return this.listaPedido.length*10;
  }
  CalculaPrazo():number{
    let maiorTempo=0;
    for(const item of this.listaPedido){
      let tempoDoItem = Number(item[1]);
      if(tempoDoItem>maiorTempo){
        maiorTempo=tempoDoItem;
      }
    }
    return maiorTempo;
  }
  AddItem(){

  }
  LimparLista(){
    this.listaPedido=[];
}
}


