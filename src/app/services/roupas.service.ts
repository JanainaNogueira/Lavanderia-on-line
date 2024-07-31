import { Injectable } from '@angular/core';
import {Roupa} from '../shared/models/Pedido'

@Injectable({
  providedIn: 'root'
})
export class RoupasService {

  constructor() { }
  roupas:Roupa[]=[];
  addRoupa(tipo:string,tempo:number, descricao: string, precoRoupa: number){
    const novaRoupa:Roupa={
      tipo,
      tempo,
      descricao,
      precoRoupa
    };
    this.roupas.push(novaRoupa);
  }

  getRoupaByTipo(tipo: string): Roupa | undefined {
    return this.roupas.find(roupa => roupa.tipo === tipo);
  }
  getRoupas(): Roupa[] {
    return this.roupas;
  }
  excluirRoupa(tipo: string): void {
    this.roupas = this.roupas.filter(roupas => roupas.tipo !== tipo);
  }
  editarRoupa(roupaAtualizada: Roupa) {
    const index = this.roupas.findIndex(roupa => roupa.tipo === roupaAtualizada.tipo);
    if (index !== -1) {
      this.roupas[index] = roupaAtualizada;
    }
  }
}
