import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse.model';
import { Local } from 'src/app/models/local.model';
import { LocalService } from 'src/app/services/local.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styles: []
})
export class WarehouseComponent implements OnInit {
  locals: Local[] = [];
  warehouse: Warehouse = {};
  warehouses: Warehouse[] = [];
  create: boolean;
  update: boolean;
  constructor(private localService: LocalService, private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.getLocals();
    this.getAllWarehouses();
  }

  // CREAR ALMACEN
  createWarehouse() {
    this.warehouseService.createWarehouse(this.warehouse)
      .pipe(finalize(() => {
        this.getAllWarehouses();
        this.create = false;
      }))
      .subscribe(
        (data: Warehouse) => console.log(data),
        (error) => console.error(error));
  }

  // ACTUALIZAR ALAMACEN
  updateWarehouse() {
    this.warehouseService.updateWarehouseById(this.warehouse)
      .pipe(finalize(() => {
        this.update = false;
        this.getAllWarehouses();
      }))
      .subscribe(
        (data: Warehouse) => console.log(data),
        (error) => console.error(error));
  }
  /**
   * Habilidar formulario para actualizar
   * @param model modelo del alamacen
   */
  editWarehose(model: Local) {
    this.warehouse = model;
    this.update = true;
  }

  // LISTAR ALAMACENES
  getAllWarehouses() {
    this.warehouseService.getAllWarehouses()
      .subscribe(
        (data: Warehouse[]) => this.warehouses = data,
        (error) => console.error(error));
  }

  // LISTAR LOCALES
  getLocals() {
    this.localService.getAllLocals()
      .subscribe(
        (data: Local[]) => this.locals = data,
        (error) => console.error(error));
  }

  // BTN agregar local
  newWarehouse() {
    this.warehouse = { local: { _id: '' } };
    this.create = true;
  }

  // BTN cancelar
  cancel() {
    this.create = false;
    this.update = false;
  }
}
