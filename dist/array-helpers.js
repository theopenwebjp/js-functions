export function searchObjectArray(arr, key, val) {
    const found = [];
    let obj;
    for (let i = 0; i < arr.length; i++) {
        obj = arr[i];
        if (obj[key] === val) {
            found.push(obj);
        }
    }
    return found;
}
export function singleDimensionArrayToObject(arr, defaultVal = '') {
    const obj = {};
    let key;
    for (let i = 0; i < arr.length; i++) {
        key = arr[i];
        obj[key] = defaultVal;
    }
    return obj;
}
export function arrayListToObjectList(arr, keys) {
    return arr.map(function (val) {
        const obj = {};
        for (let i = 0; i < val.length; i++) {
            obj[keys[i]] = val[i];
        }
        return obj;
    });
}
export function arrayToCamelCase(arr) {
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        let tempStr = arr[i];
        if (i > 0) {
            tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
        }
        str += tempStr;
    }
    return str;
}
export function buildDelimiterString(arr, format) {
    let cHandle = null;
    if (format === 'camelCase') {
        cHandle = arrayToCamelCase;
    }
    else {
        cHandle = function (arr) {
            const del = format;
            return arr.join(del);
        };
    }
    return cHandle(arr);
}
export function uniqueArray(arr) {
    return arr.filter((value, index, array) => {
        return array.indexOf(value) === index;
    });
}
export function getRandomItemFromArray(items) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}
export function arrayifyAll(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = [arr[i]];
    }
    return arr;
}
