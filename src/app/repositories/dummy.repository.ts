import {ICategory} from '../model/ICategory';
import {Category} from '../model/Category';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import {Injectable} from '@angular/core';

const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
 Asperiores cupiditate doloremque eos esse maiores quam repellat suscipit!`;

const categories: ICategory[] = [
    new Category('1', 'Sports', text, '/assets/images/category-images/sports.jpg'),
    new Category('2', 'Food', text, '/assets/images/category-images/food.jpg'),
    new Category('3', 'Cities', text, '/assets/images/category-images/cities.jpg'),
    new Category('4', 'Parties', text, '/assets/images/category-images/parties.jpg'),
    new Category('5', 'Business', text, '/assets/images/category-images/meeting.jpg'),
    new Category('6', 'Courses', text, '/assets/images/category-images/school.jpg'),
    new Category('7', 'Arts', text, '/assets/images/category-images/arts.jpg'),
];

function getCategories(): Observable<ICategory[]> {
    return Observable.from([categories]);
}

@Injectable()
export class DummyRepository {
    private categories: ICategory[];

    constructor() {
        getCategories().subscribe((data) => {
            this.categories = data;
        });
    }

    public getAllCategories(): ICategory[] {
        return this.categories;
    }

    public addCategory(category: ICategory) {
        categories.push(category);
    }

    public getCategory(id: string): ICategory {
        return categories.find((elem) => {
            return (elem.id === id);
        });
    }
}
