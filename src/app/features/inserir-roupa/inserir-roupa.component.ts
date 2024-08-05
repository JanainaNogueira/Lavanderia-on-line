import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RoupasService } from '../../services/roupas.service';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-inserir-roupa',
  standalone: true,
  imports: [CommonModule, MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,
    DeleteDialog,RouterModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule, NumericoDirective, RequiredFieldDirective],
  templateUrl: './inserir-roupa.component.html',
  styleUrls: ['./inserir-roupa.component.css']
})

export class InserirRoupaComponent {
  FormularioRegistroRoupa = this.fb.group({
    tipo: ['',Validators.required],
    tempo: [null,Validators.required],
    preco:[null,Validators.required]
  });
  mensagem:string = "";
  mensagem_detalhes:string ="";

  constructor(private fb: FormBuilder,
    private roupasService: RoupasService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  openDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: {
        mensagem: this.mensagem,
        mensagem_detalhes: this.mensagem_detalhes
      },
      width: '250px'
    });
  }
  onSubmit():void {
    if(this.FormularioRegistroRoupa.valid){
      const tempo = this.FormularioRegistroRoupa.get('tempo')?.value?? '';
      const tipo = this.FormularioRegistroRoupa.get('tipo')?.value ?? '';
      const preco = this.FormularioRegistroRoupa.get('preco')?.value?? '';

      if (typeof tipo === 'string' && tipo.trim() !== '' && tempo !== null && preco !== null){
        const tempoNumber = parseInt(tempo as string, 10);
        const precoNumber = parseFloat(preco as string);
        this.roupasService.addRoupa(tipo,tempoNumber,precoNumber).subscribe({
          next:()=>{
            this.router.navigate(['./listar-roupa'])
          },
          error:(err)=>{
            this.mensagem = `Erro ao inserir roupa ${tipo}`;
            if (err.status == 409) {
              this.mensagem_detalhes = `Roupa já existente`;
            } else {
              this.mensagem_detalhes = `[${err.status}] ${err.message}`;
              this.openDialog();
            }
          }
        })


      }

    }else{

    }
}

}
