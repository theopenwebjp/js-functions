import { getRandomItemFromArray } from './array-helpers.js'
import { createElement, getClosestParent, getElementsWithAttribute, getElementAttributes } from './dom-helpers.js'

const constants = {
  REQUIRED_ATTR: 'data-required'
}

/**
   * @param {HTMLElement} element
   * @return {HTMLElement|undefined}
   */
export function getLabelElement(element) {
  let labelEl

  // By wrap
  const p = element.parentElement
  if (p && p.tagName === 'label') {
    labelEl = p
  }

  // By id
  const id = element.getAttribute('id')
  if (id) {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
    // Not connected to form by spec.
    const elements = /** @type {HTMLLabelElement[]} */ ([...Array.from(document.querySelectorAll('[for=' + id + ']'))].filter(el => el instanceof HTMLLabelElement))
    if (elements[0]) {
      labelEl = elements[0]
    }
  }

  return labelEl
}

/**
 * @param {HTMLElement} element
 * @return {string}
 */
export function getLabel(element) {
  let label = ''
  const labelEl = getLabelElement(element)

  if (labelEl) {
    label = labelEl.textContent || ''
  }

  return label
}


/**
* Clicks many radio inputs for when want to automatically test large radio input lists.
* Even works in frameworks such as React = MUI.
* @example clickRadioInputs(document.querySelector('form'))
* @param {HTMLElement} wrapper Usually a form.
*/
export function clickRadioInputs(wrapper) {
  const radioInputs = /** @type {HTMLInputElement[]} */ (Array.from(wrapper.querySelectorAll('input[type=radio]')))

  // Group by name
  /**
  * @type {Record<string, HTMLInputElement[]>}
  */
  const radioInputsByName = {}
  radioInputs.forEach(r => {
    const name = r.getAttribute('name') || ''
    if (!radioInputsByName[name]) {
      radioInputsByName[name] = []
    }

    radioInputsByName[name].push(r)
  })

  // Randomly click grouped
  Object.entries(radioInputsByName).forEach(([name, inputs]) => {
    const input = getRandomItemFromArray(inputs)
    input.click()
  })
}

/**
 * Randomly inputs text elements
* @example enterTextInputs(document.querySelector('form'))
* @param {HTMLElement} wrapper Usually a form.
*/
export function enterTextInputs(wrapper) {
  const selectors = ['input[type=text]', 'textarea']
  const inputs = /** @type {HTMLInputElement[]} */ (Array.from(wrapper.querySelectorAll(selectors.join(', '))))
  inputs.forEach(input => {
    const createRandomText = () => {
      return (Math.random() + 1).toString(36).substring(7)
    }

    input.value = createRandomText()
    input.dispatchEvent(new Event('change', { bubbles: true }));
  })
}

/**
* Randomly inputs form inputs.
* @example enterTextInputs(document.querySelector('form'))
* @param {HTMLElement} wrapper Usually a form.
*/
export function enterFormInputs(wrapper) {
  clickRadioInputs(wrapper)
  enterTextInputs(wrapper)
}


/**
 * @param {string} tagName
 * @param {import('./types/ts/index.js').Dictionary} attributes
 * @param {import('./types/ts/index.js').DomElementSettings[]} children
 * @return {HTMLElement}
 */
export function createTag(tagName, attributes, children = []) {
  return createElement({
    tag: tagName,
    attributes: attributes,
    children: children
  })
}

/**
 * @param {HTMLElement} el
 * @param {HTMLElement[]} children
 */
export function appendChildren(el, children) {
  appendChildren(el, children)
}

/**
 * @param {HTMLElement} el
 * @param {import('./types/ts/index.js').Dictionary} attributes
 */
export function setAttributes(el, attributes) {
  setAttributes(el, attributes)
}

/**
 * @param {HTMLElement} el
 * @return {string}
 */
export function getTableHeaderValue(el) {
  const parentEl = getClosestParent(el, 'th')
  return (parentEl ? parentEl.textContent || '' : '')
}



/**
 * @param {import('./types/ts/index.js').Dictionary} attributes
 * @return {string}
 */
