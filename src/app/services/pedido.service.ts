import { Injectable } from '@angular/core';
import { Pedido, Roupa } from '../Pedido';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }
  pedidos:Pedido[];
  addItem(valor:number,prazo:number,roupas:Roupa[]){
    const number = Math.floor(Math.random() * 100) + 1;
    console.log("aciona service")
  }
}
