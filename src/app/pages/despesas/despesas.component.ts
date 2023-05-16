import {Component, OnInit} from '@angular/core';
import {DatatablePagination} from "../../shared/datatable-pagination";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {PlanoContasService} from "../../service/plano-contas.service";
import {DatatablePaginationService} from "../../service/datatable-pagination.service";
import {CadastraPlanoContasComponent} from "../plano-contas/cadastra-plano-contas/cadastra-plano-contas.component";
import {CadastraDespesasComponent} from "./cadastra-despesas/cadastra-despesas.component";
import {DespesasService} from "../../service/despesas.service";
import {PlanoContas} from "../../shared/plano-contas";

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent implements OnInit{
  formExtratoContaOrbital = null ;
  tableLimit = 20;
  columns = [
    { prop: 'descricao', name: 'Despesa' },
    { prop: 'planoContas', name: 'Plano'},
    { prop: 'valor', name: 'Valor' },
    { prop: 'periodicidade', name: 'Periodicidade', sortable: false },
    { prop: 'dataInicio', name: 'Data Início', sortable: false },
    { prop: 'dataFim', name: 'Data Fim', sortable: false },
  ];

  id?: number;
  descricao: string = '';
  valor?: number;
  planoContas?: PlanoContas;
  data?: Date;
  categoria: string = '';
  observacao: string = '';
  dataVencimento?: Date;
  pago: boolean = false;
  loadingIndicator = true;
  reorderable = true;
  datatablePagination: DatatablePagination = new DatatablePagination()
  listPlanoContas: any[] = [];

  private listCategorias: any[] = [];

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
    this.despesaService.getDespesas()
      .subscribe((response) =>
        this.paginationService.setInfo(response));
  }

  toggleExpandRow(row: any) {
    console.log('Toggled Expand Row!', row);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }

}
