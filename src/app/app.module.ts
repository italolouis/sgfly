import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlanoContasComponent } from './pages/plano-contas/plano-contas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { CadastraPlanoContasComponent } from './pages/plano-contas/cadastra-plano-contas/cadastra-plano-contas.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from "@angular/material/input";
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { DespesasComponent } from './pages/despesas/despesas.component';
import { CadastraDespesasComponent } from './pages/despesas/cadastra-despesas/cadastra-despesas.component';
import {MatTabsModule} from "@angular/material/tabs";
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import {DatePipe} from "@angular/common";
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CadastraUsuarioComponent } from './pages/login/cadastra-usuario/cadastra-usuario.component';
import { ReceitasComponent } from './pages/receitas/receitas.component';
import { CadastraReceitasComponent } from './pages/receitas/cadastra-receitas/cadastra-receitas.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {NgxChartsModule} from "@swimlane/ngx-charts";

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlanoContasComponent,
    CadastraPlanoContasComponent,
    DespesasComponent,
    CadastraDespesasComponent,
    LoginComponent,
    LayoutComponent,
    CadastraUsuarioComponent,
    ReceitasComponent,
    CadastraReceitasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    NgxDatatableModule,
    MatTabsModule,
    NgApexchartsModule,
    NgxChartsModule,
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
