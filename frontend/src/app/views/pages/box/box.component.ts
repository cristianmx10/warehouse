import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { DetailSale } from 'src/app/models/detailSale.model';
import { finalize } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { SaleService } from 'src/app/services/sale.service';
import { Sale } from 'src/app/models/sale.model';
import { DetailSaleService } from 'src/app/services/detail-sale.service';

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
  constructor(
    private productService: ProductService, private saleService: SaleService,
    private detailSaleService: DetailSaleService) { }

  ngOnInit() {
  }

  getProductByCode() {
    this.productService.getProductByCode(this.code)
      .subscribe(
        (data: Product) => {
          const exist = this.verify(data);
          if (isNullOrUndefined(data)) { return; }
          if (!isNullOrUndefined(exist)) {
            this.addProductRepeated(data);
          } else {
            const detailSale = new DetailSale();
            detailSale.producto = data;
            detailSale.quantity = 1;
            detailSale.totalPrice = 0;
            detailSale.discount = 0;
            this.details = detailSale;
            this.detailSales.push(this.details);
            this.calculateTotalPrice(data);
          }
        },
        (error) => console.error(error));
  }

  createSale() {
    this.saleService.createSale(this.sale)
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

}
