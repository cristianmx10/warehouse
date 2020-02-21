import { Component, OnInit } from '@angular/core';
import { EmployeLocalService } from '../services/employe-local.service';
import { LocalService } from '../services/local.service';
import { EmployeLocal } from '../models/employeLocal.model';
import { Local } from '../models/local.model';
import { ID } from '../config/config';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-local-select',
  templateUrl: './local-select.component.html',
  styles: []
})
export class LocalSelectComponent implements OnInit {
  employeLocals: EmployeLocal[] = [];
  local: Local = {};
  idEmploye: string;
  constructor(
    private employeLocalService: EmployeLocalService, private localService: LocalService,
    private router: Router, private loginService: LoginService) {
      this.idEmploye = loginService.idEmpleado;
     }

  ngOnInit() {
    this.getLocalsByEmploye();
  }

  getLocalsByEmploye() {
    this.employeLocalService.getLocalsByEmploye(this.idEmploye)
      .subscribe(
        (data: EmployeLocal[]) => this.employeLocals = data,
        (error) => console.error(error));
  }

  selectLocal(idLocal: string) {
    localStorage.setItem('local', idLocal);
    this.router.navigate(['/product']);
  }
}
