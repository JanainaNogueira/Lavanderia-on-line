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
import { Pedido, Roupa } from '../../shared/models/Pedido';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { ClienteService } from '../../services/cliente/cliente.service';
import * as jspdf from 'jspdf';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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
    MatDatepickerModule,
  ],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css',
})
export class RelatoriosComponent implements OnInit {
  dataInicio: Date;
  dataFim: Date;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {}

  criarData(dataString: string, horaString: string): Date {
    const [dia, mes, ano] = dataString.split('/');
    const [hora, minuto] = horaString.split(':');
    return new Date(
      parseInt(ano),
      parseInt(mes) - 1,
      parseInt(dia),
      parseInt(hora),
      parseInt(minuto)
    );
  }

  openDialog(num: string) {}

  relatorioReceitas() {
    console.log(this.dataInicio, this.dataFim);
    if (this.dataInicio && this.dataFim) {
      let get: Pedido[] = [];
      this.pedidoService.fetchPedidos().subscribe((r) => {
        if (r) {
          get = r;
          let pedidos = this.pedidoService.getPedidosbyInterval(
            this.dataInicio,
            this.dataFim,
            get
          );
          console.log(pedidos);
          let footerData: string[] = ['valor total:'];
          let valorTotal = 0;
          pedidos.forEach((p) => {
            valorTotal += p.valor;
          });
          footerData.push(String(valorTotal));
          this.createPDF(pedidos, 'Relatório financeiro', footerData);
        }
      });
    } else {
      alert('Preencha uma data válida');
    }
  }

  relatorioClientes() {
    this.clienteService.getClientes().subscribe((clientes) => {
      if (clientes) {
        const clientesFiltrados = clientes.map((cliente) => {
          const { senha, ...clienteSemSenha } = cliente;
          return clienteSemSenha;
        });
        this.createPDF(clientesFiltrados, 'Clientes');
      }
    });
  }

  relatorioClientesFieis() {
    this.clienteService.getClientes().subscribe((clientes) => {
      if (clientes) {
        this.pedidoService.fetchPedidos().subscribe((pedidos) => {
          if (pedidos) {
            const clientesPedidos = clientes.map((cliente) => {
              const pedidosCliente = pedidos.filter(
                (pedido) => pedido.clienteId === cliente.id
              );
              const receitaTotal = pedidosCliente.reduce(
                (total, pedido) => total + pedido.valor,
                0
              );
              return {
                nome: cliente.nome,
                numeroPedidos: pedidosCliente.length,
                receita: receitaTotal,
              };
            });

            const clientesOrdenados = clientesPedidos
              .sort(
                (a, b) =>
                  b.numeroPedidos - a.numeroPedidos || b.receita - a.receita
              )
              .slice(0, 3);

            const dataParaPDF = clientesOrdenados.map((cliente) => ({
              Nome: cliente.nome,
              'Número de Pedidos': cliente.numeroPedidos,
              Receita: cliente.receita.toFixed(2),
            }));

            this.createPDF(dataParaPDF, 'Clientes Fieis');
          }
        });
      }
    });
  }

  filtroData() {
    if (this.dataInicio && this.dataFim) {
      const inicioFormatted = this.dataInicio;
      const fimFormatted = this.dataFim;
    }
  }

  mudaData() {
    this.filtroData();
  }

  createPDF<T extends {}>(
    data: T[],
    nomeArquivo: string,
    footerData?: string[]
  ) {
    let colunms = Object.keys(data[0]);
    let dataString: string[][] = [];
    data.forEach((e) => {
      dataString.push(
        colunms.map((c) => {
          if (Array.isArray(e[c as keyof T])) {
            return String((e[c as keyof T] as any[]).length);
          } else if (typeof e[c as keyof T] != 'undefined') {
            return String(e[c as keyof T]);
          } else {
            return 'N/A';
          }
        })
      );
    });
    const doc = new jspdf.jsPDF('l', 'px', 'a4');
    let table = document.createElement('table');
    let tableHeaders = document.createElement('thead');
    colunms.forEach((c) => {
      let th = document.createElement('th');
      th.innerHTML = c;
      tableHeaders.appendChild(th);
    });
    tableHeaders.setAttribute(
      'style',
      'border-bottom: 1px solid black; font-weight: bold'
    );
    let tBody = document.createElement('tbody');
    dataString.forEach((dataS) => {
      let tr = document.createElement('tr');
      for (let i = 0; i < colunms.length; i++) {
        let td = document.createElement('td');
        td.innerHTML = dataS[i];
        td.setAttribute('style', 'font-size: 10px');
        tr.appendChild(td);
      }
      tBody.appendChild(tr);
    });
    table.appendChild(tableHeaders);
    table.appendChild(tBody);
    table.setAttribute('style', `text-align: center; white-space: nowrap;`);
    if (footerData) {
      let tf = document.createElement('tfoot');
      footerData.forEach((fd) => {
        let td = document.createElement('td');
        td.innerHTML = fd;
        td.setAttribute('style', 'font-size: 10px');
        tf.appendChild(td);
      });
      table.appendChild(tf);
    }
    doc.html(table).then(() => doc.save(nomeArquivo));
  }
}
