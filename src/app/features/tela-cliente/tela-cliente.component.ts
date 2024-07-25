import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CancelDialog } from '../../components/cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../Pedido';

@Component({
  selector: 'app-tela-cliente',
  standalone: true,
  imports: [MenuLateralComponent, CommonModule, MatButtonModule, MatCommonModule, CancelDialog],
  templateUrl: './tela-cliente.component.html',
  styleUrl: './tela-cliente.component.css'
})
export class TelaClienteComponent implements OnInit {
  pedidos: Pedido[] = []
  constructor(private pedidoService: PedidoService, private router: Router) { }


  ngOnInit(): void {
    this.pedidos = this.pedidoService.getPedidos().filter( p => p.status === "Em Aberto");
  }
  redirectPayment(num: number){
    this.router.navigateByUrl(`/payment/${num}`);
  }
  visualizarPedido(id:number){
    this.router.navigate(['/consulta-pedido'], {queryParams: {numero: id}})
  }

}
