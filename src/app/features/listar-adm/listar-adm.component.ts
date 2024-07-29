import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { CancelDialog } from '../../components/cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../Pedido';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-adm',
  standalone: true,
  imports: [CommonModule, MatCommonModule, MatButtonModule, MatInputModule,
    MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule,
    MenuAdminComponent, CancelDialog],
  templateUrl: './listar-adm.component.html',
  styleUrls: ['./listar-adm.component.css']
})
export class ListarAdmComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosOriginal: Pedido[] = [];
  num: any;
  dataInicio: Date | null = null;
  dataFim: Date | null = null;
  statusAtual: string = "Todos";

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPedidos();
  }

  refetch() {
    this.pedidoService.getPedidosByStatus("Em Aberto").subscribe(pedidos => {
      this.pedidos = pedidos;
      this.pedidosOriginal = pedidos;
      this.ordenarDataHora();
    });
  }

  recolherPedido(id: number) {
    this.pedidoService.updatePedido(id, { ...this.getPedidoById(id), status: "Recolhido" }).subscribe(() => {
      this.getPedidos();
    });
  }

  confirmarLavagem(id: number) {
    this.pedidoService.updatePedido(id, { ...this.getPedidoById(id), status: "Aguardando Pagamento" }).subscribe(() => {
      this.getPedidos();
    });
  }

  finalizarPedido(id: number) {
    this.pedidoService.updatePedido(id, { ...this.getPedidoById(id), status: "Finalizado" }).subscribe(() => {
      this.getPedidos();
    });
  }

  getPedidos() {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.pedidosOriginal = pedidos;
      this.filtroStatus(this.statusAtual);
    });
  }

  filtroStatus(status: string) {
    this.statusAtual = status;
    if (status === 'Todos') {
      this.pedidos = [...this.pedidosOriginal];
    } else if (status === 'Pedidos de Hoje') {
      const hoje = new Date();
      const hojeFormatado = this.formataData(hoje);
      this.pedidos = this.pedidosOriginal.filter(pedido => pedido.data === hojeFormatado);
    } else {
      this.pedidoService.getPedidosByStatus(status).subscribe(pedidos => {
        this.pedidos = pedidos;
        this.ordenarDataHora();
      });
    }
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
    return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(hora), parseInt(minuto));
  }

  pesquisarPorNumero(num: any) {
    if (!num) {
      this.pedidos = [...this.pedidosOriginal];
    } else {
      const pedidoId = parseInt(num, 10);
      if (!isNaN(pedidoId)) {
        this.pedidoService.getPedidoById(pedidoId).subscribe(pedido => {
          this.pedidos = [pedido];
          this.ordenarDataHora();
        });
      }
    }
  }

  redirectPayment(num: string) {
    this.router.navigateByUrl(`/payment/${num}`);
  }

  openDialog(num: string) {
    // Implement the dialog functionality if needed
  }

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
    if (this.dataInicio && this.dataFim) {
      const inicioFormatted = this.dataInicio;
      const fimFormatted = this.dataFim;
      this.pedidos = this.pedidosOriginal.filter(pedido => {
        const pedidoData = new Date(this.formataDataPedido(pedido.data));
        return pedidoData >= inicioFormatted && pedidoData <= fimFormatted;
      });
      this.ordenarDataHora();
    }
  }

  formataData(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
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

  visualizarPedido(num: number) {
    this.router.navigateByUrl(`/payment/${num}`);
  }

  private getPedidoById(id: number): Pedido {
    // Placeholder function for getting a specific Pedido.
    // In practice, this should involve another service method call if required.
    return this.pedidosOriginal.find(pedido => pedido.id === id) as Pedido;
  }
}
