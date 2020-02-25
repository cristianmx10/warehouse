import { Component, OnInit } from '@angular/core';
import { EmployeLocalService } from '../services/employe-local.service';
import { EmployeLocal } from '../models/employeLocal.model';
import { Router } from '@angular/router';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../models/warehouse.model';
import { Local } from '../models/local.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-local-select',
  templateUrl: './local-select.component.html',
  styles: []
})
export class LocalSelectComponent implements OnInit {
  employeLocals: EmployeLocal[] = [];
  constructor(
    private employeLocalService: EmployeLocalService, private router: Router,
    private warehouseService: WarehouseService) { }

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
    this.getWarehouse(model._id);
  }

  getWarehouse(idLocal: string) {
    this.warehouseService.getWarehouseByIdLocal(idLocal)
      .pipe(finalize(() => {
        window.location.href = '#/product';
        location.reload();
      }))
      .subscribe(
        (data: Warehouse) => localStorage.setItem('w', data._id),
        (error) => console.error(error));
  }

}
