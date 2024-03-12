import { copyObjectData, isObject } from './object-helpers.js'
import { combineObjects, exists } from './utilities.js'

/**
* For getting any readable text in the DOM.
* ※ No variable names/properties etc.
* @param {HTMLElement|Document} wrapper
*/
export function getUniqueDOMText(wrapper) {
  /**
  * @type {string[]}
  */
  const uniqueText = []

  /**
  * @param {string|null|undefined} v
  */
  const attemptAdd = (v) => {
    if (typeof v !== 'string') return false
    v = v.trim()
    if (!v) return false
    if (uniqueText.includes(v)) return false

    uniqueText.push(v)
    return true
  }

  // Non-empty text nodes
  // attributes: title, placeholder
  const textNodes = getNestedTextNodes(wrapper)
  const nonEmptyTextNodes = textNodes.filter(node => !!(node.nodeValue || '').trim())
  nonEmptyTextNodes.forEach(node => {
    attemptAdd(node.nodeValue)
  })

  const ATTRIBUTES = ['title', 'placeholder']
  ATTRIBUTES.forEach(attr => {
    const elements = Array.from(wrapper.querySelectorAll(`[${attr}]`))
    elements.forEach(element => {
      attemptAdd(element.getAttribute(attr))
    })
  })

  return uniqueText
}

/**
* Gets all text nodes in element, including any child elements.
* @param {Element|Document} element
*/
export function getNestedTextNodes(element) {
  /**
  * @type {Node[]}
  */
  const nodes = []

  const targets = [element, ...Array.from(element.querySelectorAll('*'))]
  targets.forEach(t => {
    const textNodes = Array.from(t.childNodes).filter(n => n.nodeType === Node.TEXT_NODE)
    nodes.push(...textNodes)
  })

  return nodes
}

/**
     * Represent customizable parts of an HTML Element.
     * @param {Partial<import('./types/ts/index.js').DomElementSettings>} options
     * @return {import('./types/ts/index.js').DomElementSettings}
     */
export function DomElementSettings(options = {}) {
  const settings = Object.assign({
    tag: '',
    children: [], // Allows nested
    attributes: {},
    textContent: '',
    innerHTML: '',
    events: {}
  }, options)

  return settings
}

/**
* @param {Partial<import('./types/ts/index.js').DOMSearchSettings>} options
* @return {import('./types/ts/index.js').DOMSearchSettings}
*/
export function DOMSearchSettings(options = {}) {
  return Object.assign({
    tag: false,
    textContent: true,
    attributeKey: false,
    attributeValue: false,
    handle: null // function(el){return result;} // If non-falsy, adds.
  }, options)
}

/**
* Settings for lists
* @param {Partial<import('./types/ts/index.js').ChildrenSettings>} options
* @return {import('./types/ts/index.js').ChildrenSettings}
*/
export function ChildrenSettings(options) {
  const settings = Object.assign({
    replacements: {}, // key: function(item, key){return replacement;}
    format: DomElementSettings(),
    items: []
  }, options)

  return settings
}

/**
* @public
* @param {Partial<import('./types/ts/index.js').DomElementSettings>[]} settingsArr
* @param {Partial<import('./types/ts/index.js').DomElementSettings>} defaults
* @return {HTMLElement[]}
*/
export function createElements(settingsArr, defaults) {
  const elements = settingsArr.map(function (settings) {
    if (defaults) {
      settings = combineObjects([settingsArr, defaults])
    }

    return createElement(settings)
  })
  return elements
}

/**
* @public
* @param {Partial<import('./types/ts/index.js').DomElementSettings>} options
* @return {HTMLElement}
*/
export function createElement(options) {
  const settings = DomElementSettings(options)
  const el = document.createElement(settings.tag)
  setAttributes(el, settings.attributes)
  _setEvents(el, settings.events)

  // Nesting
  if (settings.children.length > 0) {
    _setChildren(el, settings.children)
  } else if (settings.innerHTML !== '') {
    el.innerHTML = settings.innerHTML
  } else {
    el.textContent = settings.textContent
  }

  return el
}

/**
* Helper for applying array of items to element settings.
* @public
* @param {import('./types/ts/index.js').DomElementSettings} settings
* @param {Partial<import('./types/ts/index.js').ChildrenSettings>} childrenOptions
*/
export function setChildrenSettings(settings, childrenOptions) {
  const childrenSettings = ChildrenSettings(childrenOptions)
  settings.children = _handleChildrenReplacements(childrenSettings)
  return settings.children
}

/**
* @public
* @example createTable([[1, 2][3, 4]])
* @param {Array<string[]>} rows
* @return {HTMLTableElement}
*/
export function createTable(rows) {
  const table = document.createElement('table')
  let cols
  for (let i = 0; i < rows.length; i++) {
    let tr = document.createElement('tr')
    cols = rows[i]

    for (let j = 0; j < cols.length; j++) {
      let td = document.createElement('td')
      td.innerHTML = cols[j]

      tr.appendChild(td)
    }

    table.appendChild(tr)
  }

  return table
}

/**
* @public
* @example createElementList([{name: 'a', value: 'b'}])
* @param {import('./types/ts/index.js').NameValue[]} nameValues
* @return {HTMLUListElement}
*/
export function createElementList(nameValues) {
  const list = nameValues.map(function (nameValue) {
    const elementSettings = nameValue.value

    // Element
    const el = createElement(elementSettings)

    return {
      name: nameValue.name,
      value: el
    }
  })

  return createCommonList(list)
}

/**
* @example createKeyValueList({ name1: 'value1', name2: 'value2' })
* @param {Record<string, any>} obj
* @return {HTMLUListElement}
*/
export function createKeyValueList(obj) {
  // key: val => int: {name, value}
  const list = []

  for (let key in obj) {
    list.push({
      name: key,
      value: obj[key]
    })
  }

  return createCommonList(list)
}

