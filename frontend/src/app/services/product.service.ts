import { Injectable } from '@angular/core';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/product';
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
}
