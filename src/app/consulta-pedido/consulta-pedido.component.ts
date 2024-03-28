import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../Pedido';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta-pedido',
  standalone: true,
  imports: [CommonModule,MatCommonModule,MatButtonModule,MatInputModule,MatIconModule,FormsModule, MenuLateralComponent],
  templateUrl: './consulta-pedido.component.html',
  styleUrl: './consulta-pedido.component.css'
})
export class ConsultaPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoSelecionado: Pedido | null = null;
  mostrarDetalhesPedido: boolean = false;

  constructor(private pedidoService: PedidoService) { 
    this.pedidos = this.pedidoService.pedidos;
  }

  ngOnInit(): void {
    this.pedidos = this.pedidoService.pedidos;
  } 

  procurar(idPedido: number): void {
    this.pedidoSelecionado = this.pedidos.find(pedido => pedido.id === idPedido) || null;
    this.mostrarDetalhesPedido = this.pedidoSelecionado !== null;
    }


}
