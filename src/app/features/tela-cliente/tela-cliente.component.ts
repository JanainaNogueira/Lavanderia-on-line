import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CancelDialogW } from '../../components/cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../shared/models/Pedido';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tela-cliente',
  standalone: true,
  imports: [MenuLateralComponent, CommonModule, MatButtonModule, MatCommonModule, CancelDialogW],
  templateUrl: './tela-cliente.component.html',
  styleUrls: ['./tela-cliente.component.css']
})
export class TelaClienteComponent implements OnInit {
  pedidos: Pedido[] = []
  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private dialog: MatDialog) { }

    ngOnInit(): void {
      this.refetch()
    }

  refetch(){
    this.pedidos = this.pedidoService.getPedidos().filter(p => p.status === "Em Aberto");
  }

  redirectPayment(num: number | undefined): void {
    if(num)
    this.router.navigateByUrl(`/payment/${num}`);
  }

  visualizarPedido(id: number | undefined): void {
    if(id)
    this.router.navigate(['/consulta-pedido'], { queryParams: { numero: id } });
  }

  cancelarPedido(pedidoId: number | undefined): void {
    if(pedidoId){
      const dialogRef = this.dialog.open(CancelDialogW, {
        width: '25vw',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
        data: { pedidoId }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.refetch();
          alert('Pedido cancelado');
        }
      });
    }

  }
}
