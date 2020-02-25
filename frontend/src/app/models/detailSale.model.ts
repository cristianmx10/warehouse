import { Product } from './product.model';
import { Sale } from './sale.model';

export class DetailSale {
    constructor(
        public producto?: Product,
        public sale?: Sale,
        public quantity?: number,
        public discount?: number,
        public totalPrice?: number,
        public active?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string,
    ) { }
}
