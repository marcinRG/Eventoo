import {animationsUtils} from './animations.utils';
import {DatePicker} from './datePicker';
import {ComboBox} from './comboBox';
import {ComboxTypes} from './Combox.Types';
//import 'velocity-animate';

const buttonOne = document.querySelector('.button-one');
const buttonTwo = document.querySelector('.button-two');
const buttonThree = document.querySelector('.button-three');
const elementOne = document.querySelector('.elem-one');
const elementTwo = document.querySelector('.elem-two');
const elementThree = <HTMLElement> document.querySelector('.elem-three');

buttonOne.addEventListener('click', () => {
    animationsUtils.slideToggle(elementOne, 1000, 'ease-out');
});

buttonTwo.addEventListener('click', () => {
    console.log('b2 click');
    animationsUtils.slideToggle(elementTwo, 1500, 'ease-out');
});

buttonThree.addEventListener('click', () => {
    animationsUtils.slideToggle(elementThree, 500, 'ease-out');
});

const datePicker = new DatePicker();
const comboBox = new ComboBox(ComboxTypes.NO_EDIT);
