import { Injectable } from '@angular/core';
import Api from "./api";

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  constructor() { }

  cadastrarReceitas(data: any) {
    return Api.post('/receita', data)
  }

  getReceitas(params: any) {
    return Api.get('/receita',  {params: params});
  }

  getSumReceitasByPeriod(params: any) {
    return Api.get('/receita/sumReceitasPeriod',  {params: params});
  }
}
