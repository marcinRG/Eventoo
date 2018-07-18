import {animationsUtils} from './animations.utils';
import {ComboxTypes} from './Combox.Types';
import {ISelectableList} from './ISelectableList';

export class ComboBox {
    private readonly htmlElement;
    private txtInput;
    private btnInput;
    private listElements;
    private listElementClass;
    private listVisible = false;
    private selectedElement: any;

    constructor(selectorQueryStr: string, listElementClassName: string,
                private type: ComboxTypes, private selectableList: ISelectableList<any>) {
        this.htmlElement = document.querySelector(selectorQueryStr);
        this.listElementClass = listElementClassName;
        if (this.htmlElement) {
            this.txtInput = <HTMLInputElement> this.htmlElement.querySelector('.input-txt');
            this.btnInput = this.htmlElement.querySelector('.input-btn');
            this.listElements = this.htmlElement.querySelector('.list-elements');
        }

        if (this.type === ComboxTypes.NO_EDIT) {
            this.txtInput.readOnly = true;
        } else {
            this.txtInput.readOnly = false;
        }

        this.createListElements(this.selectableList);
        this.btnInput.addEventListener('click', () => {
            this.toggleListElements();
        });
    }

    private changeToSelected(ID: string) {
        const index = this.selectableList.getIndex(ID);
        this.selectedElement = this.selectableList.values[index];
        if (this.selectedElement) {
            this.txtInput.value = this.selectableList.getTitle(index);
            animationsUtils.slideUp(this.listElements, 50, 'ease-in', 'hidden');
            this.listVisible = false;
        }
    }

    private createListElements(list: ISelectableList<any>) {
        this.listElements.innerHTML = null;
        for (let i = 0; i < list.values.length; i++) {
            const liElem = document.createElement('li');
            liElem.textContent = list.getTitle(i);
            liElem.setAttribute('data-list-nr', list.getUniqueID(i));
            this.addListElementHandler(list.getUniqueID(i), liElem);
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

    private addListElementHandler(ID, htmlElem) {
        htmlElem.addEventListener('click', () => {
            this.changeToSelected(ID);
        });
    }
}
