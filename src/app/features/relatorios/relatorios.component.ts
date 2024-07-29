import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { Router } from '@angular/router';
import { CancelDialog } from '../../components/cancel-dialog/cancel-dialog.component';
import { PedidoService } from '../../services/pedido.service';
import { ClienteService } from '../../services/cliente/cliente.service';
import { MatDateRangeInput, MatDatepickerModule, MatDateRangePicker } from '@angular/material/datepicker';
import * as jspdf from 'jspdf';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pedido, Cliente } from '../../Pedido';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule,
    MatCommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MenuAdminComponent,
    CancelDialog,
    MatDateRangeInput,
    MatNativeDateModule,
    MatDateRangePicker,
    MatDatepickerModule
  ],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

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
  

  relatorioReceitas() {
    if (this.dataInicio && this.dataFim) {
      this.pedidoService.getPedidosByInterval(this.dataInicio, this.dataFim).pipe(
        switchMap(pedidos => {
          const footerData: string[] = ["Valor Total:"];
          const valorTotal = pedidos.reduce((total, p) => total + p.valor, 0);
          footerData.push(String(valorTotal));
          this.createPDF(pedidos, "Relatório Financeiro", footerData);
          return [];
        })
      ).subscribe();
    }
  }

  relatorioClientes() {
    this.clienteService.getClientes().pipe(
      switchMap(clientes => {
        this.createPDF(clientes, "Clientes");
        return [];
      })
    ).subscribe();
  }

  relatorioClientesFieis() {
    this.clienteService.getClientes().pipe(
      switchMap(clientes => {
        // Implement the logic for "Clientes Fieis" if it differs from the regular "Clientes"
        this.createPDF(clientes, "Clientes Fieis");
        return [];
      })
    ).subscribe();
  }

  filtroData() {
    if (this.dataInicio && this.dataFim) {
      // Date filtering logic, if needed
    }
  }

  mudaData() {
    this.filtroData();
  }

  createPDF<T>(data: T[], nomeArquivo: string, footerData?: string[]) {
    if (data.length === 0) {
      alert('Não há dados para gerar o PDF.');
      return;
    }

    const columns = Object.keys(data[0] as any);
    const dataString: string[][] = data.map(item =>
      columns.map(col => {
        const value = (item as any)[col];
        return Array.isArray(value) ? String(value.length) : String(value || 'N/A');
      })
    );

    const doc = new jspdf.jsPDF('l', 'px', 'a4');
    const table = document.createElement("table");
    const tableHeaders = document.createElement("thead");
    
    columns.forEach(col => {
      const th = document.createElement("th");
      th.innerHTML = col;
      tableHeaders.appendChild(th);
    });

    tableHeaders.setAttribute("style", "border-bottom: 1px solid black; font-weight: bold");
    
    const tBody = document.createElement("tbody");
    dataString.forEach(row => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const td = document.createElement("td");
        td.innerHTML = cell;
        td.setAttribute("style", "font-size: 14px");
        tr.appendChild(td);
      });
      tBody.appendChild(tr);
    });

    table.appendChild(tableHeaders);
    table.appendChild(tBody);
    table.setAttribute("style", `text-align: center; white-space: nowrap;`);
    
    if (footerData) {
      const tFoot = document.createElement("tfoot");
      footerData.forEach(data => {
        const td = document.createElement("td");
        td.innerHTML = data;
        td.setAttribute("style", "font-size: 14px");
        tFoot.appendChild(td);
      });
      table.appendChild(tFoot);
    }

    doc.html(table).then(() => doc.save(nomeArquivo));
  }
}
