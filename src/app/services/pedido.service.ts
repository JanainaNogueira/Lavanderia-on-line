import { Injectable } from '@angular/core';
import { Pedido, Roupa } from '../Pedido';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }
  pedidos:Pedido[]=[];
  addItem(valor:number,prazo:number,roupas:Roupa[]){
    const novoPedido:Pedido={
      id:Math.floor(Math.random() * 100) + 1,
      valor:valor,
      prazo:prazo,
      roupas:roupas
    }
    this.pedidos.push(novoPedido)
    console.log(this.pedidos)
  }
}
