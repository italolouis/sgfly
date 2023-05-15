import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CadastraPlanoContasComponent} from "./cadastra-plano-contas/cadastra-plano-contas.component";
import {FormBuilder} from "@angular/forms";
import {PlanoContasService} from "../../service/plano-contas.service";

@Component({
  selector: 'app-plano-contas',
  templateUrl: './plano-contas.component.html',
  styleUrls: ['./plano-contas.component.scss']
})
export class PlanoContasComponent implements OnInit{
  public formExtratoContaOrbital = null ;
  private periodicidadeList: any[] = [];
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private planoContasService : PlanoContasService
  ) {

  }

  ngOnInit(): void {
    this.getPeriodicidadeData();
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
      console.log('The dialog was closed');
    });
  }

  getPeriodicidadeData(): void{
    this.planoContasService.getPeriodicidade()
      .subscribe((response) =>
        this.periodicidadeList = response);
  }

}
