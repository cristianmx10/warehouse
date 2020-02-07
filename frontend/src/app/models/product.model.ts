import { Category } from './category.model';

export class Product {
    constructor(
        public name?: string,
        public description?: string,
        public productCode?: string,
        public pricePurchase?: number,
        public priceSale?: number,
        public category?: Category,
        public active?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string,
    ) { }
}
