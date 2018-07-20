import {IComboBoxProperties} from './IComboBox.Properties';
import {ISelectableList} from './ISelectableList';
import * as cBoxUtils from './ComboBox.Utils';
import {animationsUtils} from './animations.utils';
import * as utils from './utils';

export class DynamicComboBox {
    private htmlElement;
    private txtInput;
    private btnInput;
    private listElements;
    private listElementClass;
    private listVisible = false;
    private selectedElement: any;
    private maxSize: number;
    private dropdownListHeight;
    private elementCount;
    private debouncedInputText: any;

    constructor(properties: IComboBoxProperties, private selectableList: ISelectableList<any>) {
        this.initialize(properties);
        this.intializeDropDownList();
        this.debouncedInputText = utils.debounce<string>((value) => {
            this.handleTxtInputEvents();
        }, 50);
        this.btnInput.addEventListener('click', () => {
            this.handleBtnInputEvents();
        });
        this.txtInput.addEventListener('input', () => {
            console.log('event fired');
            this.debouncedInputText(this.txtInput.value);
        });
    }

    private handleBtnInputEvents() {
        this.listVisible = cBoxUtils.toggleListElements(this.listElements, this.listVisible, this.dropdownListHeight);
    }

    private handleTxtInputEvents() {
        const values = this.selectableList.filteredValues(this.txtInput.value, 10);
        cBoxUtils.createListElements(this.selectableList, values, this.listElements,
            this.listElementClass, this, this.changeToSelected);
        this.dropdownListHeight = cBoxUtils.getDropdownListHeight(values,
            this.listElements, this.maxSize);
        this.elementCount = values.length;
        let overflow = 'auto';
        if (values.length <= this.maxSize) {
            overflow = 'hidden';
        }
        this.listElements.style.overflow = overflow;
        this.changeDropDownListProperties();
        if (this.dropdownListHeight > 0) {
            this.listElements.style.height = this.dropdownListHeight + 'px';
            if (!this.listVisible) {
                animationsUtils.slideDown(this.listElements, 150, 'ease-in',
                    overflow, this.dropdownListHeight);
            }
            this.listVisible = true;
        } else {
            console.log('height rowne zero');
            this.listElements.style.height = 0 + 'px';
            this.listElements.style.display = 'none';
            this.listVisible = false;
        }
    }

    private changeDropDownListProperties() {
        console.log('change props');
    }

    private changeToSelected(ID) {
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

    private intializeDropDownList() {
        cBoxUtils.createListElements(this.selectableList, this.selectableList.values, this.listElements,
            this.listElementClass, this, this.changeToSelected);
        this.dropdownListHeight = cBoxUtils.getDropdownListHeight(this.selectableList.values,
            this.listElements, this.maxSize);
    }

    private initialize(properties: IComboBoxProperties) {
        const elements = cBoxUtils.createHTMLElements(properties);
        this.htmlElement = elements.htmlElement;
        this.txtInput = elements.txtInput;
        this.btnInput = elements.btnInput;
        this.listElements = elements.listElements;
        this.txtInput.readOnly = false;
        this.listElementClass = properties.listElementClass;
        this.maxSize = properties.maxSize;
    }
}
