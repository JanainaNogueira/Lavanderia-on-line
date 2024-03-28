import { Component } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CancelDialog } from '../cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-tela-cliente',
  standalone: true,
  imports: [MenuLateralComponent, CommonModule, MatButtonModule, MatCommonModule, CancelDialog],
  templateUrl: './tela-cliente.component.html',
  styleUrl: './tela-cliente.component.css'
})
export class TelaClienteComponent {
  pedidos = new PedidoService().pedidos
  redirectPayment(num: number){
    this.router.navigateByUrl(`/payment/${num}`);
  }
  constructor(private router: Router) { }
}
