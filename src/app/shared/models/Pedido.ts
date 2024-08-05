export interface Pedido {
  id?: number;
  valor: number;
  prazo: number;
  roupas: { roupa: Roupa; quantidade: number }[];
  hora: string;
  status: string;
  data: string;
  clienteId: number;
  dataPagamento?: string;
}
export interface Roupa {
  tipo: string;
  tempo: number;
  precoRoupa: number;
  descricao: string;
  id?: number;
}
