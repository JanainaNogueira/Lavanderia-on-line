import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../Pedido';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tela-pagamento',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCommonModule],
  templateUrl: './tela-pagamento.component.html',
  styleUrls: ['./tela-pagamento.component.css']
})
export class TelaPagamentoComponent implements OnInit {
  numero: number;
  pedido$: Observable<Pedido | null> = EMPTY;  // Use type `Pedido | null`
  isCliente: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.numero = Number(this.route.snapshot.paramMap.get('numero')) || 0;
    this.pedido$ = this.pedidoService.getPedidoById(this.numero).pipe(
      catchError(err => {
        console.error('Erro ao buscar pedido', err);
        return of(null);  // Return `null` if there's an error
      })
    );
    this.verificarUsuario();
  }

  confirmarPagamento(): void {
    this.pedido$.subscribe(pedido => {
      if (pedido) {
        pedido.status = 'Pago'; // Update status
        this.pedidoService.updatePedido(this.numero, pedido).subscribe(
          () => {
            alert('Pedido pago');
            this.router.navigate(['/home']);
          },
          err => console.error('Erro ao confirmar pagamento', err)
        );
      } else {
        alert('Pedido não encontrado.');
      }
    });
  }

  getTotalItens(pedido: Pedido): number {
    return pedido ? pedido.roupas.reduce((acc, item) => acc + item.quantidade, 0) : 0;
  }

  getTotalValor(pedido: Pedido): number {
    return pedido ? pedido.roupas.reduce((acc, item) => acc + (10 * item.quantidade), 0) : 0;
  }

  verificarUsuario(): void {
    const clienteId = sessionStorage.getItem('clienteId');
    this.isCliente = clienteId !== null;
  }
}
