import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent implements OnInit {
  private router: Router
  constructor(router: Router){
    this.router = router
  }
    ngOnInit(): void {
    }
  logOut(){
    sessionStorage.removeItem("clienteId")
    this.router.navigate(['/login'])    
  }
}
