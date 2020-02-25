import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = `${URL_SERVICIOS}/sale`;
  }

  createSale(model: Sale) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }
}
