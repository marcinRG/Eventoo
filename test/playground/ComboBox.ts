import {animationsUtils} from './animations.utils';
import {ISelectableList} from './ISelectableList';
import {IComboBoxProperties} from './IComboBox.Properties';
import * as cBoxUtils from './ComboBox.Utils';

export class ComboBox {
    private htmlElement;
    private txtInput;
    private btnInput;
    private listElements;
    private listElementClass;
    private listVisible = false;
    private selectedElement: any;
    private dropdownListHeight: number;
    private maxSize: number;

    constructor(properties: IComboBoxProperties, private selectableList: ISelectableList<any>) {
        this.initialize(properties);
        cBoxUtils.createListElements(this.selectableList, this.selectableList.values, this.listElements,
            this.listElementClass, this, this.changeToSelected);
        this.dropdownListHeight = cBoxUtils.getDropdownListHeight(selectableList.values,
            this.listElements, this.maxSize);
        this.btnInput.addEventListener('click', () => {
            this.listVisible = cBoxUtils.toggleListElements(this.listElements,
                this.listVisible, this.dropdownListHeight);
        });
    }

    private initialize(properties: IComboBoxProperties) {
        const elements = cBoxUtils.createHTMLElements(properties);
        this.htmlElement = elements.htmlElement;
        this.txtInput = elements.txtInput;
        this.btnInput = elements.btnInput;
        this.listElements = elements.listElements;
        this.txtInput.readOnly = true;
        this.listElementClass = properties.listElementClass;
        this.maxSize = properties.maxSize;
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
}
