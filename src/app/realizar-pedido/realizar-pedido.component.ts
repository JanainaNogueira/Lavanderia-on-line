import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from  '@angular/material/icon';
import {MatDatepickerModule} from  '@angular/material/datepicker' ;
import {MatNativeDateModule} from '@angular/material/core'

@Component({
  selector: 'app-realizar-pedido',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './realizar-pedido.component.html',
  styleUrl: './realizar-pedido.component.css'
})

export class RealizarPedidoComponent {

}
