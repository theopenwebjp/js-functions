"use strict";
class BaseObjectHelper {
    static copyObject(obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        }
        catch (err) {
            return {};
        }
    }
    static copyObjectData(obj) {
        var copy = {};
        for (var key in obj) {
            if (!BaseObjectHelper.isCommonObject(obj[key])) {
                copy[key] = obj[key];
            }
        }
        return copy;
    }
    static applyObj(from, to, condition) {
        if (!BaseObjectHelper.isObject(from) || !BaseObjectHelper.isObject(to)) {
            throw new Error('Failed object check');
        }
        for (var key in from) {
            if (condition && !condition(key, from, to)) {
                continue;
            }
            to[key] = from[key];
        }
        return to;
    }
    static getObjectKeyValueAtIndex(obj, index) {
        var keys = Object.keys(obj);
        var keyValue = {
            key: null,
            value: null
        };
        keyValue.key = keys[index];
        keyValue.value = obj[keyValue.key];
        return keyValue;
    }
    static getObjectKeys(obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    }
    static expandCommonObjectIntoObject(obj, parentObj, insertIndex = 0) {
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
                let key = (insertIndex + i);
                set(key, obj[key]);
            }
        }
        else {
            for (let key in obj) {
                set(key, obj[key]);
            }
        }
        return parentObj;
    }
    static logObjectOnSingleLine(obj) {
        var str = '';
        var LF = '\n';
        for (var key in obj) {
            str += (key + ': ' + String(obj[key]) + LF);
        }
        console.log(str);
    }
    static isObject(obj) {
        if (typeof obj === 'object' &&
            obj !== null &&
            !Array.isArray(obj)) {
            return true;
        }
        else {
            return false;
        }
    }
    static isNonDomObject(obj) {
        if (BaseObjectHelper.isObject(obj) && !('nodeType' in obj)) {
            return true;
        }
        else {
            return false;
        }
    }
    static isCommonObject(obj) {
        return (BaseObjectHelper.isObject(obj) || Array.isArray(obj));
    }
    static objectToObjectInfoArray(obj, curDepth = 1, arr = []) {
        var val;
        for (var key in obj) {
            if (BaseObjectHelper.isCommonObject(obj[key])) {
                BaseObjectHelper.objectToObjectInfoArray(obj[key], (curDepth + 1), arr);
            }
            else {
                val = obj[key];
                arr.push(BaseObjectHelper.objectInfo(curDepth, key, val));
            }
        }
        return arr;
    }
    static objectInfo(depth, key, value) {
        return {
            depth: depth,
            key: key,
            value: value
        };
    }
    static getAddedVariableNames(obj, beforeKeys) {
        const afterKeys = Object.keys(obj);
        const added = afterKeys.filter(key => beforeKeys.indexOf(key) < 0);
        return added;
    }
    static getRemovedVariableNames(obj, beforeKeys) {
        const afterKeys = Object.keys(obj);
        const removed = beforeKeys.filter(key => afterKeys.indexOf(key) < 0);
        return removed;
    }
    static filterObjectVariables(obj, keys) {
        var filtered = {};
        for (var i = 0; i < keys.length; i++) {
            filtered[keys[i]] = obj[keys[i]];
        }
        return filtered;
    }
    static globalize(obj) {
        for (var key in obj) {
            if (key in window) {
                window[key] = obj[key];
            }
        }
    }
    static renameObjectKey(obj, oldKey, newKey) {
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
    static getKeyChanges(oldObj, newObj) {
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
    static objectToReadableString(obj, onError = undefined) {
        var str = '';
        try {
            var tempStr = JSON.stringify(obj);
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
    static watchObjectProperty(obj, key, options = {}) {
        var get = options.get || function () { };
        var set = options.set || function () { };
        const completeOptions = {
            get,
            set
        };
        var returnObj = {
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
            writable: true,
            configurable: true,
            enumerable: true,
            get: get,
            set: set
        });
        return returnObj;
    }
}
module.exports = BaseObjectHelper;
