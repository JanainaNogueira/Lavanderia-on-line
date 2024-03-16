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
    ["calca", 3, "Jeans","Moletom","Elastano"],
    ["camisa",2, "Jeans","Moletom","Elastano"],
    ["camiseta",1, "Jeans","Moletom","Elastano"],
    ["cueca",1, "Jeans","Moletom","Elastano"],
    ["meia",1, "Jeans","Moletom","Elastano"]
  ];
  listaPedido:(string|number)[][]=[
    ["camiseta",1, "Jeans","Moletom","Elastano"],
    ["cueca",1, "Jeans","Moletom","Elastano"],
  ]
  queryField = new FormControl();

  onSearch(){
    const termoBusca=this.queryField.value;
    const itemEncontrado=this.roupas.find(item=>item[0] === termoBusca);
    if(itemEncontrado){
      this.listaPedido.push(itemEncontrado)
      console.log(itemEncontrado)
    }
    this.queryField.reset;
  }
}

function CalculaValor(){

}
