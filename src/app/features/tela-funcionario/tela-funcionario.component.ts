import { Component, OnInit } from '@angular/core';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CancelDialog } from '../../components/cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../Pedido';

@Component({
  selector: 'app-tela-funcionario',
  standalone: true,
  imports: [MenuAdminComponent, CommonModule, MatButtonModule, MatCommonModule, CancelDialog],
  templateUrl: './tela-funcionario.component.html',
  styleUrl: './tela-funcionario.component.css'
})
export class TelaFuncionarioComponent implements OnInit {
  pedidos: Pedido[] = []
  redirectPayment(num: number){
    this.router.navigateByUrl(`/payment/${num}`);
  }
  ngOnInit(): void {
    this.refetch()
  }
  refetch(){
    this.pedidos = this.pedidoService.getPedidosStatus("Em Aberto");
  }
  recolherPedido(id: number){
    this.pedidoService.updatePedidoStatus(id, "Recolhido")
    this.refetch()
  }

  constructor(private router: Router, private pedidoService: PedidoService) { }
}
