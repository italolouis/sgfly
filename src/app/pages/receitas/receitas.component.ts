import {Component, OnInit} from '@angular/core';
import {PlanoContas} from "../../shared/plano-contas";
import {DatatablePagination} from "../../shared/datatable-pagination";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PlanoContasService} from "../../service/plano-contas.service";
import {DespesasService} from "../../service/despesas.service";
import {DatatablePaginationService} from "../../service/datatable-pagination.service";
import {DatePipe} from "@angular/common";
import {CadastraDespesasComponent} from "../despesas/cadastra-despesas/cadastra-despesas.component";
import * as moment from "moment/moment";
import {ReceitasService} from "../../service/receitas.service";
import {CadastraReceitasComponent} from "./cadastra-receitas/cadastra-receitas.component";
import {ToastService} from "../../service/toast.service";

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit{
  tableLimit = 8;
  id?: number;
  descricao: string = '';
  planoContas?: PlanoContas;
  data?: Date;
  datatablePagination: DatatablePagination = new DatatablePagination()
  listPlanoContas: any[] = [];
  dateRange = new FormGroup({
    dataInicial: new FormControl(),
    dataFinal: new FormControl()
  });

  formFilterReceitas!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private planoContasService : PlanoContasService,
    private receitasService : ReceitasService,
    private paginationService: DatatablePaginationService,
    private datePipe:DatePipe,
    private toastService:ToastService
  ) {
    this.paginationService.setDatatablePagination(this.datatablePagination);
  }

  ngOnInit(): void {
    this.createForm();
    this.getPlanoContasData();
    this.getReceitas();
  }

  createForm() {
    this.formFilterReceitas = this.formBuilder.group({
      descricao: null,
      planoId: null,
      categoria: null,
      dataInicial: null,
      dataFinal: null
    });
  }

  openDialog(values? : any): void {
    const dialogRef = this.dialog.open(CadastraReceitasComponent, {
      panelClass: 'app-dialog',
      data: {
        title: 'Cadastrar Receitas',
        listPlanoContas: this.listPlanoContas,
        row: values
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getReceitas()
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

  getReceitas(data?: any, page?: number): void{
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

    this.receitasService.getReceitas(result)
      .then((response) => {
        this.paginationService.setInfo(response.data)
      });
  }

  deleteReceita(id: string): void{
    var params = {id : id.toString()};

    this.receitasService.deleteReceita(params)
      .then((response: any) => {
        this.getReceitas()
        this.toastService.showSuccessToast('Receita', 'Excluída com sucesso')
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
