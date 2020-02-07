import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Local } from '../models/local.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/local';
  }

  /**
   * Crear local
   * @param model modelo del local
   */
  createLocal(model: Local) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }

  /**
   * Actualizar local por el id
   * @param model modelo del local
   */
  updateLocalById(model: Local) {
    return this.http.put(`${this.urlApi}/${model._id}?token=${TOKEN}`, model);
  }

  /**
   * Listar locales
   */
  getAllLocals() {
    return this.http.get(`${this.urlApi}?token=${TOKEN}`);
  }
}
