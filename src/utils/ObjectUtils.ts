import _, { every, includes, reverse } from "lodash";

const getValueFromStringKey = (object: any, keyString: string) => {
    const keyList = keyString.split(".");
    if (keyList.length === 0) {
        return object[keyString];
    }
    let objectResult = object;
    keyList.forEach((key) => {
        objectResult = objectResult?.[key];
    });

    return objectResult;
};

const setValueFromStringKey = (object: any, keyString: string, value: any) => {
    const keyList = keyString.split(".");
    reverse(keyList);
    let objectResult: any = {};

    if (keyList.length === 0) {
        objectResult[keyString] = value;
        return objectResult;
    }
    keyList.forEach((key, index) => {
        if (index === 0) {
            objectResult[key] = value;
        } else {
            objectResult = { [key]: objectResult };
        }
    });

    return { ...object, ...objectResult };
};
const mapFieldsLangsCTS = (dataClient: any = {}, KEYS_LANG = []) => {
    let dataResult = {};
    KEYS_LANG.forEach((fields: any) => {
        dataResult = setValueFromStringKey(dataResult, fields.keyServer, dataClient[fields.keyClient]);
    });
    return dataResult;
};

const mapFieldsLangsSTC = (dataServer: any, KEYS_LANG = []) => {
    const dataResult: any = {};
    KEYS_LANG.forEach((fields: any) => {
        dataResult[fields.keyClient] = getValueFromStringKey(dataServer, fields.keyServer);
    });
    return dataResult;
};

const mapObjectToArray = (object: any) => {
    if (!object) {
        return [];
    }
    const arrayResult: any[] = [];
    Object.keys(object).forEach((key) => arrayResult.push({ id: key, ...object[key] }));
    return arrayResult;
};

const mapArrayToObject = (array: any[], getKey = (item: any) => item.id) => {
    if (!array || array.length === 0) {
        return {};
    }
    const objectResult: any = {};
    array.forEach((arrayItem) => {
        const key = getKey(arrayItem);
        objectResult[key] = arrayItem;
    });
    return objectResult;
};

const findItemFromId = (list: any[] = [], id: string) => {
    if (!list || list.length === 0) {
        return {};
    }

    return _.filter(list, (pro) => pro.id === id)?.[0];
};

const removeItemFromId = (list: any[] = [], id: string) => {
    if (!list || list.length === 0) {
        return [];
    }

    return _.filter(list, (pro) => pro.id !== id);
};

const sliceArrayToMui = (bigArray = [], numberOfItem = 10) => {
    const arrayOfArrays = [];
    for (let i = 0; i < bigArray.length; i += numberOfItem) {
        arrayOfArrays.push(bigArray.slice(i, i + numberOfItem));
    }

    return arrayOfArrays;
};

const arrayMove = (arr: any[], oldIndex: number, newIndex: number) => {
    if (newIndex >= arr.length) {
        let k = newIndex - arr.length + 1;
        // eslint-disable-next-line no-plusplus
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr; // for testing
};

function combineAllArray(arr: any[]): any[] {
    if (!arr || arr.length === 0) return [];
    if (arr.length === 1) {
        return arr[0];
    }
    const result = [];
    const allCasesOfRest = combineAllArray(arr.slice(1));
    for (let i = 0; i < allCasesOfRest.length; i += 1) {
        for (let j = 0; j < arr[0].length; j += 1) {
            result.push(arr[0][j].concat(allCasesOfRest[i]));
        }
    }
    return result;
}

function compareTwoStringArray(array1: string[], array2: string[]) {
    if (!array1 || !array2 || array1.length !== array2.length) return false;
    return every(array1, (item) => includes(array2, item));
}

/**
 *
 * @param {big array} array1
 * @param {small array} array2
 */
function arrayIsContainArray(array1: string[], array2: string[]) {
    return every(array2, (item) => includes(array1, item));
}

export default {
    getValueFromStringKey,
    mapObjectToArray,
    findItemFromId,
    removeItemFromId,
    sliceArrayToMui,
    arrayMove,
    mapArrayToObject,
    combineAllArray,
    compareTwoStringArray,
    setValueFromStringKey,
    mapFieldsLangsCTS,
    mapFieldsLangsSTC,
    arrayIsContainArray,
};