/**
* @example createList(['a', 'b'])
* @param {(HTMLElement|string)[]} arr
* @return {HTMLUListElement}
*/
export function createList(arr) {
  const ul = document.createElement('ul')

  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li')
    const item = arr[i]

    // DOM
    if (typeof item === 'object' && item.nodeType) {
      li.appendChild(item)
    } else {
      li.innerHTML = String(item)
    }

    ul.appendChild(li)
  }

  return ul
}

/**
* @public
* @example createHeadedArrayElement()
* @param {((arr: any[]) => HTMLElement) | undefined} handle
* @param {string} headerText
* @param {(any[])} arr
* @return {HTMLDivElement}
*/
export function createHeadedArrayElement(handle = undefined, headerText, arr) {
  /*
  HEADER
  name: value
  ...

  <div>
    <h3>header</h3>
    ARRAY ELEMENT
  </div>
  */

  if (!handle) {
    /**
     * @param {any[]} arr
     */
    handle = function (arr) {
      const element = document.createElement('div')
      arr.forEach(i => element.textContent += String(i))
      return element
    }
  }

  const div = document.createElement('div')

  const header = document.createElement('h3')
  header.textContent = headerText
  header.style.textAlign = 'center'
  div.appendChild(header)

  const arrElement = handle(arr)
  div.appendChild(arrElement)

  return div
}

/**
* @public
* @param {string} header
* @param {string[]} arr
* @return {HTMLDivElement}
*/
export function createHeadedTable(header, arr) {
  return createHeadedArrayElement(createTable, header, arr)
}

/**
* @public
* @param {string} header
* @param {string[]} arr
* @return {HTMLDivElement}
*/
export function createHeadedList(header, arr) {
  return createHeadedArrayElement(createList, header, arr)
}

/**
* @public
* @param {string} header
* @param {object} obj
* @return {HTMLDivElement}
*/
export function createHeadedKeyValueList(header, obj) {
  return createHeadedArrayElement(createKeyValueList, header, Object.values(obj))
}

/**
* @public
* @param {Partial<import('./types/ts/index.js').MenuListSettings>} options
* @return {import('./types/ts/index.js').MenuListSettings}
*/
export function MenuListSettings(options = {}) {
  return Object.assign({
    items: [{
      type: '',
      click: () => { },
      text: '',
      id: '',
      class: '',
      empty: false,
      orientation: '' // vertical OR horizontal
    }],
    element: window.HTMLElement || undefined,
    isChild: false,
    hide: false,
    header: {
      text: '',
      id: ''
    }
  }, options)
}

/**
* Creates a list from settings + items.
* May include a header.
* Parent element is required to add header, etc.
* Parent element preferred rather than using returned element due to nested formatting possible.
* If id is included for item, anchor tag with id as id + _a is also included.
* @public
* @deprecated This function is bloated. Should standardize and use what is necessary.
* @param {HTMLElement} parentEl
* @param {import('./types/ts/index.js').MenuListSettings} settings
* @return {HTMLElement}
*/
export function setupMenuList(parentEl, settings) {
  // TODO: offer alternatives this function, including bootstrap, etc.
  /*
  <ul>
    <li><a>HEADER</a></li>
    <ul>...</ul>
  </ul>
  */

  const items = settings.items

  // Wrapper
  /**
   * @type {HTMLElement}
   */
  let ul
  if (settings.element) {
    ul = settings.element
    ul.innerHTML = ''
  } else {
    ul = document.createElement('ul')
  }

  // On hover
  if (settings.isChild) {
    parentEl.addEventListener('mouseover', function () {
      ul.style.display = 'block'
    })
    parentEl.addEventListener('mouseout', function () {
      ul.style.display = 'none'
    })
  }

  // Options
  if (settings.hide) {
    ul.style.display = 'none'
  }

  // Header
  if (settings.header) {
    const headerEl = document.createElement('a')
    if (settings.header.text) {
      headerEl.textContent = settings.header.text
    }
    if (settings.header.id) {
      headerEl.setAttribute('id', settings.header.id)
    }
    parentEl.appendChild(headerEl)
  }

  // Items
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const li = document.createElement('li')
    const a = document.createElement('a')

    // Text
    if (item.text) {
      a.textContent = item.text
    }

    // Id
    if (item.id) {
      li.setAttribute('id', item.id)
      a.setAttribute('id', item.id + '_a')
    }

    // Class
    if (item.class) {
      li.setAttribute('class', item.class)
    }

    // Event
    if (item.type === 'file') {
      setClickFileHandler(a, item.click)
    } else {
      a.addEventListener('click', item.click)
    }

    // Orientation
    if (item.orientation === 'vertical') {
      li.style.display = 'block'
      li.style.clear = 'both'
    } else {
      li.style.display = 'block'
      li.style.float = 'left'
    }

    if (!item.empty) {
      li.appendChild(a)
    }

    ul.appendChild(li)
  }

  if (!settings.element) {
    parentEl.appendChild(ul)
  }

  return ul
}

/**
* @public
* @param {(string|import('./types/ts/index.js').Link)[]} links
* @param {string} separator
* @return {HTMLSpanElement}
*/
export function createBreadcrumbList(links, separator) {
  if (!separator) {
    separator = ' > '
  }

  const list = document.createElement('span')
  for (let i = 0; i < links.length; i++) {
    const abstractLink = links[i]

    // Separator
    if (i > 0) {
      const separatorSpan = document.createElement('span')
      separatorSpan.textContent = separator
      list.appendChild(separatorSpan)
    }

    const span = document.createElement('span')

    // Simple link
    const link = typeof abstractLink === 'string' ? {
      text: abstractLink,
      url: ''
    } : abstractLink

    if (link.url) {
      const a = document.createElement('a')
      a.setAttribute('href', link.url)
      a.textContent = link.text
      span.appendChild(a)
    } else {
      span.textContent = link.text
    }

    list.appendChild(span)
  }

  return list
}

