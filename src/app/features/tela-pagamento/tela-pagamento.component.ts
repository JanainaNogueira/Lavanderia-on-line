import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Pedido } from '../../shared/models/Pedido';
import { PedidoService } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-tela-pagamento',
  standalone: true,
  imports: [MenuAdminComponent,MatButtonModule, MatCommonModule, CommonModule],
  templateUrl: './tela-pagamento.component.html',
  styleUrl: './tela-pagamento.component.css'
})
export class TelaPagamentoComponent implements OnInit{
  numero: number
  pedido: Pedido
  isCliente: boolean = false;
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
  getTotalItens(): number {
    return this.pedido ? this.pedido.roupas.reduce((acc, item) => acc + item.quantidade, 0) : 0;
  }

  getTotalValor(): number {
    return this.pedido ? this.pedido.roupas.reduce((acc, item) => acc + (10 * item.quantidade), 0) : 0;
  }

  verificarUsuario() {
    const clienteId = sessionStorage.getItem("clienteId");
    this.isCliente = clienteId !== null;
  }

}
