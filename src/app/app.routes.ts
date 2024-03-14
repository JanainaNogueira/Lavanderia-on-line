import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TelaClienteComponent } from './tela-cliente/tela-cliente.component';

export const routes: Routes = [{
    path:'login', 
    component: LoginComponent
},
{
    path:'registro',
    component:RegistroComponent
},
{
    path: '', redirectTo:'login', pathMatch:'full'
},
{path: 'home', component: TelaClienteComponent}
];
