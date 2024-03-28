import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TelaClienteComponent } from './tela-cliente/tela-cliente.component';
import { RealizarPedidoComponent } from './realizar-pedido/realizar-pedido.component';
import { ListarPedidoComponent } from './listar-pedido/listar-pedido.component';
import { TelaPagamentoComponent } from './tela-pagamento/tela-pagamento.component';
import { ConsultaPedidoComponent } from './consulta-pedido/consulta-pedido.component';
import { TelaFuncionarioComponent } from './tela-funcionario/tela-funcionario.component';

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
{path: 'realizar-pedido', component: RealizarPedidoComponent},
{path: 'listar-pedido', component: ListarPedidoComponent},
{path: 'payment/:numero', component: TelaPagamentoComponent},
{path: 'consulta-pedido', component: ConsultaPedidoComponent},
{path: 'admin', component: TelaFuncionarioComponent}
];
