"use strict";
function stringPosition() {
    return {
        startIndex: -1,
        endIndex: -1,
        value: ''
    };
}
function logOptions() {
    return {
        prettify: false,
        title: '',
        beforeLog: null,
        afterLog: null,
        type: 'log'
    };
}
class BaseUtility {
    static getWrappedStrings(str, wrapperOpen, wrapperClose, keepWrapper = false, useClosingTagEnd = false) {
        var strings = [];
        var status = {
            currentString: '',
            inWrap: false
        };
        var i = 0;
        while (i < str.length) {
            if (status.inWrap) {
                if ((!useClosingTagEnd ||
                    str.substr(i + 1, wrapperClose.length) !== wrapperClose) &&
                    str.substr(i, wrapperClose.length) === wrapperClose) {
                    if (keepWrapper) {
                        status.currentString =
                            wrapperOpen + status.currentString + wrapperClose;
                    }
                    strings.push(status.currentString);
                    status.currentString = '';
                    status.inWrap = false;
                    i += wrapperClose.length;
                }
                else {
                    status.currentString += str[i];
                    i++;
                }
            }
            else {
                if (str.substr(i, wrapperOpen.length) === wrapperOpen) {
                    status.inWrap = true;
                    i += wrapperOpen.length;
                }
                else {
                    i++;
                }
            }
        }
        return strings;
    }
    static asyncCheck(callback) {
        var ms = Math.ceil(Math.random() * 10);
        window.setTimeout(function () {
            const returnVal = 'check ok';
            callback(returnVal);
        }, ms);
    }
    static promisify(handle, args, resolveIndex) {
        var oldHandle = handle;
        var oldCallback = args[resolveIndex];
        var promise = new Promise((resolve) => {
            args[resolveIndex] = function (...args) {
                resolve(...args);
            };
            oldHandle.apply(this, args);
        });
        promise.then((successValue) => {
            oldCallback(successValue);
        });
        return promise;
    }
    static asyncHandler(arr, onEnd) {
        var status = {
            current: 0,
            total: arr.length,
            returned: []
        };
        var handle = function () {
            var item = arr[status.current];
            if (!item) {
                onEnd(status.returned);
                return false;
            }
            item.index = status.current;
            item.args[item.callbackParamIndex] = function () {
                status.returned[item.index] = arguments;
                handle();
            };
            if (item.handle) {
                item.handle(...item.args);
            }
            status.current++;
            return true;
        };
        return handle();
    }
    static equals(a, b) {
        if (Number.isNaN(a)) {
            return Number.isNaN(b);
        }
        else {
            return a === b;
        }
    }
    static arrayEquals(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (!BaseUtility.equals(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    static exists(data) {
        return !(data === null || data === undefined);
    }
    static buildMediaQuery(dimensions) {
        var d = dimensions;
        var parts = [];
        if (BaseUtility.exists(d.width) && BaseUtility.exists(d.width.min)) {
            parts.push('min-width: ' + d.width.min + 'px');
        }
        if (BaseUtility.exists(d.width) && BaseUtility.exists(d.width.max)) {
            parts.push('max-width: ' + d.width.max + 'px');
        }
        if (BaseUtility.exists(d.height) && BaseUtility.exists(d.height.min)) {
            parts.push('min-height: ' + d.height.min + 'px');
        }
        if (BaseUtility.exists(d.height) && BaseUtility.exists(d.height.max)) {
            parts.push('max-height: ' + d.height.max + 'px');
        }
        var query = '';
        for (var i = 0; i < parts.length; i++) {
            if (i > 0) {
                query += ' AND ';
            }
            query += '(' + parts[i] + ')';
        }
        return query;
    }
    static promptPrint() {
        window.print();
    }
    static log(data, options = undefined) {
        if (!options) {
            options = logOptions();
        }
        if (!window.console) {
            return false;
        }
        var type = 'log';
        if (options.type && options.type in window.console) {
            type = options.type;
        }
        if (options.prettify) {
            options.beforeLog = function () {
                window.console.log('');
            };
        }
        if (options.beforeLog) {
            options.beforeLog(data);
        }
        if (options.title) {
            window.console.log(options.title);
        }
        window.console[type](data);
        if (options.afterLog) {
            options.afterLog(data);
        }
    }
    static getDataUrlExtension(dataUrl) {
        return dataUrl.split(';')[0].split('/')[1];
    }
    static download(data, name, mimeType) {
        var blob = new window.Blob([data], {
            type: mimeType
        });
        return BaseUtility.downloadBlob(blob, name);
    }
    static downloadCurrentPage() {
        var data = document.documentElement.innerHTML;
        var fileName = BaseUtility.getFileName(window.location.href);
        return BaseUtility.download(data, fileName, 'text/html');
    }
    static getFileName(url) {
        const f = BaseUtility.failOnFalsy;
        const noFragment = f(url.split('#')).shift();
        const noArguments = f(noFragment.split('?')).shift();
        const onlyLastRoute = f(noArguments.split('/')).pop();
        return onlyLastRoute;
    }
    static getFileExtension(url) {
        var parts = url.split('.');
        var ext = parts[parts.length - 1] || '';
        return ext;
    }
    static downloadDataUrl(dataUrl, name) {
        var url = dataUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        var extension = BaseUtility.getDataUrlExtension(dataUrl);
        var fullName = name + '.' + extension;
        BaseUtility.downloadLink(url, fullName);
    }
    static downloadBlob(blob, name) {
        var url = window.URL.createObjectURL(blob);
        var extension;
        if (blob.type) {
            extension = blob.type.split('/')[1];
        }
        else {
            extension = 'txt';
        }
        var fullName = name + '.' + extension;
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, fullName);
        }
        else {
            BaseUtility.downloadLink(url, fullName);
        }
        return true;
    }
    static downloadLink(url, fullName) {
        var link = window.document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.download = fullName;
        document.body.appendChild(link);
        link.click();
        if (link.parentElement) {
            link.parentElement.removeChild(link);
        }
    }
    static toObject(data, onError = undefined) {
        var obj = {};
        try {
            const tempObj = BaseUtility.parseJson(data);
            if (!tempObj) {
                throw new Error('ParseJSON failed');
            }
            obj = tempObj;
        }
        catch (err) {
            if (onError) {
                onError(err);
            }
        }
        return obj;
    }
    static parseFuzzyJson(str) {
        var obj;
        obj = BaseUtility.parseJson(str);
        if (obj === null) {
            try {
                obj = eval('(' + str + ')');
            }
            catch (err) {
                obj = null;
            }
            finally {
            }
        }
        return obj;
    }
    static parseJson(str) {
        if (!window.JSON) {
            return null;
        }
        try {
            var json = JSON.parse(str);
            return json;
        }
        catch (err) {
            return null;
        }
    }
    static stringifyJson(jsonObj) {
        if (!window.JSON) {
            return null;
        }
        try {
            var str = JSON.stringify(jsonObj);
            return str;
        }
        catch (err) {
            return null;
        }
    }
    static loadFiles(urls, onData) {
        var promises = [];
        for (var i = 0; i < urls.length; i++) {
            promises.push(new Promise(function (resolve) {
                BaseUtility.loadFile(urls[i], function (data) {
                    if (onData) {
                        data = onData(data);
                    }
                    resolve(data);
                });
            }));
        }
        return Promise.all(promises);
    }
    static loadFile(url, callback, onError = undefined) {
        var xhttp = new window.XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback(xhttp.response);
            }
        };
        if (onError) {
            xhttp.addEventListener('error', onError);
        }
        xhttp.open('GET', url, true);
        xhttp.send();
        return xhttp;
    }
    static handleCallback(callback, args) {
        if (!callback) {
            return args[0];
        }
        return callback.apply(this, args);
    }
    static downloadData(data, name) {
        var downloadableData = data;
        if (!name) {
            name = 'untitled';
        }
        return BaseUtility.download(downloadableData, name, 'text/txt');
    }
    static handlePrompt(handle, text, defaultText) {
        var value = window.prompt(text, defaultText);
        return handle(value);
    }
    static getCurrentDate() {
        var date = new Date();
        return date;
    }
    static getFormattedString(str, delimiter, lenArr) {
        if (!delimiter || !lenArr || lenArr.length === 0) {
            return str;
        }
        var returnStr = '';
        var curIndex = 0;
        for (var i = 0; i < lenArr.length; i++) {
            if (i > 0) {
                returnStr += delimiter;
            }
            returnStr += str.substr(curIndex, lenArr[i]);
            curIndex += lenArr[i];
        }
        return returnStr;
    }
    static getCurrentLocation(callback) {
        return navigator.geolocation.getCurrentPosition(function (pos) {
            callback(pos.coords.latitude, pos.coords.longitude);
        });
    }
    static loadFileInput(event, callback, options) {
        const noFilesError = () => {
            throw new Error('No files found');
        };
        var file = null;
        if (event instanceof DragEvent) {
            if (!(event.dataTransfer)) {
                return noFilesError();
            }
            let item = event.dataTransfer.files.item(0);
            if (!item) {
                return noFilesError();
            }
            file = item;
        }
        else {
            if (!(event.target instanceof HTMLInputElement)) {
                return noFilesError();
            }
            if (!event.target.files || event.target.files.length === 0) {
                return noFilesError();
            }
            file = event.target.files[0];
        }
        if (!file) {
            return noFilesError();
        }
        var reader = new window.FileReader();
        reader.addEventListener('load', (event) => {
            var data = event.target ? event.target.result : undefined;
            callback(data);
        });
        reader.addEventListener('error', (err) => {
            console.log(err);
        });
        reader[options.method](file);
        return reader;
    }
    static convertTabbedDataToArray(data, colCount) {
        var arr = [];
        var TAB = '\t';
        var LF = '\n';
        var items1 = data.split(TAB);
        var items = [];
        for (let i = 0; i < items1.length; i++) {
            const firstEndCellIndex = colCount - 1;
            const midCellColOver = (i - firstEndCellIndex) % (colCount - 1);
            const isStartCell = i === 0;
            const isLastCell = i + 1 === items1.length;
            const isFirstEndCell = !isLastCell && i === firstEndCellIndex;
            const isMidEndCell = !isLastCell && !isStartCell && !isFirstEndCell && midCellColOver === 0;
            const isMidStartCell = false;
            if (isFirstEndCell ||
                isMidEndCell) {
                const split = items1[i].split(LF);
                items.push(split[0]);
                items.push(split[1]);
            }
            else if (isMidStartCell) {
            }
            else {
                items.push(items1[i]);
            }
        }
        for (let i = 0; i < items.length; i++) {
            const x = Math.floor(i / colCount);
            const y = i % colCount;
            if (!arr[x]) {
                arr[x] = [];
            }
            arr[x][y] = items[i];
        }
        return arr;
    }
    static replaceAll(str, find, replace) {
        return str.split(find).join(replace);
    }
    static getLoadScriptHandle(src, parent) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', src);
            parent.appendChild(script);
            script.addEventListener('load', resolve);
            script.addEventListener('error', reject);
        });
    }
    static getLoadStyleSheetHandle(src, parent) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', src);
            parent.appendChild(link);
            if (link.onload !== undefined) {
                link.addEventListener('load', resolve);
                link.addEventListener('error', reject);
            }
            else {
                resolve();
            }
        });
    }
    static getLoadTemplateHandle(src, parent) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.setAttribute('rel', 'import');
            link.setAttribute('href', src);
            parent.appendChild(link);
            if (link.onload !== undefined) {
                link.addEventListener('load', resolve);
                link.addEventListener('error', reject);
            }
            else {
                resolve();
            }
        });
    }
    static loadAbstractUrls(arr, handle, options = {}) {
        const ordered = options.ordered || false;
        const parent = options.parent || document.body;
        const handles = arr.map(src => {
            return () => {
                return handle(src, parent);
            };
        });
        return BaseUtility.promiseAll(handles, ordered);
    }
    static loadDependencyUrls(arr, options = {}) {
        const handle = (src, parent) => {
            if (src.substr(-'.js'.length) === '.js') {
                return BaseUtility.getLoadScriptHandle(src, parent);
            }
            else if (src.substr(-'.css'.length) === '.css') {
                return BaseUtility.getLoadStyleSheetHandle(src, parent);
            }
            else if (src.substr(-'.html'.length) === '.html') {
                return BaseUtility.getLoadTemplateHandle(src, parent);
            }
            else {
                return Promise.reject(new Error(`Invalid extension used for source: ${src}`));
            }
        };
        return BaseUtility.loadAbstractUrls(arr, handle, options);
    }
    static loadStyleSheets(arr, optionsAbstract = {}) {
        return BaseUtility.loadAbstractUrls(arr, BaseUtility.getLoadStyleSheetHandle, optionsAbstract);
    }
    static loadScripts(arr, optionsAbstract = {}) {
        return BaseUtility.loadAbstractUrls(arr, BaseUtility.getLoadScriptHandle, optionsAbstract);
    }
    static loadScriptData(data, onLoad) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.innerHTML = data;
        script.addEventListener('load', function () {
            if (onLoad) {
                onLoad(script);
            }
        });
        document.body.appendChild(script);
        return script;
    }
    static camelCaseToArray(str) {
        var arr = [];
        var cur = null;
        for (var i = 0; i < str.length; i++) {
            if (cur === null) {
                cur = 0;
                arr[cur] = '';
            }
            if (BaseUtility.isCapitalLetter(str[i])) {
                cur++;
                arr[cur] = '';
            }
            arr[cur] += str[i].toLowerCase();
        }
        return arr;
    }
    static isCapitalLetter(char) {
        if (char && char.toUpperCase() === char) {
            return true;
        }
        else {
            return false;
        }
    }
    static capitalize(str) {
        var firstChar = str.substr(0, 1);
        var otherChars = str.substr(1) || '';
        firstChar = firstChar.toUpperCase();
        str = firstChar + otherChars;
        return str;
    }
    static getIndexOf(data, find) {
        var index = -1;
        if (typeof data === 'string' || Array.isArray(data)) {
            index = data.indexOf(find);
        }
        else {
            for (var key in data) {
                if (data[key] === find) {
                    index = key;
                    break;
                }
            }
        }
        return index;
    }
    static delimiterStringToArray(str, format) {
        var cHandle = null;
        if (format === 'camelCase') {
            cHandle = BaseUtility.camelCaseToArray;
        }
        else {
            var del = format;
            cHandle = function (str) {
                return str.split(del);
            };
        }
        return cHandle(str);
    }
    static getStringSimilarity(str1, str2) {
        if (str1 === str2) {
            return 1;
        }
        var inclusion1 = BaseUtility.getStringInclusionWeight(str1, str2);
        var inclusion2 = BaseUtility.getStringInclusionWeight(str2, str1);
        var size = BaseUtility.getNumberSimilarity(str1.length, str2.length);
        return (inclusion1 + inclusion2 + size) / 3;
    }
    static getStringInclusionWeight(str1, str2) {
        var foundStr = '';
        var cur;
        for (var i = str1.length; i >= 1; i--) {
            cur = str1.substr(0, i);
            if (str2.indexOf(cur) >= 0) {
                foundStr = cur;
                break;
            }
        }
        var weight = BaseUtility.getNumberSimilarity(foundStr.length, str2.length);
        return weight;
    }
    static getNumberSimilarity(num1, num2) {
        var max = BaseUtility.getMax(num1, num2);
        var min = BaseUtility.getMin(num1, num2);
        if (min === null || max === null) {
            throw new Error('Can get number similarity for invalid number');
        }
        var diff = max - min;
        var bounds = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);
        var signedBounds = min < 0 && max > 0 ? bounds * 2 : bounds;
        return 1 - diff / signedBounds;
    }
    static getMax(...args) {
        var max = null;
        for (var i = 0; i < args.length; i++) {
            if (max === null || args[i] > max) {
                max = args[i];
            }
        }
        return max;
    }
    static getMin(...args) {
        var min = null;
        for (var i = 0; i < args.length; i++) {
            if (min === null || args[i] < min) {
                min = args[i];
            }
        }
        return min;
    }
    static removeNonCharacters(str) {
        var returnStr = str;
        returnStr = returnStr.trim();
        returnStr = BaseUtility.replaceAll(returnStr, ' ', '');
        returnStr = BaseUtility.replaceAll(returnStr, '\t', '');
        returnStr = BaseUtility.replaceAll(returnStr, '\n', '');
        returnStr = BaseUtility.replaceAll(returnStr, '\r', '');
        return returnStr;
    }
    static isNativeFunction(func) {
        var str = func.toString();
        var trimmedStr = BaseUtility.removeNonCharacters(str);
        var expected = '{[nativecode]}';
        return trimmedStr.substr(-expected.length, expected.length) === expected;
    }
    static buildFunctionModule(funcs) {
        var str = '';
        var func;
        for (var i = 0; i < funcs.length; i++) {
            func = funcs[i];
            if (!BaseUtility.isNativeFunction(func)) {
                str += func.toString();
            }
        }
        return str;
    }
    static isLogFunction(func) {
        var logFunctions = [window.alert];
        if (window.console) {
            logFunctions = logFunctions.concat([
                console.info,
                console.log,
                console.error,
                console.warn
            ]);
        }
        return logFunctions.indexOf(func) >= 0;
    }
    static getStackInfo() {
        var info = {
            error: null,
            stack: '',
            function: null,
            stackParts: [],
            lineNumber: null,
            columnNumber: null
        };
        info.error = new Error();
        info.stack = info.error.stack ? info.error.stack : '';
        if (info.stack.substr(0, 'Error'.length) === 'Error') {
            var s = info.stack;
            var lines = s.split('\n');
            lines.forEach(function (line, key) {
                key = Number(key);
                if (key === 0) {
                    return;
                }
                var stackPart = {
                    function: '',
                    lineNumber: null,
                    columnNumber: null
                };
                var startIndex = line.indexOf('at') + 'at '.length;
                var lineInfo = line.substr(startIndex);
                var parts = lineInfo.split(' ');
                if (parts.length === 1) {
                    parts.unshift('');
                }
                var detailsParts = parts[1].split(':');
                var columnNumber = detailsParts[2].split(')')[0];
                stackPart.function = parts[0];
                stackPart.lineNumber = Number(detailsParts[1]);
                stackPart.columnNumber = Number(columnNumber);
                if (key === 1) {
                    info.function = (stackPart.function) ? stackPart.function : '';
                    info.lineNumber = stackPart.lineNumber;
                    info.columnNumber = stackPart.columnNumber;
                }
                info.stackParts.push(stackPart);
            });
        }
        return info;
    }
    static loopClassFunctions(classInstance, onFunction) {
        BaseUtility.loopClass(classInstance, (name) => {
            if (typeof classInstance[name] === 'function') {
                onFunction(classInstance[name], name, classInstance);
            }
        });
    }
    static loopClassProperties(classInstance, onProperty) {
        BaseUtility.loopClass(classInstance, (name) => {
            if (typeof classInstance[name] !== 'function') {
                onProperty(classInstance[name], name, classInstance);
            }
        });
    }
    static loopClass(classInstance, onVariable) {
        for (let obj = classInstance; obj; obj = Object.getPrototypeOf(obj)) {
            if (typeof obj !== 'object') {
                console.warn('type is not object. Check that static class was not passed.');
                continue;
            }
            if (obj.constructor === window.Object) {
                continue;
            }
            for (let names = Object.getOwnPropertyNames(obj), i = 0; i < names.length; i++) {
                let name = names[i];
                if (name === 'constructor') {
                    continue;
                }
                onVariable(name);
            }
        }
    }
    static loopStaticClassMethods() {
    }
    static bindClassThis(classInstance) {
        BaseUtility.loopClassFunctions(classInstance, (value, name) => {
            const variable = classInstance[name];
            classInstance[name] = variable.bind(classInstance);
        });
    }
    static applyStaticFunctions(classInstance, constructor) {
        const staticFunctions = BaseUtility.getStaticFunctions(constructor);
        for (let key in staticFunctions) {
            classInstance[key] = staticFunctions[key];
        }
    }
    static getStaticFunctionNames(constructor) {
        return Object.getOwnPropertyNames(constructor)
            .filter(prop => Object.prototype.hasOwnProperty.call(constructor, prop) && typeof constructor[prop] === 'function');
    }
    static getStaticFunctions(constructor) {
        const names = BaseUtility.getStaticFunctionNames(constructor);
        return Object.fromEntries(names.map(name => {
            return [name, constructor[name]];
        }));
    }
    static reduceObjectArray(objArr) {
        const returnObj = {};
        for (let i = 0; i < objArr.length; i++) {
            let obj = objArr[i];
            for (let key in obj) {
                if (returnObj[key] === undefined) {
                    returnObj[key] = 0;
                }
                returnObj[key] += obj[key];
            }
        }
        return returnObj;
    }
    static waitFor(condition, pollInterval = 50) {
        if (condition()) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            let id;
            const onEnd = () => {
                window.clearInterval(id);
                resolve();
            };
            id = window.setInterval(() => {
                if (condition()) {
                    onEnd();
                }
            }, pollInterval);
        });
    }
    static sleep(ms) {
        return new Promise(resolve => {
            window.setTimeout(resolve, ms);
        });
    }
    static handleEvent(events, name, data = undefined, options = {}) {
        const handleData = events[name];
        const spreadArgs = !!options.spreadArgs || false;
        const args = (spreadArgs && Array.isArray(data)) ? [...data] : [data];
        if (!handleData) {
            return null;
        }
        else if (typeof handleData === 'function') {
            return handleData(...args);
        }
        else if (Array.isArray(handleData)) {
            const returnValues = handleData.map(handle => {
                return handle(...args);
            });
            return returnValues;
        }
        else {
            return null;
        }
    }
    static mergeEventsObject(events1, events2) {
        const events = {};
        const forceArray = val => {
            if (!val) {
                val = [];
            }
            if (!Array.isArray(val)) {
                val = [val];
            }
            return val;
        };
        const mergeEvents = (from, to) => {
            for (let key in from) {
                const fromEvents = forceArray(from[key]);
                to[key] = forceArray(to[key]);
                fromEvents.forEach(event => [
                    to[key].push(event)
                ]);
            }
        };
        mergeEvents(events1, events);
        mergeEvents(events2, events);
        return events;
    }
    static urlToBlob(url) {
        return new Promise((resolve, reject) => {
            if (url.substr(0, 'data:'.length) === 'data:' &&
                window.ArrayBuffer &&
                window.Uint8Array) {
                const byteString = window.atob(url.split(',')[1]);
                const mimeString = url
                    .split(',')[0]
                    .split(':')[1]
                    .split(';')[0];
                const arrayBuffer = new window.ArrayBuffer(byteString.length);
                const intArray = new window.Uint8Array(arrayBuffer);
                for (let i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }
                const blob = new window.Blob([arrayBuffer], {
                    type: mimeString
                });
                return resolve(blob);
            }
            try {
                const xhr = new window.XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.onerror = function (err) {
                    reject(err);
                };
                xhr.onload = function () {
                    const OK = 200;
                    if (xhr.status === OK) {
                        resolve(xhr.response);
                    }
                    else {
                        reject(new Error('xhr status error:' + xhr.statusText));
                    }
                };
                xhr.send();
            }
            catch (err) {
                reject(err.message);
            }
        });
    }
    static timeout(promise, ms) {
        return new Promise((resolve, reject) => {
            const onEnd = data => {
                resolve(data);
            };
            const onTimeout = () => {
                reject(new Error('timed out'));
            };
            promise.then(onEnd);
            BaseUtility.sleep(ms).then(onTimeout);
        });
    }
    static getPromisesByState(promises, resolved = false) {
        const checkPromise = promise => {
            return new Promise(resolve => {
                let bool = false;
                promise.then(() => {
                    bool = true;
                });
                window.setTimeout(() => {
                    resolve(bool);
                }, 1);
            });
        };
        const checkPromises = promises.map(promise => checkPromise(promise));
        return Promise.all(checkPromises).then(boolArr => {
            const resolvedPromises = [];
            boolArr.forEach((bool, index) => {
                if (resolved === bool) {
                    resolvedPromises.push(promises[index]);
                }
            });
            return resolvedPromises;
        });
    }
    static promiseAll(arr, ordered = false) {
        if (ordered) {
            if (arr.length === 0) {
                Promise.resolve([]);
            }
            const responses = [];
            let p = Promise.resolve([]);
            arr.forEach((handle, index) => {
                p = p.then(handle).then(response => {
                    responses[index] = response;
                });
            });
            return (p.then(() => {
                return responses;
            }));
        }
        else {
            const promises = [];
            arr.forEach(handle => {
                const promise = handle();
                promises.push(promise);
            });
            return Promise.all(promises);
        }
    }
    static createDataURI(data, mimeType = 'text/plain', options = {}) {
        data = window.btoa(data);
        let str = 'data:';
        str += `${mimeType};`;
        for (let key in options) {
            str += `${key}=${options[key]};`;
        }
        str += 'base64,';
        str += `${data}`;
        return str;
    }
    static compare(a, b, comparator = '=') {
        switch (comparator) {
            case '=':
                return a === b;
            case '<':
                return a < b;
            case '<=':
                return a <= b;
            case '>':
                return a > b;
            case '>=':
                return a >= b;
            default:
                return false;
        }
    }
    static isMinimzed(str) {
        const ranges = [{
                key: 'VERY_LIKELY',
                val: 2
            },
            {
                key: 'LIKELY',
                val: 5
            },
            {
                key: 'PROBABLY',
                val: 10
            },
            {
                key: 'MAYBE',
                val: 15
            },
            {
                key: 'UNLIKELY',
                val: Infinity
            }
        ];
        const HIGHEST_TRUE_INDEX = 1;
        const getCount = (src, find) => {
            return src.split(find).length - 1;
        };
        const wsCount = getCount(str, ' ');
        const charCount = str.length;
        const percentage = (wsCount / charCount) * 100;
        let firstPassIndex = null;
        ranges.forEach((range, index) => {
            if (firstPassIndex !== null) {
                return;
            }
            if (percentage < range.val) {
                firstPassIndex = index;
            }
        });
        const level = (firstPassIndex !== null) ? ranges[Number(firstPassIndex)].key : 'UNLIKELY';
        const bool = (firstPassIndex !== null) ? firstPassIndex <= HIGHEST_TRUE_INDEX : false;
        const returnObject = {
            percentage: percentage,
            level: level,
            bool: bool
        };
        return returnObject;
    }
    static watchForHashValue(value, func) {
        const getUrlHash = (url) => {
            let hashStr = (new window.URL(url)).hash;
            return (hashStr.length > 0) ? hashStr.substr(1) : '';
        };
        const check = (url) => {
            if (getUrlHash(url) === value) {
                func();
            }
        };
        check(window.location.href);
        window.addEventListener('hashchange', function (event) {
            check(event.newURL);
        });
    }
    static scanString(string, checker) {
        const resultsArray = [];
        const length = string.length;
        let status = stringPosition();
        let index = 0;
        for (; index <= length; index++) {
            let char = string[index];
            let bool = checker(char, status);
            if (bool) {
                resultsArray.push(status);
                status = stringPosition();
            }
        }
        if (status.startIndex !== -1) {
            status.endIndex = index;
            resultsArray.push(status);
        }
        return resultsArray;
    }
    static replaceStringIndexes(string, indexes = [], sortRequired = true) {
        const VALUE_KEY = 0;
        const START_INDEX_KEY = 1;
        const END_INDEX_KEY = 2;
        if (sortRequired) {
            indexes.sort((a, b) => {
                if (a[START_INDEX_KEY] < b[START_INDEX_KEY]) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
        }
        const length = indexes.length;
        let curEndIndex = 0;
        let replacedString = '';
        for (let i = 0; i < length; i++) {
            const indexInfo = indexes[i];
            const startIndex = indexInfo[START_INDEX_KEY];
            const endIndex = indexInfo[END_INDEX_KEY];
            const value = indexInfo[VALUE_KEY];
            replacedString += string.substring(startIndex, endIndex) + value;
            curEndIndex = endIndex;
        }
        if (curEndIndex < string.length) {
            replacedString += string.substr(curEndIndex);
        }
        return replacedString;
    }
    static replaceAt(string, replacer, startIndex, endIndex) {
        return string.substring(0, startIndex) + replacer + string.substring(endIndex);
    }
    static generateRandomString(length = 0) {
        let string = '';
        var allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            string += allowed.charAt(Math.floor(Math.random() * allowed.length));
        }
        return string;
    }
    static fixPageAnchorTagSecurity() {
        const anchorList = [...Array.from(document.querySelectorAll('a'))];
        anchorList.forEach(a => {
            BaseUtility.setSpaceDelimitedElementAttribute(a, 'rel', ['noopener', 'noreferrer']);
        });
    }
    static setSpaceDelimitedElementAttribute(element, attribute, values = []) {
        let attributeValues = BaseUtility.failOnFalsy(element.getAttribute(attribute)).split(' ');
        values.forEach(value => {
            if (!attributeValues.includes(value)) {
                attributeValues.push(value);
            }
        });
        element.setAttribute(attribute, attributeValues.join(' '));
    }
    static preventSubmit(form) {
        form.addEventListener('submit', ev => { ev.preventDefault(); });
    }
    static replaceAt2(string, fromIndex, length, replacement) {
        const START_INDEX = 0;
        const beforeLength = fromIndex;
        const before = string.substr(START_INDEX, beforeLength);
        const after = string.substr(fromIndex + length);
        return `${before}${replacement}${after}`;
    }
    static failOnFalsy(value) {
        if (!value) {
            throw new Error(`Unallowed falsy value`);
        }
        return value;
    }
    static toTemplate(html = '') {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template;
    }
    static stringIncludesAttribute(text, name, value) {
        text = text.split(' ').join('');
        return text.includes(`${name}="${value}"`);
    }
    static removeSubstringRanges(text, ranges = []) {
        const START_INDEX = 0;
        const END_INDEX = 1;
        ranges.forEach(range => {
            let startIndex = range[START_INDEX];
            let endIndex = range[END_INDEX];
            let { length } = text.substring(startIndex, endIndex);
            text = text.slice(startIndex, length);
        });
        return text;
    }
    static setupCustomElement(customElement, options = {}) {
        const DEFAULT_RENDERER = (string) => string;
        const renderer = options.renderer || DEFAULT_RENDERER;
        const htmlData = options.htmlData || {};
        customElement.rawTemplate = options.html || '';
        customElement.htmlData = htmlData;
        customElement.html = renderer(customElement.rawTemplate, customElement.htmlData);
        customElement.attachShadow({
            mode: 'open'
        });
        customElement.element = customElement.shadowRoot;
        customElement.css = options.css || '';
        const styleTag = customElement.css ? `<style>${customElement.css}</style>` : '';
        if (customElement.shadowRoot) {
            customElement.shadowRoot.innerHTML = `${styleTag}${customElement.html}`;
        }
    }
    static capitalizeFirstLetter(item) {
        const capitalizeFirstIndex = (char, index) => {
            const FIRST_INDEX = 0;
            return index === FIRST_INDEX ? char.toUpperCase() : char;
        };
        return item.split('').map(capitalizeFirstIndex).join('');
    }
    static delimitedArrayToReadableStringMap(array, delimiter = '-') {
        const object = {};
        array.forEach(item => {
            const key = item;
            item = BaseUtility.capitalizeFirstLetter(item);
            const parts = item.split(delimiter);
            const value = parts.join(' ');
            object[key] = value;
        });
        return object;
    }
}
module.exports = BaseUtility;
