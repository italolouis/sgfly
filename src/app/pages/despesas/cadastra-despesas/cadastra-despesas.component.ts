import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

  moneyValue: number = 0;

  isAdicionar: boolean = true;

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
      this.isAdicionar = false;
    }else{
      this.isAdicionar = true;
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
      descricao: new FormControl(despesa.descricao, [Validators.required ]),
      valor: new FormControl(despesa.valor, [Validators.required ]),
      planoContas: new FormControl(despesa.planoContas, [Validators.required ]),
      categoria: new FormControl(despesa.categoria, [Validators.required ]),
      observacao: despesa.observacao,
      dataVencimento: new FormControl(despesa.dataVencimento, [Validators.required ]),
      pago: despesa.pago,
    });
  }

  onSubmit() {
    if(this.formDespesas.valid){
      var data = this.formDespesas.value;
      var planoId = Number(data.planoContas);

      if(planoId !== null){
        var planoContasData = this.listPlanoContas.find(i => i.id === planoId);
        data.planoContas = planoContasData;
      }

      data.valor = parseFloat(data.valor);
      data.dataVencimento =  (moment(data.dataVencimento)).format('DD/MM/YYYY');

      if(data.id !== null && data.id !== undefined){
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

}
