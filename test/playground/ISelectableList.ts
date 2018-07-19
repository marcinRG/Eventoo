export interface ISelectableList<T> {
    values: T[];

    getUniqueID(elem: T): string;

    getIndex(uniqueID: string): number;

    getTitle(elem: T): string;

    filteredValues(filterTxt: string, maxLength?: number): T[];
}
