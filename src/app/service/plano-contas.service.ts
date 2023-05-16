import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlanoContasService {

  url = 'http://localhost:8084/services/planoContas';
  constructor(
    private http: HttpClient
  ) { }

  cadastrarPlanoContas(data: any): Observable<any[]> {
    return this.http.post<any>(this.url, data);
  }

  getPlanosConta(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getPeriodicidade(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/periodicidade');
  }
  getAllPlanosConta(): Observable<any[]> {
    return this.http.get<any[]>(this.url+ '/allPlans');
  }

}
