import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Warehouse } from '../models/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/warehouse';
  }

  /**
   * Crear almacen
   * @param model modelo de almacen
   */
  createWarehouse(model: Warehouse) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }

  /**
   * Actualizar almacen por el id
   * @param model modelo del alamacen
   */
  updateWarehouseById(model: Warehouse) {
    return this.http.put(`${this.urlApi}/${model._id}?token=${TOKEN}`, model);
  }

  // LISTAR ALMACENES
  getAllWarehouses() {
    return this.http.get(`${this.urlApi}?token=${TOKEN}`);
  }

}
