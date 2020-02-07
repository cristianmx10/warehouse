import { Local } from './local.model';

export class Warehouse {
    constructor(
        public name?: string,
        public description?: string,
        public local?: Local,
        public active?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string
    ) { }
}
