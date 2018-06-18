import {createClient, GoogleMapsClient} from '@google/maps';
import {AppSettings} from '../settings/appSettings';
import {} from '@google/maps';

const mapsClient: GoogleMapsClient = createClient({
    key: AppSettings.maps.apiKey,
    Promise,
});

class GoogleMapsUtilsService {
    public findLocation(adress: string) {
        console.log('find location');
        return mapsClient.geocode({address: adress}).asPromise();
    }
}

export const googleMapsService = new GoogleMapsUtilsService();
