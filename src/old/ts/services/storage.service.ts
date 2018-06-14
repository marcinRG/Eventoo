import { AppSettings } from '../settings/AppSettings';
import * as firebase from 'firebase';
import { ICategory } from '../model/ICategory';

const firebaseApp = firebase.initializeApp(AppSettings.dbConfig);

class StorageService {
    private categoriesName: string = 'categories';
    private eventsName: string = 'events';
    private database = firebaseApp.database();
    private categoriesRef = this.database.ref().child(this.categoriesName);
    private eventsRef = this.database.ref().child(this.eventsName);

    public test() {
        console.log('test');
        // this.database.ref().child(this.events).set(
        //     {
        //         alanisawesome: {
        //             date_of_birth: "June 23, 1912",
        //             full_name: "Alan Turing"
        //         },
        //         gracehop: {
        //             date_of_birth: "December 9, 1906",
        //             full_name: "Grace Hopper"
        //         }
        //     }
        // );
        // //adding data
        // this.database.ref().child(this.events).push().set({
        //     date_of_birth: "December 25, 1976",
        //     full_name: "Coco Jambo"
        // });
        // //adding data shorthand notation
        // this.database.ref().child(this.events).push({
        //     date_of_birth: "June 25, 1996",
        //     full_name: "Xavras Wyzryn"
        // });
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

export const storageService: StorageService = new StorageService();
