import { EmailService } from '../email.service';
import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {Cliente } from '../../Cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private emailService: EmailService) { }
  private clientes:Cliente[]=[
    {
      id: 1,
      pedidos: [],
      nome:"Jose",
      email: "jose@email.com",
      cpf: "098654723454",
      endereço: "Rua X Nº Y, Bairro, Cidade",
      telefone: "(041) 000000000",
      senha: "0000",
    },
    {
      id: 2,
      pedidos: [],
      nome:"Maria",
      email: "maria@email.com",
      cpf: "098654222254",
      endereço: "Rua X Nº Y, Bairro, Cidade",
      telefone: "(041) 000000000",
      senha: "1111",
    },
    {
      id: 4,
      pedidos: [],
      nome:"Joao",
      email: "Joao@email.com",
      cpf: "0983245623454",
      endereço: "Rua X Nº Y, Bairro, Cidade",
      telefone: "(041) 000000000",
      senha: "2222",
    },
  ];

  CreateCliente(nome:string, email: string,cpf: string,endereco: string,telefone: string){
    const novoCliente:Cliente={
      id:Math.round(Math.random()*1000000),
      pedidos: [],
      nome:nome,
      email: email,
      cpf: cpf,
      endereço: endereco,
      telefone: telefone,
      senha: Math.floor(1000 + Math.random() * 9000).toString()
    }
    const exists = this.clientes.some(cliente => cliente.cpf === cpf);
    if (exists) {
      return;
    }else{
      this.clientes.push(novoCliente)
      this.sendEmail(novoCliente)
      console.log(this.clientes)
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
  getClientes(): Cliente[] {
    return this.clientes;
  }
  getClientebyId(id: number): Cliente | undefined{
    return this.clientes.find(c => c.id === id)
  }

  validateLogin(email: string, senha: string): boolean {
    const cliente = this.clientes.find(c => c.email === email && c.senha === senha);

    if(cliente){
      sessionStorage.setItem("clienteId", String(cliente.id))
    }
    return cliente !== undefined
  }

}
