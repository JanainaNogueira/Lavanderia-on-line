import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegistroComponent } from './features/registro/registro.component';
import { TelaClienteComponent } from './features/tela-cliente/tela-cliente.component';
import { RealizarPedidoComponent } from './features/realizar-pedido/realizar-pedido.component';
import { ListarPedidoComponent } from './features/listar-pedido/listar-pedido.component';
import { TelaPagamentoComponent } from './features/tela-pagamento/tela-pagamento.component';
import { ConsultaPedidoComponent } from './features/consulta-pedido/consulta-pedido.component';
import { TelaFuncionarioComponent } from './features/tela-funcionario/tela-funcionario.component';
import { ListarAdmComponent } from './features/listar-adm/listar-adm.component';
import { InserirFuncionarioComponent } from './features/inserir-funcionario/inserir-funcionario.component';
import { RelatoriosComponent } from './features/relatorios/relatorios.component'
import { ListarFuncionarioComponent } from './features/listar-funcionario/listar-funcionario.component';
import { EditarFuncionarioComponent } from './features/editar-funcionario/editar-funcionario.component';
import {ListarRoupasComponent} from './features/listar-roupas/listar-roupas.component'
import { EditarRoupasComponent } from './features/editar-roupas/editar-roupas.component';
import { InserirRoupaComponent } from './features/inserir-roupa/inserir-roupa.component';
import { AuthGuard } from '../AuthGuard';
import { BuscaPedidoComponent } from './features/busca-pedido/busca-pedido.component';
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
{path: 'home', component: TelaClienteComponent, canActivate:[AuthGuard]},
{path: 'realizar-pedido', component: RealizarPedidoComponent, canActivate:[AuthGuard]},
{path: 'listar-pedido', component: ListarPedidoComponent, canActivate:[AuthGuard]},
{path: 'payment/:numero', component: TelaPagamentoComponent, canActivate:[AuthGuard]},
{path: 'consulta-pedido', component: ConsultaPedidoComponent, canActivate:[AuthGuard]},
{path: 'admin', component: TelaFuncionarioComponent, canActivate:[AuthGuard]},
{path: 'listar-adm', component: ListarAdmComponent, canActivate:[AuthGuard]},
{path: 'relatorios', component: RelatoriosComponent, canActivate:[AuthGuard]},
{path: 'listar-funcionario',component:ListarFuncionarioComponent, canActivate:[AuthGuard]},
{path: 'listar-roupa', component: ListarRoupasComponent, canActivate:[AuthGuard]},
{path: 'inserir-funcionario',component:InserirFuncionarioComponent, canActivate:[AuthGuard]},
{path: 'editar-roupa/:id', component:EditarRoupasComponent, canActivate:[AuthGuard]},
{path: 'editar-funcionario/:id', component:EditarFuncionarioComponent, canActivate:[AuthGuard] },
{path:'inserir-roupa',component:InserirRoupaComponent, canActivate:[AuthGuard]},
{path:'busca-pedido',component:BuscaPedidoComponent, canActivate:[AuthGuard]}
];
