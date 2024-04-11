
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { Router } from '@angular/router';
import { CancelDialog } from '../../components/cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../../services/pedido.service';
import { OnInit } from '@angular/core';
import { Pedido } from '../../Pedido';
import {MatDateRangeInput} from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateRangePicker } from '@angular/material/datepicker';


@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule,MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent, CancelDialog,MatDateRangeInput,MatNativeDateModule,
    MatDateRangePicker,MatDatepickerModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent {

dataInicio: Date;
dataFim: Date;

constructor(
  private pedidoService: PedidoService,
  private router: Router
) { }

ngOnInit() {
}

criarData(dataString: string, horaString: string): Date {
  const [dia, mes, ano] = dataString.split('/');
  const [hora, minuto] = horaString.split(':');
  return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(hora), parseInt(minuto));
}


openDialog(num: string) {}

relatorioReceitas(){}
relatorioClientes(){}
relatorioClientesFieis(){}


filtroData() {
  console.log('filtroData() method called.');
  if (this.dataInicio && this.dataFim) {
    const inicioFormatted = this.dataInicio;
    const fimFormatted = this.dataFim;
    console.log('Data Inicio:', this.dataInicio);
    console.log('Data Fim:', this.dataFim);

  }
}


mudaData() {
  this.filtroData();
}
}