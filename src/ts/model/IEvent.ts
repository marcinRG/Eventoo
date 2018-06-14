import { ILocation } from './ILocation';
export interface IEvent {
    id: string;
    name: string;
    shortDescription?: string;
    description: string;
    location: ILocation;
    dateStart: Date;
    dateEnd: Date;
    img: string;
}
