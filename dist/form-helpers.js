import { getRandomItemFromArray } from './array-helpers.js';
import { createElement, getClosestParent, getElementsWithAttribute, getElementAttributes } from './dom-helpers.js';
const constants = {
    REQUIRED_ATTR: 'data-required'
};
export function getLabelElement(element) {
    let labelEl;
    const p = element.parentElement;
    if (p && p.tagName === 'label') {
        labelEl = p;
    }
    const id = element.getAttribute('id');
    if (id) {
        const elements = ([...Array.from(document.querySelectorAll('[for=' + id + ']'))].filter(el => el instanceof HTMLLabelElement));
        if (elements[0]) {
            labelEl = elements[0];
        }
    }
    return labelEl;
}
export function getLabel(element) {
    let label = '';
    const labelEl = getLabelElement(element);
    if (labelEl) {
        label = labelEl.textContent || '';
    }
    return label;
}
export function clickRadioInputs(wrapper) {
    const radioInputs = (Array.from(wrapper.querySelectorAll('input[type=radio]')));
    const radioInputsByName = {};
    radioInputs.forEach(r => {
        const name = r.getAttribute('name') || '';
        if (!radioInputsByName[name]) {
            radioInputsByName[name] = [];
        }
        radioInputsByName[name].push(r);
    });
    Object.entries(radioInputsByName).forEach(([name, inputs]) => {
        const input = getRandomItemFromArray(inputs);
        input.click();
    });
}
export function enterTextInputs(wrapper) {
    const selectors = ['input[type=text]', 'textarea'];
    const inputs = (Array.from(wrapper.querySelectorAll(selectors.join(', '))));
    inputs.forEach(input => {
        const createRandomText = () => {
            return (Math.random() + 1).toString(36).substring(7);
        };
        input.value = createRandomText();
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });
}
export function enterFormInputs(wrapper) {
    clickRadioInputs(wrapper);
    enterTextInputs(wrapper);
}
export function createTag(tagName, attributes, children = []) {
    return createElement({
        tag: tagName,
        attributes: attributes,
        children: children
    });
}
export function appendChildren(el, children) {
    appendChildren(el, children);
}
export function setAttributes(el, attributes) {
    setAttributes(el, attributes);
}
export function getTableHeaderValue(el) {
    const parentEl = getClosestParent(el, 'th');
    return (parentEl ? parentEl.textContent || '' : '');
}
export function attributesToSelector(attributes) {
    let selector = '';
    for (let key in attributes) {
        selector += '[' + key + '=' + attributes[key] + ']';
    }
    return selector;
}
export function checkRequiredInput(el) {
    const type = el.getAttribute('type');
    if (el.tagName === 'input' &&
        (type === 'radio' || type === 'checkbox') &&
        getCheckedElements(el).length === 0) {
        return false;
    }
    else if (el instanceof HTMLInputElement && !el.value) {
        return false;
    }
    return true;
}
export function getCheckedElements(el) {
    const elements = [...Array.from(el.children)];
    return elements.filter(element => (element instanceof HTMLInputElement) && element.checked);
}
export function setInputAsRequired(el) {
    el.setAttribute(constants.REQUIRED_ATTR, '');
}
export function getRequiredInputs(form) {
    return getElementsWithAttribute(constants.REQUIRED_ATTR);
}
export function handleSubmit(ev) {
    const form = ev.target;
    if (!(form instanceof HTMLFormElement))
        throw new Error('Not form');
    const bool = checkRequiredInputs(form);
    if (!bool || bool) {
        window.alert('Please fill in all required inputs.');
    }
    return bool;
}
export function inputObject() {
    return {
        type: '',
        tag: '',
        attributes: {},
        key: '',
        label: '',
        values: [],
        rowHeader: '',
        initialSelection: '',
        required: false
    };
}
export function formSettings() {
    return {
        action: '',
        actionType: '',
        inputs: []
    };
}
export function elementToInputObject(element) {
    const obj = inputObject();
    obj.tag = element.tagName;
    obj.attributes = getElementAttributes(element);
    if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
        obj.values.push(element.value);
    }
    obj.label = getLabel(element);
    obj.rowHeader = getTableHeaderValue(element);
    if (element instanceof HTMLSelectElement && obj.tag === 'select' && element.options.length > 0) {
        const initialSelection = element.options[0];
        obj.initialSelection = initialSelection.getAttribute('name') || '';
    }
    return obj;
}
export function elementsToInputObjects(elements) {
    const inputs = [];
    for (let i = 0; i < elements.length; i++) {
        inputs.push(elementToInputObject(elements[i]));
    }
    return inputs;
}
export function inputTypesToSelectors(inputTypes) {
    const selectors = [];
    for (let key in inputTypes) {
        let inputType = inputTypes[key];
        let selector = '';
        if (inputType.tag) {
            selector += ' ' + inputType.tag;
        }
        if (inputType.attributes) {
            selector += attributesToSelector(inputType.attributes);
        }
        selectors.push(selector);
    }
    return selectors;
}
export function checkRequiredInputs(form) {
    const inputs = getRequiredInputs(form);
    for (let i = 0; i < inputs.length; i++) {
        if (!checkRequiredInput(inputs[i])) {
            return false;
        }
    }
    return true;
}
