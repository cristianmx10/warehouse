import { SubMenu } from './subMenu.model';

export class Menu {
    constructor(
        public order: number,
        public title: string,
        public icon: string,
        public subMenu: SubMenu[]
    ) {}
}
