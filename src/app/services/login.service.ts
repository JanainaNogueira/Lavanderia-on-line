import { HttpHeaders,HttpClient,HttpResponse,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login } from '../shared/models/login.model';
import { Cliente } from '../shared/models/Cliente';
import { ClienteService } from './cliente/cliente.service';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from '../shared/models/Funcionario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
Base_URL = "http://localhost:8080/login";
httpOptions={
  observe:"response" as "response",
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
constructor(
  private httpClient: HttpClient,
  private clienteService:ClienteService,
  private funcionarioService:FuncionarioService
) { }

login(login:Login): Observable<Cliente | Funcionario |null>{
  return this.httpClient.post<Cliente | Funcionario>(this.Base_URL, JSON.stringify(login), this.httpOptions)
    .pipe(map(( resp:HttpResponse<Cliente | Funcionario>)=>{
      if(resp.status == 200){
        console.log(resp.body);
        return resp.body;
      }else{
        console.log(resp.body);
        return null;
      }
    }),
    catchError((err)=>{
      if(err.status == 401){
        return of(null);
      }else{
        return throwError(()=> err);
      }
    })
  )
}

}
