import {animationsUtils} from './animations.utils';
import {ComboxTypes} from './Combox.Types';

export class ComboBox {
    private htmlElement = document.querySelector('.input-dropdown');
    private txtInput = <HTMLInputElement> this.htmlElement.querySelector('.input-txt');
    private btnInput = this.htmlElement.querySelector('.input-btn');
    private listElements = this.htmlElement.querySelector('.list-elements');
    private listElementClass = 'li-elem';
    private listVisible = false;
    private values;

    constructor(private type: ComboxTypes, values: any[]) {
        console.log('ready');

        if (this.type === ComboxTypes.NO_EDIT) {
            this.txtInput.readOnly = true;
        } else {
            this.txtInput.readOnly = false;
        }
        this.values = values;
        this.createListElements(this.values);
        this.btnInput.addEventListener('click', () => {
            this.toggleListElements();
        });
    }

    private doSomething(i) {
        console.log('doin somtinhg');
        console.log(i);
        this.txtInput.value = this.values[i];
        animationsUtils.slideUp(this.listElements, 50, 'ease-in', 'hidden');
        this.listVisible = false;
    }

    private createListElements(list: any[]) {
        console.log(list);
        this.listElements.innerHTML = null;
        for (let i = 0; i < list.length; i++) {
            const liElem = document.createElement('li');
            liElem.textContent = list[i];
            liElem.setAttribute('data-list-nr', i + '');
            this.addListElementHandler(i, liElem);
            liElem.classList.add(this.listElementClass);
            this.listElements.appendChild(liElem);
        }
    }

    private toggleListElements() {
        if (!this.listVisible) {
            animationsUtils.slideDown(this.listElements, 150, 'ease-in', 'auto');
            this.listVisible = true;
        } else {
            animationsUtils.slideUp(this.listElements, 150, 'ease-in', 'hidden');
            this.listVisible = false;
        }
    }

    private addListElementHandler(i, elem) {
        elem.addEventListener('click', () => {
            this.doSomething(i);
        });
    }
}
