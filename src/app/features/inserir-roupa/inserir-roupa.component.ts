import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { RoupasService } from '../../services/roupas.service';
import { NumericoDirective } from '../../shared/directive/numerico.directive';
import { RequiredFieldDirective } from '../../shared/directive/required.directive';
import { Roupa } from '../../Pedido';

@Component({
  selector: 'app-inserir-roupa',
  standalone: true,
  imports: [CommonModule, MatCommonModule, MatButtonModule, MatInputModule,
    MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule,
    MenuAdminComponent, DeleteDialog, RouterModule, ReactiveFormsModule,
    NumericoDirective, RequiredFieldDirective],
  templateUrl: './inserir-roupa.component.html',
  styleUrls: ['./inserir-roupa.component.css']
})
export class InserirRoupaComponent {
  FormularioRegistroRoupa: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roupasService: RoupasService,
    private router: Router
  ) {
    this.FormularioRegistroRoupa = this.fb.group({
      tipo: [null, Validators.required],
      tempo: [null, [Validators.required, Validators.pattern('^[0-9]+$')]]  
    });
  }

  onSubmit() {
    if (this.FormularioRegistroRoupa.valid) {
      const roupa: Roupa = {
        tipo: this.FormularioRegistroRoupa.get('tipo')?.value!,
        tempo: parseInt(this.FormularioRegistroRoupa.get('tempo')?.value!, 10)
      };

      this.roupasService.addRoupa(roupa).subscribe(
        () => {
          this.router.navigate(['/listar-roupa']);
        },
        error => {
          console.error('Erro ao adicionar roupa', error);
        }
      );
    } else {
      this.FormularioRegistroRoupa.markAllAsTouched();
    }
  }
}
