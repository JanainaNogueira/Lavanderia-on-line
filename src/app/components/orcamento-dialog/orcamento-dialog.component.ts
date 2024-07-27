import { RealizarPedidoComponent } from './../../features/realizar-pedido/realizar-pedido.component';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-orcamento-dialog',
  standalone: true,
  imports: [NgIf,NgFor,CommonModule],
  templateUrl: './orcamento-dialog.component.html',
  styleUrl: './orcamento-dialog.component.css'
})
export class OrcamentoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RealizarPedidoComponent,
  private dialogRef: MatDialogRef<OrcamentoDialogComponent> ) {}

  rejeitaOrcamento() {
    this.dialogRef.close(false);
  }
  aceitaOrcamento() {
    this.dialogRef.close(true);
  }
}
