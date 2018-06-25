import {Component} from '@angular/core';
import {DummyRepository} from '../../repositories/dummy.repository';
import {ICategory} from '../../model/ICategory';

@Component({
    moduleId: module.id,
    selector: 'find-by-category',
    templateUrl: './findByCategory.component.html',
})
export class FindByCategoryComponent {
    constructor(private dummyRepository: DummyRepository) {
    }

    public getCategories(): ICategory[] {
        return this.dummyRepository.getAllCategories();
    }
}
