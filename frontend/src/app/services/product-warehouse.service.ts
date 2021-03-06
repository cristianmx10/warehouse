import { Injectable } from '@angular/core';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { ProductWarehouse } from '../models/productWarehouse.model';

@Injectable({
  providedIn: 'root'
})
export class ProductWarehouseService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/productwarehouse';
  }

  createProductWarehouse(model: ProductWarehouse) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }

  getAllProductWarehouse() {
    return this.http.get(`${this.urlApi}?token=${TOKEN}`);
  }

  updateProductWarehouseById(model: ProductWarehouse) {
    return this.http.put(`${this.urlApi}/${model._id}?token=${TOKEN}`, model);
  }

  /**
   * Listar productos por almacen
   * @param idWarehouse id de almacen
   */
  getAllProductsByWarehouse(idWarehouse: string) {
    return this.http.get(`${this.urlApi}/${idWarehouse}?token=${TOKEN}`);
  }
}
