import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Lavanderia-on-line';
  constructor(router: Router){
    let clienteId = sessionStorage.getItem("clienteId");
    let adminId = sessionStorage.getItem("adminId")
    if(!clienteId && !adminId){
      router.navigate(['login'])
    }
  }
}
