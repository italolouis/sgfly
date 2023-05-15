import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PlanoContas} from "../../../shared/plano-contas";

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
  ) {}

  ngOnInit(): void {
    console.log('The dialog was open');
    console.log(this.data);
    this.createForm(new PlanoContas());
    this.listPeriodicidade = this.data.periodicidade;
  }
  onNoClick(): void {
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
    console.log(this.formPlanoContas.value);
  }
}
