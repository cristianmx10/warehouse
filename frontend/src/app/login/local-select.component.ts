import { Component, OnInit } from '@angular/core';
import { EmployeLocalService } from '../services/employe-local.service';
import { LocalService } from '../services/local.service';
import { EmployeLocal } from '../models/employeLocal.model';
import { Local } from '../models/local.model';
import { ID } from '../config/config';

@Component({
  selector: 'app-local-select',
  templateUrl: './local-select.component.html',
  styles: []
})
export class LocalSelectComponent implements OnInit {
  employeLocals: EmployeLocal[] = [];
  local: Local = {};
  constructor(private employeLocalService: EmployeLocalService, private localService: LocalService) { }

  ngOnInit() {
    this.getLocalsByEmploye();
  }

  getLocalsByEmploye() {
    this.employeLocalService.getLocalsByEmploye(ID)
      .subscribe(
        (data: EmployeLocal[]) => this.employeLocals = data,
        (error) => console.error(error));
  }

}
