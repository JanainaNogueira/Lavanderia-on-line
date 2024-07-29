import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';

@Component({
  selector: 'app-editar-roupas',
  standalone: true,
  imports: [CommonModule, MatCommonModule, MatButtonModule, MatInputModule,
    MatIconModule, FormsModule, MenuAdminComponent,
    DeleteDialog, RouterModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, NumericoDirective, RequiredFieldDirective],
  templateUrl: './editar-roupas.component.html',
  styleUrls: ['./editar-roupas.component.css']
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
      this.roupasService.getRoupaByTipo(tipo).subscribe(
        roupa => {
          this.roupa = roupa;
          this.FormularioEditarRoupa.patchValue({
            tipo: this.roupa.tipo,
            tempo: this.roupa.tempo
          });
        },
        error => {
          console.error('Erro ao buscar a roupa', error);
          this.router.navigate(['/listar-roupa']);
        }
      );
    } else {
      this.router.navigate(['/listar-roupa']);
    }
  }

  createForm() {
    this.FormularioEditarRoupa = this.formBuilder.group({
      tipo: null,
      tempo: null
    });
  }
  onSubmit() {
    if (this.FormularioEditarRoupa.valid && this.roupa) {
      const roupaAtualizada: Roupa = {
        tipo: this.FormularioEditarRoupa.value.tipo,
        tempo: this.FormularioEditarRoupa.value.tempo
      };

      this.roupasService.editarRoupa(this.roupa.tipo, roupaAtualizada).subscribe(
        () => {
          this.router.navigate(['/listar-roupa']);
        },
        error => {
          console.error('Erro ao atualizar a roupa', error);
        }
      );
    }
  }
}

