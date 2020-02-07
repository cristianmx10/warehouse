import { Rol } from './rol.model';

export class Employe {
    constructor(
        public name?: string,
        public surname?: string,
        public dni?: string,
        public phone?: string,
        public active?: boolean,
        public account?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public rol?: Rol,
        public _id?: string,
    ) { }
}
