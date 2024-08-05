import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { ActivatedRoute, Router } from '@angular/router'
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../shared/models/Pedido';
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
export class ConsultaPedidoComponent {
  pedidoSelecionado: Pedido | null = null;

  constructor(private route: ActivatedRoute, private pedidoService: PedidoService, private router: Router) {
    let numero = Number(this.route.snapshot.queryParamMap.get('numero')) || 0
    this.pedidoSelecionado = this.pedidoService.getPedidosID(numero) || null
  }


  procurar(idPedido: number): void {
    let pedido = this.pedidoService.getPedidosID(idPedido) || null
    this.pedidoSelecionado = pedido;
    }


}
