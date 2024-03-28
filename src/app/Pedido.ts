export interface Pedido{
  id:number
  valor:number
  prazo:number
  roupas:Roupa[]
  hora: string
  status: string
  data: string
}
export interface Roupa{
  tipo:string
  tecido:string[]
  tempo:number
  quantidade:number
}
