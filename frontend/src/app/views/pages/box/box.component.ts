import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { DetailSale } from 'src/app/models/detailSale.model';
import { finalize } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { SaleService } from 'src/app/services/sale.service';
import { Sale } from 'src/app/models/sale.model';
import { DetailSaleService } from 'src/app/services/detail-sale.service';
import { ProductWarehouseService } from 'src/app/services/product-warehouse.service';
import { ProductWarehouse } from 'src/app/models/productWarehouse.model';
import { Local } from 'src/app/models/local.model';
import { BoxService } from 'src/app/services/box.service';
import { Box } from 'src/app/models/box.model';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styles: []
})
export class BoxComponent implements OnInit {
  code: string;
  sale: Sale = { salePrice: 0, totalPaid: 0 };
  details: DetailSale = {};
  detailSales: DetailSale[] = [];
  pw: ProductWarehouse = {};
  local: Local = {};
  box: Box = {};
  canSale: boolean;
  constructor(
    private productService: ProductService, private saleService: SaleService,
    private detailSaleService: DetailSaleService, private pwService: ProductWarehouseService,
    private boxService: BoxService) { }

  ngOnInit() {
    this.local = JSON.parse(localStorage.getItem('local'));
  }

  getProductByCode() {
    this.productService.getProductByCode(this.code)
      .subscribe(
        (data: ProductWarehouse) => {
          if (data.quantity === 0) { return; }
          if (isNullOrUndefined(data)) { return; }
          const exist = this.verify(data.product);
          if (!isNullOrUndefined(exist)) {
            this.addProductRepeated(data.product);
          } else {
            this.addProduct(data.product);
          }
        },
        (error) => console.error(error));
  }

  createSale() {
    this.saleService.createSale(this.sale)
      .pipe(finalize(() => {
        this.addBoxPriceEnd();
        this.cleanSale();
      }))
      .subscribe(
        (data: Sale) => {
          this.createDetailSale(data._id);
        },
        (error) => console.error(error));
  }

  createDetailSale(idSale: string) {
    this.detailSaleService.createDetailSale(this.detailSales, idSale)
      .subscribe(
        (data: string) => console.log(data),
        (error) => console.error(error));
  }

  addBoxPriceEnd() {
    this.box.endPrice = this.sale.salePrice;
    this.boxService.addPriceBox(this.box)
      .subscribe(
        (data: Box) => console.log(data),
        (error) => console.error(error));
  }

  calculateTotalPrice(model: Product) {
    const index = this.detailSales.findIndex(x => x.producto.productCode === model.productCode);
    const modelD = this.detailSales[index];
    if (modelD.discount > 5) {
      modelD.discount = 5;
    }
    this.detailSales[index].totalPrice = (model.priceSale * modelD.quantity) - modelD.discount;
    this.calculatePriceTotalSale();
  }

  calculatePriceTotalSale() {
    this.sale.salePrice = 0;
    this.detailSales.forEach(x => {
      this.sale.salePrice += x.totalPrice;
    });
  }

  verify(model: Product) {
    const value = this.detailSales.find(x => x.producto.productCode === model.productCode);
    return value;
  }

  addProductRepeated(model: Product) {
    const index = this.detailSales.findIndex(x => x.producto.productCode === model.productCode);
    const modelD = this.detailSales.find(x => x.producto.productCode === model.productCode);
    this.detailSales[index].quantity += 1;
    this.calculateTotalPrice(model);
  }

  addProduct(data: Product) {
    const detailSale = new DetailSale();
    detailSale.producto = data;
    detailSale.quantity = 1;
    detailSale.totalPrice = 0;
    detailSale.discount = 0;
    this.details = detailSale;
    this.detailSales.push(this.details);
    this.calculateTotalPrice(data);
  }

  cleanSale() {
    this.detailSales = [];
    this.sale = { totalPaid: 0, salePrice: 0 };
  }
}