/**
* @public
* @param {import('./types/ts/index.js').NameValue[]} nameValues
* @return {HTMLDivElement}
*/
export function groupify(nameValues) {
  const wrapper = document.createElement('div')
  let el

  for (let i = 0; i < nameValues.length; i++) {
    el = createHeadedArrayElement(undefined, nameValues[i].name, nameValues[i].value)
    wrapper.appendChild(el)
  }

  return wrapper
}

/**
* @public
* @param {HTMLFormElement} form
*/
export function clearForm(form) {
  console.log('clearForm', form)
  const elements = /** @type {(HTMLInputElement|HTMLSelectElement)[]} */ (Array.from(form.elements))
  form.reset()

  /*
  Input:
  https://html.spec.whatwg.org/multipage/input.html#the-input-element
  table id=attr-input-type-keywords

  Select:
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/type
  https://html.spec.whatwg.org/multipage/form-elements.html#dom-select-type

  Textarea:
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
  https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element
  */
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    const type = ('type' in el) ? el.type.toLowerCase() : ''

    switch (type) {
      case 'text':
      case 'password':
      case 'textarea':
      case 'hidden': {
        const input = /** @type {HTMLInputElement} */ (el)
        input.value = ''
        input.defaultValue = ''
        break
      }
      case 'radio':
      case 'checkbox': {
        const checkedInput = /** @type {HTMLInputElement} */ (el)
        if (checkedInput.checked) {
          checkedInput.checked = false
        }
        break
      }
      case 'select-one':
      case 'select-multi': {
        const select = /** @type {HTMLSelectElement} */ (el)
        select.selectedIndex = -1
        break
      }
      default:
        break
    }
  }
}

/**
* @private
* @param {HTMLElement} el
* @param {Object<string, function(...any):void>} events
*/
export function _setEvents(el, events) {
  let event
  for (let key in events) {
    event = events[key]

    // String = DOM attribute based event
    if (typeof event === 'string') {
      el.setAttribute('on' + key, event)
    } else {
      el.addEventListener(key, event)
    }
  }
}

/**
* @private
* @param {HTMLElement} el
* @param {import('./types/ts/index.js').DomElementSettings[]} settingsArr
* @return {HTMLElement}
*/
export function _setChildren(el, settingsArr) {
  /**
   * @type {HTMLElement[]}
   */
  const children = []
  for (let i = 0; i < settingsArr.length; i++) {
    children.push(createElement(settingsArr[i]))
  }

  appendChildren(el, children)

  return el
}

/**
* @private
* @param {import('./types/ts/index.js').ChildrenSettings} childrenSettings
*/
export function _handleChildrenReplacements(childrenSettings) {
  const items = childrenSettings.items
  /**
   * @type {import('./types/ts/index.js').DomElementSettings[]}
   */
  const children = []

  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    children.push(_handleChildReplacements(item, childrenSettings.format, childrenSettings.replacements))
  }

  return children
}

/**
* @private
* @param {*} item
* @param {Partial<import('./types/ts/index.js').DomElementSettings>} format
* @param {Object<string, function(*, string):any>} replacements
*/
export function _handleChildReplacements(item, format, replacements) {
  const childSettings = DomElementSettings(format) // New child setting.
  childSettings.children = [] // Initialize because overwritten by format replacements.

  // Replaceable: tag, attribute values, textContent, innerHTML
  _applyObjectReplacement(childSettings, item, 'tag', replacements)
  _applyObjectReplacement(childSettings, item, 'textContent', replacements)
  _applyObjectReplacement(childSettings, item, 'innerHTML', replacements)

  for (let key in childSettings.attributes) {
    _applyObjectReplacement(childSettings.attributes, item, key, replacements)
  }

  if (format.children) {
    let cVal
    for (let i = 0; i < format.children.length; i++) {
      cVal = _handleChildReplacements(item, format.children[i], replacements)
      childSettings.children.push(cVal)
    }
  }

  return childSettings
}

/**
* @private
* @param {Record<string, (any|string|function():any)>} obj
* @param {*} item
* @param {keyof obj} elementPropKey
* @param {Record<string, (function(*, string):any)>} replacements
*/
export function _applyObjectReplacement(obj, item, elementPropKey, replacements) {
  for (let key in replacements) {
    if (obj[elementPropKey] === key) {
      obj[elementPropKey] = replacements[key](item, key)
    }
  }
}

/**
* @public
* @param {HTMLElement} el
* @param {HTMLElement[]} children
*/
export function appendChildren(el, children) {
  for (let i = 0; i < children.length; i++) {
    el.appendChild(children[i])
  }
}

/**
* @public
* @param {HTMLElement} el
* @param {Object<string, string>} attributes
*/
export function setAttributes(el, attributes) {
  for (let key in attributes) {
    el.setAttribute(key, attributes[key])
  }
}

/**
* @public
* @return {object}
*/
export function NameValue() {
  return {
    name: '',
    value: ''
  }
}

/**
* DOM list with name value pairs.
* Common in Android settings pages.
* @public
* @param {{name: string, value: string|HTMLElement}[]} arr
* @return {HTMLUListElement}
*/
export function createCommonList(arr) {
  /**
   * @type {HTMLSpanElement[]}
   */
  const list = []

  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i]
    const curVal = cur.value

    const item = document.createElement('span')

    let span = document.createElement('span')
    span.textContent = cur.name + ': '
    item.appendChild(span)

    span = document.createElement('span')
    if (curVal instanceof HTMLElement) {
      span.appendChild(curVal)
    } else {
      span.textContent = curVal
    }
    item.appendChild(span)

    list.push(item)
  }

  return createList(list)
}

/**
* @public
* @param {Partial<import('./types/ts/index.js').FormOptions>} options
* @return {import('./types/ts/index.js').FormOptions}
*/
export function FormOptions(options = {}) {
  return Object.assign({
    method: 'POST',
    action: '', // url OR function
    controls: {
      reset: true,
      submit: true
    }
  }, options)
}

