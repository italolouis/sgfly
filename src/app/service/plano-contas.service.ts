import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import axios from "axios";
import Api from "./api";

const httpClient = axios.create({
  baseURL: "http://localhost:8084/services/planoContas",
  // baseURL: process.env.APP_API_BASE_URL,
});

httpClient.interceptors.request.use(function (config) {
  var dataString = localStorage.getItem("access");
  var token: string = '';
  if(dataString != null){
    var data = JSON.parse(dataString);
    token = data.token;
  }
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

@Injectable({
  providedIn: 'root'
})
export class PlanoContasService {

  url = 'http://localhost:8084/services/planoContas';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }


  cadastrarPlanoContas(data: any): Observable<any[]> {
    const headers = {
      'Authorization': 'Bearer ' + this.auth.getAccessToken()
    }
    return this.http.post<any>(this.url, data, {headers});
  }

  getPlanosConta(){
    return Api.get('/services/planoContas');
  }

  getPeriodicidade(): Observable<any[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getAccessToken()}` });
    let options = { headers: headers };

    return this.http.get<any[]>(this.url + '/periodicidade', options);
  }
  getAllPlanosConta(): Observable<any[]> {
    const headers = {
      'Authorization': 'Bearer ' + this.auth.getAccessToken()
    }
    return this.http.get<any[]>(this.url+ '/allPlans', {headers});
  }

}
