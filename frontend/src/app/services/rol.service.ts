import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/rol';
  }

  updateRol(model: Rol) {
    return this.http.put(`${this.urlApi}/${model._id}?token=${TOKEN}`, model);
  }

  // Listar roles
  getAllRoles() {
    return this.http.get(`${this.urlApi}?token=${TOKEN}`);
  }

  createRol(model: Rol) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }
}
