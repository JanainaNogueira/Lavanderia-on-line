import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pedido } from '../../shared/models/Pedido';
import { CommonModule, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-pedido-dialog',
  standalone: true,
  imports: [NgIf,NgFor,CommonModule],
  templateUrl: './pedido-dialog.component.html',
  styleUrl: './pedido-dialog.component.css'
})
export class PedidoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pedido,
  private dialogRef: MatDialogRef<PedidoDialogComponent> ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
