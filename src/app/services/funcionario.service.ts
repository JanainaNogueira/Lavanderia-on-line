import { Injectable } from '@angular/core';
import { Funcionario } from '../shared/models/Funcionario';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  constructor() { }
  funcionarios:Funcionario[]=[];
  addFuncionario(email:string,nome:string,nascimento:string,senha:string)
    {
    const novoFuncionario:Funcionario={
      login:email,
      nome:nome,
      nascimento:nascimento,
      senha:senha,
      id: Math.round(Math.random()*1000000)
    }
    const exists = this.funcionarios.some(funcionario => funcionario.login === email);

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
    return this.funcionarios.find(funcionario => funcionario.login === email);
  }

  getFuncionariosNome(nome: string): Funcionario[] {
    return this.funcionarios.filter(Funcionario => Funcionario.nome === nome);
  }

  excluirFuncionario(email: string): void {
    this.funcionarios = this.funcionarios.filter(funcionario => funcionario.login !== email);
    console.log('Funcionários após exclusão:', this.funcionarios);
  }

  editarFuncionario(funcionario: Funcionario) {
    const index = this.funcionarios.findIndex(f => f.login === funcionario.login);
    if (index !== -1) {
      this.funcionarios[index] = funcionario;
    }
  }



}


