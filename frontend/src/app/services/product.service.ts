import { Injectable } from '@angular/core';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlApi: string;
  idWarehouse: string;
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/product';
    this.idWarehouse = localStorage.getItem('w');
  }

  createProduct(model: Product) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }

  updateProduct(model: Product) {
    return this.http.put(`${this.urlApi}/${model._id}?token=${TOKEN}`, model);
  }

  getAllProducts() {
    return this.http.get(`${this.urlApi}?token=${TOKEN}`);
  }

  getProductByCode(code: string) {
    return this.http.get(`${this.urlApi}/${code}/${this.idWarehouse}?token=${TOKEN}`);
  }

  getProductAllByCode(code: string) {
    return this.http.get(`${this.urlApi}/product/all/${code}?token=${TOKEN}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.urlApi}/${id}?token=${TOKEN}`);
  }
}
