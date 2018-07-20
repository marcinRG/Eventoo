import {IComboBoxProperties} from './IComboBox.Properties';
import {ISelectableList} from './ISelectableList';
import {animationsUtils} from './animations.utils';

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

export function createListElements(list: ISelectableList<any>, values: any[], htmlListElement: HTMLElement,
                                   listElementClass: string, comboBox: object, callback: any) {
    if (htmlListElement) {
        htmlListElement.innerHTML = null;
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

export function getDropdownListHeight(values: any[], ulElement: HTMLElement, maxSize: number): number {
    const liHeight = calculateLiElementHeight(ulElement);
    let elementCount = values.length;
    if (elementCount > 0 && maxSize > 0) {
        if (elementCount > maxSize) {
            elementCount = maxSize;
        }
        return liHeight * elementCount;
    }
    return 0;
}

function calculateLiElementHeight(ulParent: HTMLElement) {
    let height = null;
    const li = ulParent.querySelector('li');
    const previousVisibility = window.getComputedStyle(ulParent).visibility;
    const previousDisplay = window.getComputedStyle(ulParent).display;
    ulParent.style.visibility = 'hidden';
    ulParent.style.display = 'block';
    if (li) {
        height = li.offsetHeight + 1;
    }
    ulParent.style.display = previousDisplay;
    ulParent.style.visibility = previousVisibility;
    return height;
}

export function toggleListElements(listElements: HTMLElement, listVisible: boolean,
                                   dropDownListHeight: number): boolean {
    if (!listVisible) {
        animationsUtils.slideDown(listElements, 150, 'ease-in', 'auto', dropDownListHeight);
    } else {
        animationsUtils.slideUp(listElements, 150, 'ease-in', 'hidden');
    }
    return !listVisible;
}

export function showList(listElements, overflow, dropDownListHeight) {
    animationsUtils.slideDown(listElements, 150, 'ease-in',
        overflow, dropDownListHeight);
}
