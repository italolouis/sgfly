import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {PlanoContasComponent} from "./pages/plano-contas/plano-contas.component";
import {DespesasComponent} from "./pages/despesas/despesas.component";
import {LoginComponent} from "./pages/login/login.component";
import {LayoutComponent} from "./components/layout/layout.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'sg', component: LayoutComponent, children:
    [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'planoContas', component: PlanoContasComponent},
      {path: 'despesa', component: DespesasComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
