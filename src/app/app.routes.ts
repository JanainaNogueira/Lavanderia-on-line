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
{path: 'admin', component: TelaFuncionarioComponent},
{path: 'listar-adm', component: ListarAdmComponent},
{path: 'relatorios', component: RelatoriosComponent},
{path: 'listar-funcionario',component:ListarFuncionarioComponent},
{path: 'listar-roupa', component: ListarRoupasComponent},
{path: 'inserir-funcionario',component:InserirFuncionarioComponent},
{path: 'editar-funcionario/:email', component:EditarFuncionarioComponent }
];