/**
* @param {HTMLElement} el
* @param {Partial<import('./types/ts/index.js').FormOptions>} fOptions
* @return {HTMLFormElement}
*/
export function formify(el, fOptions) {
  const options = FormOptions(fOptions)
  let div, input

  // Wrap
  const form = document.createElement('form')
  form.appendChild(el)

  // Method
  form.setAttribute('method', options.method)

  // Action
  if (options.action) {
    if (typeof options.action === 'function') {
      const { action } = options
      form.addEventListener('submit', function (ev) {
        action(ev)

        ev.preventDefault()
        return false
      })
    } else {
      form.setAttribute('action', options.action)
    }
  }

  // Controls
  if (options.controls) {
    div = document.createElement('div')

    // Reset
    if (options.controls.reset) {
      input = document.createElement('input')
      input.setAttribute('type', 'reset')
      input.setAttribute('value', 'Reset')
      input.addEventListener('click', function (ev) {
        clearForm(form)

        ev.preventDefault()
        return false
      })
      div.appendChild(input)
    }

    // Submit
    if (options.controls.submit) {
      input = document.createElement('input')
      input.setAttribute('type', 'submit')
      input.setAttribute('value', 'Submit')
      div.appendChild(input)
    }

    form.appendChild(div)
  }

  return form
}

/**
* @public
* @param {HTMLElement} el
* @return {DOMRect}
*/
export function getElementScreenDimensions(el) {
  return el.getBoundingClientRect()
}

/**
* @public
* @param {HTMLElement} el
*/
export function getElementPageDimensions(el) {
  const rect = copyObjectData(el.getBoundingClientRect())
  rect.top = rect.top + window.pageYOffset
  rect.left = rect.left + window.pageXOffset
  rect.bottom = rect.top + rect.height
  rect.right = rect.left + rect.width

  return /** @type {import('./types/ts/index.js').CustomDOMRect} */ (rect)
}

/**
* @public
* @param {HTMLElement} el
* @param {any} position
*/
export function setStylePosition(el, position) {
  const allowed = ['top', 'right', 'bottom', 'left']
  setStyleMeasurements(el, position, allowed)
}

/**
* @public
* @param {HTMLElement} el
* @param {Record<keyof CSSStyleDeclaration, string|null>} dimensions
*/
export function setStyleDimensions(el, dimensions) {
  const allowed = ['top', 'right', 'bottom', 'left', 'width', 'height']
  setStyleMeasurements(el, dimensions, allowed)
}

/**
* @public
* @param {HTMLElement} el
* @param {Record<keyof CSSStyleDeclaration, string|null>} obj
* @param {string[]} allowed
* @param {string} [unit]
*/
export function setStyleMeasurements(el, obj, allowed, unit = undefined) {
  if (!unit) {
    unit = 'px'
  }
  const s = el.style
  for (let key in obj) {
    if (obj[key] === null) {
      continue
    }

    if (!allowed || allowed.indexOf(key) >= 0) {
      s[key] = obj[key] + unit
    }
  }
}

/**
* @public
* @param {Partial<import('./types/ts/index.js').Margins>} margins
* @param {import('./types/ts/index.js').CustomDOMRect} dimensions
*/
export function applyMarginsToDimensions(margins, dimensions) {
  const allowedMargins = ['top', 'left']
  const keys = /** @type {Array<keyof typeof margins>} */ (Object.keys(margins))
  keys.forEach(key => {
    if (allowedMargins.indexOf(key) >= 0 && exists(margins[key])) {
      const m = (/** @type {import('./types/ts/index.js').Margins} */ (margins));
      const margin = m[key];
      if (margin) {
        dimensions[key] += margin;
      }
    }
  })
}

/**
* @public
* @param {HTMLElement} el
* @param {object} dimensions
* @return {HTMLElement}
*/
export function displayElementAtScreenDimensions(el, dimensions) {
  // Must be added to DOM
  if (!el.parentElement) {
    document.body.appendChild(el)
  }

  const position = 'fixed'

  // Dimensions
  el.style.position = position
  setStylePosition(el, dimensions)

  // Continuous
  const handle = function () {
    if (!el.parentElement) {
      window.removeEventListener('scroll', handle)
    } else {
      displayElementAtScreenDimensions(el, dimensions)
    }
  }
  window.addEventListener('scroll', handle, true)

  return el
}

/**
* @public
* @param {HTMLElement} el
* @param {object} dimensions
* @return {HTMLElement}
*/
export function displayElementAtPageDimensions(el, dimensions) {
  // Must be added to DOM body
  if (el.parentElement !== document.body) {
    if (el.parentElement) {
      el.parentElement.removeChild(el)
    }

    document.body.appendChild(el)
  }

  const position = 'absolute'

  // Dimensions
  el.style.position = position
  setStylePosition(el, dimensions)

  return el
}

/**
* @public
* @param {HTMLElement} shownElement
* @param {HTMLElement} targetElement
* @param {Partial<import('./types/ts/index.js').Margins>} options
* @return {HTMLElement}
*/
export function showAboveElement(shownElement, targetElement, options) {
  if (!options) {
    options = { // Margins
      top: null,
      left: null
    }
  }

  // Shown element required css
  shownElement.style.position = 'fixed'

  // Dimensions
  const dimensions = getElementPageDimensions(targetElement)
  applyMarginsToDimensions(options, dimensions)

  // Display
  return displayElementAtPageDimensions(shownElement, dimensions)
}

/**
* @param {HTMLElement} element
* @param {function} handle
*/
export function watchDocumentSizeChanges(element, handle) {
  const height = element.offsetHeight
  const width = element.offsetWidth
  document.addEventListener('DOMSubtreeModified', function () {
    if (element.offsetHeight !== height || element.offsetWidth !== width) {
      handle(element)
    }
  })
}

