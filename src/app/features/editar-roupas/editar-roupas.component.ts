import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Roupa } from '../../shared/models/Pedido';
import { RoupasService } from '../../services/roupas.service';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-roupas',
  standalone: true,
  imports: [CommonModule, MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,
    DeleteDialog,RouterModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule, NumericoDirective, RequiredFieldDirective],
  templateUrl: './editar-roupas.component.html',
  styleUrls: ['./editar-roupas.component.css']
})
export class EditarRoupasComponent implements OnInit {
  FormularioEditarRoupa: FormGroup;
  roupa: Roupa = {tipo:"",tempo:0,precoRoupa:0,descricao:"",id:0};
  idRoupa:string;
  mensagem: string = "";
  mensagem_detalhes: string = "";
  tempoAntigo: number = 0;
  precoAntigo: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roupasService: RoupasService,
    private dialog: MatDialog,
  ) { }
  openDialog(): void {
    this.dialog.open(AlertDialogComponent, {
      data: {
        mensagem: this.mensagem,
        mensagem_detalhes: this.mensagem_detalhes
      },
      width: '250px'
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.idRoupa= this.route.snapshot.params['id'];
    if (this.idRoupa) {
      this.roupasService.getRoupaById(+this.idRoupa).subscribe({
        next:(roupa)=>{
          if(roupa==null){
            this.mensagem=`Erro ao buscar roupa ${this.idRoupa}`;
            this.mensagem_detalhes=`Roupa não encontrada ${this.idRoupa}`;
          }else{
            this.roupa = roupa;
            this.tempoAntigo = roupa.tempo;
            this.precoAntigo = roupa.precoRoupa;
            this.FormularioEditarRoupa.patchValue({
              tipo:roupa.tipo,
              tempo:roupa.tempo,
              preco:roupa.precoRoupa
            });
          }
        },
        error:(err)=>{
          this.mensagem = `Erro ao buscar roupa: ${this.idRoupa}`;
          this.mensagem_detalhes=`[${err.status}] ${err.message}`;
          this.openDialog();
        }
      })
    } else {
      this.roupa={tipo:"",tempo:0,precoRoupa:0,descricao:"",id:0};
  }
}
  createForm() {
    this.FormularioEditarRoupa = this.formBuilder.group({
      tipo: [null,Validators.required],
      tempo: [null,Validators.required],
      preco:[null,Validators.required]
    });
  }

  onSubmit():void {
    if (this.FormularioEditarRoupa.valid) {
      this.roupa.precoRoupa=this.FormularioEditarRoupa.get('preco')?.value;
      this.roupa.tempo = this.FormularioEditarRoupa.get('tempo')?.value;
      this.roupa.tipo = this.FormularioEditarRoupa.get('tipo')?.value;
      this.roupasService.editarRoupa(this.roupa).subscribe({
        next:()=>{
          this.router.navigate(["/listar-roupa"]);
        },
        error:(err)=>{
          this.mensagem=`Erro ao atualizar roupa ${this.roupa.tipo}`
          this.mensagem_detalhes=`[${err.status}] ${err.message}`;
          this.openDialog();
        }
      });
    }
  }
}
