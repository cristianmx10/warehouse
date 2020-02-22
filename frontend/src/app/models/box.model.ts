import { Local } from './local.model';

export class Box {
    constructor(
        public local?: Local, // local
        public startingPrice?: number,
        public active?: boolean,
        public obsrvation?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string,
    ) { }
}
