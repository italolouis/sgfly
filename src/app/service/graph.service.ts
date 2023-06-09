import { Injectable } from '@angular/core';
import Api from "./api";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }

  getGraphDespesasReceitasByPlan(params: any) {
    return Api.get('/graph/despesasReceitasByPlan',  {params: params});
  }
}
