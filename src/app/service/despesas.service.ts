import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  url = 'http://localhost:8084/services/despesa';
  constructor(
    private http: HttpClient
  ) { }

  cadastrarDespesas(data: any): Observable<any[]> {
    return this.http.post<any>(this.url, data);
  }

  getDespesas(data: any): Observable<any[]> {
    return this.http.get<any[]>(this.url, {params : data});
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/categorias');
  }

}
