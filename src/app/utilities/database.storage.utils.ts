import {AppSettings} from '../settings/appSettings';
import {ICategory} from '../model/ICategory';
import {database} from 'firebase';
import {IEvent} from '../model/IEvent';

const appDatabase = AppSettings.fireBaseApp.database();

class StorageService {
    private categoriesName: string = 'categories';
    private categoriesRef: database.Reference = appDatabase.ref().child(this.categoriesName);
    private eventsName: string = 'events';
    private eventsRef: database.Reference = appDatabase.ref().child(this.eventsName);

    public getAllCategories(): Promise<any> {
        return getAll(this.categoriesRef);
    }

    public removeAllCategories(): Promise<any> {
        return removeAll(this.categoriesRef);
    }

    public updateCategory(category: ICategory): Promise<any> {
        return updateElem(category, this.categoriesRef);
    }

    public addCategory(category: ICategory): Promise<any> {
        return addElem(category, this.categoriesRef);
    }

    public removeCategory(category: ICategory): Promise<any> {
        return removeElem(category, this.categoriesRef);
    }

    public getAllEvents(): Promise<any> {
        return getAll(this.eventsRef);
    }

    public removeAllEvents(): Promise<any> {
        return removeAll(this.eventsRef);
    }

    public updateEvent(category: IEvent): Promise<any> {
        return updateElem(category, this.eventsRef);
    }

    public addEvent(category: IEvent): Promise<any> {
        return addElem(category, this.eventsRef);
    }

    public removeEvent(category: IEvent): Promise<any> {
        return removeElem(category, this.eventsRef);
    }
}

export const databaseStorageService: StorageService = new StorageService();

function raw2array(obj: any): any[] {
    return Object.keys(obj).map((key) => {
        return obj[key];
    });
}

function addElem(obj: any, ref: database.Reference): Promise<any> {
    const key = ref.push().key;
    obj.id = key;
    return ref.child(key).update(obj);
}

function removeElem(obj: any, ref: database.Reference): Promise<any> {
    return ref.child(obj.id).remove();
}

function updateElem(obj: any, ref: database.Reference): Promise<any> {
    return ref.child(obj.id).update(obj);
}

function removeAll(ref: database.Reference): Promise<any> {
    return ref.remove();
}

function getAll(ref: database.Reference): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
        ref.on('value', (snapshot) => {
            resolve(raw2array(snapshot.val()));
        }, (errorObject) => {
            reject(errorObject);
        });
    });
    return promise;
}
