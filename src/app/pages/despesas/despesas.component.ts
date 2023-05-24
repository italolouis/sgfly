import {Component, OnInit} from '@angular/core';
import {DatatablePagination} from "../../shared/datatable-pagination";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PlanoContasService} from "../../service/plano-contas.service";
import {DatatablePaginationService} from "../../service/datatable-pagination.service";
import {CadastraDespesasComponent} from "./cadastra-despesas/cadastra-despesas.component";
import {DespesasService} from "../../service/despesas.service";
import {PlanoContas} from "../../shared/plano-contas";
import * as moment from 'moment';
import {HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent implements OnInit{
  tableLimit = 8;
  id?: number;
  descricao: string = '';
  valor?: number;
  planoContas?: PlanoContas;
  data?: Date;
  datatablePagination: DatatablePagination = new DatatablePagination()
  listPlanoContas: any[] = [];
  listCategorias: any[] = [];

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private planoContasService : PlanoContasService,
    private despesaService : DespesasService,
    private paginationService: DatatablePaginationService,
  ) {
    this.paginationService.setDatatablePagination(this.datatablePagination);
  }

  ngOnInit(): void {
    this.getPlanoContasData();
    this.getCategoriasData();
    this.getDespesas();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CadastraDespesasComponent, {
      width: '680px',
      height: '680px',
      data: {
        title: 'Cadastrar Despesas',
        listPlanoContas: this.listPlanoContas,
        listCategorias : this.listCategorias,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDespesas();
    });
  }

  getPlanoContasData(): void{
    this.planoContasService.getAllPlanosConta()
      .subscribe((response) =>
        this.listPlanoContas = response)
  }

  getCategoriasData(): void{
    this.despesaService.getCategorias()
      .subscribe((response) =>
        this.listCategorias = response)
  }

  getDespesas(data?: any, page?: string): void{
    let params = new HttpParams();

    if (page) {
      params = params.append('page', String(page));
    }

    params = params.append('size', String(this.tableLimit))

    this.despesaService.getDespesas(params)
      .subscribe((response) =>
        this.paginationService.setInfo(response));
  }

  formatarDataExtenso(data: Date) {
    moment.locale('pt');
    moment.updateLocale('pt', {
      months : [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
      ]});

    var dataMoment = moment(data, 'DD/MM/YYYY')
    return moment(dataMoment).format('DD MMMM YYYY');;
  }

  formatarDecimal(value : number){
    return value.toFixed(2);
  }

  formatarSimNao(value: boolean){
    if(value === true){
      return "Sim";
    }else{
      return "Não";
    }
  }

}
