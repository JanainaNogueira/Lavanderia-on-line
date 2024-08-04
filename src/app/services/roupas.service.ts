import { Injectable } from '@angular/core';
import {Roupa} from '../shared/models/Pedido'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoupasService {
  BASE_URL = "http://localhost:8080/Roupas"

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient:HttpClient) { }
  private roupas:Roupa[]=[];
  addRoupa(tipo:string,tempo:number, precoRoupa: number):Observable<Roupa|null>{
    let novaRoupa:Roupa={
      descricao: 'Ativo',
      precoRoupa,
      tempo,
      tipo,
    };
    return this.httpClient.post<Roupa>(this.BASE_URL,
      JSON.stringify(novaRoupa),
      this.httpOptions).pipe(
        map((resp:HttpResponse<Roupa>)=>
        {
          console.log('Resposta recebida:', resp);
          if(resp.status==201){
            return resp.body;
          }else{
            return null;
          }
        }),
        catchError((err,caught)=>{
          console.log('error:',novaRoupa,err);
          return throwError(()=>err);
        })
      );
  }

  getRoupaByTipo(tipo: string): Roupa | undefined {
    return this.roupas.find(roupa => roupa.tipo === tipo);
  }
  getRoupas(): Roupa[] {
    return this.roupas;
  }
  excluirRoupa(tipo: string): void {
    this.roupas = this.roupas.filter(roupas => roupas.tipo !== tipo);
  }
  editarRoupa(roupaAtualizada: Roupa) {
    const index = this.roupas.findIndex(roupa => roupa.tipo === roupaAtualizada.tipo);
    if (index !== -1) {
      this.roupas[index] = roupaAtualizada;
    }
  }
}
