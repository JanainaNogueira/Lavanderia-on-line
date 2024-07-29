import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pedido, Roupa } from '../Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/Pedidos';

  constructor(private http: HttpClient) { }


  addPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido)
      .pipe(
        catchError(this.handleError)
      );
  }


  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }


  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  updatePedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido)
      .pipe(
        catchError(this.handleError)
      );
  }


  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  getPedidosByStatus(status: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}?status=${status}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError('Ocorreu um erro ao processar a requisição. Por favor, tente novamente mais tarde.');
  }
}
