import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Funcionario } from '../Funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:8080/Funcionario';

  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getFuncionarioByEmail(email: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/email/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  addFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario).pipe(
      catchError(this.handleError)
    );
  }

    updateFuncionario(id: number, funcionario: Funcionario): Observable<Funcionario> {
      return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, funcionario).pipe(
        catchError(this.handleError)
      );
    }

  deleteFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocorreu um erro:', error);
    return throwError('Algo deu errado; por favor, tente novamente mais tarde.');
  }
}
