import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Login } from '../models/login.model';
import { map } from 'rxjs/operators';
import { Employe } from '../models/employe.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApi: string;
  token: string;
  employe: Employe;
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/login';
  }

  // INICIA SESION
  singIn(model: Login) {
    return this.http.post(`${this.urlApi}/singin`, model)
      .pipe(map((data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.token = data.token;
        this.employe = data.user;
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
