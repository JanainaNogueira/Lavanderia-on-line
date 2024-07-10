import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component'
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Pedido } from '../../Pedido';
import { PedidoService } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tela-pagamento',
  standalone: true,
  imports: [MenuLateralComponent,MatButtonModule, MatCommonModule, CommonModule],
  templateUrl: './tela-pagamento.component.html',
  styleUrl: './tela-pagamento.component.css'
})
export class TelaPagamentoComponent implements OnInit{
  numero: number
  pedido: Pedido
  constructor(private route: ActivatedRoute, private pedidoService: PedidoService, private router: Router){
  }

  ngOnInit(): void {
      this.numero = Number(this.route.snapshot.paramMap.get('numero')) || 0
      this.pedido = this.pedidoService.getPedidosID(this.numero)[0] || null
  }

  confirmarPagamento(){
    this.pedidoService.updatePedidoStatus(this.numero, "Pago");
    alert("pedido pago")
    this.router.navigate(["/home"]);
  }

}
