import { Employe } from './employe.model';

export class Login {
    constructor(
        public username?: string,
        public password?: string,
        public employe?: Employe,
        public active?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: string,
    ) { }
}
