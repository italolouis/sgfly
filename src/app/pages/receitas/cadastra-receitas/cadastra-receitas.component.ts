import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PlanoContas} from "../../../shared/plano-contas";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DespesasService} from "../../../service/despesas.service";
import {Despesa} from "../../../shared/despesa";
import * as moment from "moment/moment";
import {Receita} from "../../../shared/receita";
import {ReceitasService} from "../../../service/receitas.service";

@Component({
  selector: 'app-cadastra-receitas',
  templateUrl: './cadastra-receitas.component.html',
  styleUrls: ['./cadastra-receitas.component.scss']
})
export class CadastraReceitasComponent implements OnInit{
  formReceitas!: FormGroup;
  listPlanoContas: PlanoContas[] = [];

  isAdicionar: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CadastraReceitasComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private formBuilder: FormBuilder,
    private receitaService : ReceitasService,
  ) {}

  ngOnInit(): void {
    if(this.data.row !== undefined){
      this.createForm(this.data.row);
      this.isAdicionar = false;
    }else{
      this.createForm(new Receita());
      this.isAdicionar = true;
    }
    this.listPlanoContas = this.data.listPlanoContas;
  }
  cancel(): void {
    this.dialogRef.close();
  }

  createForm(receita: Receita) {
    this.formReceitas = this.formBuilder.group({
      descricao: receita.descricao,
      valor: receita.valor,
      planoContas: receita.planoContas,
      observacao: receita.observacao,
      dataRecebimento: receita.dataRecebimento,
    });
  }

  onSubmit() {
    var data = this.formReceitas.value;
    var planoId = Number(data.planoContas);

    if(planoId !== null){
      var planoContasData = this.listPlanoContas.find(i => i.id === planoId);
      data.planoContas = planoContasData;
    }

    data.valor = parseFloat(data.valor);
    data.dataRecebimento =  (moment(data.dataRecebimento)).format('DD/MM/YYYY')

    if(data.id !== null){
      this.receitaService.atualizarReceita(data)
        .then((response) => {
          this.cancel();
        });
    }else{
      this.receitaService.cadastrarReceitas(data)
        .then((response) => {
          this.cancel();
        });
    }
  }

}
