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
import {DatePipe} from "@angular/common";
import {ToastService} from "../../service/toast.service";

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent implements OnInit{
  tableLimit = 8;
  id?: number;
  descricao: string = '';
  planoContas?: PlanoContas;
  data?: Date;
  datatablePagination: DatatablePagination = new DatatablePagination()
  listPlanoContas: any[] = [];
  listCategorias: any[] = [];

  dateRange = new FormGroup({
    dataInicial: new FormControl(),
    dataFinal: new FormControl()
  });

  formFilterDespesas!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private planoContasService : PlanoContasService,
    private despesaService : DespesasService,
    private paginationService: DatatablePaginationService,
    private datePipe:DatePipe,
    private toastService: ToastService
  ) {
    this.paginationService.setDatatablePagination(this.datatablePagination);
  }

  ngOnInit(): void {
    this.createForm();
    this.getPlanoContasData();
    this.getCategoriasData();
    this.getDespesas();
  }

  createForm() {
    this.formFilterDespesas = this.formBuilder.group({
      descricao: null,
      planoId: null,
      categoria: null,
      dataInicial: null,
      dataFinal: null
    });
  }

  openDialog(values?: any): void {
    const dialogRef = this.dialog.open(CadastraDespesasComponent, {
      width: '680px',
      height: '680px',
      data: {
        title: 'Cadastrar Despesas',
        listPlanoContas: this.listPlanoContas,
        listCategorias : this.listCategorias,
        row : values
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDespesas();
    });
  }

  getPlanoContasData(): void{
    this.planoContasService.getAllPlanosConta()
      .then((response) => {
        this.listPlanoContas = response.data
      }).catch(error => {
      console.log(error);
    });
  }

  getCategoriasData(): void{
    this.despesaService.getCategorias()
      .then((response) => {
        this.listCategorias = response.data
      });
  }

  getDespesas(data?: any, page?: string): void{
    var params = {
      page : page ? String(page) : 0,
      size : String(this.tableLimit)
    }

    if(data !== undefined){
      if(data.dataInicial !== null){
        data.dataInicial = this.datePipe.transform(data.dataInicial,'dd/MM/yyyy');
      }
      if(data.dataFinal !== null){
        data.dataFinal = this.datePipe.transform(data.dataFinal,'dd/MM/yyyy');
      }
    }

    const result = {...data, ...params};

    this.despesaService.getDespesas(result)
      .then((response) => {
        this.paginationService.setInfo(response.data)
      });
  }

  deleteDespesa(id: string): void{
    var params = {id : id.toString()};

    this.despesaService.deleteDespesa(params)
      .then((response: any) => {
        this.getDespesas()
        this.toastService.showSuccessToast('Cultura', 'Excluído com sucesso')
      }).catch(error => {
        this.toastService.showErrorToast('Falha', error.message)
    });
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

  formatarData(value: Date){
    return value;
  }

  limpar(){
    this.createForm()
  }

}
