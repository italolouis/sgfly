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
    MatTabsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
