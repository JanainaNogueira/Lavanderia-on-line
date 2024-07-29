import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from '../../Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/Cliente';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getClienteByEmail(email: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/email/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente).pipe(
      catchError(this.handleError)
    );
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente).pipe(
      catchError(this.handleError)
    );
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocorreu um erro:', error);
    return throwError('Algo deu errado; por favor, tente novamente mais tarde.');
  }
}
