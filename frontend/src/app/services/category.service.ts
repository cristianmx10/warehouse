import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  urlApi: string;
  constructor(private hhtp: HttpClient) {
    this.urlApi = URL_SERVICIOS + '/category';
  }

  createCategory(model: Category) {
    return this.hhtp.post(`${this.urlApi}?token=${TOKEN}`, model);
  }

  getCategory() {
    return this.hhtp.get(`${this.urlApi}?token=${TOKEN}`);
  }

  updateCAtegory(model: Category) {
    return this.hhtp.put(`${this.urlApi}/${model._id}?token=${TOKEN}`, model);
  }
}
