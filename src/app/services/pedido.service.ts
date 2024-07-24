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
      roupas: [
        { roupa: { tipo: 'meia', tempo: 1 }, tecido: "Outro", quantidade: 1 },
        { roupa: { tipo: 'camiseta', tempo: 5 }, tecido: "Moletom", quantidade: 1 },
        { roupa: { tipo: 'camisa', tempo: 6 }, tecido: "Elastano", quantidade: 1 }
      ],
      valor:30,
      data: '15/04/1997',
      hora: '08:03',
      status: "Em Aberto",
      clienteId: 1
    },
    {
      id:88,
      prazo:6,
      roupas:[
        {roupa: {tipo: 'meia', tempo: 1},tecido: "Outro", quantidade: 1},
        {roupa: {tipo: 'camiseta', tempo: 5},tecido: "Moletom", quantidade: 1},
        {roupa: {tipo: 'camisa',  tempo: 6},tecido: "Elastano", quantidade: 1}
      ],
      valor:70,
      data: '04/04/2024',
      hora: '10:45',
      status: "Em Aberto",
      clienteId: 4
    },
    {
      id:52,
      prazo:6,
      roupas:[
        {roupa: {tipo: 'camisa', tempo: 6},tecido: "Elastano", quantidade: 3},
        {roupa: {tipo: 'calça',  tempo: 3},tecido: "Jeans", quantidade: 1},
        {roupa: {tipo: 'camiseta', tempo: 5},tecido: "Moletom", quantidade: 5}
      ],
      valor:90,
      data: '01/03/2024',
      hora: '08:03',
      status: "Aguardando Pagamento",
      clienteId: 1
    },
    {
      id:5,
      prazo:5,
      roupas:[
        {roupa: {tipo: 'camiseta', tempo: 5},tecido: "Moletom", quantidade: 5}
      ],
      valor:50,
      data: '01/03/2024',
      hora: '08:03',
      status: "Recolhido",
      clienteId: 1
    },
    {
      id:59,
      prazo:5,
      roupas:[
        {roupa: {tipo: 'camiseta', tempo: 5},tecido: "Outro", quantidade: 5}
      ],
      valor:50,
      data: '01/02/2024',
      hora: '20:30',
      status: "Pago",
      clienteId: 2
    },
    {
      id:99,
      prazo:5,
      roupas:[
        {roupa: {tipo: 'camiseta', tempo: 5},tecido: "Outro", quantidade: 5}
      ],
      valor:50,
      data: '10/03/2024',
      hora: '10:03',
      status: "Rejeitado/Cancelado",
      clienteId: 4
    },
    {
      id:45,
      prazo:5,
      roupas:[
        {roupa: {tipo: 'camiseta', tempo: 5},tecido: "Elastano", quantidade: 5}
      ],
      valor:50,
      data: '30/01/2024',
      hora: '09:00',
      status: "Finalizado",
      clienteId: 4
    }

  ];
  addItem(valor:number,prazo:number,roupas:{ roupa: Roupa; tecido:string; quantidade: number }[]){
    let d = new Date();
    let clienteId = sessionStorage.getItem("clienteId");
    let data = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()
    let hora = String(d.getHours())+':'+String(d.getMinutes())
    let tecido="";
    if(clienteId){

      const novoPedido:Pedido={
        id:Math.floor(Math.random() * 100) + 1,
        valor:valor,
        prazo:prazo,
        roupas: roupas,
        data: data,
        hora: hora,
        status: 'Em Aberto',
        clienteId: Number(clienteId)
      }
      this.pedidos.push(novoPedido)
    } else{
      alert("Erro ao cadastrar pedido. Atualize a página e tente novamente");
    }
  }

  getPedidos(): Pedido[] {
    let clientId = sessionStorage.getItem("clienteId")
    let adminId = sessionStorage.getItem("clienteId")
    if(clientId){
      return this.pedidos.filter(p => p.clienteId == Number(clientId));
    } else if(adminId){
      return this.pedidos
    } else {
      return []
    }
  }

  getPedidosStatus(status: string): Pedido[] {
    return this.pedidos.filter(pedido => pedido.status === status);
  }

  getPedidosID(numero: number): Pedido[] {
    return this.pedidos.filter(pedido => pedido.id === numero);
  }
  updatePedidoStatus(id: number, status: string): Pedido[]{
    let index = this.pedidos.findIndex(pedido => pedido.id === id)
    this.pedidos[index] = {...this.pedidos[index], status}
    return this.pedidos
  }

  getPedidosbyInterval(start: Date, end: Date){
    return this.pedidos.filter(p => this.processDateStringtoDate(p.data) >= start && this.processDateStringtoDate(p.data) <= end)
  }

  processDateStringtoDate(date:string){
    var parts = date.split("/");
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
 }
}
