import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Warehouse } from 'src/app/models/warehouse.model';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ProductWarehouse } from 'src/app/models/productWarehouse.model';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category.model';
import { finalize } from 'rxjs/operators';
import { ProductWarehouseService } from 'src/app/services/product-warehouse.service';
import { CategoryService } from 'src/app/services/category.service';
import { isNullOrUndefined } from 'util';
declare const $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {
  product: Product = { category: { _id: '' } };
  products: Product[] = [];
  warehouse: Warehouse = {};
  warehouses: Warehouse[] = [];
  productWarehouse: ProductWarehouse = { warehouse: { _id: '' } };
  categories: Category[] = [];
  update: boolean;
  constructor(
    private warehouseService: WarehouseService, private productService: ProductService,
    private productWarehouseService: ProductWarehouseService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllWarehouses();
    this.getAllProducts();
    this.getAllCategories();
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
      .pipe(finalize(() => {
        this.getAllProducts();
        this.update = false;
      }))
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

  getAllCategories() {
    this.categoryService.getCategory()
      .subscribe(
        (data: Category[]) => this.categories = data,
        (error) => console.log(error));
  }

  getAllWarehouses() {
    this.warehouseService.getAllWarehouses()
      .subscribe(
        (data: Warehouse[]) => this.warehouses = data,
        (error) => console.error(error));
  }

  btnEditProduct(model: Category) {
    $('cardProduct').CardWidget('expand');
    $('#nameProduct').focus();
    this.product = model;
    if (isNullOrUndefined(this.product.category)) {
      console.log(model);
      this.product.category = { _id: '' };
    }
    this.update = true;
  }

  btnCancel() {
    this.update = false;
    console.log('xd');
    
    this.clearProduct();
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
      category: { _id: '' }
    };
  }
}
