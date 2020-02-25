export class Sale {
    constructor(
        public saleCode?: string,
        public salePrice?: number,
        public totalPaid?: number,
        public efectivo?: boolean,
        public active?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string
    ) { }
}
