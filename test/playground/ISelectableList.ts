export interface ISelectableList<T> {
    values: T[];

    getUniqueID(index: number): string;

    getIndex(uniqueID: string): number;

    getTitle(i: number): string;

    filteredValues(filterTxt: string, maxLength: number): T[];
}
