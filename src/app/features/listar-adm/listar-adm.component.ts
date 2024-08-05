import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { Router } from '@angular/router';
import { CancelDialog } from '../../components/cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../../services/pedido.service';
import { OnInit } from '@angular/core';
import { Pedido } from '../../shared/models/Pedido';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateRangePicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-listar-adm',
  standalone: true,
  imports: [
    CommonModule,
    MatCommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MenuAdminComponent,
    CancelDialog,
    MatDateRangeInput,
    MatNativeDateModule,
    MatDateRangePicker,
    MatDatepickerModule,
  ],
  templateUrl: './listar-adm.component.html',
  styleUrl: './listar-adm.component.css',
})
export class ListarAdmComponent {
  pedidos: Pedido[] = [];
  pedidosOriginal: Pedido[] = [];
  num: any;
  dataInicio: Date;
  dataFim: Date;
  statusAtual: string = 'Todos';

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit() {
    this.getPedidos();
    this.ordenarDataHora();
    this.pedidoService
      .fetchPedidos()
      .subscribe((p) =>
        p ? (this.pedidos = p) : alert('Erro carregar pedidos')
      );
  }

  recolherPedido(id: number | undefined, pedido: Pedido) {
    if (!id) return;
    this.pedidoService.updatePedidoStatus(id, 'Recolhido', pedido);
    this.getPedidos();
  }
  confirmarLavagem(id: number | undefined, pedido: Pedido) {
    if (!id) return;
    this.pedidoService.updatePedidoStatus(id, 'Aguardando Pagamento', pedido);
    this.getPedidos();
  }

  finalizarPedido(id: number | undefined, pedido: Pedido) {
    if (!id) {
      return;
    }
    this.pedidoService.updatePedidoStatus(id, 'Finalizado', pedido);
    this.getPedidos();
  }

  getPedidos() {
    this.pedidoService
      .fetchPedidos()
      .subscribe((p) =>
        p ? (this.pedidosOriginal = p) : alert('Erro carregar pedidos')
      );
  }

  filtroStatus(status: string) {
    this.statusAtual = status;
    if (status === 'Todos') {
      this.pedidos = [...this.pedidosOriginal];
    } else if (status === 'Pedidos de Hoje') {
      const hoje = new Date();
      console.log(this.formataData(hoje));
      const hojeFormatado = this.formataData(hoje);
      this.pedidos = this.pedidosOriginal.filter(
        (pedido) => pedido.data === hojeFormatado
      );
    } else {
      this.pedidos = this.pedidosOriginal.filter(
        (p) => p.status === this.statusAtual
      );
    }
    this.ordenarDataHora();
  }

  ordenarDataHora() {
    this.pedidos.sort((a, b) => {
      const dataA = this.criarData(a.data, a.hora);
      const dataB = this.criarData(b.data, b.hora);
      return dataB.getTime() - dataA.getTime();
    });
  }

  criarData(dataString: string, horaString: string): Date {
    const [dia, mes, ano] = dataString.split('/');
    const [hora, minuto] = horaString.split(':');
    return new Date(
      parseInt(ano),
      parseInt(mes) - 1,
      parseInt(dia),
      parseInt(hora),
      parseInt(minuto)
    );
  }

  pesquisarPorNumero(num: any) {
    if (!num) {
      this.pedidos = [...this.pedidosOriginal];
    } else {
      const pedidoId = parseInt(num, 10);
      if (!isNaN(pedidoId)) {
        let p = this.pedidoService.getPedidosID(pedidoId);
        this.pedidos = p ? [p] : [];
        this.ordenarDataHora();
      }
    }
  }

  redirectPayment(num: string) {
    this.router.navigateByUrl(`/payment/${num}`);
  }

  openDialog(num: string) {}

  getCor(status: string): string {
    switch (status) {
      case 'Em Aberto':
        return '#feffa3';
      case 'Rejeitado/Cancelado':
        return '#ff8b94';
      case 'Recolhido':
        return '#dbdcff';
      case 'Aguardando Pagamento':
        return '#bae1ff';
      case 'Pago':
        return '#ffdfba';
      case 'Finalizado':
        return '#baffc9';
      default:
        return '';
    }
  }

  filtroData() {
    console.log('filtroData() method called.');
    if (this.dataInicio && this.dataFim) {
      const inicioFormatted = this.dataInicio;
      const fimFormatted = this.dataFim;
      console.log('Data Inicio:', this.dataInicio);
      console.log('Data Fim:', this.dataFim);

      this.pedidos = this.pedidosOriginal.filter((pedido) => {
        const pedidoData = new Date(this.formataDataPedido(pedido.data));
        const isWithinRange =
          pedidoData >= inicioFormatted && pedidoData <= fimFormatted;
        console.log(
          'Pedido:',
          pedido.id,
          'Data:',
          pedido.data,
          'Within Range:',
          isWithinRange
        );
        return isWithinRange;
      });
      this.pedidos.sort((a, b) => {
        const dataA = this.criarData(a.data, a.hora);
        const dataB = this.criarData(b.data, b.hora);
        return dataA.getTime() - dataB.getTime();
      });
    }
    this.ordenarDataHora();
  }

  formataData(date: Date): string {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formataDataPedido(dateString: string): Date {
    const [dia, mes, ano] = dateString.split('/');
    return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  }

  mudaData() {
    this.filtroData();
  }

  visualizarPedido(num: number | undefined) {
    if (!num) return;
    this.router.navigateByUrl(`/payment/${num}`);
  }
}
