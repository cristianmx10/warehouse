import { Local } from './local.model';
import { Employe } from './employe.model';

export class EmployeLocal {
    constructor(
        public local?: Local,
        public employe?: Employe,
        public observation?: string,
        public active?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string,
    ) { }
}
