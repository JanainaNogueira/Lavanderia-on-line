import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TelaClienteComponent } from './tela-cliente/tela-cliente.component';
import { RealizarPedidoComponent } from './realizar-pedido/realizar-pedido.component';

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
{path: 'home', component: TelaClienteComponent},
{path: 'realizar-pedido', component: RealizarPedidoComponent}
];