/**
* @public
* @param {string} eventName
* @param {function} handle
*/
export function startWatchingHtmlElementListenerChanges(eventName, handle) {
  const p = /** @type {import('./types/ts/index.js').WatchedHTMLElement} */ (window.HTMLElement.prototype)

  if (!p.__listenerChangeHandles) { // TODO: Copy types?
    p.__listenerChangeHandles = {}

    /**
     * @param {string} type 
     * @param {*} args 
     */
    p.__handleEvent = function (type, args) {
      const prefix = '__'
      const listenerKey = ((type === 'add') ? 'addEventListener' : 'removeEventListener')
      const oldListenerKey = /** @type {keyof p} */ (prefix + listenerKey)
      const eventName = args[0]

      const handles = p.__listenerChangeHandles[eventName]
      for (let i = 0; i < handles.length; i++) {
        p[oldListenerKey].apply(this, args)
      }
    }

    p.__addEventListener = p.addEventListener
    /**
     * type {typeof Element.prototype.addEventListener}
     * @type {(eventName: string, handler: any, bubbling: boolean) => any}
     */
    p.addEventListener = function (eventName, handler, bubbling) {
      const type = 'add'
      return p.__handleEvent.apply(this, [type, arguments])
    }

    p.__removeEventListener = p.removeEventListener
    /**
     * type {typeof Element.prototype.removeEventListener}
     * @type {(eventName: string, handler: any, bubbling: boolean) => any}
     */
    p.removeEventListener = function (eventName, handler, bubbling) {
      const type = 'remove'
      return p.__handleEvent.apply(this, [type, arguments])
    }
  }

  if (!p.__listenerChangeHandles[eventName]) {
    p.__listenerChangeHandles[eventName] = []
  }

  p.__listenerChangeHandles[eventName].push(handle)
}

/**
* @public
* @param {string} eventName
* @param {function} handle
* @return {boolean}
*/
export function stopWatchingHtmlElementListenerChanges(eventName, handle) {
  const p = /** @type {import('./types/ts/index.js').WatchedHTMLElement} */ (window.HTMLElement.prototype)

  if (!p.__listenerChangeHandles) {
    return false
  }
  if (!p.__listenerChangeHandles[eventName]) {
    return false
  }

  const index = p.__listenerChangeHandles[eventName].indexOf(handle)
  if (index >= 0) {
    p.__listenerChangeHandles[eventName].splice(index, 1)
  }

  // Delete event array on all gone
  if (p.__listenerChangeHandles[eventName].length === 0) {
    delete p.__listenerChangeHandles[eventName]
  }

  // Delete objects on all gone
  if (Object.keys(p.__listenerChangeHandles).length === 0) {
    delete p.__listenerChangeHandles

    p.addEventListener = p.__addEventListener
    delete p.__addEventListener

    p.removeEventListener = p.__removeEventListener
    delete p.__removeEventListener
  }

  return true
}

/**
* @public
* @param {HTMLElement} el
* @return {string[]}
*/
export function getAvailableElementEvents(el) {
  // Don't use on anywhere because is easy to add "on".
  /**
   * @type {string[]}
   */
  const arr = []

  for (let key in el) {
    if (key.substr(0, 2) === 'on') {
      arr.push(key.substr(2))
    }
  }

  return arr
}

/**
* @public
* @param {HTMLElement} el
* @param {string[]} eventNames
*/
export function htmlifyEvents(el, eventNames) {
  /*
  There seems to be many plugins that duplicate an element or only take an HTML string.
  If events are placed beforehand then they are lost.
  */

  if (!eventNames) {
    eventNames = getAvailableElementEvents(el)
  }

  for (let i = 0; i < eventNames.length; i++) {
    htmlifyEvent(el, eventNames[i])
  }
}

/**
* @public
* @param {HTMLElement} el
* @param {string} eventName
*/
export function htmlifyEvent(el, eventName) {
  const key = '__htmlified_event_' + (Math.random() * 10000000)

  const event = new window.CustomEvent(eventName);
  (/** @type {any} */ (window))[key] = function () {
    // console.log('Sent event: ' + eventName)
    el.dispatchEvent(event)
  }

  el.setAttribute('on' + eventName, 'window["' + key + '"]()')
}

/**
* @public
* @param {HTMLElement} el
*/
export function getParents(el) {
  /**
   * @type {HTMLElement[]}
   */
  const parents = [] // From closest to furthest
  let nextParent = el.parentElement
  while (nextParent) {
    parents.push(nextParent)

    nextParent = nextParent.parentElement
  }

  return parents
}

/**
* @public
* @param {HTMLElement} el
* @param {string} selector
* @return {HTMLElement|null}
*/
export function getClosestParent(el, selector) {
  let parent = null
  const parents = getParents(el)
  for (let i = 0; i < parents.length; i++) {
    if (parents[i].matches(selector)) {
      parent = parents[i]
      break
    }
  }

  return parent
}

/**
* @public
*/
export function removeTabIndexes() {
  const elements = /** @type {HTMLElement[]} */ (getAllElements())
  for (let i = 0; i < elements.length; i++) {
    elements[i].tabIndex = -1
  }
}

/**
* @public
* @param {HTMLElement[]} elements
*/
export function setTabIndexes(elements) {
  // Sets in order
  for (let i = 0; i < elements.length; i++) {
    elements[i].tabIndex = i
  }
}

/**
* @public
* @param {string} selector
* @return {DocumentFragment|null}
*/
export function getHtmlImport(selector) {
  const links = document.querySelectorAll('link[rel="import"]')
  for (let i = 0; i < links.length; i++) {
    const link = /** @type {HTMLLinkElement & { import?: Element }} */ (links[i])
    const content = link.import
    if (!content) {
      throw new Error('link.import not supported')
    }
    const element = content.querySelector(selector)
    if (element && element instanceof HTMLTemplateElement) {
      const clone = document.importNode(element.content, true)
      return clone
    }
  }

  // FAILED
  return null
}

/**
* @public
* @param {string} id
* @return {HTMLElement|null|undefined}
*/
export function e(id) {
  const element = document.getElementById(id)
  return element
}

