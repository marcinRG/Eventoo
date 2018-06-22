import {googleMapsService} from '../../src/app/utilities/google.maps.utils';

const locationStr = <HTMLInputElement> document.querySelector('input[name="location-string"]');
const locationBtn = document.querySelector('input[name="loc-btn"]');
const geoLocationBtn = document.querySelector('input[name="geoloc-btn"]');
const suggestionsBtn = document.querySelector('input[name="suggestions-btn"]');
const elem = document.querySelector('.map-div');

locationBtn.addEventListener('click', () => {
    const val = locationStr.value;
    googleMapsService.findLocation(val).then((position) => {
        console.log(position);
        googleMapsService.markLocationOnMap(position, elem);
    }).catch((error) => {
        console.log('ERROR!!!');
        console.log(error);
    });
});

geoLocationBtn.addEventListener('click', () => {
    googleMapsService.currentPositionFromGeolocation().then((position) => {
        console.log(position);
        googleMapsService.markLocationOnMap(position, elem);
    }).catch((error) => {
        console.log(error);
    });
});

suggestionsBtn.addEventListener('click', () => {
    const input = <HTMLInputElement> document.querySelector('input[name="location-suggestions"]');
    googleMapsService.showSuggestions(input.value).then((suggestions) => {
        console.log(suggestions);
    }).catch((error) => {
        console.log(error);
    });
});
