import {AppSettings} from '../settings/appSettings';
import {databaseStorageService} from './database.storage.service';
import {Injectable} from '@angular/core';

class FilesStorageService {
    public saveEventImage(file: any) {
        console.log('saving event image');
    }

    public saveCategoryImage(file: any) {
        console.log('saving cateogry image');
    }

    public test() {
        console.log('test');
    }
}

export const fileStorageService: FilesStorageService = new FilesStorageService();
