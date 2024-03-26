export interface Pedido{
  id:number
  valor:number
  prazo:number
  roupas:Roupa[]
}
export interface Roupa{
  tipo:string
  tecido:string[]
  tempo:number
  quantidade:number
}
