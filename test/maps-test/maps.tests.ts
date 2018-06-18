import {googleMapsService} from '../../src/app/utilities/google.maps.utils';

const locationStr = <HTMLInputElement> document.querySelector('input[name="location-string"]');
const locationBtn = document.querySelector('input[name="loc-btn"]');

console.log(locationBtn);
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
