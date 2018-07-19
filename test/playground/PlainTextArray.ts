import {ISelectableList} from './ISelectableList';

export class PlainTextArray implements ISelectableList<string> {
    constructor(public values: string[]) {
    }

    public getUniqueID(elem: string) {
        const index = this.values.indexOf(elem);
        if (index >= 0) {
            return index + '';
        }
        return null;
    }

    public getTitle(elem: string) {
        return elem;
    }

    public getIndex(uniqueStr: string) {
        const id = Number.parseInt(uniqueStr);
        if (Number.isInteger(id) && id <= this.values.length) {
            return id;
        }
        return null;
    }

    public filteredValues(filterTxt: string, maxLength?: number) {
        const filteredResults = this.values.filter((elem) => {
            return elem.includes(filterTxt);
        });
        return (maxLength && maxLength > 0) ? filteredResults.slice(0, maxLength) : filteredResults;
    }
}
