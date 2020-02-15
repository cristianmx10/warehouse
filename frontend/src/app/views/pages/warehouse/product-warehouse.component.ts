import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse.model';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ProductWarehouse } from 'src/app/models/productWarehouse.model';
import { ProductWarehouseService } from 'src/app/services/product-warehouse.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-warehouse',
  templateUrl: './product-warehouse.component.html',
  styles: []
})
export class ProductWarehouseComponent implements OnInit {
  idWarehouse = '';
  productW: ProductWarehouse = {};
  warehouses: Warehouse[] = [];
  productsWs: ProductWarehouse[] = [];
  endLoandingProductW: boolean;
  result: boolean;
  edit: boolean;
  constructor(private warehouseService: WarehouseService, private productwService: ProductWarehouseService) { }

  ngOnInit() {
    this.getAllWarehouses();
  }

  getAllWarehouses() {
    this.warehouseService.getAllWarehouses()
      .subscribe(
        (data: Warehouse[]) => this.warehouses = data,
        (error) => console.error(error));
  }

  updateProductW() {
    this.productwService.updateProductWarehouseById(this.productW)
      .pipe(finalize(() => {
        this.edit = false;
        this.getProducts();
      }))
      .subscribe(
        (data: ProductWarehouse) => console.log(data),
        (error) => console.error(error));
  }

  // LISTAR PRODUCTOS POR ALMACEN
  getProducts() {
    this.endLoandingProductW = false;
    this.productwService.getAllProductsByWarehouse(this.idWarehouse)
      .pipe(finalize(() => {
        this.endLoandingProductW = true;
        this.result = true;
      }))
      .subscribe(
        (data: ProductWarehouse[]) => this.productsWs = data,
        (error) => console.error(error));
  }

  btnEdit(model: ProductWarehouse) {
    this.productW = model;
    this.edit = true;
    this.getProducts();
  }

  btnCancel() {
    this.edit = false;
  }

}
