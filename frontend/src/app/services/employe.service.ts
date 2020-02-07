import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Employe } from '../models/employe.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/employe';
  }

  // CREAR EMPLEADO
  createEmploye(model: Employe) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }

  /**
   * Actualizar empleado
   * @param model modelo de empleado
   */
  updateEmploye(model: Employe) {
    return this.http.put(`${this.urlApi}/${model._id}?token=${TOKEN}`, model);
  }

  // LISTAR EMPLEADOS
  getAllEmployes() {
    return this.http.get(`${this.urlApi}?token=${TOKEN}`);
  }
}
