import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8084/authentication';
  constructor() { }

  getToken(data: any){
    return axios.post(this.apiUrl, data);
  }

  getAccessToken(){
    var dataString = localStorage.getItem("access");
    if(dataString != null){
      var data = JSON.parse(dataString);
      return data.token;
    }

    return null;
  }
}
