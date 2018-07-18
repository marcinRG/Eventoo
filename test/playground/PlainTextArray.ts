import {ISelectableList} from './ISelectableList';

export class PlainTextArray implements ISelectableList<string> {
    constructor(public values: string[]) {
    }

    public getUniqueID(i: number) {
        if (i < this.values.length) {
            return i + '';
        }
        return null;
    }

    public getTitle(i: number) {
        if (i < this.values.length) {
            return this.values[i];
        }
        return null;
    }

    public getIndex(uniqueStr: string) {
        const id = Number.parseInt(uniqueStr);
        if (Number.isInteger(id) && id <= this.values.length) {
            return id;
        }
        return null;
    }

    public filteredValues(filterTxt: string, maxLength: number) {
        return this.values.filter((elem) => {
            return elem.includes(filterTxt);
        }).slice(0, maxLength);
    }
}
