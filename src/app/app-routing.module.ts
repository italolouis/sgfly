import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {PlanoContasComponent} from "./pages/plano-contas/plano-contas.component";
import {CadastraPlanoContasComponent} from "./pages/plano-contas/cadastra-plano-contas/cadastra-plano-contas.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'planoContas', component: PlanoContasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
