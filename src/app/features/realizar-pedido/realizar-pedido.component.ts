import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Roupa, Pedido } from '../../Pedido';
import { RoupasService } from '../../services/roupas.service';
import { PedidoService } from '../../services/pedido.service';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { OrcamentoDialogComponent } from '../../components/orcamento-dialog/orcamento-dialog.component';

@Component({
  selector: 'app-realizar-pedido',
  standalone: true,
  imports: [MatCardModule, MatIconModule, ReactiveFormsModule, CommonModule, FormsModule, MenuLateralComponent],
  templateUrl: './realizar-pedido.component.html',
  styleUrls: ['./realizar-pedido.component.css']
})
export class RealizarPedidoComponent implements OnInit {
  tiposRoupas: Roupa[] = [];
  listaPedido: { roupa: Roupa, quantidade: number }[] = [];
  valorTotal: number = 0;
  prazoDeEntrega: number = 0;
  tecidoSelecionado: string = "";
  queryField = new FormControl();

  constructor(
    private pedidoService: PedidoService,
    private roupasService: RoupasService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.roupasService.getRoupas().subscribe(roupas => {
      this.tiposRoupas = roupas;
    });
  }

  onSearch() {
    const termoBusca = this.queryField.value;
    const itemEncontrado = this.tiposRoupas.find(item => item.tipo.toLowerCase() === termoBusca.toLowerCase());

    if (itemEncontrado) {
      const existingItem = this.listaPedido.find(item => item.roupa.tipo === itemEncontrado.tipo);
      if (existingItem) {
        existingItem.quantidade++;
      } else {
        this.listaPedido.push({ roupa: itemEncontrado, quantidade: 1 });
      }
      this.valorTotal = this.CalculaValor();
      this.prazoDeEntrega = this.CalculaPrazo();
    }
    this.queryField.reset();
  }

  CalculaValor(): number {
    return this.listaPedido.reduce((total, item) => total + item.quantidade * 10, 0);
  }

  CalculaPrazo(): number {
    return this.listaPedido.reduce((max, item) => Math.max(max, item.roupa.tempo), 0);
  }

  addItem(tipo: string) {
    const item = this.listaPedido.find(item => item.roupa.tipo === tipo);
    if (item) {
      item.quantidade++;
      this.valorTotal = this.CalculaValor();
      this.prazoDeEntrega = this.CalculaPrazo();
    }
  }

  removeItem(tipo: string) {
    const item = this.listaPedido.find(item => item.roupa.tipo === tipo);
    if (item && item.quantidade > 0) {
      item.quantidade--;
      if (item.quantidade === 0) {
        this.listaPedido = this.listaPedido.filter(i => i.roupa.tipo !== tipo);
      }
      this.valorTotal = this.CalculaValor();
      this.prazoDeEntrega = this.CalculaPrazo();
    }
  }

  FinalizarPedido() {
    const dialogRef = this.dialog.open(OrcamentoDialogComponent, {
      width: '450px',
      data: { valorTotal: this.valorTotal, prazoDeEntrega: this.prazoDeEntrega }
    });

    dialogRef.afterClosed().subscribe(result => {
      const status = result ? 'Em Aberto' : 'Rejeitado';
      const pedido: Pedido = {
        id: 0, // Default or assigned by the backend
        valor: this.valorTotal,
        prazo: this.prazoDeEntrega,
        roupas: this.listaPedido,
        hora: new Date().toISOString(),
        status: status,
        data: new Date().toISOString(),
        clienteId: 0 // Assuming you will set this based on the logged-in user
      };

      this.pedidoService.addPedido(pedido).subscribe(() => {
        this.LimparLista();
      });
    });
  }

  LimparLista() {
    this.listaPedido = [];
    this.prazoDeEntrega = 0;
    this.valorTotal = 0;
  }
}
