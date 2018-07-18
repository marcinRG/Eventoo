import {animationsUtils} from './animations.utils';
import {DatePicker} from './datePicker';
import {ComboBox} from './comboBox';
import {ComboxTypes} from './Combox.Types';
import {PlainTextArray} from './PlainTextArray';
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

const list = [
    'element 1',
    'element 2',
    'element 3',
    'element 4',
    'element 5',
    'element 6',
    'element 7',
    'element 8',
    'element 9',
    'element 10',
    'element 11',
];

const list2 = [
    'lorem 1',
    'ipsum 2',
    'dolor sit amet',
    'consectetur adipisicing',
    'element 5',
    'element 6',
    'element 7',
    'element 8',
    'element 9',
    'element 10',
    'element 11',
];

const datePicker = new DatePicker();
const txtArray = new PlainTextArray(list);
const comboBox = new ComboBox('#combo-box-1', 'li-elem', ComboxTypes.NO_EDIT, txtArray);
// const comboBox2 = new ComboBox(ComboxTypes.DYNAMIC, list);
