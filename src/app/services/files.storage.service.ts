import {AppSettings} from '../settings/appSettings';
import {storage} from 'firebase';

const appStorage = AppSettings.fireBaseApp.storage();

class FilesStorageService {
    private categoriesImagesName: string = 'categories';
    private eventsImagesName: string = 'events';
    private categoriesRef: storage.Reference = appStorage.ref().child(this.categoriesImagesName);
    private eventsRef: storage.Reference = appStorage.ref().child(this.eventsImagesName);

    public saveCategoryImage(file: File, onchange: any): Promise<any> {
        console.log('saving category image');
        return saveImage(file,this.categoriesRef,onchange);
    }

    public saveEventImage(file: File, onchange: any): Promise<any> {
        console.log('saving event image');
        return saveImage(file,this.eventsRef,onchange);
    }

}

export const fileStorageService: FilesStorageService = new FilesStorageService();

function saveImage(file: File, ref: storage.Reference, onchange: any) {
    const fileRef = ref.child(file.name);
    let task = fileRef.put(file);
    task.on('state_changed', onchange);
    return task.then(() => {
        return this.getFileUrl(file.name, ref);
    });
}

function getFileUrl(filename: string, ref: storage.Reference): Promise<any> {
    return ref.child(filename).getDownloadURL();
}
