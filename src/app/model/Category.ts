import {ICategory} from './ICategory';

export class Category implements ICategory {
    constructor(public id: string, public name: string, public description: string, public img: string) {
    }
}
