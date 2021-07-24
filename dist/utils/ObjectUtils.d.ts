declare function combineAllArray(arr: any[]): any[];
declare function compareTwoStringArray(array1: string[], array2: string[]): boolean;
/**
 *
 * @param {big array} array1
 * @param {small array} array2
 */
declare function arrayIsContainArray(array1: string[], array2: string[]): boolean;
declare const _default: {
    getValueFromStringKey: (object: any, keyString: string) => any;
    mapObjectToArray: (object: any) => any[];
    findItemFromId: (list: any[] | undefined, id: string) => any;
    removeItemFromId: (list: any[] | undefined, id: string) => any[];
    sliceArrayToMui: (bigArray?: never[], numberOfItem?: number) => never[][];
    arrayMove: (arr?: never[], oldIndex?: number, newIndex?: number) => never[];
    mapArrayToObject: (array: any[], getKey?: (item: any) => any) => any;
    combineAllArray: typeof combineAllArray;
    compareTwoStringArray: typeof compareTwoStringArray;
    setValueFromStringKey: (object: any, keyString: string, value: any) => any;
    mapFieldsLangsCTS: (dataClient?: any, KEYS_LANG?: never[]) => {};
    mapFieldsLangsSTC: (dataServer: any, KEYS_LANG?: never[]) => any;
    arrayIsContainArray: typeof arrayIsContainArray;
    updateArrayById: (arrays: never[] | undefined, newItem: any) => any[];
    removeArrayById: (arrays: any[] | undefined, id: any) => any[];
};
export default _default;
