import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';


@Component({
  selector: 'app-listar-pedido',
  standalone: true,
  imports: [CommonModule,MatCommonModule,MatButtonModule,MatInputModule,MatIconModule,FormsModule, MenuLateralComponent],
  templateUrl: './listar-pedido.component.html',
  styleUrl: './listar-pedido.component.css'
})
export class ListarPedidoComponent {

  ngOnInit() {
    this.ordenarDataHora();
  }

  pedidos = [
    { numero: '0001', status: 'Aguardando Pagamento', data: '01/03/2024', hora: '08:30', valor: '100,00' },
    { numero: '0002', status: 'Em Aberto', data: '09/03/2024', hora: '09:45', valor: '350,00' },
    { numero: '0003', status: 'Rejeitado/Cancelado', data: '12/03/2024', hora: '10:15', valor: '200,00' },
    { numero: '0004', status: 'Recolhido', data: '10/03/2024', hora: '11:00', valor: '50,00' },
    { numero: '0005', status: 'Pago', data: '17/03/2024', hora: '13:20', valor: '75,00' },
    { numero: '0006', status: 'Finalizado', data: '09/03/2024', hora: '15:30', valor: '150,00' }
  ];

  pedidosFiltrados = [...this.pedidos];
  num: string = '';
 
  filtroStatus(status: string) {
    if (status === 'Todos') {
      this.pedidosFiltrados = [...this.pedidos];
      this.ordenarDataHora()
    } else {
      this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.status === status); 

  }
}

ordenarDataHora() {
  this.pedidosFiltrados.sort((a, b) => {
    const dataHoraA = `${a.data} ${a.hora}`;
    const dataHoraB = `${b.data} ${b.hora}`;
    
    return dataHoraB.localeCompare(dataHoraA);
  });
}

  
    pesquisarPorNumero(num: string) {
      if (num.trim() === '') {
        this.pedidosFiltrados = [...this.pedidos];
      } else {
        this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.numero.includes(num));
      }
    }
  }
  


