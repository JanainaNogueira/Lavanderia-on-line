import { CommonModule, DecimalPipe } from '@angular/common';
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
import { Pedido } from '../../shared/models/Pedido';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
    DecimalPipe
  ],
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {
  originalPedidos: Pedido[] = [] 
  pedidos: Pedido[] = [];
  num: any;

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refetch();
    let j:Pedido[] = []
    this.pedidoService.fetchPedidos().subscribe((p) => {p ? j = p : null
      this.originalPedidos = j;
      this.pedidos = j
    })
    
  }

  refetch(){
    this.getPedidos();
    this.ordenarDataHora();
  }

  getPedidos() {
    this.pedidoService.fetchPedidos().subscribe((p) => p ? this.originalPedidos = p : null)
  }

  filtroStatus(status: string) {
    if (status === 'Todos') {
      this.pedidos = this.originalPedidos
    } else if (status === 'Rejeitado/Cancelado') {
      this.pedidos = this.originalPedidos.filter((p) => p.status === 'Rejeitado')
        .concat(this.originalPedidos.filter((p) => p.status === 'Cancelado'));
    } else {
      this.pedidos = this.originalPedidos.filter((p) => p.status === status)
    }
    this.ordenarDataHora();
    console.log(this.pedidos)
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
      this.pedidos = this.originalPedidos;
    } else {
      const pedidoId = parseInt(num, 10);
      if (!isNaN(pedidoId)) {
        this.pedidos = this.originalPedidos.filter((p) => p.id! === pedidoId)
        this.ordenarDataHora();
      }
    }
  }

  redirectPayment(num: number | undefined) {
    if(!num)
      return
    this.router.navigateByUrl(`/payment/${num}`);
  }

  visualizarPedido(id: number | undefined) {
    if(!id)
      return
    this.router.navigate(['/consulta-pedido'], { queryParams: { numero: id } });
  }

  cancelarPedido(pedidoId: number | undefined): void {
    if(!pedidoId)
      return
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
