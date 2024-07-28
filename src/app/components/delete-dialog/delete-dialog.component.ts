import { Component } from '@angular/core';
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
  selector: 'app-delete-dialog',
  styleUrl: 'delete-dialog.component.css',
  templateUrl: 'delete-dialog.component.html',
  standalone: true,
  imports: [MatButtonModule],
})

export class DeleteDialog {
  constructor(public dialog: MatDialog) {}
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,): void {
    this.dialog.open(DeleteDialogW, {
      width: '25vw',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'deleteDialogW',
  templateUrl: 'delete-dialog-Window.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DeleteDialogW {
  constructor(public dialogRef: MatDialogRef<DeleteDialogW>) {}
  onYesClick(){
    alert('Funcionário excluído')
    this.dialogRef.close(true); 
  }

  onNoClick(): void {
    this.dialogRef.close(false); 
  }
}