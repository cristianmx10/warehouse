import { Component, OnInit } from '@angular/core';
import { EmployeLocalService } from '../services/employe-local.service';
import { EmployeLocal } from '../models/employeLocal.model';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-local-select',
  templateUrl: './local-select.component.html',
  styles: []
})
export class LocalSelectComponent implements OnInit {
  employeLocals: EmployeLocal[] = [];
  constructor(private employeLocalService: EmployeLocalService, private router: Router) { }

  ngOnInit() {
    this.getLocalsByEmploye();
  }

  getLocalsByEmploye() {
    this.employeLocalService.getLocalsByEmploye()
      .subscribe(
        (data: EmployeLocal[]) => this.employeLocals = data,
        (error) => console.error(error));
  }

  selectLocal(model: Local) {
    localStorage.setItem('local', JSON.stringify(model));
    window.location.href = '#/product';
    location.reload();
  }

}
