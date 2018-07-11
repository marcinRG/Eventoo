export class SelectableList<T> {

    private values: T[];
    private selectedIndex: number;
    private outputValues: T[];
    private toString: (elem: T) => string;
    private maxLength;
    private filterFunction: (val: T) => boolean;

    constructor(elements, maxLength) {
        this.values = elements;

        console.log('constructor');
    }

    public getElement(index: number): string {
        this.selectedIndex = index;
        return this.toString(this.values[index]);
    }

    public getElements(): T[] {
        return this.outputValues;
    }
}
