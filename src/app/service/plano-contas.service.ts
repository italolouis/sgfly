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

  getPeriodicidade(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/periodicidade');
  }

}
