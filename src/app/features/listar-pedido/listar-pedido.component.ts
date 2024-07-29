import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { Router } from '@angular/router';
import { CancelDialogW } from '../../components/cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../Pedido';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { mergeMap,map } from 'rxjs/operators';

@Component({
  selector: 'app-listar-pedido',
  standalone: true,
  imports: [
    CommonModule, 
    MatCommonModule, 
    MatButtonModule, 
    MatInputModule,
    MatIconModule,
    FormsModule, 
    MenuLateralComponent, 
    CancelDialogW,
    MatDialogModule
  ],
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  num: any;

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refetch();
  }

  refetch() {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.ordenarDataHora();
      },
      error: (err) => console.error('Erro ao obter pedidos:', err)
    });
  }

  filtroStatus(status: string) {
    if (status === 'Todos') {
      this.getPedidos();
    } else if (status === 'Rejeitado/Cancelado') {
      this.pedidoService.getPedidosByStatus('Rejeitado').pipe(
        mergeMap(rejeitados => this.pedidoService.getPedidosByStatus('Cancelado').pipe(
          map(cancelados => rejeitados.concat(cancelados))
        ))
      ).subscribe({
        next: (data) => {
          this.pedidos = data;
          this.ordenarDataHora();
        },
        error: (err) => console.error('Erro ao filtrar por status:', err)
      });
    } else {
      this.pedidoService.getPedidosByStatus(status).subscribe({
        next: (data) => {
          this.pedidos = data;
          this.ordenarDataHora();
        },
        error: (err) => console.error('Erro ao filtrar por status:', err)
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
    if (num === '' || num === null || num === undefined) {
      this.getPedidos();
    } else {
      const pedidoId = parseInt(num, 10);
      if (!isNaN(pedidoId)) {
        this.pedidoService.getPedidoById(pedidoId).subscribe({
          next: (pedido) => {
            this.pedidos = [pedido];
            this.ordenarDataHora();
          },
          error: (err) => console.error('Erro ao pesquisar por número:', err)
        });
      }
    }
  }

  redirectPayment(num: string) {
    this.router.navigateByUrl(`/payment/${num}`);
  }

  visualizarPedido(id: number) {
    this.router.navigate(['/consulta-pedido'], { queryParams: { numero: id } });
  }

  cancelarPedido(pedidoId: number): void {
    const dialogRef = this.dialog.open(CancelDialogW, {
      width: '25vw',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { pedidoId } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.pedidoService.deletePedido(pedidoId).subscribe({
          next: () => {
            this.refetch();
            alert('Pedido cancelado');
          },
          error: (err) => console.error('Erro ao cancelar pedido:', err)
        });
      }
    });
  }
}
