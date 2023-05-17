import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PlanoContas} from "../../../shared/plano-contas";
import {PlanoContasService} from "../../../service/plano-contas.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-cadastra-plano-contas',
  templateUrl: './cadastra-plano-contas.component.html',
  styleUrls: ['./cadastra-plano-contas.component.scss']
})
export class CadastraPlanoContasComponent implements OnInit{
  formPlanoContas!: FormGroup;
  listPeriodicidade: [] = [];
  constructor(
    public dialogRef: MatDialogRef<CadastraPlanoContasComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private formBuilder: FormBuilder,
    private planoContasService : PlanoContasService,
  ) {}

  ngOnInit(): void {
    this.createForm(new PlanoContas());
    this.listPeriodicidade = this.data.periodicidade;
  }
  cancel(): void {
    this.dialogRef.close();
  }

  createForm(planoContas: PlanoContas) {
    this.formPlanoContas = this.formBuilder.group({
      descricao: planoContas.descricao,
      padrao: planoContas.padrao,
      periodicidade: planoContas.periodicidade,
      dataInicio: planoContas.dataInicio,
      dataFim: planoContas.dataFim,
    });
  }

  onSubmit() {
    var data = this.formPlanoContas.value;

    data.dataInicio = (moment(data.dataInicio)).format('DD/MM/YYYY HH:mm:ss');
    data.dataFim = (moment(data.dataFim)).format('DD/MM/YYYY HH:mm:ss');

    this.planoContasService.cadastrarPlanoContas(this.formPlanoContas.value)
      .subscribe(
        response => {
          this.cancel();
        });
  }
}
