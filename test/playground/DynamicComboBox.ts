import {IComboBoxProperties} from './IComboBox.Properties';
import {ISelectableList} from './ISelectableList';
import * as CBoxUtils from './ComboBox.Utils';
import {animationsUtils} from './animations.utils';

export class DynamicComboBox {
    private htmlElement;
    private txtInput;
    private btnInput;
    private listElements;
    private listElementClass;
    private listVisible = false;
    private selectedElement: any;
    // this.debouncedParseAndAddToOutput = CBoxUtils.debounce<string>((value) => {
    //     if (this.date.setDateFromString(value)) {
    //         this.fillMonthYearLabel();
    //         this.fillDays();
    //     }
    // }, 1200);

    constructor(properties: IComboBoxProperties, private selectableList: ISelectableList<any>) {
        this.createElements(properties);
        this.txtInput.readOnly = false;
        this.listElementClass = properties.listElementClass;
        CBoxUtils.createFilteredListElements('', 0, selectableList, this.listElements,
            this.listElementClass, this, this.changeToSelected);
        this.btnInput.addEventListener('click', () => {
            this.toggleListElements();
        });
        this.txtInput.addEventListener('input', (event) => {
            console.log(event);
            CBoxUtils.createFilteredListElements(this.txtInput.value, 0, selectableList, this.listElements,
                this.listElementClass, this, this.changeToSelected);
            console.log(this.selectableList.filteredValues(this.txtInput.value));
        });
    }

    private changeToSelected() {
        console.log('changed');
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

    private createElements(properites: IComboBoxProperties) {
        const elements = CBoxUtils.createHTMLElements(properites);
        this.htmlElement = elements.htmlElement;
        this.txtInput = elements.txtInput;
        this.btnInput = elements.btnInput;
        this.listElements = elements.listElements;
    }
}
