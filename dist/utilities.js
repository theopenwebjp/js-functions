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
export function getWrappedStrings(str, wrapperOpen, wrapperClose, keepWrapper = false, useClosingTagEnd = false) {
    const strings = [];
    const status = {
        currentString: '',
        inWrap: false
    };
    let i = 0;
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
export function asyncCheck(callback) {
    const ms = Math.ceil(Math.random() * 10);
    window.setTimeout(function () {
        const returnVal = 'check ok';
        callback(returnVal);
    }, ms);
}
export function promisify(handle, args, resolveIndex) {
    const oldHandle = handle;
    const oldCallback = args[resolveIndex];
    const promise = new Promise((resolve) => {
        args[resolveIndex] = function (...args) {
            resolve(...args);
        };
        oldHandle(...args);
    });
    promise.then((successValue) => {
        oldCallback(successValue);
    });
    return promise;
}
export function asyncHandler(arr, onEnd) {
    const status = {
        current: 0,
        total: arr.length,
        returned: []
    };
    const handle = function () {
        const item = arr[status.current];
        if (!item) {
            onEnd(status.returned);
            return false;
        }
        const index = status.current;
        item.index = index;
        item.args[item.callbackParamIndex] = function () {
            status.returned[index] = arguments;
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
export function equals(a, b) {
    if (Number.isNaN(a)) {
        return Number.isNaN(b);
    }
    else {
        return a === b;
    }
}
export function arrayEquals(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (!equals(a[i], b[i])) {
            return false;
        }
    }
    return true;
}
export function exists(data) {
    return !(data === null || data === undefined);
}
export function buildMediaQuery(dimensions) {
    const d = dimensions;
    const parts = [];
    if (exists(d.width) && exists(d.width.min)) {
        parts.push('min-width: ' + d.width.min + 'px');
    }
    if (exists(d.width) && exists(d.width.max)) {
        parts.push('max-width: ' + d.width.max + 'px');
    }
    if (exists(d.height) && exists(d.height.min)) {
        parts.push('min-height: ' + d.height.min + 'px');
    }
    if (exists(d.height) && exists(d.height.max)) {
        parts.push('max-height: ' + d.height.max + 'px');
    }
    let query = '';
    for (let i = 0; i < parts.length; i++) {
        if (i > 0) {
            query += ' AND ';
        }
        query += '(' + parts[i] + ')';
    }
    return query;
}
export function promptPrint() {
    window.print();
}
export function log(data, options = undefined) {
    if (!options) {
        options = logOptions();
    }
    if (!window.console) {
        return false;
    }
    let type = 'log';
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
export function getDataUrlExtension(dataUrl) {
    return dataUrl.split(';')[0].split('/')[1];
}
export function download(data, name, mimeType) {
    const blob = new window.Blob([data], {
        type: mimeType
    });
    return downloadBlob(blob, name);
}
export function downloadCurrentPage() {
    const data = document.documentElement.innerHTML;
    const fileName = getFileName(window.location.href);
    return download(data, fileName, 'text/html');
}
export function getFileName(url) {
    const f = failOnFalsy;
    const noFragment = f(url.split('#')).shift() || '';
    const noArguments = f(noFragment.split('?')).shift() || '';
    const onlyLastRoute = f(noArguments.split('/')).pop() || '';
    return onlyLastRoute;
}
export function getFileExtension(url) {
    const parts = url.split('.');
    const ext = parts[parts.length - 1] || '';
    return ext;
}
export function downloadDataUrl(dataUrl, name) {
    const url = dataUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    const extension = getDataUrlExtension(dataUrl);
    const fullName = name + '.' + extension;
    downloadLink(url, fullName);
}
export function downloadBlob(blob, name) {
    const url = window.URL.createObjectURL(blob);
    let extension;
    if (blob.type) {
        extension = blob.type.split('/')[1];
    }
    else {
        extension = 'txt';
    }
    const fullName = name + '.' + extension;
    const n = (navigator);
    if (n.msSaveBlob) {
        n.msSaveBlob(blob, fullName);
    }
    else {
        downloadLink(url, fullName);
    }
    return true;
}
export function downloadBlobURL(blobURL, name = 'data') {
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = name;
    link.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
}
export function downloadLink(url, fullName) {
    const link = window.document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = fullName;
    document.body.appendChild(link);
    link.click();
    if (link.parentElement) {
        link.parentElement.removeChild(link);
    }
}
export function toObject(data, onError = undefined) {
    let obj = {};
    try {
        const tempObj = parseJson(data);
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
export function parseFuzzyJson(str) {
    let obj;
    obj = parseJson(str);
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
export function parseJson(str) {
    if (!window.JSON) {
        return null;
    }
    try {
        const json = JSON.parse(str);
        return json;
    }
    catch (err) {
        return null;
    }
}
export function stringifyJson(jsonObj) {
    if (!window.JSON) {
        return null;
    }
    try {
        const str = JSON.stringify(jsonObj);
        return str;
    }
    catch (err) {
        return null;
    }
}
export function loadFiles(urls, onData) {
    const promises = [];
    for (let i = 0; i < urls.length; i++) {
        promises.push(new Promise(function (resolve) {
            loadFile(urls[i], function (data) {
                if (onData) {
                    data = onData(data);
                }
                resolve(data);
            });
        }));
    }
    return Promise.all(promises);
}
export function loadFile(url, callback, onError = undefined) {
    const xhttp = new window.XMLHttpRequest();
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
export function handleCallback(callback, args) {
    if (!callback) {
        return args[0];
    }
    return callback.apply(this, args);
}
export function downloadData(data, name) {
    const downloadableData = data;
    if (!name) {
        name = 'untitled';
    }
    return download(downloadableData, name, 'text/txt');
}
export function handlePrompt(handle, text, defaultText) {
    const value = window.prompt(text, defaultText);
    return handle(value);
}
export function getCurrentDate() {
    const date = new Date();
    return date;
}
export function getFormattedString(str, delimiter, lenArr) {
    if (!delimiter || !lenArr || lenArr.length === 0) {
        return str;
    }
    let returnStr = '';
    let curIndex = 0;
    for (let i = 0; i < lenArr.length; i++) {
        if (i > 0) {
            returnStr += delimiter;
        }
        returnStr += str.substr(curIndex, lenArr[i]);
        curIndex += lenArr[i];
    }
    return returnStr;
}
export function getCurrentLocation(callback) {
    return navigator.geolocation.getCurrentPosition(function (pos) {
        callback(pos.coords.latitude, pos.coords.longitude);
    });
}
export function loadFileInput(event, callback, options) {
    const noFilesError = () => {
        throw new Error('No files found');
    };
    let file = null;
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
    const reader = new window.FileReader();
    reader.addEventListener('load', (event) => {
        const data = event.target ? event.target.result : undefined;
        callback(data);
    });
    reader.addEventListener('error', (err) => {
        console.log(err);
    });
    reader[options.method](file);
    return reader;
}
export function convertTabbedDataToArray(data, colCount) {
    const arr = [];
    const TAB = '\t';
    const LF = '\n';
    const items1 = data.split(TAB);
    const items = [];
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
export function replaceAll(str, find, replace) {
    return str.split(find).join(replace);
}
export function getLoadScriptHandle(src, parent) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', src);
        parent.appendChild(script);
        script.addEventListener('load', resolve);
        script.addEventListener('error', reject);
    });
}
export function getLoadStyleSheetHandle(src, parent) {
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
            resolve(new Event('error'));
        }
    });
}
export function getLoadTemplateHandle(src, parent) {
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
            resolve(new Event('error'));
        }
    });
}
export function loadAbstractUrls(arr, handle, options = {}) {
    const ordered = options.ordered || false;
    const parent = options.parent || document.body;
    const handles = arr.map(src => {
        return () => {
            return handle(src, parent);
        };
    });
    return promiseAll(handles, ordered);
}
export function loadDependencyUrls(arr, options = {}) {
    const handle = (src, parent) => {
        if (src.substr(-'.js'.length) === '.js') {
            return getLoadScriptHandle(src, parent);
        }
        else if (src.substr(-'.css'.length) === '.css') {
            return getLoadStyleSheetHandle(src, parent);
        }
        else if (src.substr(-'.html'.length) === '.html') {
            return getLoadTemplateHandle(src, parent);
        }
        else {
            return Promise.reject(new Error(`Invalid extension used for source: ${src}`));
        }
    };
    return loadAbstractUrls(arr, handle, options);
}
export function loadStyleSheets(arr, optionsAbstract = {}) {
    return loadAbstractUrls(arr, getLoadStyleSheetHandle, optionsAbstract);
}
export function loadScripts(arr, optionsAbstract = {}) {
    return loadAbstractUrls(arr, getLoadScriptHandle, optionsAbstract);
}
export function loadScriptData(data, onLoad) {
    const script = document.createElement('script');
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
export function camelCaseToArray(str) {
    const arr = [];
    let cur = null;
    for (let i = 0; i < str.length; i++) {
        if (cur === null) {
            cur = 0;
            arr[cur] = '';
        }
        if (isCapitalLetter(str[i])) {
            cur++;
            arr[cur] = '';
        }
        arr[cur] += str[i].toLowerCase();
    }
    return arr;
}
export function isCapitalLetter(char) {
    if (char && char.toUpperCase() === char) {
        return true;
    }
    else {
        return false;
    }
}
export function capitalize(str) {
    let firstChar = str.substr(0, 1);
    const otherChars = str.substr(1) || '';
    firstChar = firstChar.toUpperCase();
    str = firstChar + otherChars;
    return str;
}
export function getIndexOf(data, find) {
    let index = -1;
    if (typeof data === 'string' || Array.isArray(data)) {
        index = data.indexOf(find);
    }
    else {
        for (let key in data) {
            if (data[key] === find) {
                index = key;
                break;
            }
        }
    }
    return index;
}
export function delimiterStringToArray(str, format) {
    let cHandle = null;
    if (format === 'camelCase') {
        cHandle = camelCaseToArray;
    }
    else {
        const del = format;
        cHandle = function (str) {
            return str.split(del);
        };
    }
    return cHandle(str);
}
export function getStringSimilarity(str1, str2) {
    if (str1 === str2) {
        return 1;
    }
    const inclusion1 = getStringInclusionWeight(str1, str2);
    const inclusion2 = getStringInclusionWeight(str2, str1);
    const size = getNumberSimilarity(str1.length, str2.length);
    return (inclusion1 + inclusion2 + size) / 3;
}
export function getStringInclusionWeight(str1, str2) {
    let foundStr = '';
    let cur;
    for (let i = str1.length; i >= 1; i--) {
        cur = str1.substr(0, i);
        if (str2.indexOf(cur) >= 0) {
            foundStr = cur;
            break;
        }
    }
    const weight = getNumberSimilarity(foundStr.length, str2.length);
    return weight;
}
export function getNumberSimilarity(num1, num2) {
    const max = getMax(num1, num2);
    const min = getMin(num1, num2);
    if (min === null || max === null) {
        throw new Error('Can get number similarity for invalid number');
    }
    const diff = max - min;
    const bounds = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min);
    const signedBounds = min < 0 && max > 0 ? bounds * 2 : bounds;
    return 1 - diff / signedBounds;
}
export function getMax(...args) {
    let max = null;
    for (let i = 0; i < args.length; i++) {
        if (max === null || args[i] > max) {
            max = args[i];
        }
    }
    return max;
}
export function getMin(...args) {
    let min = null;
    for (let i = 0; i < args.length; i++) {
        if (min === null || args[i] < min) {
            min = args[i];
        }
    }
    return min;
}
export function removeNonCharacters(str) {
    let returnStr = str;
    returnStr = returnStr.trim();
    returnStr = replaceAll(returnStr, ' ', '');
    returnStr = replaceAll(returnStr, '\t', '');
    returnStr = replaceAll(returnStr, '\n', '');
    returnStr = replaceAll(returnStr, '\r', '');
    return returnStr;
}
export function isNativeFunction(func) {
    const str = func.toString();
    const trimmedStr = removeNonCharacters(str);
    const expected = '{[nativecode]}';
    return trimmedStr.substr(-expected.length, expected.length) === expected;
}
export function buildFunctionModule(funcs) {
    let str = '';
    let func;
    for (let i = 0; i < funcs.length; i++) {
        func = funcs[i];
        if (!isNativeFunction(func)) {
            str += func.toString();
        }
    }
    return str;
}
export function isLogFunction(func) {
    let logFunctions = [window.alert];
    if (window.console) {
        logFunctions = logFunctions.concat([
            console.trace,
            console.debug,
            console.info,
            console.log,
            console.error,
            console.warn
        ]);
    }
    return logFunctions.indexOf(func) >= 0;
}
export function getStackInfo() {
    const info = {
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
        const s = info.stack;
        const lines = s.split('\n');
        lines.forEach(function (line, key) {
            key = Number(key);
            if (key === 0) {
                return;
            }
            const stackPart = {
                function: '',
                lineNumber: null,
                columnNumber: null
            };
            const startIndex = line.indexOf('at') + 'at '.length;
            const lineInfo = line.substr(startIndex);
            const parts = lineInfo.split(' ');
            if (parts.length === 1) {
                parts.unshift('');
            }
            const detailsParts = parts[1].split(':');
            const columnNumber = detailsParts[2].split(')')[0];
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
export function loopClassFunctions(classInstance, onFunction) {
    loopClass(classInstance, (name) => {
        if (typeof classInstance[name] === 'function') {
            onFunction(classInstance[name], name, classInstance);
        }
    });
}
export function loopClassProperties(classInstance, onProperty) {
    loopClass(classInstance, (name) => {
        if (typeof classInstance[name] !== 'function') {
            onProperty(classInstance[name], name, classInstance);
        }
    });
}
export function loopClass(classInstance, onVariable) {
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
export function loopStaticClassMethods() {
}
export function bindClassThis(classInstance) {
    loopClassFunctions(classInstance, (value, name) => {
        const variable = classInstance[name];
        classInstance[name] = variable.bind(classInstance);
    });
}
export function applyStaticFunctions(classInstance, constructor) {
    const staticFunctions = getStaticFunctions(constructor);
    for (let key in staticFunctions) {
        classInstance[key] = staticFunctions[key];
    }
}
export function getStaticFunctionNames(constructor) {
    return Object.getOwnPropertyNames(constructor)
        .filter(prop => Object.prototype.hasOwnProperty.call(constructor, prop) && typeof constructor[prop] === 'function');
}
export function getStaticFunctions(constructor) {
    const names = getStaticFunctionNames(constructor);
    return Object.fromEntries(names.map(name => {
        return [name, constructor[name]];
    }));
}
export function reduceObjectArray(objArr) {
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
export function waitFor(condition, pollInterval = 50) {
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
export function sleep(ms) {
    return new Promise(resolve => {
        window.setTimeout(resolve, ms);
    });
}
export function handleEvent(events, name, data = undefined, options = {}) {
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
export function mergeEventsObject(events1, events2) {
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
export function urlToBlob(url) {
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
            reject((err).message);
        }
    });
}
export function timeout(promise, ms) {
    return new Promise((resolve, reject) => {
        const onEnd = data => {
            resolve(data);
        };
        const onTimeout = () => {
            reject(new Error('timed out'));
        };
        promise.then(onEnd);
        sleep(ms).then(onTimeout);
    });
}
export function getPromisesByState(promises, resolved = false) {
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
export function promiseAll(arr, ordered = false) {
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
export function createDataURI(data, mimeType = 'text/plain', options = {}) {
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
export function compare(a, b, comparator = '=') {
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
export function isMinimzed(str) {
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
export function watchForHashValue(value, func) {
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
export function scanString(string, checker) {
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
export function replaceStringIndexes(string, indexes = [], sortRequired = true) {
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
export function replaceAt(string, replacer, startIndex, endIndex) {
    return string.substring(0, startIndex) + replacer + string.substring(endIndex);
}
export function generateRandomString(length = 0) {
    let string = '';
    const allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        string += allowed.charAt(Math.floor(Math.random() * allowed.length));
    }
    return string;
}
export function fixPageAnchorTagSecurity() {
    const anchorList = [...Array.from(document.querySelectorAll('a'))];
    anchorList.forEach(a => {
        setSpaceDelimitedElementAttribute(a, 'rel', ['noopener', 'noreferrer']);
    });
}
export function setSpaceDelimitedElementAttribute(element, attribute, values = []) {
    let attributeValues = failOnFalsy(element.getAttribute(attribute)).split(' ');
    values.forEach(value => {
        if (!attributeValues.includes(value)) {
            attributeValues.push(value);
        }
    });
    element.setAttribute(attribute, attributeValues.join(' '));
}
export function preventSubmit(form) {
    form.addEventListener('submit', ev => { ev.preventDefault(); });
}
export function replaceAt2(string, fromIndex, length, replacement) {
    const START_INDEX = 0;
    const beforeLength = fromIndex;
    const before = string.substr(START_INDEX, beforeLength);
    const after = string.substr(fromIndex + length);
    return `${before}${replacement}${after}`;
}
export function toTemplate(html = '') {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
}
export function stringIncludesAttribute(text, name, value) {
    text = text.split(' ').join('');
    return text.includes(`${name}="${value}"`);
}
export function removeSubstringRanges(text, ranges = []) {
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
export function setupCustomElement(customElement, options = {}) {
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
export function capitalizeFirstLetter(item) {
    const capitalizeFirstIndex = (char, index) => {
        const FIRST_INDEX = 0;
        return index === FIRST_INDEX ? char.toUpperCase() : char;
    };
    return item.split('').map(capitalizeFirstIndex).join('');
}
export function delimitedArrayToReadableStringMap(array, delimiter = '-') {
    const object = {};
    array.forEach(item => {
        const key = item;
        item = capitalizeFirstLetter(item);
        const parts = item.split(delimiter);
        const value = parts.join(' ');
        object[key] = value;
    });
    return object;
}
export function combineObjects(args) {
    args = [...args];
    return Object.assign({}, ...args);
}
import * as BaseObjectHelper from './object-helpers.js';
export function dataEquals(a, b) {
    if (BaseObjectHelper.isCommonObject(a) && BaseObjectHelper.isCommonObject(b)) {
        return objectDataEquals(a, b);
    }
    else {
        return equals(a, b);
    }
}
export function objectDataEquals(a, b, looped = []) {
    if (!arrayEquals(Object.keys(a), Object.keys(b))) {
        return false;
    }
    for (let key in a) {
        if (BaseObjectHelper.isCommonObject(a[key])) {
            if (looped.indexOf(a[key]) >= 0) {
                continue;
            }
            looped.push(a[key]);
        }
        if (typeof a[key] !== typeof b[key]) {
            return false;
        }
        if (BaseObjectHelper.isCommonObject(a[key])) {
            if (!objectDataEquals(a[key], b[key], looped)) {
                return false;
            }
        }
        else {
            if (!equals(a[key], b[key])) {
                return false;
            }
        }
    }
    return true;
}
export function cleverSlice(arr, from, to) {
    if (!exists(from)) {
        from = 0;
    }
    if (!exists(to)) {
        return arr.slice(from);
    }
    else {
        return arr.slice(from, to + 1);
    }
}
export function getArguments(args, from, to) {
    const argsObj = Array.prototype.slice.call(args);
    return cleverSlice(argsObj, from, to);
}
export function dataInArray(data, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (dataEquals(data, arr[i])) {
            return true;
        }
    }
    return false;
}
export function copyVariable(variable, keepReferences = false) {
    let copy = null;
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
export function createMultiple(variable, count, keepReferences = false) {
    const arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(copyVariable(variable, keepReferences));
    }
    return arr;
}
export function toReadableString(data) {
    let str = '';
    if (BaseObjectHelper.isObject(data)) {
        str = BaseObjectHelper.objectToReadableString(data);
    }
    else {
        str = String(data);
    }
    return str;
}
export function exportData(data) {
    const str = toReadableString(data);
    return window.prompt('', str);
}
export function getSimilarity(var1, var2) {
    if (var1 === var2) {
        return 1;
    }
    else if (typeof var1 === 'number' && typeof var2 === 'number') {
        return getNumberSimilarity(var1, var2);
    }
    else {
        var1 = toReadableString(var1);
        var2 = toReadableString(var2);
    }
    return getStringSimilarity(var1, var2);
}
export function getDataSet(data) {
    if (!BaseObjectHelper.isObject(data)) {
        return {};
    }
    return data;
}
export function executeAjax(dataSet, url, options) {
    if (BaseObjectHelper.isObject(options)) {
    }
    if (!url) {
        return handleAjaxResponse(new window.XMLHttpRequest(), options);
    }
    const contentEncoding = 'gzip';
    const contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    const params = getAjaxParams(dataSet);
    const xhr = new window.XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Encoding', contentEncoding);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.onload = function () {
        handleAjaxResponse(xhr, options);
    };
    xhr.onerror = function () {
        handleAjaxResponse(xhr, options);
    };
    return xhr.send(params);
}
export function getAjaxParams(obj) {
    let params = '';
    let i = 0;
    for (let key in obj) {
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
export function handleAjaxResponse(xhr, options) {
    if (xhr && xhr.readyState !== xhr.DONE) {
        return false;
    }
    let callback = null;
    if (BaseObjectHelper.isObject(options)) {
        if (options.callback !== undefined) {
            callback = options.callback;
        }
    }
    let response = false;
    if (xhr) {
        response = xhr.response;
    }
    return (callback !== null) ? handleCallback(callback, [response, xhr]) : null;
}
export function polyfill(object, polyfillMap) {
    for (const key in polyfillMap) {
        const value = polyfillMap[key];
        if (!object['prototype'][key]) {
            object['prototype'][key] = value;
        }
    }
}
export function failOnFalsy(value) {
    if (!value) {
        throw new Error(`${value} expected to be non-falsy failed check.`);
    }
    return (value);
}
export const traverseObject = (o, onProperty) => {
    for (const k in o) {
        onProperty(o, k);
        const v = o[k];
        if (v && typeof v === 'object') {
            traverseObject(v, onProperty);
        }
    }
};
export function createObjectKeyObserver(object, keys = []) {
    const handler = {
        set(target, key, value) {
            if (keys.includes(String(key))) {
                console.log(`Setting value ${String(key)} as ${value}`);
                try {
                    throw new Error('Error for catching stack');
                }
                catch (error) {
                    console.log('Stack', error);
                }
                target[key] = value;
            }
            return true;
        }
    };
    return new Proxy(object, handler);
}
export function observeObjectKeys(object, key) {
    function watch(prop, handler) {
        const obj = this;
        let currentVal = obj[prop];
        const getter = function () {
            return currentVal;
        };
        const setter = function (val) {
            return currentVal = handler.call(obj, prop, currentVal, val);
        };
        if (delete obj[prop]) {
            Object.defineProperty(obj, prop, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
    if (!('watch' in Object.prototype)) {
        Object.defineProperty(Object.prototype, 'watch', {
            enumerable: false,
            configurable: true,
            writable: false,
            value: watch
        });
    }
    function unwatch(prop) {
        const obj = this;
        const p = (prop);
        const val = obj[p];
        delete obj[p];
        obj[p] = val;
    }
    if (!('unwatch' in Object.prototype)) {
        Object.defineProperty(Object.prototype, 'unwatch', {
            enumerable: false,
            configurable: true,
            writable: false,
            value: unwatch
        });
    }
    const polyfilledObject = (object);
    polyfilledObject.watch(key, (key, oldVal, newVal) => {
        console.log(`Setting key ${key} from ${oldVal} to ${newVal}`);
        try {
            throw new Error('Error for catching stack');
        }
        catch (error) {
            console.log('Stack', error);
        }
        return newVal;
    });
    return () => {
        polyfilledObject.unwatch(key);
    };
}
export function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => {
        const codePoint = m.codePointAt(0);
        if (codePoint === undefined)
            throw new Error('undefined codePoint');
        return codePoint;
    });
}
export function bytesToBase64(base64) {
    const binString = Array.from(base64, (byte) => String.fromCodePoint(Number(byte))).join("");
    return btoa(binString);
}
export function atobUnicode(ascii) {
    return base64ToBytes(new TextEncoder().encode(ascii).toString());
}
export function btoaUnicode(base64) {
    return new TextDecoder().decode(base64ToBytes(base64));
}
