import { Injectable } from '@angular/core';
import {Roupa} from '../Pedido'

@Injectable({
  providedIn: 'root'
})
export class RoupasService {

  constructor() { }
  roupas:Roupa[]=[
    {
      tipo:"calca",
      tempo:5,
    },
    {
      tipo:"camisa",
      tempo:6,
    },
    {
      tipo:"camiseta",
      tempo: 5,
    },
    {
      tipo:"cueca",
      tempo:2,
    },
    {
      tipo:"meia",
      tempo:1,
    }
  ];
  addRoupa(tipo:string,tempo:number){
    const novaRoupa:Roupa={
      tipo,
      tempo,
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
