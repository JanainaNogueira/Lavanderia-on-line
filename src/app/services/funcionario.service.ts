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
    const exists = this.funcionarios.some(funcionario => funcionario.email === email);

    if (exists) {
      return;
    }
    else{
    this.funcionarios.push(novoFuncionario)
    console.log(this.funcionarios)
  }
    }

  getFuncionarios(): Funcionario[] {
    return this.funcionarios;
  }

  getFuncionarioByEmail(email: string): Funcionario | undefined {
    return this.funcionarios.find(funcionario => funcionario.email === email);
  }

  getFuncionariosNome(nome: string): Funcionario[] {
    return this.funcionarios.filter(Funcionario => Funcionario.nome === nome);
  }

  excluirFuncionario(email: string): void {
    this.funcionarios = this.funcionarios.filter(funcionario => funcionario.email !== email);
    console.log('Funcionários após exclusão:', this.funcionarios);
  }

  editarFuncionario(funcionario: Funcionario) {
    const index = this.funcionarios.findIndex(f => f.email === funcionario.email);
    if (index !== -1) {
      this.funcionarios[index] = funcionario;
    }
  }

  validateLogin(email: string, senha: string): boolean {
    const funcionario = this.funcionarios.find(f => f.email === email && f.senha === senha);
    return funcionario !== undefined;
  }
  
}


