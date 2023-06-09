import { Injectable } from '@angular/core';
import axios from 'axios';
import Api from "./api";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8084';
  constructor() { }

  getToken(data: any){
    return axios.post(this.apiUrl + '/authentication', data);
  }

  cadastrarUsuario(data: any) {
    return axios.post(this.apiUrl + '/usuario', data)
  }
}
