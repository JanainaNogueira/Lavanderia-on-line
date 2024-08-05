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
      const novoPedido={
        data: data,
        hora: hora,
        prazo:prazo,
        status: status,
        valor:valor,
        roupas: roupas,
        cliente: {id: clienteId}
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

  fetchPedidos(): Observable<Pedido[]| null>{
    let getURL = this.BASE_URL
    let clientId = sessionStorage.getItem("clienteId");
    if (clientId) {
     getURL += `/Cliente/${clientId}`
    }
    return this.httpClient.get<Pedido[]>(
     getURL,
      this.httpOptions).pipe(
        map((resp:HttpResponse<Pedido[]>)=>{
          if(resp.status===200){
            return resp.body;
          }else{
            return [];
          }
        }),
        catchError((err, caught)=>{
          if(err.status ==404){
            return of([]);
          }else{
            return throwError(()=>err);
          }
        })
      );
  }

  getPedidos(): Pedido[] {
    this.fetchPedidos().subscribe({
      next: (data: Pedido[] | null) => { if (data == null) {
        this.pedidos = [];
      }
      else {
        this.pedidos = data;
      }
    },
      error: (err) => {
        
      }
      });
    return this.pedidos;
  }

  getPedidosStatus(status: string): Pedido[] {
    return this.getPedidos().filter((p) => p.status === status)
  }

  getPedidosID(numero: number): Pedido | null {
    return this.getPedidos().find((p) => p.id === numero) || null
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
    return this.getPedidos().filter(p => this.processDateStringtoDate(p.data) >= start && this.processDateStringtoDate(p.data) <= end)
  }

  processDateStringtoDate(date:string){
    var parts = date.split("/");
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
 }
}
