import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component'
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tela-pagamento',
  standalone: true,
  imports: [MenuLateralComponent,MatButtonModule, MatCommonModule],
  templateUrl: './tela-pagamento.component.html',
  styleUrl: './tela-pagamento.component.css'
})
export class TelaPagamentoComponent implements OnInit{
  numero: string

  constructor(private route: ActivatedRoute){
  }

  ngOnInit(): void {
      this.numero = this.route.snapshot.paramMap.get('numero') || "000"
  }

}
