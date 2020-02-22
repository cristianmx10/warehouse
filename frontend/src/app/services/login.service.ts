import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Login } from '../models/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApi: string;
  token: string;
  idEmploye: string;
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/login';
  }

  // INICIA SESION
  singIn(model: Login) {
    return this.http.post(`${this.urlApi}/singin`, model)
      .pipe(map((data: any) => {
        localStorage.setItem('token', data.token);
        this.token = data.token;
        this.idEmploye = data.userid;
        return true;
      }));
  }

  getAllLogins() {
    return this.http.get(`${this.urlApi}?token=${TOKEN}`);
  }

  createLogin(model: Login) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }
}
