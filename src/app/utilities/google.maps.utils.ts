import * as GoogleMapsLoader from 'google-maps';
import {AppSettings} from '../settings/appSettings';
import {ILocation} from '../model/ILocation';
import {ILatLang} from '../model/ILatLang';

//const settings = require('../settings/mapSettings');

class GoogleMapsUtilsService {
    private mapsApi;
    private geocoder;
    private map;
    private marker;
    private autocompleteService;

    //private sessionToken;

    constructor() {
        GoogleMapsLoader.KEY = AppSettings.maps.apiKey;
        GoogleMapsLoader.LIBRARIES = ['places'];
        GoogleMapsLoader.load((maps) => {
            this.mapsApi = maps;
            this.geocoder = new this.mapsApi.maps.Geocoder();
            //this.sessionToken = new this.mapsApi.maps.places.AutocompleteSessionToken();
            this.autocompleteService = new this.mapsApi.maps.places.AutocompleteService();
            console.log(this.mapsApi);
        });
    }

    public showSuggestions(inputStr: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.autocompleteService.getPlacePredictions({
                    input: inputStr,
                    //sessionToken: this.sessionToken,
                },
                (predictions, status) => {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        reject(new Error('Prediction Error!'));
                    } else {
                        resolve(predictions);
                    }
                });
        });
    }

    public findLocation(adress: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode({address: adress}, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        resolve(this.extractShortAdress(results));
                    }
                } else {
                    reject(results);
                }
            });
        });
    }

    public markLocationOnMap(position: ILatLang, element: Element, defZoom: number = 12) {
        this.map = new this.mapsApi.maps.Map(element, {
            center: position,
            zoom: defZoom,
        });
        this.marker = new this.mapsApi.maps.Marker({position, map: this.map});
    }

    public currentPositionFromGeolocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (navigator || navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const obj: ILatLang = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    resolve(obj);
                }, (error) => {
                    reject(error);
                });
            } else {
                reject(new Error('Navigator.geolocation does not exist'));
            }
        });
    }

    private extractShortAdress(results: any[]): ILocation {
        //TODO - check how adress_components table behaves for various inputs
        return {
            streetNr: results[0].address_components[0].long_name,
            street: results[0].address_components[1].long_name,
            city: results[0].address_components[2].long_name,
            postalCode: results[0].address_components[6].long_name,
            country: results[0].address_components[5].long_name,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
        };
    }
}

export const googleMapsService = new GoogleMapsUtilsService();

//styled maps
// //const styledMapType = new this.mapsApi.maps.StyledMapType(settings);
// this.map = new this.mapsApi.maps.Map(document.getElementById('map-test'), {
//     // mapTypeControlOptions: {
//     //     mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'],
//     // },
// });
//map.mapTypes.set('styled_map', styledMapType);
//map.setMapTypeId('styled_map');
