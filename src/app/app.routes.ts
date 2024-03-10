import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TelaClienteComponent } from './tela-cliente/tela-cliente.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegistroComponent},
  {path: 'home', component: TelaClienteComponent}
];
