import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlanoContas} from "../../../shared/plano-contas";
import {Despesa} from "../../../shared/despesa";
import {DespesasService} from "../../../service/despesas.service";
import * as moment from 'moment';

@Component({
  selector: 'app-cadastra-despesas',
  templateUrl: './cadastra-despesas.component.html',
  styleUrls: ['./cadastra-despesas.component.scss']
})
export class CadastraDespesasComponent implements OnInit{
  formDespesas!: FormGroup;
  listPlanoContas: PlanoContas[] = [];
  listCategoria: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CadastraDespesasComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private formBuilder: FormBuilder,
    private despesasService : DespesasService,
  ) {}

  ngOnInit(): void {
    if(this.data.row !== undefined){
      this.createForm(this.data.row);
    }else{
      this.createForm(new Despesa());
    }
    this.listPlanoContas = this.data.listPlanoContas;
    this.listCategoria = this.data.listCategorias;
  }
  cancel(): void {
    this.dialogRef.close();
  }

  createForm(despesa: Despesa) {
    this.formDespesas = this.formBuilder.group({
      id: despesa.id,
      descricao: despesa.descricao,
      valor: despesa.valor,
      planoContas: despesa.planoContas,
      categoria: despesa.categoria,
      observacao: despesa.observacao,
      dataVencimento: despesa.dataVencimento,
      pago: despesa.pago,
    });
  }

  onSubmit() {
    var data = this.formDespesas.value;
    var planoId = Number(data.planoContas);

    if(planoId !== null){
      var planoContasData = this.listPlanoContas.find(i => i.id === planoId);
      data.planoContas = planoContasData;
    }

    data.valor = parseFloat(data.valor);
    data.dataVencimento =  (moment(data.dataVencimento)).format('DD/MM/YYYY');

    if(data.id !== undefined){
      this.despesasService.atualizarDespesas(data)
        .then((response) => {
          this.cancel();
        });
    }else{
      this.despesasService.cadastrarDespesas(data)
        .then((response) => {
          this.cancel();
        });
    }
  }

}
