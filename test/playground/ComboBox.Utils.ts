import {IComboBoxProperties} from './IComboBox.Properties';
import {ISelectableList} from './ISelectableList';

export function createHTMLElements(properties: IComboBoxProperties) {
    const inputTxtClass = properties.txtInputClass || 'input-txt';
    const inputBtnClass = properties.btnInputClass || 'input-btn';
    const inputsRowClass = properties.inputsRowClass || 'inputs';
    const listClass = properties.listClass || 'list-elements';
    const htmlInner = `
        <div class="${inputsRowClass}">
            <input class="${inputTxtClass}" type="text">
            <input class="${inputBtnClass}" type="button" value="V">
        </div>
        <ul class="${listClass}">
        </ul>`;
    const htmlElement = document.querySelector(properties.querySelectorString);
    htmlElement.innerHTML = htmlInner;
    if (htmlElement) {
        return {
            htmlElement,
            txtInput: <HTMLInputElement> htmlElement.querySelector(`.${inputTxtClass}`),
            btnInput: htmlElement.querySelector(`.${inputBtnClass}`),
            listElements: htmlElement.querySelector(`.${listClass}`),
        };
    }
}

export function createListElements(list: ISelectableList<any>, htmlListElement: HTMLElement,
                                   listElementClass: string, comboBox: object, callback: any) {
    if (htmlListElement) {
        htmlListElement.innerHTML = null;
        const values = list.values;
        for (const elem of values) {
            const liElem = document.createElement('li');
            liElem.textContent = list.getTitle(elem);
            const uniqueID = list.getUniqueID(elem);
            console.log(uniqueID);
            liElem.setAttribute('data-list-nr', uniqueID);
            liElem.addEventListener('click', () => {
                callback.apply(comboBox, [uniqueID]);
            });
            liElem.classList.add(listElementClass);
            htmlListElement.appendChild(liElem);
        }
    }
}

export function createFilteredListElements(query: string, maxLength: number, list: ISelectableList<any>,
                                           htmlListElement: HTMLElement, listElementClass: string, comboBox: object,
                                           callback: any) {
    if (htmlListElement) {
        htmlListElement.innerHTML = null;
        const values = list.filteredValues(query, maxLength);
        for (const elem of values) {
            const liElem = document.createElement('li');
            liElem.textContent = list.getTitle(elem);
            const uniqueID = list.getUniqueID(elem);
            liElem.setAttribute('data-list-nr', uniqueID);
            liElem.addEventListener('click', () => {
                callback.apply(comboBox, [uniqueID]);
            });
            liElem.classList.add(listElementClass);
            htmlListElement.appendChild(liElem);
        }
    }
}
