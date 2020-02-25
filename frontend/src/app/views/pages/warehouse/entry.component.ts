import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { finalize } from 'rxjs/operators';
import { ProductWarehouseService } from 'src/app/services/product-warehouse.service';
import { Warehouse } from 'src/app/models/warehouse.model';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ProductWarehouse } from 'src/app/models/productWarehouse.model';
declare const $: any;
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
  loandingSavaPW: boolean;
  loandingUpdatePW: boolean;
  loandingPW: boolean;
  update: boolean;
  constructor(
    private productService: ProductService,
    private warehouseService: WarehouseService,
    private productWService: ProductWarehouseService
  ) { }

  ngOnInit() {
    this.getAllProductW();
    this.getWarehouses();
  }

  createProductW() {
    this.loandingSavaPW = true;
    this.productWService
      .createProductWarehouse(this.productW)
      .pipe(
        finalize(() => {
          this.loandingSavaPW = false;
          this.getAllProductW();
          this.productW.quantity = null;
        })
      )
      .subscribe(
        (data: ProductWarehouse) => console.log(data),
        error => console.error(error)
      );
  }

  updateProductW() {
    this.loandingUpdatePW = true;
    this.productWService
      .updateProductWarehouseById(this.productW)
      .pipe(
        finalize(() => {
          this.update = false;
          this.loandingUpdatePW = false;
          this.productW = { warehouse: { _id: '' }, product: this.product };
          this.getAllProductW();
        })
      )
      .subscribe(
        (data: ProductWarehouse) => (this.productW = data),
        error => console.error(error)
      );
  }

  getAllProductW() {
    this.loandingPW = false;
    this.productWService
      .getAllProductWarehouse()
      .pipe(finalize(() => (this.loandingPW = true)))
      .subscribe(
        (data: ProductWarehouse[]) => (this.productWs = data),
        error => console.error(error)
      );
  }

  getWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe(
      (data: Warehouse[]) => (this.warehouses = data),
      error => console.error(error)
    );
  }

  getProductByCode() {
    this.productService
      .getProductAllByCode(this.productCode)
      .pipe(
        finalize(() => {
          this.productCode = '';
          $('#cardW').ready(() => {
            $('#quantityText').focus();
          });
          this.resultProduct = true;
        })
      )
      .subscribe(
        (data: Product) => {
          this.product = data;
          this.productW.product = this.product;
        },
        error => console.error(error)
      );
  }

  btnEditPW(model: ProductWarehouse) {
    this.update = true;
    this.product = model.product;
    this.productW = model;
    this.resultProduct = true;
    $('#cardFindProduct').CardWidget('expand');
    $('#cardW').ready(() => {
      $('#quantityText').focus();
    });
  }

  btnCancel() {
    this.resultProduct = false;
    this.update = false;
    this.productW = { warehouse: { _id: '' } };
    $('#cardFindProduct').ready(() => {
      $('#findPbyCode').focus();
    });
    this.getAllProductW();
  }
}
