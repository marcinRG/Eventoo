import {AppSettings} from '../settings/AppSettings';
import * as firebase from 'firebase';

const firebaseApp = firebase.initializeApp(AppSettings.dbConfig);

class StorageService {
    private categories:string = 'categories';
    private events:string = 'events';
    private database = firebaseApp.database();

    public test() {
        this.database.ref().child(this.events).set(
            {
                alanisawesome: {
                    date_of_birth: "June 23, 1912",
                    full_name: "Alan Turing"
                },
                gracehop: {
                    date_of_birth: "December 9, 1906",
                    full_name: "Grace Hopper"
                }
            }
        );
        //adding data
        this.database.ref().child(this.events).push().set({
            date_of_birth: "December 25, 1976",
            full_name: "Coco Jambo"
        });
        //adding data shorthand notation
        this.database.ref().child(this.events).push({
            date_of_birth: "June 25, 1996",
            full_name: "Xavras Wyzryn"
        });
    }
}

export const storageService: StorageService = new StorageService();
