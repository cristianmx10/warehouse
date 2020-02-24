import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { EmployeLocal } from '../models/employeLocal.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeLocalService {
  urlApi: string;
  constructor(private http: HttpClient, private loginService: LoginService) {
    this.urlApi = `${URL_SERVICIOS}/employelocal`;
  }

  create(model: EmployeLocal) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }

  getById(idLocal: string) {
    return this.http.get(`${this.urlApi}/${idLocal}?token=${TOKEN}`);
  }

  getLocalsByEmploye() {
    return this.http.get(`${this.urlApi}/byemploye/${this.loginService.employe._id}?token=${this.loginService.token}`);
  }
}
