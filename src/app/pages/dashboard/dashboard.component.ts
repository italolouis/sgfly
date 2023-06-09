import {Component, OnInit, ViewChild} from '@angular/core';
import {PlanoContas} from "../../shared/plano-contas";
import {PlanoContasService} from "../../service/plano-contas.service";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GraphService} from "../../service/graph.service";
import {ReceitasService} from "../../service/receitas.service";
import {DatePipe} from "@angular/common";
import {DespesasService} from "../../service/despesas.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
  status = false;
  listPlanoContas: PlanoContas[] = [];

  formDashboard!: FormGroup;

  multi: any[] = [];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Meses';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Valores';
  legendTitle: string = 'Classificação';
  colorScheme: Color = {
    domain: ['#e33232', '#29a2dc'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };

  constructor(
    private planoContasService : PlanoContasService,
    private fb: FormBuilder,
    private graphService: GraphService,
    private receitasService: ReceitasService,

    private despesasService: DespesasService,
    private datePipe:DatePipe
  ) {}

  planoContasSelect?: PlanoContas = new PlanoContas();
  sumDespesas : number = 0;
  sumReceitas: number= 0;
  ngOnInit(): void {
    this.getPlanoContasData()

    this.formDashboard = this.fb.group({
      planoContas: [null, Validators.required]
    });
  }

  getPlanoContasData(): void{
    this.planoContasService.getAllPlanosConta()
      .then((response) => {
        this.listPlanoContas = response.data
        this.setPlanoContaPadrao();
      }).catch(error => {
      console.log(error);
    });
  }

  setPlanoContaPadrao(): void{
    this.planoContasService.getPlanoContaPadrao()
      .then((response) => {
        if(response.data){
          const planID = response.data.id;
          this.planoContasSelect = this.listPlanoContas.find(c => c.id == planID);
          this.formDashboard.get('planoContas')?.setValue(this.planoContasSelect);
          this.getGraphDespesasReceitasByPlan(planID);
          this.getSumReceitasDespesasByPeriod();
        }
      }).catch(error => {
      console.log(error);
    });
  }

  getSumReceitasDespesasByPeriod(): void{
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const currentYear = currentDate.getFullYear();
    const startDate = new Date(currentYear, currentMonth - 1, 1); // Months are zero-indexed, so subtract 1

    const endDate = new Date(currentYear, currentMonth, 0);
    const params = {
      planoId: this.planoContasSelect?.id,
      dataInicial : this.datePipe.transform(startDate,'dd/MM/yyyy'),
      dataFinal : this.datePipe.transform(endDate,'dd/MM/yyyy')
    }

    this.receitasService.getSumReceitasByPeriod(params)
      .then((response) => {
        this.sumReceitas = response.data;
      });

    this.despesasService.getSumDespesasByPeriod(params)
      .then((response) => {
        this.sumDespesas = response.data;
      });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  getGraphDespesasReceitasByPlan(planId: number): void{
    var params = {
      planoId : planId
    }

    this.graphService.getGraphDespesasReceitasByPlan(params)
      .then((response) => {
        this.multi = response.data;
      });
  }

}
