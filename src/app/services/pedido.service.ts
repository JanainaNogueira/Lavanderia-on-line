import { Injectable } from '@angular/core';
import { Pedido, Roupa } from '../Pedido';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }
  pedidos:Pedido[]=[
    {
      id:97,
      prazo:6,
      roupas:[
        {tipo: 'meia', tecido: Array(4), tempo: 1, quantidade: 1},
        {tipo: 'camiseta', tecido: Array(4), tempo: 5, quantidade: 1},
        {tipo: 'camisa', tecido: Array(4), tempo: 6, quantidade: 1}
      ],
      valor:30,
      data: '15/04/1997',
      hora: '08:03',
      status: "Em Aberto"
    }
  ];
  addItem(valor:number,prazo:number,roupas:Roupa[]){
    let d = new Date();
    let data = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()
    let hora = String(d.getHours())+':'+String(d.getMinutes())
    const novoPedido:Pedido={
      id:Math.floor(Math.random() * 100) + 1,
      valor:valor,
      prazo:prazo,
      roupas:roupas,
      data,
      hora,
      status: 'Em Aberto'
    }
    this.pedidos.push(novoPedido)
    console.log(this.pedidos)
  }
}
