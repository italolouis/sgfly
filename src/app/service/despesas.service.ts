import { Injectable } from '@angular/core';
import Api from "./api";
import {objectToSearchString} from "serialize-query-params";

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  constructor(
  ) { }

  cadastrarDespesas(data: any) {
    return Api.post('/despesa', data)
  }

  getDespesas(params: any) {
    return Api.get('/despesa',  {params: params});
  }

  getCategorias(){
    return Api.get('despesa/categorias')
  }
}
