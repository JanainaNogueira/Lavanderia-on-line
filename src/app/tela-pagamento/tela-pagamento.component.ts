import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component'

@Component({
  selector: 'app-tela-pagamento',
  standalone: true,
  imports: [MenuLateralComponent],
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
