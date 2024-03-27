import { Component } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CancelDialog } from '../cancel-dialog/cancel-dialog.component';

@Component({
  selector: 'app-tela-funcionario',
  standalone: true,
  imports: [MenuLateralComponent, CommonModule, MatButtonModule, MatCommonModule, CancelDialog],
  templateUrl: './tela-funcionario.component.html',
  styleUrl: './tela-funcionario.component.css'
})
export class TelaFuncionarioComponent {
  pedidos = [
    { numero: '0002', status: 'Em Aberto', data: '09/03/2024', hora: '09:45', valor: '350,00' },
  ];
  redirectPayment(num: string){
    this.router.navigateByUrl(`/payment/${num}`);
  }
  constructor(private router: Router) { }
}
