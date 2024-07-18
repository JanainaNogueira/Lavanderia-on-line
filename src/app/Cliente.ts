import { Pedido } from "./Pedido"

export interface Cliente{
  id:number;
  pedidos: Pedido[] ;
  nome:string;
  email: string;
  cpf: string;
  endereço: string;
  telefone: string;
  senha: string;
}
