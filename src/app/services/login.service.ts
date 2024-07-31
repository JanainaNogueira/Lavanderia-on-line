import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
Base_URL = "http://localhost:300/usuarios";
httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
constructor(private httpClient: HttpClient) { }
login(login:Login): Observable<Usuario | null>{
  return this.httpCliente.get<Usuario[]>(this.Base_URL, this.httpOptions)
    .pipe(map(lista =>{
      let usu = lista.find(u => u.login === login.login && u.senha === login.senha)
      if(usu != undefined){
        return usu;
      }else{
        return null;
      }
    }))
}

}
