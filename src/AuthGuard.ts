import { inject, Injectable }     from '@angular/core';
import { CanActivateFn, Router }    from '@angular/router';



export const AuthGuard: CanActivateFn = (route, state) => {
    let clienteId = sessionStorage.getItem("clienteId");
        let adminId = sessionStorage.getItem("adminId")
        const router = inject(Router)
        if (!clienteId && !adminId) {
         router.navigate(['login']);
        }
        return true;
}
