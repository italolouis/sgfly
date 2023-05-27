import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CadastraPlanoContasComponent} from "./cadastra-plano-contas/cadastra-plano-contas.component";
import {FormBuilder} from "@angular/forms";
import {PlanoContasService} from "../../service/plano-contas.service";
import {DatatablePagination} from "../../shared/datatable-pagination";
import {DatatablePaginationService} from "../../service/datatable-pagination.service";

@Component({
  selector: 'app-plano-contas',
  templateUrl: './plano-contas.component.html',
  styleUrls: ['./plano-contas.component.scss']
})
export class PlanoContasComponent implements OnInit{
  formExtratoContaOrbital = null ;
  columns = [
    { prop: 'descricao', name: 'Plano' },
    { prop: 'padrao', name: 'Padrão' },
    { prop: 'periodicidade', name: 'Periodicidade', sortable: false },
    { prop: 'dataInicio', name: 'Data Início', sortable: false },
    { prop: 'dataFim', name: 'Data Fim', sortable: false },
  ];
  rows: any[] = [];
  loadingIndicator = true;
  reorderable = true;
  datatablePagination: DatatablePagination = new DatatablePagination()
  private periodicidadeList: any[] = [];

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private planoContasService : PlanoContasService,
    private paginationService: DatatablePaginationService,
  ) {
    this.paginationService.setDatatablePagination(this.datatablePagination);
  }

  ngOnInit(): void {
    //this.getPeriodicidadeData();
    this.getPlanoContasData();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CadastraPlanoContasComponent, {
      width: '600px',
      height: '600px',
      data: {
        title: 'Cadastrar Plano de Contas',
        name: 'teste',
        periodicidade: this.periodicidadeList
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPlanoContasData();
    });
  }

  getPeriodicidadeData(): void{
    this.planoContasService.getPeriodicidade()
      .subscribe((response) =>
        this.periodicidadeList = response);
  }

  getPlanoContasData(): void{
    this.planoContasService.getPlanosConta()
      .then((response) => {
        console.log(response)
        this.paginationService.setInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getSimNao(value : boolean){
    if (value === true){
      return 'Sim';
    }else{
      return 'Não';
    }
  }
}
