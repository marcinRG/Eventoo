import { AppSettings } from '../settings/appSettings';

import { ICategory } from '../model/ICategory';

class StorageService {
    private categoriesName: string = 'categories';
    private eventsName: string = 'events';
    private database = AppSettings.fireBaseApp.database();
    private categoriesRef = this.database.ref().child(this.categoriesName);
    private eventsRef = this.database.ref().child(this.eventsName);

    public test() {
        console.log('test');
    }

    public getAllCategories(): Promise<any> {
        const promise = new Promise<any>((resolve, reject) => {
            this.categoriesRef.on('value', (snapshot) => {
                console.log(snapshot.val());
                resolve(snapshot.val());
            }, (errorObject) => {
                console.log('Categories read failed, error:' + errorObject.code);
                reject(errorObject.code);
            });
        });
        return promise;
    }

    public removeAllCategories(): any {
        console.log('remove all categories');
        this.categoriesRef.remove();
        //this.database.ref().child(this.categoriesName).remove();
    }

    public updateCategory(category: ICategory): any {
        console.log('update category');
        this.categoriesRef.child(category.id).update(category);
    }

    public addCategory(category: ICategory): void {
        console.log('add category');
        const key = this.categoriesRef.push().key;
        category.id = key;
        this.categoriesRef.child(key).update(category);
    }

    public removeCategory(category: ICategory): void {
        console.log('remove category');
        this.categoriesRef.child(category.id).remove();
    }
}

export const databaseStorageService: StorageService = new StorageService();
