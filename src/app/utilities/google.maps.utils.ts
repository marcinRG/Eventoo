import * as google from '@google/maps';
import {AppSettings} from '../settings/appSettings';

const mapsClient = google.createClient({
    key: AppSettings.maps.apiKey,
    Promise,
});

class GoogleMapsUtilsService {
    private map: google.maps.Map;
    private marker: google.maps.Marker;

    public findLocation(adress: string) {
        console.log('find location');
        return mapsClient.geocode({address: adress}).asPromise();
    }

    public markLocationOnMap(position: any, element: Element, defZoom: number = 8) {
        this.map = new google.maps.Map(element, {
            center: position,
            zoom: defZoom,
        });
        this.marker = new google.maps.Marker({position, map: this.map});
        console.log('mark location on map');
    }

    public currentPositionFromGeolocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (navigator || navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position.coords);
                }, (error) => {
                    reject(error);
                });
            } else {
                reject(new Error('Navigator.geolocation does not exist'));
            }
        });
    }
}

export const googleMapsService = new GoogleMapsUtilsService();
