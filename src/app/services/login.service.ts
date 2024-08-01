import { HttpHeaders,HttpClient,HttpResponse,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login } from '../shared/models/login.model';
import { Cliente } from '../shared/models/Cliente';
import { ClienteService } from './cliente/cliente.service';
import { FuncionarioService } from './funcionario.service';


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

login(login:Login): Observable<Cliente | null>{
  return this.httpClient.post<Cliente>(this.Base_URL, JSON.stringify(login), this.httpOptions)
    .pipe(map(( resp:HttpResponse<Cliente>)=>{
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

validateLoginClient(email: string, senha: string): boolean {
  let clientes: Cliente[] = []
   this.clienteService.getClientes().subscribe(c => { if(c){
    clientes = c;
   }} );
  const cliente = clientes.find(c => c.login === email && c.senha === senha);//(A)pegar os clientes do banco
  if(cliente){
    sessionStorage.setItem("clienteId", String(cliente.id))
  }
  return cliente !== undefined
}
validateLoginFunc(email: string, senha: string): boolean {
  const funcionarios = this.funcionarioService.getFuncionarios();
  const funcionario =funcionarios.find(f => f.login === email && f.senha === senha);//(A) pegar os funcioanrio do banco
  if(funcionario){
    sessionStorage.setItem("adminId", String(funcionario.id))
  }
  return funcionario !== undefined;
}
}
