import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Roupa } from '../Pedido';

@Injectable({
  providedIn: 'root'
})
export class RoupasService {
  private apiUrl = 'http://localhost:8080/Roupas';

  constructor(private http: HttpClient) {}

 
  addRoupa(roupa: Roupa): Observable<Roupa> {
    return this.http.post<Roupa>(this.apiUrl, roupa).pipe(
      catchError(this.handleError)
    );
  }

  getRoupas(): Observable<Roupa[]> {
    return this.http.get<Roupa[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getRoupaByTipo(tipo: string): Observable<Roupa> {
    return this.http.get<Roupa>(`${this.apiUrl}/${tipo}`).pipe(
      catchError(this.handleError)
    );
  }

 
  excluirRoupa(tipo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tipo}`).pipe(
      catchError(this.handleError)
    );
  }

  
  editarRoupa(tipo: string, roupa: Roupa): Observable<Roupa> {
    return this.http.put<Roupa>(`${this.apiUrl}/${tipo}`, roupa).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    console.error(`Erro: ${error.message}`);
    return throwError('Erro ao realizar a operação. Tente novamente mais tarde.');
  }
}
