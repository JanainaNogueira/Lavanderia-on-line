import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Funcionario } from '../shared/models/Funcionario';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  BASE_URL = "http://localhost:8080/Funcionario"

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    };

  constructor(private httpClient: HttpClient) { }

  private funcionarios: Funcionario[] = [ ] ;

  listarTodos(): Observable<Funcionario[] | null> {
    return this.httpClient.get<Funcionario[]>(
      this.BASE_URL,
      this.httpOptions).pipe(
      map((resp: HttpResponse<Funcionario[]>) => {
        if (resp.status === 200) {
          return resp.body;
        } else {
          return [];
        }
      }),
      catchError((err, caught) => {
        if (err.status == 404) {
          return of([]);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  buscarPorId(id: number): Observable<Funcionario | null> 
  { return this.httpClient.get<Funcionario>(
    this.BASE_URL + "/" + id, 
    this.httpOptions).pipe(
    map((resp: HttpResponse<Funcionario>) => 
      { if (resp.status==200) {
    return resp.body;
    }
    else {
    return null;
    }
    }),
    catchError((err, caught) => {
    if (err.status == 404) {
      return of (null);
    }
    else {
    return throwError(() => err);
    }
    })
  );
}
 
inserir(funcionario: Funcionario): Observable<Funcionario | null> {
  let funcionarioPost = {...funcionario, login: {login: funcionario.login, senha: funcionario.senha}, senha: undefined} 
  return this.httpClient.post<Funcionario>(this.BASE_URL,
  JSON.stringify(funcionarioPost), 
  this.httpOptions).pipe(
  map((resp: HttpResponse<Funcionario>) => 
  { if (resp.status==201) { 
    return resp.body;
  }
  else {
    return null;
  }
  }),
  catchError((err, caught) => 
  { return throwError(() => err);
  })
  );
}

remover(id: number): Observable<Funcionario | null> {
  return this.httpClient.delete<Funcionario>(this.BASE_URL + "/" + id,
  this.httpOptions).pipe(
  map((resp: HttpResponse<Funcionario>) => {
  if (resp.status==200) {
    return resp.body;
  }
  else {
  return null;
  }
  }),
  catchError((err, caught) => {
    return throwError(() => err);
  })
);
}
 

alterar(funcionario: Funcionario): Observable<Funcionario | null> {
  let funcionarioPut = {...funcionario, login: {login: funcionario.login, senha: funcionario.senha}, senha: undefined} 
  return this.httpClient.put<Funcionario>(this.BASE_URL + "/" + funcionario.id,
  JSON.stringify(funcionarioPut),
   this.httpOptions).pipe(
  map((resp: HttpResponse<Funcionario>) => { 
    if (resp.status==200) {
      return resp.body;
  }
  else {
    return null;
  }
  }),
  catchError((err, caught) => {
    return throwError(() => err);
  })
  );
}

}
 

