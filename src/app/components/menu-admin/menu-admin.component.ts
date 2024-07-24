import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent implements OnInit {
  private router: Router
  constructor(router: Router){
    this.router = router
  }
    ngOnInit(): void {
    }

    logOut(){
      sessionStorage.removeItem("adminId")
      this.router.navigate(['/login'])    
    }
}
