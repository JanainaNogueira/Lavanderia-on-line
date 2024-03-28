import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../Pedido';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta-pedido',
  standalone: true,
  imports: [MenuLateralComponent, CommonModule],
  templateUrl: './consulta-pedido.component.html',
  styleUrl: './consulta-pedido.component.css'
})
export class ConsultaPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoSelecionado: Pedido | null = null;
  notFound: boolean = false;
  mostrarDetalhesPedido: boolean = false;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidos = this.pedidoService.pedidos;
  }

  procurar(idPedido: number): void {
    this.pedidoSelecionado = this.pedidos.find(pedido => pedido.id === idPedido) || null;
    this.mostrarDetalhesPedido = this.pedidoSelecionado !== null;
    this.notFound = this.pedidoSelecionado === null; 
  }
}
