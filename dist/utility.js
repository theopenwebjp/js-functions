"use strict";
const BaseUtility = require('./base-utility');
const BaseObjectHelper = require('./base-object-helper');
class Utility extends BaseUtility {
    static dataEquals(a, b) {
        if (BaseObjectHelper.isCommonObject(a) && BaseObjectHelper.isCommonObject(b)) {
            return Utility.objectDataEquals(a, b);
        }
        else {
            return BaseUtility.equals(a, b);
        }
    }
    static objectDataEquals(a, b, looped = []) {
        if (!BaseUtility.arrayEquals(Object.keys(a), Object.keys(b))) {
            return false;
        }
        for (var key in a) {
            if (looped.indexOf(key) >= 0) {
                continue;
            }
            looped.push(key);
            if (typeof a[key] !== typeof b[key]) {
                return false;
            }
            if (BaseObjectHelper.isCommonObject(a[key])) {
                if (!Utility.objectDataEquals(a[key], b[key], looped)) {
                    return false;
                }
            }
            else {
                if (!BaseUtility.equals(a[key], b[key])) {
                    return false;
                }
            }
        }
        return true;
    }
    static cleverSlice(arr, from, to) {
        if (!BaseUtility.exists(from)) {
            from = 0;
        }
        if (!BaseUtility.exists(to)) {
            return arr.slice(from);
        }
        else {
            return arr.slice(from, to + 1);
        }
    }
    static getArguments(args, from, to) {
        args = Array.prototype.slice.call(args);
        return Utility.cleverSlice(args, from, to);
    }
    static combineObjects(args) {
        args = [...args];
        return Object.assign({}, ...args);
    }
    static dataInArray(data, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (Utility.dataEquals(data, arr[i])) {
                return true;
            }
        }
        return false;
    }
    static copyVariable(variable, keepReferences = false) {
        var copy = null;
        if (BaseObjectHelper.isObject(variable)) {
            if (keepReferences) {
                copy = Object.assign({}, variable);
            }
            else {
                copy = BaseObjectHelper.copyObject(variable);
            }
        }
        else if (Array.isArray(variable)) {
            if (keepReferences) {
                copy = variable.slice(0);
            }
            else {
                copy = BaseObjectHelper.copyObject(variable);
            }
        }
        else {
            copy = variable;
        }
        return copy;
    }
    static createMultiple(variable, count, keepReferences = false) {
        var arr = [];
        for (var i = 0; i < count; i++) {
            arr.push(Utility.copyVariable(variable, keepReferences));
        }
        return arr;
    }
    static toReadableString(data) {
        var str = '';
        if (BaseObjectHelper.isObject(data)) {
            str = BaseObjectHelper.objectToReadableString(data);
        }
        else {
            str = String(data);
        }
        return str;
    }
    static exportData(data) {
        var str = Utility.toReadableString(data);
        return window.prompt('', str);
    }
    static getSimilarity(var1, var2) {
        if (var1 === var2) {
            return 1;
        }
        else if (typeof var1 === 'number' && typeof var2 === 'number') {
            return Utility.getNumberSimilarity(var1, var2);
        }
        else {
            var1 = Utility.toReadableString(var1);
            var2 = Utility.toReadableString(var2);
        }
        return Utility.getStringSimilarity(var1, var2);
    }
    static getDataSet(data) {
        if (!BaseObjectHelper.isObject(data)) {
            return {};
        }
        return data;
    }
    static executeAjax(dataSet, url, options) {
        if (BaseObjectHelper.isObject(options)) {
        }
        if (!url) {
            return Utility.handleAjaxResponse(new window.XMLHttpRequest(), options);
        }
        var contentEncoding = 'gzip';
        var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        var params = Utility.getAjaxParams(dataSet);
        var xhr = new window.XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Encoding', contentEncoding);
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.onload = function () {
            Utility.handleAjaxResponse(xhr, options);
        };
        xhr.onerror = function () {
            Utility.handleAjaxResponse(xhr, options);
        };
        return xhr.send(params);
    }
    static getAjaxParams(obj) {
        var params = '';
        var i = 0;
        for (var key in obj) {
            if (i > 0) {
                params += '&';
            }
            params += key;
            params += '=';
            params += window.encodeURIComponent(obj[key]);
            i++;
        }
        return params;
    }
    static handleAjaxResponse(xhr, options) {
        if (xhr && xhr.readyState !== xhr.DONE) {
            return false;
        }
        var callback = null;
        if (BaseObjectHelper.isObject(options)) {
            if (options.callback !== undefined) {
                callback = options.callback;
            }
        }
        var response = false;
        if (xhr) {
            response = xhr.response;
        }
        return (callback !== null) ? Utility.handleCallback(callback, [response, xhr]) : null;
    }
}
module.exports = Utility;
