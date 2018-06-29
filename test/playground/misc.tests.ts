//import {animationsUtils} from './animations.utils';
import 'velocity-animate';

const buttonOne = document.querySelector('.button-one');
const buttonTwo = document.querySelector('.button-two');
const buttonThree = document.querySelector('.button-three');
const elementOne = document.querySelector('.elem-one');
const elementTwo = document.querySelector('.elem-two');
const elementThree = <HTMLElement> document.querySelector('.elem-three');

buttonOne.addEventListener('click', () => {
    console.log('b1 click');
    console.log(elementOne);
    //console.log(Velocity.version);
    elementOne.velocity({width: '900px'});
});

// buttonTwo.addEventListener('click', () => {
//     console.log('b2 click');
//     //const height = animationsUtils.findElementHeight(elementTwo);
// });
//
buttonThree.addEventListener('click', () => {
    console.log('b3 click');
    elementThree.style.height = '0px';
    elementThree.style.display = 'block';
    elementThree.velocity({height: '900px'}, {
        duration: 5000,
        begin: () => {
            console.log('begin');
        },
        complete: () => {
            console.log('completed');
        },
        easing : 'ease-out',
    });
    //animationsUtils.slideToggle(elementThree, 1000, 'ease-out');
});
