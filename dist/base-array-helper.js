"use strict";
class BaseArrayHelper {
    static searchObjectArray(arr, key, val) {
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
    static singleDimensionArrayToObject(arr, defaultVal = '') {
        var obj = {};
        var key;
        for (var i = 0; i < arr.length; i++) {
            key = arr[i];
            obj[key] = defaultVal;
        }
        return obj;
    }
    static arrayListToObjectList(arr, keys) {
        return arr.map(function (val) {
            var obj = {};
            for (var i = 0; i < val.length; i++) {
                obj[keys[i]] = val[i];
            }
            return obj;
        });
    }
    static arrayToCamelCase(arr) {
        var str = '';
        var tempStr;
        for (var i = 0; i < arr.length; i++) {
            tempStr = arr[i];
            if (i > 0) {
                tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
            }
            str += tempStr;
        }
        return str;
    }
    static buildDelimiterString(arr, format) {
        var cHandle = null;
        if (format === 'camelCase') {
            cHandle = BaseArrayHelper.arrayToCamelCase;
        }
        else {
            cHandle = function (arr) {
                var del = format;
                return arr.join(del);
            };
        }
        return cHandle(arr);
    }
    static uniqueArray(arr) {
        return arr.filter((value, index, array) => {
            return array.indexOf(value) === index;
        });
    }
}
module.exports = BaseArrayHelper;
