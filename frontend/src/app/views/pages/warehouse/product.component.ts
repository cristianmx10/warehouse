import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Warehouse } from 'src/app/models/warehouse.model';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ProductWarehouse } from 'src/app/models/productWarehouse.model';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category.model';
import { finalize } from 'rxjs/operators';
import { ProductWarehouseService } from 'src/app/services/product-warehouse.service';
declare const $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {
  product: Product = {};
  products: Product[] = [];
  warehouse: Warehouse = {};
  warehouses: Warehouse[] = [];
  productWarehouse: ProductWarehouse = { warehouse: { _id: '' } };
  categories: Category[] = [];
  constructor(
    private warehouseService: WarehouseService, private productService: ProductService,
    private productWarehouseService: ProductWarehouseService) { }

  ngOnInit() {
    this.getAllWarehouses();
    this.getAllProducts();
  }

  createProduct() {
    this.productService.createProduct(this.product)
      .pipe(finalize(() => {
        this.clearProduct();
        this.getAllProducts();
      }))
      .subscribe(
        (data: Product) => this.product = data,
        (error) => console.error(error));
  }

  createProductWareHouse() {
    this.productWarehouseService.createProductWarehouse(this.productWarehouse)
      .subscribe(
        (data) => console.log(data),
        (error) => console.error(error));
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(
        (data: Product[]) => this.products = data,
        (error) => console.error(error));
  }

  getAllWarehouses() {
    this.warehouseService.getAllWarehouses()
      .subscribe(
        (data: Warehouse[]) => this.warehouses = data,
        (error) => console.error(error));
  }

  showModal() {
    this.createProduct();
    $('#modalWare').modal('show');
  }

  clearProduct() {
    this.product = {
      _id: '',
      description: '',
      productCode: '',
      pricePurchase: 0,
      priceSale: 0,
      category: null
    };
  }
}
