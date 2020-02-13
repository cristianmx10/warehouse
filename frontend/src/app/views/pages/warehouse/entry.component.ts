import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { finalize } from 'rxjs/operators';
import { ProductWarehouseService } from 'src/app/services/product-warehouse.service';
import { Warehouse } from 'src/app/models/warehouse.model';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ProductWarehouse } from 'src/app/models/productWarehouse.model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styles: []
})
export class EntryComponent implements OnInit {
  productW: ProductWarehouse = { warehouse: { _id: '' } };
  warehouses: Warehouse[] = [];
  productWs: ProductWarehouse[] = [];
  product: Product = {};
  productCode: string;
  resultProduct: boolean;
  constructor(
    private productService: ProductService, private warehouseService: WarehouseService,
    private productWService: ProductWarehouseService) { }

  ngOnInit() {
    this.getAllProductW();
  }

  createProductW() {
    this.productWService.createProductWarehouse(this.productW)
      .pipe(finalize(() => {
        this.getAllProductW();
        this.productW.quantity = null;
      }))
      .subscribe(
        (data: ProductWarehouse) => console.log(data),
        (error) => console.error(error));
  }

  getAllProductW() {
    this.productWService.getAllProductWarehouse()
      .subscribe(
        (data: ProductWarehouse[]) => this.productWs = data,
        (error) => console.error(error));
  }

  getWarehouses() {
    this.warehouseService.getAllWarehouses()
      .subscribe(
        (data: Warehouse[]) => this.warehouses = data,
        (error) => console.error(error));
  }

  getProductByCode() {
    this.productService.getProductByCode(this.productCode)
      .pipe(finalize(() => this.resultProduct = true))
      .subscribe(
        (data: Product) => {
          this.getWarehouses();
          this.product = data;
          this.productW.product = this.product;
        },
        (error) => console.error(error));
  }
}
