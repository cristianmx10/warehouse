export class Category {
    constructor(
        public name?: string,
        public description?: string,
        public active?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string,
    ) { }
}
