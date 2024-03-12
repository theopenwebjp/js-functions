import { copyObjectData, isObject } from './object-helpers.js';
import { combineObjects, exists } from './utilities.js';
export function getUniqueDOMText(wrapper) {
    const uniqueText = [];
    const attemptAdd = (v) => {
        if (typeof v !== 'string')
            return false;
        v = v.trim();
        if (!v)
            return false;
        if (uniqueText.includes(v))
            return false;
        uniqueText.push(v);
        return true;
    };
    const textNodes = getNestedTextNodes(wrapper);
    const nonEmptyTextNodes = textNodes.filter(node => !!(node.nodeValue || '').trim());
    nonEmptyTextNodes.forEach(node => {
        attemptAdd(node.nodeValue);
    });
    const ATTRIBUTES = ['title', 'placeholder'];
    ATTRIBUTES.forEach(attr => {
        const elements = Array.from(wrapper.querySelectorAll(`[${attr}]`));
        elements.forEach(element => {
            attemptAdd(element.getAttribute(attr));
        });
    });
    return uniqueText;
}
export function getNestedTextNodes(element) {
    const nodes = [];
    const targets = [element, ...Array.from(element.querySelectorAll('*'))];
    targets.forEach(t => {
        const textNodes = Array.from(t.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
        nodes.push(...textNodes);
    });
    return nodes;
}
export function DomElementSettings(options = {}) {
    const settings = Object.assign({
        tag: '',
        children: [],
        attributes: {},
        textContent: '',
        innerHTML: '',
        events: {}
    }, options);
    return settings;
}
export function DOMSearchSettings(options = {}) {
    return Object.assign({
        tag: false,
        textContent: true,
        attributeKey: false,
        attributeValue: false,
        handle: null
    }, options);
}
export function ChildrenSettings(options) {
    const settings = Object.assign({
        replacements: {},
        format: DomElementSettings(),
        items: []
    }, options);
    return settings;
}
export function createElements(settingsArr, defaults) {
    const elements = settingsArr.map(function (settings) {
        if (defaults) {
            settings = combineObjects([settingsArr, defaults]);
        }
        return createElement(settings);
    });
    return elements;
}
export function createElement(options) {
    const settings = DomElementSettings(options);
    const el = document.createElement(settings.tag);
    setAttributes(el, settings.attributes);
    _setEvents(el, settings.events);
    if (settings.children.length > 0) {
        _setChildren(el, settings.children);
    }
    else if (settings.innerHTML !== '') {
        el.innerHTML = settings.innerHTML;
    }
    else {
        el.textContent = settings.textContent;
    }
    return el;
}
export function setChildrenSettings(settings, childrenOptions) {
    const childrenSettings = ChildrenSettings(childrenOptions);
    settings.children = _handleChildrenReplacements(childrenSettings);
    return settings.children;
}
export function createTable(rows) {
    const table = document.createElement('table');
    let cols;
    for (let i = 0; i < rows.length; i++) {
        let tr = document.createElement('tr');
        cols = rows[i];
        for (let j = 0; j < cols.length; j++) {
            let td = document.createElement('td');
            td.innerHTML = cols[j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}
export function createElementList(nameValues) {
    const list = nameValues.map(function (nameValue) {
        const elementSettings = nameValue.value;
        const el = createElement(elementSettings);
        return {
            name: nameValue.name,
            value: el
        };
    });
    return createCommonList(list);
}
export function createKeyValueList(obj) {
    const list = [];
    for (let key in obj) {
        list.push({
            name: key,
            value: obj[key]
        });
    }
    return createCommonList(list);
}
export function createList(arr) {
    const ul = document.createElement('ul');
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const item = arr[i];
        if (typeof item === 'object' && item.nodeType) {
            li.appendChild(item);
        }
        else {
            li.innerHTML = String(item);
        }
        ul.appendChild(li);
    }
    return ul;
}
export function createHeadedArrayElement(handle = undefined, headerText, arr) {
    if (!handle) {
        handle = function (arr) {
            const element = document.createElement('div');
            arr.forEach(i => element.textContent += String(i));
            return element;
        };
    }
    const div = document.createElement('div');
    const header = document.createElement('h3');
    header.textContent = headerText;
    header.style.textAlign = 'center';
    div.appendChild(header);
    const arrElement = handle(arr);
    div.appendChild(arrElement);
    return div;
}
export function createHeadedTable(header, arr) {
    return createHeadedArrayElement(createTable, header, arr);
}
export function createHeadedList(header, arr) {
    return createHeadedArrayElement(createList, header, arr);
}
export function createHeadedKeyValueList(header, obj) {
    return createHeadedArrayElement(createKeyValueList, header, Object.values(obj));
}
export function MenuListSettings(options = {}) {
    return Object.assign({
        items: [{
                type: '',
                click: () => { },
                text: '',
                id: '',
                class: '',
                empty: false,
                orientation: ''
            }],
        element: window.HTMLElement || undefined,
        isChild: false,
        hide: false,
        header: {
            text: '',
            id: ''
        }
    }, options);
}
export function setupMenuList(parentEl, settings) {
    const items = settings.items;
    let ul;
    if (settings.element) {
        ul = settings.element;
        ul.innerHTML = '';
    }
    else {
        ul = document.createElement('ul');
    }
    if (settings.isChild) {
        parentEl.addEventListener('mouseover', function () {
            ul.style.display = 'block';
        });
        parentEl.addEventListener('mouseout', function () {
            ul.style.display = 'none';
        });
    }
    if (settings.hide) {
        ul.style.display = 'none';
    }
    if (settings.header) {
        const headerEl = document.createElement('a');
        if (settings.header.text) {
            headerEl.textContent = settings.header.text;
        }
        if (settings.header.id) {
            headerEl.setAttribute('id', settings.header.id);
        }
        parentEl.appendChild(headerEl);
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const li = document.createElement('li');
        const a = document.createElement('a');
        if (item.text) {
            a.textContent = item.text;
        }
        if (item.id) {
            li.setAttribute('id', item.id);
            a.setAttribute('id', item.id + '_a');
        }
        if (item.class) {
            li.setAttribute('class', item.class);
        }
        if (item.type === 'file') {
            setClickFileHandler(a, item.click);
        }
        else {
            a.addEventListener('click', item.click);
        }
        if (item.orientation === 'vertical') {
            li.style.display = 'block';
            li.style.clear = 'both';
        }
        else {
            li.style.display = 'block';
            li.style.float = 'left';
        }
        if (!item.empty) {
            li.appendChild(a);
        }
        ul.appendChild(li);
    }
    if (!settings.element) {
        parentEl.appendChild(ul);
    }
    return ul;
}
export function createBreadcrumbList(links, separator) {
    if (!separator) {
        separator = ' > ';
    }
    const list = document.createElement('span');
    for (let i = 0; i < links.length; i++) {
        const abstractLink = links[i];
        if (i > 0) {
            const separatorSpan = document.createElement('span');
            separatorSpan.textContent = separator;
            list.appendChild(separatorSpan);
        }
        const span = document.createElement('span');
        const link = typeof abstractLink === 'string' ? {
            text: abstractLink,
            url: ''
        } : abstractLink;
        if (link.url) {
            const a = document.createElement('a');
            a.setAttribute('href', link.url);
            a.textContent = link.text;
            span.appendChild(a);
        }
        else {
            span.textContent = link.text;
        }
        list.appendChild(span);
    }
    return list;
}
export function groupify(nameValues) {
    const wrapper = document.createElement('div');
    let el;
    for (let i = 0; i < nameValues.length; i++) {
        el = createHeadedArrayElement(undefined, nameValues[i].name, nameValues[i].value);
        wrapper.appendChild(el);
    }
    return wrapper;
}
export function clearForm(form) {
    console.log('clearForm', form);
    const elements = (Array.from(form.elements));
    form.reset();
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const type = ('type' in el) ? el.type.toLowerCase() : '';
        switch (type) {
            case 'text':
            case 'password':
            case 'textarea':
            case 'hidden': {
                const input = (el);
                input.value = '';
                input.defaultValue = '';
                break;
            }
            case 'radio':
            case 'checkbox': {
                const checkedInput = (el);
                if (checkedInput.checked) {
                    checkedInput.checked = false;
                }
                break;
            }
            case 'select-one':
            case 'select-multi': {
                const select = (el);
                select.selectedIndex = -1;
                break;
            }
            default:
                break;
        }
    }
}
export function _setEvents(el, events) {
    let event;
    for (let key in events) {
        event = events[key];
        if (typeof event === 'string') {
            el.setAttribute('on' + key, event);
        }
        else {
            el.addEventListener(key, event);
        }
    }
}
export function _setChildren(el, settingsArr) {
    const children = [];
    for (let i = 0; i < settingsArr.length; i++) {
        children.push(createElement(settingsArr[i]));
    }
    appendChildren(el, children);
    return el;
}
export function _handleChildrenReplacements(childrenSettings) {
    const items = childrenSettings.items;
    const children = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        children.push(_handleChildReplacements(item, childrenSettings.format, childrenSettings.replacements));
    }
    return children;
}
export function _handleChildReplacements(item, format, replacements) {
    const childSettings = DomElementSettings(format);
    childSettings.children = [];
    _applyObjectReplacement(childSettings, item, 'tag', replacements);
    _applyObjectReplacement(childSettings, item, 'textContent', replacements);
    _applyObjectReplacement(childSettings, item, 'innerHTML', replacements);
    for (let key in childSettings.attributes) {
        _applyObjectReplacement(childSettings.attributes, item, key, replacements);
    }
    if (format.children) {
        let cVal;
        for (let i = 0; i < format.children.length; i++) {
            cVal = _handleChildReplacements(item, format.children[i], replacements);
            childSettings.children.push(cVal);
        }
    }
    return childSettings;
}
export function _applyObjectReplacement(obj, item, elementPropKey, replacements) {
    for (let key in replacements) {
        if (obj[elementPropKey] === key) {
            obj[elementPropKey] = replacements[key](item, key);
        }
    }
}
export function appendChildren(el, children) {
    for (let i = 0; i < children.length; i++) {
        el.appendChild(children[i]);
    }
}
export function setAttributes(el, attributes) {
    for (let key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
}
export function NameValue() {
    return {
        name: '',
        value: ''
    };
}
export function createCommonList(arr) {
    const list = [];
    for (let i = 0; i < arr.length; i++) {
        const cur = arr[i];
        const curVal = cur.value;
        const item = document.createElement('span');
        let span = document.createElement('span');
        span.textContent = cur.name + ': ';
        item.appendChild(span);
        span = document.createElement('span');
        if (curVal instanceof HTMLElement) {
            span.appendChild(curVal);
        }
        else {
            span.textContent = curVal;
        }
        item.appendChild(span);
        list.push(item);
    }
    return createList(list);
}
export function FormOptions(options = {}) {
    return Object.assign({
        method: 'POST',
        action: '',
        controls: {
            reset: true,
            submit: true
        }
    }, options);
}
export function formify(el, fOptions) {
    const options = FormOptions(fOptions);
    let div, input;
    const form = document.createElement('form');
    form.appendChild(el);
    form.setAttribute('method', options.method);
    if (options.action) {
        if (typeof options.action === 'function') {
            const { action } = options;
            form.addEventListener('submit', function (ev) {
                action(ev);
                ev.preventDefault();
                return false;
            });
        }
        else {
            form.setAttribute('action', options.action);
        }
    }
    if (options.controls) {
        div = document.createElement('div');
        if (options.controls.reset) {
            input = document.createElement('input');
            input.setAttribute('type', 'reset');
            input.setAttribute('value', 'Reset');
            input.addEventListener('click', function (ev) {
                clearForm(form);
                ev.preventDefault();
                return false;
            });
            div.appendChild(input);
        }
        if (options.controls.submit) {
            input = document.createElement('input');
            input.setAttribute('type', 'submit');
            input.setAttribute('value', 'Submit');
            div.appendChild(input);
        }
        form.appendChild(div);
    }
    return form;
}
export function getElementScreenDimensions(el) {
    return el.getBoundingClientRect();
}
export function getElementPageDimensions(el) {
    const rect = copyObjectData(el.getBoundingClientRect());
    rect.top = rect.top + window.pageYOffset;
    rect.left = rect.left + window.pageXOffset;
    rect.bottom = rect.top + rect.height;
    rect.right = rect.left + rect.width;
    return (rect);
}
export function setStylePosition(el, position) {
    const allowed = ['top', 'right', 'bottom', 'left'];
    setStyleMeasurements(el, position, allowed);
}
export function setStyleDimensions(el, dimensions) {
    const allowed = ['top', 'right', 'bottom', 'left', 'width', 'height'];
    setStyleMeasurements(el, dimensions, allowed);
}
export function setStyleMeasurements(el, obj, allowed, unit = undefined) {
    if (!unit) {
        unit = 'px';
    }
    const s = el.style;
    for (let key in obj) {
        if (obj[key] === null) {
            continue;
        }
        if (!allowed || allowed.indexOf(key) >= 0) {
            s[key] = obj[key] + unit;
        }
    }
}
export function applyMarginsToDimensions(margins, dimensions) {
    const allowedMargins = ['top', 'left'];
    const keys = (Object.keys(margins));
    keys.forEach(key => {
        if (allowedMargins.indexOf(key) >= 0 && exists(margins[key])) {
            const m = ((margins));
            const margin = m[key];
            if (margin) {
                dimensions[key] += margin;
            }
        }
    });
}
export function displayElementAtScreenDimensions(el, dimensions) {
    if (!el.parentElement) {
        document.body.appendChild(el);
    }
    const position = 'fixed';
    el.style.position = position;
    setStylePosition(el, dimensions);
    const handle = function () {
        if (!el.parentElement) {
            window.removeEventListener('scroll', handle);
        }
        else {
            displayElementAtScreenDimensions(el, dimensions);
        }
    };
    window.addEventListener('scroll', handle, true);
    return el;
}
export function displayElementAtPageDimensions(el, dimensions) {
    if (el.parentElement !== document.body) {
        if (el.parentElement) {
            el.parentElement.removeChild(el);
        }
        document.body.appendChild(el);
    }
    const position = 'absolute';
    el.style.position = position;
    setStylePosition(el, dimensions);
    return el;
}
export function showAboveElement(shownElement, targetElement, options) {
    if (!options) {
        options = {
            top: null,
            left: null
        };
    }
    shownElement.style.position = 'fixed';
    const dimensions = getElementPageDimensions(targetElement);
    applyMarginsToDimensions(options, dimensions);
    return displayElementAtPageDimensions(shownElement, dimensions);
}
export function watchDocumentSizeChanges(element, handle) {
    const height = element.offsetHeight;
    const width = element.offsetWidth;
    document.addEventListener('DOMSubtreeModified', function () {
        if (element.offsetHeight !== height || element.offsetWidth !== width) {
            handle(element);
        }
    });
}
export function startWatchingHtmlElementListenerChanges(eventName, handle) {
    const p = (window.HTMLElement.prototype);
    if (!p.__listenerChangeHandles) {
        p.__listenerChangeHandles = {};
        p.__handleEvent = function (type, args) {
            const prefix = '__';
            const listenerKey = ((type === 'add') ? 'addEventListener' : 'removeEventListener');
            const oldListenerKey = (prefix + listenerKey);
            const eventName = args[0];
            const handles = p.__listenerChangeHandles[eventName];
            for (let i = 0; i < handles.length; i++) {
                p[oldListenerKey].apply(this, args);
            }
        };
        p.__addEventListener = p.addEventListener;
        p.addEventListener = function (eventName, handler, bubbling) {
            const type = 'add';
            return p.__handleEvent.apply(this, [type, arguments]);
        };
        p.__removeEventListener = p.removeEventListener;
        p.removeEventListener = function (eventName, handler, bubbling) {
            const type = 'remove';
            return p.__handleEvent.apply(this, [type, arguments]);
        };
    }
    if (!p.__listenerChangeHandles[eventName]) {
        p.__listenerChangeHandles[eventName] = [];
    }
    p.__listenerChangeHandles[eventName].push(handle);
}
export function stopWatchingHtmlElementListenerChanges(eventName, handle) {
    const p = (window.HTMLElement.prototype);
    if (!p.__listenerChangeHandles) {
        return false;
    }
    if (!p.__listenerChangeHandles[eventName]) {
        return false;
    }
    const index = p.__listenerChangeHandles[eventName].indexOf(handle);
    if (index >= 0) {
        p.__listenerChangeHandles[eventName].splice(index, 1);
    }
    if (p.__listenerChangeHandles[eventName].length === 0) {
        delete p.__listenerChangeHandles[eventName];
    }
    if (Object.keys(p.__listenerChangeHandles).length === 0) {
        delete p.__listenerChangeHandles;
        p.addEventListener = p.__addEventListener;
        delete p.__addEventListener;
        p.removeEventListener = p.__removeEventListener;
        delete p.__removeEventListener;
    }
    return true;
}
export function getAvailableElementEvents(el) {
    const arr = [];
    for (let key in el) {
        if (key.substr(0, 2) === 'on') {
            arr.push(key.substr(2));
        }
    }
    return arr;
}
export function htmlifyEvents(el, eventNames) {
    if (!eventNames) {
        eventNames = getAvailableElementEvents(el);
    }
    for (let i = 0; i < eventNames.length; i++) {
        htmlifyEvent(el, eventNames[i]);
    }
}
export function htmlifyEvent(el, eventName) {
    const key = '__htmlified_event_' + (Math.random() * 10000000);
    const event = new window.CustomEvent(eventName);
    ((window))[key] = function () {
        el.dispatchEvent(event);
    };
    el.setAttribute('on' + eventName, 'window["' + key + '"]()');
}
export function getParents(el) {
    const parents = [];
    let nextParent = el.parentElement;
    while (nextParent) {
        parents.push(nextParent);
        nextParent = nextParent.parentElement;
    }
    return parents;
}
export function getClosestParent(el, selector) {
    let parent = null;
    const parents = getParents(el);
    for (let i = 0; i < parents.length; i++) {
        if (parents[i].matches(selector)) {
            parent = parents[i];
            break;
        }
    }
    return parent;
}
export function removeTabIndexes() {
    const elements = (getAllElements());
    for (let i = 0; i < elements.length; i++) {
        elements[i].tabIndex = -1;
    }
}
export function setTabIndexes(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].tabIndex = i;
    }
}
export function getHtmlImport(selector) {
    const links = document.querySelectorAll('link[rel="import"]');
    for (let i = 0; i < links.length; i++) {
        const link = (links[i]);
        const content = link.import;
        if (!content) {
            throw new Error('link.import not supported');
        }
        const element = content.querySelector(selector);
        if (element && element instanceof HTMLTemplateElement) {
            const clone = document.importNode(element.content, true);
            return clone;
        }
    }
    return null;
}
export function e(id) {
    const element = document.getElementById(id);
    return element;
}
export function getElementsByIds(ids) {
    const elements = [];
    for (let i = 0; i < ids.length; i++) {
        const element = e(ids[i]);
        if (element) {
            elements.push(element);
        }
    }
    return elements;
}
export function getDOMList(arr) {
    const listEl = document.createElement('ul');
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const itemEl = document.createElement('li');
        itemEl.textContent = item;
        listEl.appendChild(itemEl);
    }
    return listEl;
}
export function getDOMImage(src) {
    const image = new window.Image();
    image.src = src;
    return image;
}
export function getDOMInputsList(inputs) {
    const listEl = document.createElement('table');
    for (let i = 0; i < inputs.length; i++) {
        const inputRow = getDOMInputRow(inputs[i]);
        listEl.appendChild(inputRow);
    }
    return listEl;
}
export function getDOMInputRow(input) {
    const rowEl = document.createElement('tr');
    const nameEl = document.createElement('th');
    nameEl.textContent = input.name;
    rowEl.appendChild(nameEl);
    const inputCell = document.createElement('td');
    rowEl.appendChild(inputCell);
    const inputEl = document.createElement('input');
    inputEl.value = input.value;
    inputCell.appendChild(inputEl);
    return rowEl;
}
export function setClickFileHandler(el, onFileHandle) {
    const fileEl = document.createElement('input');
    fileEl.style.position = 'absolute';
    fileEl.style.visibility = 'hidden';
    fileEl.setAttribute('type', 'file');
    fileEl.addEventListener('change', onFileHandle);
    if (el.parentElement) {
        el.parentElement.insertBefore(fileEl, el);
    }
    else {
        el.appendChild(fileEl);
    }
    el.addEventListener('click', function (ev) {
        if (ev.target !== el) {
            return false;
        }
        ev.preventDefault();
        fileEl.click();
    }, true);
}
export function getElementPositionData(elementPosition) {
    const p = elementPosition;
    const el = p.element;
    let defaultData = null;
    let i, key;
    if (!el) {
        return defaultData;
    }
    if (p.type === 'tag') {
        return el.tagName;
    }
    if (p.type === 'textContent') {
        return el.textContent;
    }
    if (p.type === 'attributeKey' || p.type === 'attributeValue') {
        const attributes = getElementAttributes(el);
        i = 0;
        for (key in attributes) {
            if (p.type === 'attributeKey' && elementPosition.attributeIndex === i) {
                return key;
            }
            if (p.type === 'attributeValue' && elementPosition.attributeIndex === i) {
                return attributes[key];
            }
        }
    }
    return defaultData;
}
export function searchDom(searchStr, optionalType = {}, el = document) {
    const type = DOMSearchSettings(optionalType);
    const children = getAllChildren(el);
    const results = [];
    for (let i = 0; i < children.length; i++) {
        const curEl = children[i];
        if (!(curEl instanceof HTMLElement)) {
            return;
        }
        let elementPosition = {
            element: curEl,
            type: null,
            attributeIndex: 0,
            stringIndex: 0,
            stringLength: searchStr.length
        };
        if (type.tag) {
            if (curEl.tagName === searchStr) {
                elementPosition.type = 'tag';
                results.push(elementPosition);
                continue;
            }
        }
        if (type.textContent) {
            if (curEl.children.length === 0 && curEl.textContent === searchStr) {
                elementPosition.type = 'textContent';
                results.push(elementPosition);
                continue;
            }
        }
        if (type.attributeKey || type.attributeValue) {
            let attributes = getElementAttributes(curEl);
            let attributeIndex = 0;
            for (let key in attributes) {
                if (type.attributeKey) {
                    if (key === searchStr) {
                        elementPosition.attributeIndex = attributeIndex;
                        elementPosition.type = 'attributeKey';
                        results.push(elementPosition);
                        continue;
                    }
                }
                if (type.attributeValue) {
                    if (attributes[key] === searchStr) {
                        elementPosition.attributeIndex = attributeIndex;
                        elementPosition.type = 'attributeValue';
                        results.push(elementPosition);
                        continue;
                    }
                }
                attributeIndex++;
            }
        }
        if (type.handle) {
            elementPosition = type.handle(curEl);
            if (elementPosition) {
                results.push(elementPosition);
                continue;
            }
        }
    }
    return results;
}
export function arrayInputter(objectInfoArray) {
    const arr = objectInfoArray;
    const ul = document.createElement('ul');
    for (let i = 0; i < arr.length; i++) {
        let objectInfo = arr[i];
        let li = document.createElement('li');
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', objectInfo.key);
        input.value = objectInfo.value;
        li.appendChild(input);
        ul.appendChild(li);
    }
    return ul;
}
export function nestedInputter(obj) {
    const ul = document.createElement('ul');
    for (const key in obj) {
        const li = document.createElement('li');
        let span = document.createElement('span');
        span.textContent = key;
        li.appendChild(span);
        span = document.createElement('span');
        if (isObject(obj[key])) {
            span.appendChild(nestedInputter(obj[key]));
        }
        else {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.value = obj[key];
            span.appendChild(input);
        }
        ul.appendChild(li);
    }
    return ul;
}
export function textNodesUnder(el) {
    let n;
    const a = [];
    const walk = document.createTreeWalker(el, window.NodeFilter.SHOW_TEXT, null);
    while ((n = walk.nextNode()))
        a.push(n);
    return a;
}
export function getElementsBySelectors(selectors, baseElement = document) {
    let elements = [];
    selectors.forEach(selector => {
        const matchedElements = [...Array.from(baseElement.querySelectorAll(selector))];
        elements = elements.concat(matchedElements);
    });
    return elements;
}
export function getElementsMappedToSelectors(selectors, baseElement = document) {
    const selectorMap = {};
    selectors.forEach(selector => {
        let matchedElements = baseElement.querySelectorAll(selector);
        selectorMap[selector] = (Array.from(matchedElements));
    });
    return selectorMap;
}
export function getAllElements() {
    return [...Array.from(document.body.getElementsByTagName('*'))];
}
export function getAllChildren(el) {
    return [...Array.from(el.getElementsByTagName('*'))];
}
export function getElementsWithAttribute(attr) {
    return (getAllElements().filter(element => element.hasAttribute(attr) && element instanceof HTMLElement));
}
export function getElementAttributes(el) {
    const attr = {};
    const nodeMap = el.attributes;
    for (let i = 0; i < nodeMap.length; i++) {
        attr[nodeMap[i].nodeName] = nodeMap[i].nodeValue || '';
    }
    return attr;
}
export function getAttributeSelector(attr, value = '') {
    let selector = '';
    selector += '[' + attr;
    if (exists(value)) {
        selector += '=' + value;
    }
    selector += ']';
    return selector;
}
export function getElementsByAttribute(attr, value) {
    return document.querySelectorAll(getAttributeSelector(attr, value));
}
export function getNestedAttributeListFromElement(el, attr) {
    if (!el) {
        el = document;
    }
    const elements = getElementsBySelectors([getAttributeSelector(attr)], el);
    return elements.map(function (val) {
        return val.getAttribute(attr) || '';
    }).filter(e => !e);
}
export function setElementAsEditable(el, onChange, bool) {
    if (el.contentEditable === String(bool)) {
        return;
    }
    el.contentEditable = String(bool);
    if (bool) {
        el.addEventListener('input', onChange);
    }
    else {
        el.removeEventListener('input', onChange);
    }
}
export function setEditMode(attr, bool) {
    const elements = getElementsWithAttribute(attr);
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (bool) {
            element.contentEditable = '';
        }
        else {
            element.removeAttribute('contentEditable');
        }
    }
}
export function centerFixElement(el) {
    const s = el.style;
    s.zIndex = String(Number.MAX_SAFE_INTEGER);
    s.position = 'fixed';
    s.top = '50%';
    s.left = '50%';
    s.transform = '(-50% -50%)';
}
export function convertTableHtmlToArray(html) {
    const element = document.createElement('div');
    element.innerHTML = html;
    const table = element.getElementsByTagName('table')[0];
    const arr = convertTableElementToArray(table);
    return arr;
}
export function convertTableElementToArray(table) {
    const rows = table.getElementsByTagName('tr');
    return convertTableRowElementsToArray(Array.from(rows));
}
export function convertTableRowElementsToArray(rows) {
    const arr = [];
    for (let i = 0; i < rows.length; i++) {
        arr[i] = [];
        const cells = rows[i].children;
        for (let j = 0; j < cells.length; j++) {
            arr[i][j] = cells[j].innerHTML;
        }
    }
    return arr;
}
export function convertArrToTableElement(arr) {
    let i, j;
    const table = document.createElement('table');
    let tr, td;
    for (i = 0; i < arr.length; i++) {
        tr = document.createElement('tr');
        for (j = 0; j < arr[i].length; j++) {
            td = document.createElement('td');
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}
export function elementChainer(el) {
    const chainer = {
        addEventListener: (event, handle, other) => {
            el.addEventListener(event, handle, other);
            return chainer;
        },
        appendChild: (child) => {
            el.appendChild(child);
            return chainer;
        },
        innerHTML: (html) => {
            el.innerHTML = html;
            return chainer;
        },
        removeAttribute: (name) => {
            el.removeAttribute(name);
            return chainer;
        },
        removeChild: (child) => {
            el.removeChild(child);
            return chainer;
        },
        removeEventListener: (event, handle) => {
            el.removeEventListener(event, handle);
            return chainer;
        },
        replaceChild: (newChild, oldChild) => {
            el.replaceChild(newChild, oldChild);
            return chainer;
        },
        setAttribute: (name, val) => {
            el.setAttribute(name, val);
            return chainer;
        },
        style: (key, val) => {
            el.style[key] = val;
            return chainer;
        },
        textContent: (str) => {
            el.textContent = str;
            return chainer;
        },
        title: (str) => {
            el.title = str;
            return chainer;
        }
    };
    return chainer;
}
export function getUsedDOMBoundingRect() {
    const elements = Array.from(document.querySelectorAll('*'));
    return getElementsBoundingRect(elements);
}
export function getElementsBoundingRect(elements) {
    const rect = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
    };
    elements.forEach(element => {
        const curRect = element.getBoundingClientRect();
        const curRectD = {
            top: curRect.top + document.documentElement.scrollTop,
            right: curRect.right + document.documentElement.scrollLeft,
            bottom: curRect.bottom + document.documentElement.scrollTop,
            left: curRect.left + document.documentElement.scrollLeft,
            width: curRect.width,
            height: curRect.height,
        };
        if (curRectD.top < rect.top)
            rect.top = curRectD.top;
        if (curRectD.right > rect.right)
            rect.right = curRectD.right;
        if (curRectD.bottom > rect.bottom)
            rect.bottom = curRectD.bottom;
        if (curRectD.left < rect.left)
            rect.left = curRectD.left;
    });
    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;
    return rect;
}
export function attemptUpdateNestedTextContent(element, textContent) {
    const candidates = [element, Array.from(element.querySelectorAll('*'))];
    for (let i = 0; i < candidates.length; i++) {
        const candidate = (candidates[i]);
        if (candidate.children.length === 0 && candidate.textContent === element.textContent) {
            candidate.textContent = textContent;
            return true;
        }
    }
    return false;
}
export function createIframeLoader(src, selector) {
    return () => {
        const destination = document.querySelector(selector);
        if (!destination) {
            throw new Error(`No destination element with selector: ${selector}`);
        }
        const iframe = document.createElement('iframe');
        iframe.src = src;
        destination.appendChild(iframe);
    };
}
