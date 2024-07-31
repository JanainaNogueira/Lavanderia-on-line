import { EmailService } from '../email.service';
import { Injectable } from '@angular/core';
import { Cliente } from '../../Cliente';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError, map, of } from 'rxjs';


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
  private clientes:Cliente[]=[
    {
      id: 1,
      nome:"Jose",
      email: "jose@email.com",
      cpf: "098654723454",
      endereço: "Rua X Nº Y, Bairro, Cidade",
      telefone: "(041) 000000000",
      senha: "0000",
    },
    {
      id: 2,
      nome:"Maria",
      email: "maria@email.com",
      cpf: "098654222254",
      endereço: "Rua X Nº Y, Bairro, Cidade",
      telefone: "(041) 000000000",
      senha: "1111",
    },
    {
      id: 4,
      nome:"Joao",
      email: "Joao@email.com",
      cpf: "0983245623454",
      endereço: "Rua X Nº Y, Bairro, Cidade",
      telefone: "(041) 000000000",
      senha: "2222",
    },
  ];

  inserir(cliente: Cliente): Observable<Cliente | null> {
    return this.httpClient.post<Cliente>(this.BASE_URL, 
      JSON.stringify(cliente), 
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
      id: Math.round(Math.random() * 1000000),
      nome: nome,
      email: email,
      cpf: cpf,
      endereço: endereco,
      telefone: telefone,
      senha: Math.floor(1000 + Math.random() * 9000).toString()
    };

    const exists = this.clientes.some(cliente => cliente.cpf === cpf);
    if (exists) {
      return;
    } else {
      this.clientes.push(novoCliente);
      this.sendEmail(novoCliente);
      console.log(this.clientes);
      return this.inserir(novoCliente);
    }
  }

  sendEmail(cliente:Cliente){
    this.emailService.sendEmail({
      to_name: cliente.nome,
      from_name: 'Lavanderia Lol',
      message:  `Sua senha é: ${cliente.senha}`,
      reply_to: cliente.email
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

  validateLogin(email: string, senha: string): boolean {
    const cliente = this.clientes.find(c => c.email === email && c.senha === senha);

    if(cliente){
      sessionStorage.setItem("clienteId", String(cliente.id))
    }
    return cliente !== undefined
  }

}
