import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {Cliente } from '../../Cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }
  private clientes:Cliente[]=[
    {
      id: 1,
      pedidos: [],
      nome:"Jose",
      email: "jose@email.com",
      cpf: "098654723454",
      endereço: "Rua X Nº Y, Bairro, Cidade",
      telefone: "(041) 000000000",
    },
    {
      id: 2,
      pedidos: [],
      nome:"Maria",
      email: "maria@email.com",
      cpf: "098654222254",
      endereço: "Rua X Nº Y, Bairro, Cidade",
      telefone: "(041) 000000000",
    },
    {
      id: 4,
      pedidos: [],
      nome:"Joao",
      email: "Joao@email.com",
      cpf: "0983245623454",
      endereço: "Rua X Nº Y, Bairro, Cidade",
      telefone: "(041) 000000000",
    },
  ];
 

  getClientes(): Cliente[] {
    return this.clientes;
  }

}
