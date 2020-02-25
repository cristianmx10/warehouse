import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { DetailSale } from '../models/detailSale.model';

@Injectable({
  providedIn: 'root'
})
export class DetailSaleService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = `${URL_SERVICIOS}/detailsale`;
  }

  createDetailSale(model: DetailSale[], idSale: string) {
    return this.http.post(`${this.urlApi}/${idSale}?token=${TOKEN}`, model);
  }
}
