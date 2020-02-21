import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { Local } from 'src/app/models/local.model';
import { finalize } from 'rxjs/operators';
import { EmployeService } from 'src/app/services/employe.service';
import { Employe } from 'src/app/models/employe.model';
import { EmployeLocalService } from 'src/app/services/employe-local.service';
import { EmployeLocal } from 'src/app/models/employeLocal.model';
declare const $: any;

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styles: []
})
export class LocalComponent implements OnInit {
  local: Local = {};
  locals: Local[] = [];
  employeLocal: EmployeLocal = {};
  employeLocals: EmployeLocal[] = [];
  employe: Employe = { rol: { nameRol: '' } };
  dniEmploye: string;
  create: boolean;
  update: boolean;
  viewLocal: boolean;
  constructor(
    private localService: LocalService, private employeService: EmployeService,
    private employeLService: EmployeLocalService) { }

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

  getEmployeByIdLocal() {
    this.employeLService.getById(this.local._id)
      .subscribe(
        (data: EmployeLocal[]) => this.employeLocals = data,
        (error) => console.error(error));
  }

  createEmployeLocal() {
    this.employeLocal.employe = this.employe;
    this.employeLocal.local = this.local;
    this.employeLService.create(this.employeLocal)
      .subscribe(
        (data: EmployeLocal) => console.log(data),
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

  findEmployeByDni() {
    this.employeService.getEmployeByDNI(this.dniEmploye)
      .subscribe(
        (data: Employe) => this.employe = data,
        (error) => console.error(error));
  }

  /**
   * Habilitar formulario para actualizar
   * @param model modelo del local
   */
  editLocal(model: Local) {
    this.local = model;
    this.update = true;
    this.viewLocal = false;
  }

  selectLocal(model: Local) {
    this.local = model;
    this.viewLocal = true;
    this.getEmployeByIdLocal();
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

  activateForm() {
    this.initModelEmploye();
    this.showModal();
  }

  closeCard() {
    this.viewLocal = false;
  }

  showModal() {
    $('#modalForm').modal('show');
  }

  initModelEmploye() {
    this.dniEmploye = '';
    this.employe = {
      _id: '',
      surname: '',
      rol: { nameRol: '' }
    };
  }
}