/**
* @public
* @param {string[]} ids
* @return {HTMLElement[]}
*/
export function getElementsByIds(ids) {
  /**
   * @type {HTMLElement[]}
   */
  const elements = []
  for (let i = 0; i < ids.length; i++) {
    const element = e(ids[i])
    if (element) {
      elements.push(element)
    }
  }

  return elements
}

/**
* @public
* @param {string[]} arr
* @return {HTMLUListElement}
*/
export function getDOMList(arr) {
  const listEl = document.createElement('ul')
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    const itemEl = document.createElement('li')
    itemEl.textContent = item
    listEl.appendChild(itemEl)
  }

  return listEl
}

/**
* @public
* @param {string} src
* @return {HTMLImageElement}
*/
export function getDOMImage(src) {
  const image = new window.Image()
  image.src = src
  return image
}

/**
* @public
* @param {HTMLInputElement[]} inputs
* @return {HTMLTableElement}
*/
export function getDOMInputsList(inputs) {
  const listEl = document.createElement('table')
  for (let i = 0; i < inputs.length; i++) {
    const inputRow = getDOMInputRow(inputs[i])
    listEl.appendChild(inputRow)
  }

  return listEl
}

/**
* @public
* @param {HTMLInputElement} input Must contain name and value properties.
* @return {HTMLTableRowElement}
*/
export function getDOMInputRow(input) { // TODO: Not HTMLInputElement? Fix all connected.
  /*
  Input: {
      name: "",
      value: ""
  }
  */

  const rowEl = document.createElement('tr')

  // Name
  const nameEl = document.createElement('th')
  nameEl.textContent = input.name
  rowEl.appendChild(nameEl)

  // Input Cell
  const inputCell = document.createElement('td')
  rowEl.appendChild(inputCell)

  // Input
  const inputEl = document.createElement('input')
  inputEl.value = input.value
  inputCell.appendChild(inputEl)

  return rowEl
}

/**
* @public
* @param {HTMLElement} el
* @param {function():void} onFileHandle
*/
export function setClickFileHandler(el, onFileHandle) {
  // Create input
  const fileEl = document.createElement('input')
  fileEl.style.position = 'absolute'
  fileEl.style.visibility = 'hidden'
  fileEl.setAttribute('type', 'file')
  fileEl.addEventListener('change', onFileHandle)

  // Append before el(to avoid overrite/otherwise add as child)
  if (el.parentElement) {
    el.parentElement.insertBefore(fileEl, el)
  } else {
    el.appendChild(fileEl)
  }

  // Apply on click
  el.addEventListener('click', function (ev) {
    // console.log(ev)
    if (ev.target !== el) {
      return false
    }
    ev.preventDefault()
    fileEl.click()
  }, true)
}

/**
* Goal:
* Use position to get DOM data.
* Would be used where position remains same but data can vary.
* @public
* @param {import('./types/ts/index.js').ElementPosition} elementPosition
* @return {string|null}
*/
export function getElementPositionData(elementPosition) {
  const p = elementPosition
  const el = p.element
  let defaultData = null
  let i, key

  if (!el) {
    return defaultData
  }

  if (p.type === 'tag') {
    return el.tagName
  }

  if (p.type === 'textContent') {
    return el.textContent
  }

  if (p.type === 'attributeKey' || p.type === 'attributeValue') {
    const attributes = getElementAttributes(el)

    i = 0
    for (key in attributes) {
      if (p.type === 'attributeKey' && elementPosition.attributeIndex === i) {
        return key
      }

      if (p.type === 'attributeValue' && elementPosition.attributeIndex === i) {
        return attributes[key]
      }
    }
  }

  return defaultData
}

/**
* Goal: Search for any format of data at once in DOM.
* Should only get direct parent of text nodes OR direct element.
* Should get position as best as possible so can replace if needed.
* @public
* @param {string} searchStr
* @param {Partial<import('./types/ts/index.js').DOMSearchSettings>} optionalType
* @param {HTMLElement|Document} el
* @return {import('./types/ts/index.js').ElementPosition[] | undefined}
*/
export function searchDom(searchStr, optionalType = {}, el = document) {
  const type = DOMSearchSettings(optionalType)
  const children = getAllChildren(el)
  /**
   * @type {import('./types/ts/index.js').ElementPosition[]}
   */
  const results = []

  for (let i = 0; i < children.length; i++) {
    const curEl = children[i]
    if (!(curEl instanceof HTMLElement)) {
      return
    }

    /**
     * @type {import('./types/ts/index.js').ElementPosition}
     */
    let elementPosition = {
      element: curEl,
      type: null,
      attributeIndex: 0,
      stringIndex: 0,
      stringLength: searchStr.length
    }

    if (type.tag) {
      if (curEl.tagName === searchStr) {
        elementPosition.type = 'tag'
        results.push(elementPosition)
        continue
      }
    }

    if (type.textContent) {
      if (curEl.children.length === 0 && curEl.textContent === searchStr) {
        elementPosition.type = 'textContent'
        results.push(elementPosition)
        continue
      }
    }

    if (type.attributeKey || type.attributeValue) {
      let attributes = getElementAttributes(curEl)
      let attributeIndex = 0

      for (let key in attributes) {
        if (type.attributeKey) {
          if (key === searchStr) {
            elementPosition.attributeIndex = attributeIndex
            elementPosition.type = 'attributeKey'
            results.push(elementPosition)
            continue
          }
        }

        if (type.attributeValue) {
          if (attributes[key] === searchStr) {
            elementPosition.attributeIndex = attributeIndex
            elementPosition.type = 'attributeValue'
            results.push(elementPosition)
            continue
          }
        }

        attributeIndex++
      }
    }

    if (type.handle) {
      elementPosition = type.handle(curEl)
      if (elementPosition) {
        results.push(elementPosition)
        continue
      }
    }
  }

  return results
}

