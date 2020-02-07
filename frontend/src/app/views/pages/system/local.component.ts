import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { Local } from 'src/app/models/local.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styles: []
})
export class LocalComponent implements OnInit {
  local: Local = {};
  locals: Local[] = [];
  create: boolean;
  update: boolean;
  constructor(private localService: LocalService) { }

  ngOnInit() {
    this.getAllLocals();
  }

  // LISTAR LOCALES
  getAllLocals() {
    this.localService.getAllLocals()
      .subscribe(
        (data: Local[]) => this.locals = data,
        (error) => console.error(error));
  }

  // CREAR LOCAL
  createLocal() {
    this.localService.createLocal(this.local)
      .pipe(finalize(() => {
        this.getAllLocals();
        this.create = false;
      }))
      .subscribe(
        (data: Local) => console.log(data),
        (error) => console.error(error));
  }

  // ACTUALIZAR LOCAL
  updateLocalById() {
    this.localService.updateLocalById(this.local)
      .pipe(finalize(() => {
        this.update = false;
        this.getAllLocals();
      }))
      .subscribe(
        (data: Local) => console.log(data),
        (error) => console.error(error));
  }

  /**
   * Habilitar formulario para actualizar
   * @param model modelo del local
   */
  editLocal(model: Local) {
    this.local = model;
    this.update = true;
  }

  // BTN agregar local
  newLocal() {
    this.local = {};
    this.create = true;
  }

  // BTN cancelar
  cancel() {
    this.create = false;
    this.update = false;
  }
}
