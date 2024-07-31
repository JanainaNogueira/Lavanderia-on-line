import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { Router } from '@angular/router';
import { CancelDialog } from '../../components/cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../../services/pedido.service';
import { OnInit } from '@angular/core';
import { Pedido } from '../../shared/models/Pedido';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PedidoDialogComponent } from '../../components/pedido-dialog/pedido-dialog.component';


@Component({
  selector: 'app-busca-pedido',
  standalone: true,
  imports: [CommonModule,MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuLateralComponent, CancelDialog,PedidoDialogComponent,MatDialogModule],
  templateUrl: './busca-pedido.component.html',
  styleUrl: './busca-pedido.component.css'
})
export class BuscaPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  filteredPedidos: Pedido[] = [];
  num: string = '';

  constructor(
    private pedidoService: PedidoService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidos = this.pedidoService.getPedidos();
  }

  pesquisarPorNumero() {
    const pedidoId = parseInt(this.num, 10);
    if (!isNaN(pedidoId)) {
      this.filteredPedidos = this.pedidoService.getPedidosID(pedidoId);
      if (this.filteredPedidos.length > 0) {
        this.openPedidoDialog(this.filteredPedidos[0]);
      } else {
        console.log('Pedido não encontrado');
      }
    } else {
      console.log('Número inválido');
    }
  }


  openPedidoDialog(pedido: Pedido) {
    this.dialog.open(PedidoDialogComponent, {
      data: pedido
    });
  }
}