/**
* @public
* @param {{key: string, value: *}[]} objectInfoArray
* @return {HTMLUListElement}
*/
export function arrayInputter(objectInfoArray) {
  const arr = objectInfoArray
  const ul = document.createElement('ul')

  for (let i = 0; i < arr.length; i++) {
    let objectInfo = arr[i]

    let li = document.createElement('li')

    let input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', objectInfo.key)
    input.value = objectInfo.value

    li.appendChild(input)

    ul.appendChild(li)
  }

  return ul
}

/**
* @public
* @param {Object<string, *>} obj
* @return {HTMLUListElement}
*/
export function nestedInputter(obj) {
  /*

  Data:
  key: value

  Layout:
  <ul>
    <li><span>[NAME]</span><span>[INPUT/recursive]</span>
    ...
  </ul>
  */

  const ul = document.createElement('ul')

  for (const key in obj) {
    const li = document.createElement('li')

    // name
    let span = document.createElement('span')
    span.textContent = key
    li.appendChild(span)

    // Value
    span = document.createElement('span')

    if (isObject(obj[key])) { // recursive
      span.appendChild(nestedInputter(obj[key]))
    } else { // input
      const input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.value = obj[key]

      span.appendChild(input)
    }

    ul.appendChild(li)
  }

  return ul
}

/**
* @public
* @param {HTMLElement} el
* @return {Node[]} Text node
*/
export function textNodesUnder(el) {
  let n
  const a = []
  const walk = document.createTreeWalker(el, window.NodeFilter.SHOW_TEXT, null)
  while ((n = walk.nextNode())) a.push(n)
  return a
}

/**
* @public
* @see https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors
* @param {string[]} selectors
* @param {Element|HTMLElement|Document} [baseElement]
* @return {Element[]}
*/
export function getElementsBySelectors(selectors, baseElement = document) {
  /**
   * @type {Element[]}
   */
  let elements = []

  selectors.forEach(selector => {
    const matchedElements = [...Array.from(baseElement.querySelectorAll(selector))]
    elements = elements.concat(matchedElements)
  })

  return elements
}

/**
* @public
* @param {string[]} selectors
* @param {HTMLElement|Document} [baseElement]
*/
export function getElementsMappedToSelectors(selectors, baseElement = document) {
  /**
   * @type {Object<string, HTMLElement[]>}
   */
  const selectorMap = {}

  selectors.forEach(selector => {
    let matchedElements = baseElement.querySelectorAll(selector)
    selectorMap[selector] = /** @type {HTMLElement[]} */ (Array.from(matchedElements))
  })

  return selectorMap
}

/**
* @public
* @return {Element[]}
*/
export function getAllElements() {
  return [...Array.from(document.body.getElementsByTagName('*'))]
}

/**
* @public
* @param {HTMLElement|Document} el
* @return {Element[]}
*/
export function getAllChildren(el) {
  return [...Array.from(el.getElementsByTagName('*'))]
}

/**
* @public
* @param {string} attr
* @return {HTMLElement[]}
*/
export function getElementsWithAttribute(attr) {
  return /** @type {HTMLElement[]} */ (getAllElements().filter(element => element.hasAttribute(attr) && element instanceof HTMLElement))
}

/**
* @public
* @param {HTMLElement} el
*/
export function getElementAttributes(el) {
  /**
   * @type {Object<string, string>}
   */
  const attr = {}
  const nodeMap = el.attributes
  for (let i = 0; i < nodeMap.length; i++) {
    attr[nodeMap[i].nodeName] = nodeMap[i].nodeValue || ''
  }

  return attr
}

/**
* @public
* @param {string} attr
* @param {string} value
* @return {string}
*/
export function getAttributeSelector(attr, value = '') {
  let selector = ''
  selector += '[' + attr
  if (exists(value)) {
    selector += '=' + value
  }
  selector += ']'

  return selector
}

/**
* @public
* @param {string} attr
* @param {string} value
* @return {NodeListOf<Element>}
*/
export function getElementsByAttribute(attr, value) {
  return document.querySelectorAll(getAttributeSelector(attr, value))
}

/**
* @public
* @param {Element|Document} el
* @param {string} attr
* @return {string[]}
*/
export function getNestedAttributeListFromElement(el, attr) {
  if (!el) {
    el = document
  }

  const elements = getElementsBySelectors([getAttributeSelector(attr)], el)
  return elements.map(function (val) {
    return val.getAttribute(attr) || ''
  }).filter(e => !e)
}

/**
* Sets as editable or non-editable.
* Adds/removes onChange event depending on edit mode.
* @param {HTMLElement} el
* @param {() => void} onChange
* @param {Boolean} bool
* @see https://stackoverflow.com/questions/8694054/onchange-event-with-contenteditable
*/
export function setElementAsEditable(el, onChange, bool) {
  // Ignore no change
  if (el.contentEditable === String(bool)) {
    return
  }
  el.contentEditable = String(bool)
  if (bool) {
    el.addEventListener('input', onChange)
    // el.addEventListener("DOMNodeInserted", onChange, false)
    // el.addEventListener("DOMNodeRemoved", onChange, false)
    // el.addEventListener("DOMCharacterDataModified", onChange, false) // Use this if input fails.
  } else {
    el.removeEventListener('input', onChange)
  }
}

/**
* @param {string} attr
* @param {boolean} bool
*/
export function setEditMode(attr, bool) {
  const elements = getElementsWithAttribute(attr)
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]

    // Set
    if (bool) {
      element.contentEditable = ''
    } else {
      element.removeAttribute('contentEditable')
    }
  }
}

/**
* @public
* @param {HTMLElement} el
*/
export function centerFixElement(el) {
  const s = el.style
  s.zIndex = String(Number.MAX_SAFE_INTEGER)
  s.position = 'fixed'
  s.top = '50%'
  s.left = '50%'
  s.transform = '(-50% -50%)'
}

