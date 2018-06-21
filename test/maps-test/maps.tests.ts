import {googleMapsService} from '../../src/app/utilities/google.maps.utils';

const locationStr = <HTMLInputElement> document.querySelector('input[name="location-string"]');
const locationBtn = document.querySelector('input[name="loc-btn"]');
const geoLocationBtn = document.querySelector('input[name="geoloc-btn"]');

console.log(locationBtn);
console.log(geoLocationBtn);
console.log(locationStr);

locationBtn.addEventListener('click', () => {
    const val = locationStr.value;
    console.log(val);
    googleMapsService.findLocation(val).then((value) => {
        console.log('ok!');
        console.log(value);
    }).catch((error) => {
        console.log('ERROR!!!');
        console.log(error);
    });
});

geoLocationBtn.addEventListener('click', () => {
    console.log('geolocation position');
    const elem = document.querySelector('.map-div');
    elem.innerHTML = '';
    googleMapsService.currentPositionFromGeolocation().then((position) => {
        console.log(position);
        googleMapsService.markLocationOnMap(position, elem);
    }).catch((error) => {
        console.log(error);
    });
});
