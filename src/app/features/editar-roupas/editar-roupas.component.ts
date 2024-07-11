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
import { Roupa } from '../../Pedido';
import { RoupasService } from '../../services/roupas.service';

@Component({
  selector: 'app-editar-roupas',
  standalone: true,
  imports: [CommonModule, MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,
    DeleteDialog,RouterModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './editar-roupas.component.html',
  styleUrl: './editar-roupas.component.css'
})
export class EditarRoupasComponent {
  FormularioRegistroFunc: FormGroup;
  roupa: Roupa | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roupasService: RoupasService
  ) { }

  ngOnInit(): void {
    this.createForm();
    const tipo = this.route.snapshot.paramMap.get('tipo');
    if (tipo) {
      this.roupa = this.roupasService.getRoupaByTipo(tipo);
      if (!this.roupa) {
        this.router.navigate(['/listar-roupas']);
      } else {
        this.FormularioRegistroFunc.patchValue({
          tipo: this.roupa.tipo,
          tecido: this.roupa.tecido,
          tempo: this.roupa.tempo,
        });
      }
    } else {
      this.router.navigate(['/listar-roupas']);
  }
}
  createForm() {
    this.FormularioRegistroFunc = this.formBuilder.group({
      tipo: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ú ]+$')]],
      tecido: ['', Validators.required],
      tempo: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.FormularioRegistroFunc.valid && this.roupa) {
      this.roupa.tipo = this.FormularioRegistroFunc.value.nome;
      this.roupa.tecido= this.FormularioRegistroFunc.value.nascimento;
      this.roupa.tempo = this.FormularioRegistroFunc.value.email;
      this.roupasService.editarRoupa(this.roupa);
      this.router.navigate(['/listar-roupas']);
    }
  }
}
