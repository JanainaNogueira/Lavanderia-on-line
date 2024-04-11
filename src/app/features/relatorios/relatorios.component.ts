
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
import { Pedido, Roupa } from '../../Pedido';
import {MatDateRangeInput} from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { ClienteService } from '../../services/cliente/cliente.service';
import * as jspdf from 'jspdf';


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
  private clienteService: ClienteService,
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
relatorioClientes(){
  this.createPDF(this.clienteService.getClientes(), "Clientes")
}
relatorioClientesFieis(){
  this.createPDF(this.clienteService.getClientes(), "Clientes Fieis")
  
}


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

createPDF<T extends {}>(data: T[], nomeArquivo: string){
  let colunms = Object.keys(data[0]);
  let dataString: string[][] = []
  data.forEach(e => {
    dataString.push(colunms.map(c => {
      if(Array.isArray(e[c as keyof T])){
        return String((e[c as keyof T] as any[]).length)
      } else if(typeof e[c as keyof T] != 'undefined'){
        return  String(e[c as keyof T])
      } else {
        return "N/A"
      }
    } 
    ))
  })
  const doc = new jspdf.jsPDF('l', 'px', 'a4')
  let table = document.createElement("table")
  let tableHeaders = document.createElement("tr")
  colunms.forEach(c => {
    let th = document.createElement("th")
    th.innerHTML = c;
    tableHeaders.appendChild(th);
  })
  tableHeaders.setAttribute("style", "border-bottom: 1px solid black; font-weight: bold")
  let tBody = document.createElement("tbody")
  dataString.forEach(data => {
    let tr = document.createElement("tr")
    for( let i = 0; i < colunms.length; i++){
      let td = document.createElement("td")
      td.innerHTML = data[i]
      td.setAttribute("style", "font-size: 14px")
      tr.appendChild(td)
    }
    tBody.appendChild(tr)
  })
  table.appendChild(tableHeaders)
  table.appendChild(tBody)
  let widthPage = doc.internal.pageSize.getWidth();
  table.setAttribute("style", `text-align: center; white-space: nowrap;`)
  doc.html(table).then(() => doc.save(nomeArquivo))
 
}
}