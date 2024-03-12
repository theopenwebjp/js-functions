export function copyObject(obj) {
    try {
        return JSON.parse(JSON.stringify(obj));
    }
    catch (err) {
        return {};
    }
}
export function copyObjectData(obj) {
    const copy = {};
    for (let key in obj) {
        if (!isCommonObject(obj[key])) {
            copy[key] = obj[key];
        }
    }
    return copy;
}
export function applyObj(from, to, condition) {
    if (!isObject(from) || !isObject(to)) {
        throw new Error('Failed object check');
    }
    for (let key in from) {
        if (condition && !condition(key, from, to)) {
            continue;
        }
        to[key] = from[key];
    }
    return to;
}
export function getObjectKeyValueAtIndex(obj, index) {
    const keys = Object.keys(obj);
    const keyValue = {
        key: null,
        value: null
    };
    keyValue.key = keys[index];
    keyValue.value = obj[keyValue.key];
    return keyValue;
}
export function getObjectKeys(obj) {
    const keys = [];
    for (let key in obj) {
        keys.push(key);
    }
    return keys;
}
export function expandCommonObjectIntoObject(obj, parentObj, insertIndex = 0) {
    const set = (key, value) => {
        if (Array.isArray(parentObj)) {
            parentObj.splice(Number(key), 0, value);
        }
        else {
            parentObj[String(key)] = value;
        }
    };
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            let spliceIndex = (insertIndex + i);
            set(spliceIndex, obj[i]);
        }
    }
    else {
        for (let key in obj) {
            set(key, obj[key]);
        }
    }
    return parentObj;
}
export function logObjectOnSingleLine(obj) {
    let str = '';
    const LF = '\n';
    for (let key in obj) {
        str += (key + ': ' + String(obj[key]) + LF);
    }
    console.log(str);
}
export function isObject(obj) {
    if (typeof obj === 'object' &&
        obj !== null &&
        !Array.isArray(obj)) {
        return true;
    }
    else {
        return false;
    }
}
export function isNonDomObject(obj) {
    if (isObject(obj) && !('nodeType' in obj)) {
        return true;
    }
    else {
        return false;
    }
}
export function isCommonObject(obj) {
    return (isObject(obj) || Array.isArray(obj));
}
export function objectToObjectInfoArray(obj, curDepth = 1, arr = []) {
    for (let key in obj) {
        if (isCommonObject(obj[key])) {
            objectToObjectInfoArray(obj[key], (curDepth + 1), arr);
        }
        else {
            const val = obj[key];
            arr.push(objectInfo(curDepth, key, val));
        }
    }
    return arr;
}
export function objectInfo(depth, key, value) {
    return {
        depth: depth,
        key: key,
        value: value
    };
}
export function getAddedVariableNames(obj, beforeKeys) {
    const afterKeys = Object.keys(obj);
    const added = afterKeys.filter(key => beforeKeys.indexOf(key) < 0);
    return added;
}
export function getRemovedVariableNames(obj, beforeKeys) {
    const afterKeys = Object.keys(obj);
    const removed = beforeKeys.filter(key => afterKeys.indexOf(key) < 0);
    return removed;
}
export function filterObjectVariables(obj, keys) {
    const filtered = {};
    for (let i = 0; i < keys.length; i++) {
        filtered[keys[i]] = obj[keys[i]];
    }
    return filtered;
}
export function globalize(obj) {
    for (let key in obj) {
        window[key] = obj[key];
    }
}
export function renameObjectKey(obj, oldKey, newKey) {
    if (oldKey !== newKey) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, oldKey);
        if (descriptor) {
            Object.defineProperty(obj, newKey, descriptor);
            delete obj[oldKey];
        }
        else {
            throw new Error('Failed to find descriptor.');
        }
    }
}
export function getKeyChanges(oldObj, newObj) {
    const changes = {
        added: {},
        updated: {},
        old: {},
        deleted: {}
    };
    let key;
    for (key in oldObj) {
        if (!newObj || !Object.prototype.hasOwnProperty.call(newObj, key)) {
            changes.deleted[key] = oldObj[key];
        }
        else if (newObj && oldObj[key] !== newObj[key]) {
            changes.old[key] = oldObj[key];
            changes.updated[key] = newObj[key];
        }
    }
    for (key in newObj) {
        if (oldObj && !Object.prototype.hasOwnProperty.call(oldObj, key)) {
            changes.added[key] = newObj[key];
        }
    }
    return changes;
}
export function objectToReadableString(obj, onError = undefined) {
    let str = '';
    try {
        const tempStr = JSON.stringify(obj);
        str = tempStr;
    }
    catch (err) {
        if (onError) {
            onError(err);
        }
        else {
            console.log(err);
        }
    }
    return str;
}
export function watchObjectProperty(obj, key, options = {}) {
    const get = options.get || function () { };
    const set = options.set || function () { };
    const completeOptions = {
        get,
        set
    };
    const returnObj = {
        obj: obj,
        key: key,
        initialValue: obj[key],
        options: completeOptions,
        stop: function () {
            Object.defineProperty(obj, key, {
                get: undefined,
                set: undefined
            });
        }
    };
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get: get,
        set: set
    });
    return returnObj;
}
export function keyValueObjToArrays(obj) {
    const arr = [];
    for (let key in obj) {
        arr.push([key, obj[key]]);
    }
    return arr;
}
