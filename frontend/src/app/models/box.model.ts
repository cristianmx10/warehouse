import { Local } from './local.model';
import { Employe } from './employe.model';

export class Box {
    constructor(
        public local?: Local,
        public employe?: Employe,
        public startingPrice?: number,
        public endPrice?: number,
        public active?: boolean,
        public obsrvation?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string,
    ) { }
}
