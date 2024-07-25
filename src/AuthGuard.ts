import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    canActivate() {
     
        let clienteId = sessionStorage.getItem("clienteId");
        let adminId = sessionStorage.getItem("adminId")
        if (!clienteId && !adminId) {
         this.router.navigate(['login']);
        }
        console.log('AuthGuard#canActivate called');
        return true;
    }

    constructor(private router: Router) { }
}