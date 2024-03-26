import {Component} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-cancelDialog',
  styleUrl: 'cancel-dialog.component.css',
  templateUrl: 'cancel-dialog.component.html',
  standalone: true,
  imports: [MatButtonModule],
})
export class CancelDialog {
  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,): void {
    this.dialog.open(CancelDialogW, {
      width: '25vw',
      enterAnimationDuration,
      exitAnimationDuration,
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
  constructor(public dialogRef: MatDialogRef<CancelDialogW>) {}
  onYesClick(){
    alert('pedido cancelado')
  }
}