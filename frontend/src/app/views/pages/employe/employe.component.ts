import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe.service';
import { Employe } from 'src/app/models/employe.model';
import { Rol } from 'src/app/models/rol.model';
import { RolService } from 'src/app/services/rol.service';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login.model';
declare const $: any;

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styles: []
})
export class EmployeComponent implements OnInit {
  employe: Employe = {};
  employes: Employe[] = [];
  roles: Rol[] = [];
  login: Login = {};
  create: boolean;
  update: boolean;
  constructor(
    private employeService: EmployeService, private rolService: RolService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.getEmployes();
    this.getRoles();
  }

  createNewLogin() {
    this.loginService.createLogin(this.login)
      .pipe(finalize(() => {
        this.getEmployes();
        this.closeModal();
      }))
      .subscribe(
        (data: Login) => console.log(data),
        (error) => console.log(error));
  }

  // CREAR EMPLEADO
  createEmploye() {
    this.employeService.createEmploye(this.employe)
      .pipe(finalize(() => {
        this.getEmployes();
        this.create = false;
      }))
      .subscribe(
        (data: Employe) => console.log(data),
        (error) => console.log(error));
  }

  // ACTUALIZAR EMPLEADO
  updateEmploye() {
    this.employeService.updateEmploye(this.employe)
      .pipe(finalize(() => {
        this.update = false;
        this.getEmployes();
      }))
      .subscribe(
        (data: Employe) => console.log(data),
        (error) => console.log(error));
  }

  // LISTAR EMPLEADOS
  getEmployes() {
    this.employeService.getAllEmployes()
      .subscribe(
        (data: Employe[]) => this.employes = data,
        (error) => console.log(error));
  }

  // LISTAR ROLES
  getRoles() {
    this.rolService.getAllRoles()
      .subscribe(
        (data: Rol[]) => this.roles = data,
        (error) => console.log(error));
  }

  /**
   * Habilidar formulario para actualizar
   * @param model modelo de empleado
   */
  editEmploye(model: Employe) {
    this.employe = model;
    this.update = true;
  }

  // BTN agregar empleado
  newLocal() {
    this.employe = { rol: { _id: '' } };
    this.create = true;
  }

  // BTN cancelar
  cancel() {
    this.create = false;
    this.update = false;
  }

  showModal(model: Employe) {
    this.login.employe = model;
    $('#modalLogin').modal('show');
  }

  closeModal() {
    $('#modalLogin').modal('hide');
  }

}
