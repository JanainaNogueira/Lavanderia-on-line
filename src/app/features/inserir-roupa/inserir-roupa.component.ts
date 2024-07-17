import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../components/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RoupasService } from '../../services/roupas.service';

@Component({
  selector: 'app-inserir-roupa',
  standalone: true,
  imports: [CommonModule, MatCommonModule,MatButtonModule,MatInputModule,
    MatIconModule,FormsModule, MenuAdminComponent,
    DeleteDialog,RouterModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './inserir-roupa.component.html',
  styleUrls: ['./inserir-roupa.component.css']
})
export class InserirRoupaComponent {
  FormularioRegistroRoupa = this.fb.group({
    tipo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
    tempo: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]]
  });
  constructor(private fb: FormBuilder,
    private roupasService: RoupasService,
    private router: Router) {}

  onSubmit() {
    if(this.FormularioRegistroRoupa.valid){
      const tipo = this.FormularioRegistroRoupa.value.tipo as string;
      if(this.FormularioRegistroRoupa.value.tempo !=null){
        const tempo = parseInt(this.FormularioRegistroRoupa.value.tempo, 10);
        this.roupasService.addRoupa(
          tipo,
          tempo);
        this.router.navigate(['./listar-roupa'])
      }

    }else{

    }

}
}
