import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { EmployeLocal } from '../models/employeLocal.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeLocalService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = `${URL_SERVICIOS}/employelocal`;
  }

  create(model: EmployeLocal) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }

  getById(idLocal: string) {
    return this.http.get(`${this.urlApi}/${idLocal}?token=${TOKEN}`);
  }

  getLocalsByEmploye(idEmploye: string) {
    return this.http.get(`${this.urlApi}/locals/${idEmploye}?token=${TOKEN}`);
  }
}
