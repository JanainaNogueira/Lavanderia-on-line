import {Component, Inject, Input} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-cancelDialog',
  styleUrl: 'cancel-dialog.component.css',
  templateUrl: 'cancel-dialog.component.html',
  standalone: true,
  imports: [MatButtonModule],
})
export class CancelDialog {
  constructor(public dialog: MatDialog) {}
  @Input() pedidoId: number;
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, ): void {
    this.dialog.open(CancelDialogW, {
      width: '25vw',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        pedidoId: this.pedidoId
      }
    });
  }
}

@Component({
  selector: 'cancelDialogW',
  templateUrl: 'cancel-dialog-Window.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class CancelDialogW {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {pedidoId: number}, public dialogRef: MatDialogRef<CancelDialogW>, private pedidoService: PedidoService) {
  }
  cancelarPedido(){
    this.pedidoService.updatePedidoStatus(this.data.pedidoId, "Rejeitado/Cancelado");
  }
}