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
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/login';
  }

  // INICIA SESION
  singIn(model: Login) {
    return this.http.post(`${this.urlApi}/singin`, model)
      .pipe(map((token: string) => {
        localStorage.setItem('token', token);
        window.location.href = '#/product';
        location.reload();
        return token;
      }));
  }

  getAllLogins() {
    return this.http.get(`${this.urlApi}?token=${TOKEN}`);
  }

  createLogin(model: Login) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }
}
