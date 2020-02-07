import { Warehouse } from './warehouse.model';
import { Product } from './product.model';

export class ProductWarehouse {
    constructor(
        public warehouse?: Warehouse,
        public product?: Product,
        public quantity?: number,
        public active?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string,
    ) { }
}
