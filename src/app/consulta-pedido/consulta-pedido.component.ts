import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../Pedido';

@Component({
  selector: 'app-consulta-pedido',
  standalone: true,
  imports: [MenuLateralComponent],
  templateUrl: './consulta-pedido.component.html',
  styleUrl: './consulta-pedido.component.css'
})
export class ConsultaPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidos = this.pedidoService.pedidos;
  }

  procurar(idPedido: number): void {
    this.pedidos = this.pedidoService.pedidos.filter(pedido => pedido.id === idPedido);
  }
}