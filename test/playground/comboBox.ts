import {animationsUtils} from './animations.utils';
import {ComboxTypes} from './Combox.Types';

export class ComboBox {
    private htmlElement = document.querySelector('.input-dropdown');
    private txtInput = <HTMLInputElement>this.htmlElement.querySelector('.input-txt');
    private btnInput = this.htmlElement.querySelector('.input-btn');
    private listElements = this.htmlElement.querySelector('.list-elements');

    constructor(private type: ComboxTypes) {
        console.log('ready');

        if (this.type === ComboxTypes.NO_EDIT) {
            this.txtInput.readOnly = true;
        } else {
            this.txtInput.readOnly = false;
        }

        this.btnInput.addEventListener('click', () => {
            animationsUtils.slideToggle(this.listElements, 150, 'ease-in');
        });

    }
}
