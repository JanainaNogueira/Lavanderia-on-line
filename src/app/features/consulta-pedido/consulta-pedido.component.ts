import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../Pedido';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-consulta-pedido',
  standalone: true,
  imports: [
    CommonModule,
    MatCommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MenuLateralComponent
  ],
  templateUrl: './consulta-pedido.component.html',
  styleUrls: ['./consulta-pedido.component.css']
})
export class ConsultaPedidoComponent implements OnInit {
  pedidoSelecionado: Pedido | null = null;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const numero = Number(params.get('numero')) || 0;
      if (numero > 0) {
        this.procurar(numero);
      }
    });
  }

  procurar(idPedido: number): void {
    this.pedidoService.getPedidoById(idPedido).subscribe(
      (pedido: Pedido) => {
        this.pedidoSelecionado = pedido;
      },
      (error) => {
        console.error('Erro ao buscar pedido', error);
        this.pedidoSelecionado = null;
      }
    );
  }
}
