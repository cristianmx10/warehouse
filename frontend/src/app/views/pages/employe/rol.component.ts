import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol.model';
import { RolService } from 'src/app/services/rol.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styles: []
})
export class RolComponent implements OnInit {
  roles: Rol[] = [];
  rol: Rol = {};
  create: boolean;
  update: boolean;
  constructor(private rolService: RolService) { }

  ngOnInit() {
    this.getAllRoles();
  }

  updateRol() {
    this.rolService.updateRol(this.rol)
      .pipe(finalize(() => {
        this.update = false;
        this.getAllRoles();
      }))
      .subscribe(
        (data: Rol) => console.log(data),
        (error) => console.error(error));
  }

  createRol() {
    this.rolService.createRol(this.rol)
      .pipe(finalize(() => {
        this.getAllRoles();
        this.create = false;
      }))
      .subscribe(
        (data: Rol) => console.log(data),
        (error) => console.error(error));
  }

  getAllRoles() {
    this.rolService.getAllRoles()
      .subscribe(
        (data: Rol[]) => this.roles = data,
        (error) => console.log(error));
  }

  btnEditRol(model: Rol) {
    this.rol = model;
    this.update = true;
  }

  btnAddRol() {
    this.rol = {};
    this.create = true;
  }

  btnCancel() {
    this.create = false;
    this.update = false;
  }
}
