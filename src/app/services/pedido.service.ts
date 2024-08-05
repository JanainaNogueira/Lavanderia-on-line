import { Injectable } from '@angular/core';
import { Pedido, Roupa } from '../shared/models/Pedido';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  BASE_URL='http://localhost:8080/Pedidos'
  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient:HttpClient) { }
  pedidos:Pedido[]=[];

  addItem(valor:number,prazo:number,roupas:{ roupa: Roupa;quantidade: number }[],status:string){
    let d = new Date();
    let clienteId = sessionStorage.getItem("clienteId");
    let data = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()
    let hora = String(d.getHours())+':'+String(d.getMinutes())
    if(clienteId){
      const novoPedido:Pedido={
        id:Math.floor(Math.random() * 100) + 1,
        data: data,
        hora: hora,
        prazo:prazo,
        status: status,
        valor:valor,

        roupas: roupas,



        clienteId: Number(clienteId)
      }
      return this.httpClient.post<Pedido>(
        this.BASE_URL,
        JSON.stringify(novoPedido),
        {observe:'response',headers:this.httpOptions.headers}
        ).pipe(
          map((resp:HttpResponse<Pedido>) =>
          {
            if(resp.status==201){
              return resp.body;
            }else{
              return null;
            }
          }),
          catchError((err,caught)=>{
            console.error('Erro ocorreu  AQUI:', err);
            return throwError(()=>err);
          })
        );
    }else{
      console.log('Não foi possivel encontrar o id da sessão.');
      return of(null);
    }
  }

  getPedidos(): Pedido[] {
    let clientId = sessionStorage.getItem("clienteId")
    let adminId = sessionStorage.getItem("adminId")
    if(clientId){
      return this.pedidos.filter(p => p.clienteId == Number(clientId));
    } else if(adminId){
      return this.pedidos
    } else {
      return []
    }
  }

  getPedidosStatus(status: string): Pedido[] {
    let clientId = sessionStorage.getItem("clienteId");
    let adminId = sessionStorage.getItem("adminId");
    if (clientId) {
      return this.pedidos.filter(p => p.clienteId == Number(clientId) && p.status === status);
    } else if (adminId) {
      return this.pedidos.filter(p => p.status === status);
    } else {
      return [];
    }
  }

  getPedidosID(numero: number): Pedido[] {
    let clientId = sessionStorage.getItem("clienteId");
    let adminId = sessionStorage.getItem("adminId");
    if (clientId) {
      return this.pedidos.filter(p => p.clienteId == Number(clientId) && p.id === numero);
    } else if (adminId) {
      return this.pedidos.filter(p => p.id === numero);
    } else {
      return [];
    }
  }

  updatePedidoStatus(id: number | undefined, status: string): Pedido[]{
    if(!id){
      return []
    }
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
