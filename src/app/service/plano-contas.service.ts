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
  constructor(
  ) { }

  cadastrarPlanoContas(data: any) {
    return Api.post('/planoContas', data)
  }

  getPlanosConta(){
    return Api.get('/planoContas');
  }

  getPeriodicidade() {
    return Api.get('/planoContas/periodicidade');
  }
  getAllPlanosConta() {
    return Api.get('/planoContas/allPlans');
  }
}
