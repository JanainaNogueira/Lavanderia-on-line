import { Injectable } from '@angular/core';
import {Roupa} from '../shared/models/Pedido'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

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
          if(resp.status==201){
            return resp.body;
          }else{
            return null;
          }
        }),
        catchError((err,caught)=>{
          return throwError(()=>err);
        })
      );
  }

  getRoupaById(id: number): Observable<Roupa | null> {
    return this.httpClient.get<Roupa>(
      this.BASE_URL+"/"+id,
      this.httpOptions)
      .pipe(
        map((resp:HttpResponse<Roupa>)=>{
          if(resp.status==200){
            return resp.body;
          }else{
            return null;
          }
        }),
        catchError((err,caught)=>{
          if(err.status==404){
            return of (null);
          }else{
            return throwError(()=>err);
          }
        })
      );
  }

  getRoupas(): Observable<Roupa[]| null>{
    console.log();
    return this.httpClient.get<Roupa[]>(
      this.BASE_URL,
      this.httpOptions).pipe(
        map((resp:HttpResponse<Roupa[]>)=>{
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
  excluirRoupa(id:number): Observable<Roupa|null> {
    return this.httpClient.delete<Roupa>(
      this.BASE_URL+"/"+id, this.httpOptions).pipe(
        map((resp:HttpResponse<Roupa>)=>{
          if(resp.status==200){
            return resp.body;
          }else{
            return null;
          }
        }),
        catchError((err,caught)=>{
          return throwError(()=>err);
        })
      );
  }
  editarRoupa(roupaAtualizada: Roupa):Observable<Roupa | null>{
    let roupaPut = {...roupaAtualizada,tipo:roupaAtualizada.tipo,preco:roupaAtualizada.precoRoupa,tempo:roupaAtualizada.tempo}
    return this.httpClient.put<Roupa>(
      this.BASE_URL+"/"+roupaAtualizada.id,
      JSON.stringify(roupaPut),
        this.httpOptions).pipe(
        map((resp:HttpResponse<Roupa>)=>{
          if(resp.status==200){
            return resp.body;
          }else{
            return null;
          }
        }),
        catchError((err,caught)=>{
          return throwError(()=>err);
        })
      )
  }
}
