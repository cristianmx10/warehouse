import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { finalize } from 'rxjs/operators';
import { ProductWarehouseService } from 'src/app/services/product-warehouse.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styles: []
})
export class EntryComponent implements OnInit {
  product: Product = {};
  productCode: string;
  resultProduct: boolean;
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  getProductByCode() {
    this.productService.getProductByCode(this.productCode)
      .pipe(finalize(() => this.resultProduct = true))
      .subscribe(
        (data: Product) => this.product = data,
        (error) => console.error(error));
  }

}
