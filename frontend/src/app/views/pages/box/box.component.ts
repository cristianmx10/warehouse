import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { DetailSale } from 'src/app/models/detailSale.model';
import { finalize } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { SaleService } from 'src/app/services/sale.service';
import { Sale } from 'src/app/models/sale.model';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styles: []
})
export class BoxComponent implements OnInit {
  code: string;
  sale: Sale = {};
  details: DetailSale = {};
  detailSales: DetailSale[] = [];
  constructor(private productService: ProductService, private saleService: SaleService) { }

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
            detailSale.quantity = 0;
            detailSale.totalPrice = 0;
            detailSale.discount = 0;
            this.details = detailSale;
            this.detailSales.push(this.details);
          }
        },
        (error) => console.error(error));
  }

  createSale() {
    this.sale.salePrice = 45;
    this.sale.totalPaid = 50;
    this.sale.turned = 5;
    this.saleService.createSale(this.sale)
    .subscribe(
      (data: Sale) => console.log(data),
      (error) => console.error(error));
  }

  calculateTotalPrice(model: DetailSale, index: number) {
    if (model.discount > 5) {
      model.discount = 5;
    }
    this.detailSales[index].totalPrice = (model.producto.priceSale * model.quantity) - model.discount;
  }

  verify(model: Product) {
    const value = this.detailSales.find(x => x.producto.productCode === model.productCode);
    return value;
  }

  addProductRepeated(model: Product) {
    const index = this.detailSales.findIndex(x => x.producto.productCode === model.productCode);
    const modelD = this.detailSales.find(x => x.producto.productCode === model.productCode);
    this.detailSales[index].quantity += 1;
    this.calculateTotalPrice(modelD, index);
  }

}
