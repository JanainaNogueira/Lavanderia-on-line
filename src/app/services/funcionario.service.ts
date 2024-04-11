import { Injectable } from '@angular/core';
import { Funcionario } from '../Funcionario';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  constructor() { }
  funcionarios:Funcionario[]=[
    {
      email:'mario.lol@email.com',
      nome:'Mario da Silva',
      nascimento:'02/07/2001',
      senha:'1234'
      
    },
    {
      email:'maria.lol@email.com',
      nome:'Maria Joaquina Pereira',
      nascimento:'07/12/2001',
      senha:'1234'
      
    },
    {
      email:'thor.lol@email.com',
      nome:'Thor Ferreira',
      nascimento:'23/04/2003',
      senha:'1234'
      
    },
    {
      email:'fabricio.lol@email.com',
      nome:'Fabricio Fritz Alt',
      nascimento:'21/05/1981',
      senha:'1234'
      
    },

  ];
  addFuncionario(email:string,nome:string,nascimento:string,senha:string)
    {
    const novoFuncionario:Funcionario={
      email:email,
      nome:nome,
      nascimento:nascimento,
      senha:senha,
    }
    this.funcionarios.push(novoFuncionario)
    console.log(this.funcionarios)
  }

  getFuncionarios(): Funcionario[] {
    return this.funcionarios;
  }


  getFuncionariosNome(nome: string): Funcionario[] {
    return this.funcionarios.filter(Funcionario => Funcionario.nome === nome);
  }
}



