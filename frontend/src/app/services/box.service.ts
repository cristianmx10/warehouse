import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, TOKEN } from '../config/config';
import { Box } from '../models/box.model';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = `${URL_SERVICIOS}/box`;
  }

  openBox(model: Box) {
    return this.http.post(`${this.urlApi}?token=${TOKEN}`, model);
  }

  getLastBoxOpenByIdEmploye(idEmploye: string) {
    return this.http.get(`${this.urlApi}/${idEmploye}?token=${TOKEN}`);
  }

  closeLastBox(model: Box) {
    return this.http.put(`${this.urlApi}/${model._id}?token=${TOKEN}`, model);
  }
}
