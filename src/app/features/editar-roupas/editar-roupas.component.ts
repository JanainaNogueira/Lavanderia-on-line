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
export class EditarRoupasComponent implements OnInit {
  FormularioEditarRoupa: FormGroup;
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
        this.router.navigate(['/listar-roupa']);
      } else {
        this.FormularioEditarRoupa.patchValue({
          tipo: this.roupa.tipo,
          tempo: this.roupa.tempo,
        });
      }
    } else {
      this.router.navigate(['/listar-roupa']);
  }
}
  createForm() {
    this.FormularioEditarRoupa = this.formBuilder.group({
      tipo: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ú ]+$')]],
      tempo: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]]
    });
  }

  onSubmit() {
    if (this.FormularioEditarRoupa.valid && this.roupa) {
      this.roupa.tipo = this.FormularioEditarRoupa.value.tipo;
      this.roupa.tempo = this.FormularioEditarRoupa.value.tempo;
      this.roupasService.editarRoupa(this.roupa);
      this.router.navigate(['/listar-roupa']);
    }
  }
}
