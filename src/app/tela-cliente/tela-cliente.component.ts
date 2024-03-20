import { Component } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tela-cliente',
  standalone: true,
  imports: [MenuLateralComponent, CommonModule, MatButtonModule, MatCommonModule],
  templateUrl: './tela-cliente.component.html',
  styleUrl: './tela-cliente.component.css'
})
export class TelaClienteComponent {
  pedidos = [
    { numero: '0001', status: 'Aguardando Pagamento', data: '01/03/2024', hora: '08:30', valor: '100,00' },
    { numero: '0002', status: 'Em Aberto', data: '09/03/2024', hora: '09:45', valor: '350,00' },
    { numero: '0004', status: 'Recolhido', data: '10/03/2024', hora: '11:00', valor: '50,00' },
  ];
  redirectPayment(num: string){
    this.router.navigateByUrl(`/payment/${num}`);
  }
  constructor(private router: Router) { }
}
