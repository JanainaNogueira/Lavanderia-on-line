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
      tecido:"Jeans",
      tempo:5,
    },
    {
      tipo:"camisa",
      tecido:"Elastano",
      tempo:6,
    },
    {
      tipo:"camiseta",
      tecido:"Moletom",
      tempo: 5,
    },
    {
      tipo:"cueca",
      tecido:"Elastano",
      tempo:2,
    },
    {
      tipo:"meia",
      tecido:"Outro",
      tempo:1,
    }
  ];
  addRoupa(tipo:string,tecido:string,tempo:number){
    const novaRoupa:Roupa={
      tipo,
      tecido,
      tempo,
    };
    this.roupas.push(novaRoupa);
  }
  getRoupas(): Roupa[] {
    return this.roupas;
  }
}
