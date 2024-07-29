import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../Pedido';
import { PedidoDialogComponent } from '../../components/pedido-dialog/pedido-dialog.component';
import { CancelDialog } from '../../components/cancel-dialog/cancel-dialog.component';

@Component({
  selector: 'app-busca-pedido',
  standalone: true,
  imports: [
    CommonModule,
    MatCommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MenuLateralComponent,
    CancelDialog,
    PedidoDialogComponent,
    MatDialogModule
  ],
  templateUrl: './busca-pedido.component.html',
  styleUrls: ['./busca-pedido.component.css']
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
    this.pedidoService.getPedidos().subscribe(
      (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      },
      (error) => {
        console.error('Erro ao buscar pedidos', error);
      }
    );
  }

  pesquisarPorNumero() {
    const pedidoId = parseInt(this.num, 10);
    if (!isNaN(pedidoId)) {
      this.pedidoService.getPedidoById(pedidoId).subscribe(
        (pedido: Pedido) => {
          this.filteredPedidos = [pedido];
          if (this.filteredPedidos.length > 0) {
            this.openPedidoDialog(this.filteredPedidos[0]);
          } else {
            console.log('Pedido não encontrado');
          }
        },
        (error) => {
          console.log('Pedido não encontrado', error);
        }
      );
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
