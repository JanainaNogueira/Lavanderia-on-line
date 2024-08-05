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
import { Pedido } from '../../shared/models/Pedido';

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

  constructor(
    public dialogRef: MatDialogRef<CancelDialogW>,
    @Inject(MAT_DIALOG_DATA) public data: { pedidoId: number },
    private pedidoService: PedidoService) {
  }
  cancelarPedido(){
    let find: Pedido | null = null
    this.pedidoService.fetchPedidos().subscribe((p) => p ? (find = p.find((pedido) => pedido.id! === this.data.pedidoId) || null) : null);
    if(find){
      this.pedidoService.updatePedidoStatus(this.data.pedidoId,"Cancelado", find);
    }
    this.dialogRef.close(true); 
  }

  onNoClick(): void {
    this.dialogRef.close(false); 
  }
}