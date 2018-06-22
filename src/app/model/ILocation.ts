import {ILatLang} from './ILatLang';

export interface ILocation extends ILatLang {
    id?: string;
    city: string;
    street: string;
    streetNr: string;
    postalCode: string;
    country: string;
}
