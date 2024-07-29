import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../Pedido';
import { CancelDialog } from '../../components/cancel-dialog/cancel-dialog.component';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tela-funcionario',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCommonModule, CancelDialog],
  templateUrl: './tela-funcionario.component.html',
  styleUrls: ['./tela-funcionario.component.css']
})
export class TelaFuncionarioComponent implements OnInit {
  pedidos$: Observable<Pedido[]> = of([]);

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
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

  recolherPedido(id: number): void {
    this.pedidoService.getPedidoById(id).pipe(
      tap(pedido => {
        pedido.status = 'Recolhido'; // Update status
        this.pedidoService.updatePedido(id, pedido).pipe(
          tap(() => this.refetch()), // Refetch list after update
          catchError(err => {
            console.error('Erro ao atualizar pedido', err);
            return of(null);
          })
        ).subscribe();
      }),
      catchError(err => {
        console.error('Erro ao buscar pedido', err);
        return of(null);
      })
    ).subscribe();
  }
}
