import { EmailService } from '../email.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError, map, of } from 'rxjs';
import {Cliente } from '../../shared/models/Cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  BASE_URL = "http://localhost:8080/Cliente";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    };

  constructor(
    private emailService: EmailService,
    private httpClient: HttpClient
    ) { }
  private clientes:Cliente[]=[ ];

  inserir(cliente: Cliente): Observable<Cliente | null> {
    let cPost = {...cliente, login: {login: cliente.login, senha: cliente.senha}}
    return this.httpClient.post<Cliente>(this.BASE_URL,
      JSON.stringify(cPost),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Cliente>) => {
          if (resp.status==201) {
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

  CreateCliente(nome: string, email: string, cpf: string, endereco: string, telefone: string): Observable<Cliente | null> | void {
    const novoCliente: Cliente = {
      nome: nome,
      login: email,
      cpf: cpf,
      endereco: endereco,
      telefone: telefone,
      senha: Math.floor(1000 + Math.random() * 9000).toString()
    };
    this.inserir(novoCliente).subscribe((clientReturn) => {
      if(clientReturn){
        this.clientes.push(novoCliente);
        this.sendEmail(novoCliente);
      }
    })



  }




  sendEmail(cliente:Cliente){
    this.emailService.sendEmail({
      to_name: cliente.nome,
      from_name: 'Lavanderia Lol',
      message:  `Sua senha é: ${cliente.senha}`,
      reply_to: cliente.login
    }).then((response) => {
      console.log(this.emailService.sendEmail)
      console.log('Email enviado com sucesso!', response.status, response.text);
    }).catch((error) => {
      console.error('Erro ao enviar email:', error);
    });
  }

  getClientes(): Observable<Cliente[] | null> {
    return this.httpClient.get<Cliente[]>(
      this.BASE_URL,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Cliente[]>) => {
          if (resp.status==200) {
            return resp.body;
          }
          else {
            return [];
          }
        }),
        catchError((err,caught) => {
          if (err.status == 404) {
            return of([]);
          }
          else {
            return throwError(() => err);
          }
        })
      );
    }

  getClientebyId(id: number): Observable<Cliente | null> {
    return this.httpClient.get<Cliente>(
      this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Cliente>) => {
          if (resp.status==200) {
            return resp.body;
          }
          else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of(null);
          }
          else {
            return throwError(() => err);
          }
        })
      );
  }


}
