import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface LoginResponseCliente {
  id: number;
  nome: string;
  email: string;
  role: 'Cliente';
}

interface LoginResponseFuncionario {
  id: number;
  nome: string;
  email: string;
  role: 'Funcionario'; 
}

type LoginResponse = LoginResponseCliente | LoginResponseFuncionario;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  login(login: string, senha: string): Observable<LoginResponse> {
    const loginData = { login, senha };
    return this.http.post<LoginResponse>(this.apiUrl, loginData).pipe(
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
    return throwError('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
  }
}
