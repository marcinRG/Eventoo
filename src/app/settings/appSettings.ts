import {initializeApp} from 'firebase';

export class AppSettings {
    public static dbConfig = {
        apiKey: 'AIzaSyBwQFo8aufjdMTAMGn345J9niDM17lFpfw',
        authDomain: 'eventoo-db.firebaseapp.com',
        databaseURL: 'https://eventoo-db.firebaseio.com',
        projectId: 'eventoo-db',
        storageBucket: 'eventoo-db.appspot.com',
        messagingSenderId: '256560182702',
    };
    public static fireBaseApp = initializeApp(AppSettings.dbConfig);
    public static maps = {
        apiKey: 'AIzaSyBwQFo8aufjdMTAMGn345J9niDM17lFpfw',
    };
}