/**
* @public
* @param {string} html
*/
export function convertTableHtmlToArray(html) {
  const element = document.createElement('div') // Wrapper
  element.innerHTML = html
  const table = element.getElementsByTagName('table')[0]
  const arr = convertTableElementToArray(table)

  return arr
}

/**
* @public
* @param {HTMLTableElement} table
*/
export function convertTableElementToArray(table) {
  const rows = table.getElementsByTagName('tr')
  return convertTableRowElementsToArray(Array.from(rows))
}

/**
* @public
* @param {HTMLTableRowElement[]} rows
*/
export function convertTableRowElementsToArray(rows) {
  /**
   * @type {string[][]}
   */
  const arr = []

  for (let i = 0; i < rows.length; i++) {
    // Expects children with text

    arr[i] = []

    const cells = rows[i].children
    for (let j = 0; j < cells.length; j++) {
      arr[i][j] = cells[j].innerHTML
    }
  }

  return arr
}

/**
* @public
* @param {Array<string[]>} arr
* @return {HTMLTableElement}
*/
export function convertArrToTableElement(arr) {
  let i, j

  const table = document.createElement('table')
  let tr, td

  for (i = 0; i < arr.length; i++) {
    tr = document.createElement('tr')
    for (j = 0; j < arr[i].length; j++) {
      td = document.createElement('td')
      td.innerHTML = arr[i][j]
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }

  return table
}

/**
* Makes setting element info chainable.
* TODO: Import native types and add to each below.
* @public
* @param {HTMLElement} el
* @return {Object} chainer with functions represeting properties/functions of element all returning chainer
*/
export function elementChainer(el) {
  /**
   * TODO: Override return type of function?
   * @template T Function being chained
   * @template U Returned chainer
   * Chained
   */

  /**
   * @type {Record<string, (...arg: any[]) => typeof chainer>}
   */
  const chainer = {
    /**
     * type {AddEventListener}
     */
    addEventListener: (event, handle, other) => {
      el.addEventListener(event, handle, other)
      return chainer
    },
    /**
     * type {(el: HTMLElement) => typeof chainer}
     * type {AppendChild}
     */
    appendChild: (child) => {
      el.appendChild(child)
      return chainer
    },
    /**
     * Function version of getter/setter.
     * @param {string} html 
     */
    innerHTML: (html) => {
      el.innerHTML = html
      return chainer
    },
    removeAttribute: (name) => {
      el.removeAttribute(name)
      return chainer
    },
    removeChild: (child) => {
      el.removeChild(child)
      return chainer
    },
    removeEventListener: (event, handle) => {
      el.removeEventListener(event, handle)
      return chainer
    },
    replaceChild: (newChild, oldChild) => {
      el.replaceChild(newChild, oldChild)
      return chainer
    },
    setAttribute: (name, val) => {
      el.setAttribute(name, val)
      return chainer
    },
    /**
     * Function version of style object.
     * param {keyof HTMLElement['style']} key TODO: Omit read-only length, parentRule
     * @param {string} val
     */
    style: (key, val) => {
      el.style[key] = val
      return chainer
    },
    /**
     * Function version of getter/setter.
     * @param {string} str 
     */
    textContent: (str) => {
      el.textContent = str
      return chainer
    },
    /**
     * Function version of getter/setter.
     * @param {string} str 
     */
    title: (str) => {
      el.title = str
      return chainer
    }
  }

  return chainer
}


/**
* Gets bounding rect of all DOM.
* Usually, checking the size of "body" is enough. However, static, aboslute elements and badly cleared elements may cause the size of body to be different.
* This function gets the bounding rect by checking each element.
*/
export function getUsedDOMBoundingRect() {
  const elements = Array.from(document.querySelectorAll('*'))
  return getElementsBoundingRect(elements)
}

/**
* Same as normal get bounding rect, but treats multiple elements as a single group.
* @param {Element[]} elements
*/
export function getElementsBoundingRect(elements) {
  const rect = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
  }
  elements.forEach(element => {
    const curRect = element.getBoundingClientRect()
    /**
    * Relative to document: https://stackoverflow.com/a/18673641/1764521
    */
    const curRectD = {
      top: curRect.top + document.documentElement.scrollTop,
      right: curRect.right + document.documentElement.scrollLeft,
      bottom: curRect.bottom + document.documentElement.scrollTop,
      left: curRect.left + document.documentElement.scrollLeft,
      width: curRect.width,
      height: curRect.height,
    }
    if (curRectD.top < rect.top) rect.top = curRectD.top
    if (curRectD.right > rect.right) rect.right = curRectD.right
    if (curRectD.bottom > rect.bottom) rect.bottom = curRectD.bottom
    if (curRectD.left < rect.left) rect.left = curRectD.left

  })
  rect.width = rect.right - rect.left
  rect.height = rect.bottom - rect.top

  return rect
}

/**
* Attempts to update nested textContent.
* Usually if element.textContent = '...' is used, any nested elements will be overwritten.
* Sometimes this is not desired, and any nested might not be known or may change.
* This function attempts to update the textContent by checking for any elements with ONLY the same text, no nested elements, and then updating that element's textContent if the element exists.
* @param {Element} element
* @param {string} textContent
*/
export function attemptUpdateNestedTextContent(element, textContent) {
  const candidates = [element, Array.from(element.querySelectorAll('*'))]
  for (let i = 0; i < candidates.length; i++) {
    const candidate = /** @type {HTMLElement} */ (candidates[i])
    if (candidate.children.length === 0 && candidate.textContent === element.textContent) {
      candidate.textContent = textContent
      return true
    }
  }
  return false
}

/**
 * @param {string} src
 * @param {string} selector
 * @return {() => void}
 */
export function createIframeLoader(src, selector) {
  return () => {
    const destination = document.querySelector(selector)
    if (!destination) {
      throw new Error(`No destination element with selector: ${selector}`)
    }
    const iframe = document.createElement('iframe')
    iframe.src = src
    destination.appendChild(iframe)
  }
}