export function attributesToSelector(attributes) {
  let selector = ''
  for (let key in attributes) {
    selector += '[' + key + '=' + attributes[key] + ']'
  }

  return selector
}


/**
 * @param {HTMLElement} el
 */
export function checkRequiredInput(el) {
  /*
  checkbox: .checked length > 0
  radio: .checked has true
  select: always selected.
  */

  const type = el.getAttribute('type')

  // Checked
  if (
    el.tagName === 'input' &&
    (type === 'radio' || type === 'checkbox') &&
    getCheckedElements(el).length === 0
  ) {
    return false
  } else if (el instanceof HTMLInputElement && !el.value) { // Input default
    return false
  }

  // PASSED
  return true
}

/**
 * @param {HTMLElement} el
 * @return {Element[]}
 */
export function getCheckedElements(el) {
  const elements = [...Array.from(el.children)]

  return elements.filter(element => (element instanceof HTMLInputElement) && element.checked)
}


/**
 * @param {HTMLElement} el
 */
export function setInputAsRequired(el) {
  el.setAttribute(constants.REQUIRED_ATTR, '')
}

/**
 * @param {HTMLFormElement} form
 * TODO
 */
export function getRequiredInputs(form) {
  return getElementsWithAttribute(constants.REQUIRED_ATTR)
}

/**
 * @param {Event} ev
 * @return {boolean}
 */
export function handleSubmit(ev) {
  const form = ev.target
  if (!(form instanceof HTMLFormElement)) throw new Error('Not form')
  const bool = checkRequiredInputs(form)
  if (!bool || bool) {
    window.alert('Please fill in all required inputs.')
  }

  return bool
}


/**
 * @return {import('./types/ts/index.js').InputObject}
 */
export function inputObject() {
  return {
    type: '',
    tag: '',
    attributes: {},
    key: '', // Specifies unique key. Currently used as name attribute.
    label: '',
    values: [],
    rowHeader: '',
    initialSelection: '',
    required: false
  }
}

/**
 * @return {import('./types/ts/index.js').FormSettings}
 */
export function formSettings() {
  return {
    action: '',
    actionType: '',
    inputs: []
  }
}


/**
 * Should keep only necessary information for editing
 * @param {HTMLElement} element
 * @return {import('./types/ts/index.js').InputObject}
 */
export function elementToInputObject(element) {
  const obj = inputObject()

  obj.tag = element.tagName
  obj.attributes = getElementAttributes(element)

  if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
    obj.values.push(element.value)
  }

  obj.label = getLabel(element)
  obj.rowHeader = getTableHeaderValue(element)
  if (element instanceof HTMLSelectElement && obj.tag === 'select' && element.options.length > 0) {
    const initialSelection = element.options[0];
    obj.initialSelection = initialSelection.getAttribute('name') || '' // OK?
  }

  return obj
}


/**
 * @param {HTMLElement[]} elements
 * @return {import('./types/ts/index.js').InputObject[]}
 */
export function elementsToInputObjects(elements) {
  const inputs = []
  for (let i = 0; i < elements.length; i++) {
    inputs.push(elementToInputObject(elements[i]))
  }

  return inputs
}
/**
   * @param {Object<string, Partial<import('./types/ts/index.js').InputType>>} inputTypes
   * @return {string[]}
   */
export function inputTypesToSelectors(inputTypes) {
  /**
   * @type {string[]}
   */
  const selectors = []
  for (let key in inputTypes) {
    let inputType = inputTypes[key]
    let selector = ''

    if (inputType.tag) { selector += ' ' + inputType.tag }
    if (inputType.attributes) { selector += attributesToSelector(inputType.attributes) }

    selectors.push(selector)
  }

  return selectors
}

/**
     * @param {HTMLFormElement} form
     * @return {boolean}
     */
export function checkRequiredInputs(form) {
  const inputs = getRequiredInputs(form)
  for (let i = 0; i < inputs.length; i++) {
    // FAILED
    if (!checkRequiredInput(inputs[i])) {
      return false
    }
  }

  // PASSED
  return true
}