import { Injectable } from '@angular/core';
import Api from "./api";

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  constructor(
  ) { }

  cadastrarDespesas(data: any) {
    return Api.post('/despesa', data)
  }

  deleteDespesa(params: any){
    return Api.delete('/despesa/'+ params.id );
  }

  atualizarDespesas(data: any) {
    return Api.patch('/despesa', data)
  }


  getDespesas(params: any) {
    return Api.get('/despesa',  {params: params});
  }

  getCategorias(){
    return Api.get('despesa/categorias')
  }

  getSumDespesasByPeriod(params: any) {
    return Api.get('/despesa/sumDespesasPeriod',  {params: params});
  }
}
