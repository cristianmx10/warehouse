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
  idWarehouse: string;
  warehouses: Warehouse[] = [];
  productsW: ProductWarehouse[] = [];
  endLoandingProductW: boolean;
  result: boolean;
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

  getProducts() {
    this.endLoandingProductW = false;
    this.productwService.getAllProductsByWarehouse(this.idWarehouse)
      .pipe(finalize(() => {
        this.endLoandingProductW = true;
        this.result = true;
      }))
      .subscribe(
        (data: ProductWarehouse[]) => this.productsW = data,
        (error) => console.error(error));
  }

}
