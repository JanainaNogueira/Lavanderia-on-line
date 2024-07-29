import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../Pedido';
import { CancelDialogW } from '../../components/cancel-dialog/cancel-dialog.component';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tela-cliente',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCommonModule, CancelDialogW],
  templateUrl: './tela-cliente.component.html',
  styleUrls: ['./tela-cliente.component.css']
})
export class TelaClienteComponent implements OnInit {
  pedidos$: Observable<Pedido[]> = of([]);

  constructor(
    private pedidoService: PedidoService, 
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refetch();
  }

  refetch(): void {
    this.pedidos$ = this.pedidoService.getPedidosByStatus('Em Aberto').pipe(
      catchError(err => {
        console.error('Erro ao buscar pedidos', err);
        return of([]);
      })
    );
  }

  redirectPayment(num: number): void {
    this.router.navigateByUrl(`/payment/${num}`);
  }

  visualizarPedido(id: number): void {
    this.router.navigate(['/consulta-pedido'], { queryParams: { numero: id } });
  }

  cancelarPedido(pedidoId: number): void {
    const dialogRef = this.dialog.open(CancelDialogW, {
      width: '25vw',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { pedidoId } 
    });

    dialogRef.afterClosed().pipe(
      tap(result => {
        if (result) {
          this.pedidoService.deletePedido(pedidoId).pipe(
            tap(() => {
              this.refetch();
              alert('Pedido cancelado');
            }),
            catchError(err => {
              console.error('Erro ao cancelar pedido', err);
              alert('Erro ao cancelar o pedido');
              return of(null);
            })
          ).subscribe();
        }
      })
    ).subscribe();
  }
}
