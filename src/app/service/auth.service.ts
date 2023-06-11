import { Injectable } from '@angular/core';
import axios from 'axios';
import Api from "./api";
import {environment} from "../enviroments/enviroments";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.url_server;
  constructor() { }

  getToken(data: any){
    return axios.post(this.apiUrl + '/authentication', data);
  }

  cadastrarUsuario(data: any) {
    return axios.post(this.apiUrl + '/usuario', data)
  }
}
