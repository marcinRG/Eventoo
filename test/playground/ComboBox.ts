import {animationsUtils} from './animations.utils';
import {ISelectableList} from './ISelectableList';
import {IComboBoxProperties} from './IComboBox.Properties';
import * as utils from './ComboBox.Utils';

export class ComboBox {
    private htmlElement;
    private txtInput;
    private btnInput;
    private listElements;
    private listElementClass;
    private listVisible = false;
    private selectedElement: any;

    constructor(properties: IComboBoxProperties, private selectableList: ISelectableList<any>) {
        this.createElements(properties);
        this.txtInput.readOnly = true;
        this.listElementClass = properties.listElementClass;
        utils.createListElements(selectableList, this.listElements, this.listElementClass, this, this.changeToSelected);
        this.btnInput.addEventListener('click', () => {
            this.toggleListElements();
        });
    }

    private createElements(properites: IComboBoxProperties) {
        const elements = utils.createHTMLElements(properites);
        this.htmlElement = elements.htmlElement;
        this.txtInput = elements.txtInput;
        this.btnInput = elements.btnInput;
        this.listElements = elements.listElements;
    }

    private changeToSelected(ID: string) {
        const index = this.selectableList.getIndex(ID);
        const elem = this.selectableList.values[index];
        this.selectedElement = elem;
        if (this.selectedElement) {
            this.txtInput.value = this.selectableList.getTitle(elem);
            this.hideAfterSelected();
        }
    }

    private hideAfterSelected() {
        animationsUtils.slideUp(this.listElements, 50, 'ease-in', 'hidden');
        this.listVisible = false;
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
}
