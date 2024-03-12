
/**
 * @return {import('./types/ts/index.js').StringPosition}
 */
function stringPosition() {
  return {
    startIndex: -1,
    endIndex: -1,
    value: ''
  }
}



/**
 * @return {import('./types/ts/index.js').LogOptions}
 */
function logOptions() {
  return {
    prettify: false,
    title: '',
    beforeLog: null,
    afterLog: null,
    type: 'log' // console functions: log, info, warn, error, ...
  }
}


/**
 * Base utility file.
 * Should not be dependent on code outside this file.
 */

/**
 * Gets wrapped strings from string.
 * Examples: XML TAGS <>, double quotes "", mustache {{}}...
 *
 * @param {String} str
 * @param {String} wrapperOpen
 * @param {String} wrapperClose
 * @param {Boolean} keepWrapper Include wrapper in output
 * @param {Boolean} useClosingTagEnd Allows for things like {{{a}}} > {a} instead of {a
 * @return {string[]} Array of detected wrapped strings
 */
export function getWrappedStrings(
  str,
  wrapperOpen,
  wrapperClose,
  keepWrapper = false,
  useClosingTagEnd = false
) {
  /**
   * @type {string[]}
   */
  const strings = []

  const status = {
    currentString: '',
    inWrap: false
  }

  let i = 0
  while (i < str.length) {
    if (status.inWrap) {
      if (
        (!useClosingTagEnd ||
          str.substr(i + 1, wrapperClose.length) !== wrapperClose) &&
        str.substr(i, wrapperClose.length) === wrapperClose
      ) {
        if (keepWrapper) {
          status.currentString =
            wrapperOpen + status.currentString + wrapperClose
        }
        strings.push(status.currentString)

        status.currentString = ''
        status.inWrap = false
        i += wrapperClose.length
      } else {
        status.currentString += str[i]
        i++
      }
    } else {
      if (str.substr(i, wrapperOpen.length) === wrapperOpen) {
        status.inWrap = true
        i += wrapperOpen.length
      } else {
        i++
      }
    }
  }

  return strings
}

/**
 * For checking async functionality.
 * Try to add randomization for better testing.
 *
 * @param {Function} callback
 */
export function asyncCheck(callback) {
  const ms = Math.ceil(Math.random() * 10)
  window.setTimeout(function () {
    const returnVal = 'check ok'
    callback(returnVal)
  }, ms)
}

/**
 * Turns a function handling a callback into a promise.
 * TODO: Needs a check.
 *
 * @param {Function} handle
 * @param {*[]} args
 * @param {number} resolveIndex
 * @return {Promise<*>}
 */
export function promisify(handle, args, resolveIndex) {
  const oldHandle = handle
  const oldCallback = args[resolveIndex]
  const promise = new Promise((resolve) => {
    /**
     * @param  {...any} args 
     */
    args[resolveIndex] = function (...args) {
      // @ts-ignore
      resolve(...args)
    }

    // oldHandle.apply(this, args)
    oldHandle(...args)
  })
  promise.then((successValue) => {
    oldCallback(successValue)
  })

  return promise
}

/**
 * Handles multiple async functions.
 * TODO: Needs checking!!(handle, status.current positioning looks iffy.)
 *
 * @param {import('./types/ts/index.js').AsyncHandlerItem[]} arr Array of items. See code.
 * @param {Function} onEnd
 * @return {Boolean}
 */
export function asyncHandler(arr, onEnd) {
  /**
   * @type {import('./types/ts/index.js').AsyncHandlerStatus}
   */
  const status = {
    current: 0,
    total: arr.length,
    returned: []
  }

  const handle = function () {
    const item = arr[status.current]

    // Finished
    if (!item) {
      onEnd(status.returned)
      return false
    }

    const index = status.current
    item.index = index

    item.args[item.callbackParamIndex] = function () {
      status.returned[index] = arguments

      handle()
    }

    if (item.handle) {
      // @ts-ignore
      item.handle(...item.args) // TODO: Why expecting at least 1 argument?
    }

    status.current++

    return true
  }

  // Start execution
  return handle()
}

/**
 * Checks if number equals each other including NaN
 *
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */
export function equals(a, b) {
  /*
  Required because NaN !== NaN:
  var i = document.createElement("input"); i.valueAsNumber === i.valueAsNumber;
  https://stackoverflow.com/questions/19955898/why-is-nan-nan-false
  */

  if (Number.isNaN(a)) {
    return Number.isNaN(b)
  } else {
    return a === b
  }
}

/**
 * Checks if 2 arrays equal eachother in value(NOT REFERENCE).
 * DOES NOT WORK ON NESTED ARRAYS. USE Utility.objectDataEquals for that.
 *
 * @param {*[]} a
 * @param {*[]} b
 * @return {Boolean}
 */
export function arrayEquals(a, b) {
  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i++) {
    if (!equals(a[i], b[i])) {
      return false
    }
  }

  // PASSED
  return true
}

/**
 * Checks if no data exists
 * Differs from falsy, as only checks for non-value data.
 * For example "" is a valid string, 0 is a valid number, false is a valid boolean.
 *
 * @param {*} data
 * @return {Boolean}
 */
export function exists(data) {
  // More useful data check than "==" OR !!
  return !(data === null || data === undefined)
}

/**
 * @param {import('./types/ts/index.js').Dimensions} dimensions
 * @return {string}
 */
export function buildMediaQuery(dimensions) {
  const d = dimensions
  /**
   * @type {string[]}
   */
  const parts = []
  if (exists(d.width) && exists(d.width.min)) {
    parts.push('min-width: ' + d.width.min + 'px')
  }
  if (exists(d.width) && exists(d.width.max)) {
    parts.push('max-width: ' + d.width.max + 'px')
  }
  if (exists(d.height) && exists(d.height.min)) {
    parts.push('min-height: ' + d.height.min + 'px')
  }
  if (exists(d.height) && exists(d.height.max)) {
    parts.push('max-height: ' + d.height.max + 'px')
  }

  let query = ''
  for (let i = 0; i < parts.length; i++) {
    if (i > 0) {
      query += ' AND '
    }

    query += '(' + parts[i] + ')'
  }

  return query
}

/**
 * Asks for print. Not really needed. Should remove later.
 * @deprecated
 */
export function promptPrint() {
  window.print()
}

/**
 * Logging function that won't cause error if does not exist, and includes some options.
 *
 * @param {any} data
 * @param {import('./types/ts/index.js').LogOptions|undefined} options See link
 * @see https://developers.google.com/web/tools/chrome-devtools/console/console-write#styling_console_output_with_css
 */
export function log(data, options = undefined) {
  if (!options) {
    options = logOptions()
  }

  if (!window.console) {
    return false
  }

  /**
   * @type {import('./types/ts/index.js').ConsoleLogType}
   */
  let type = 'log'
  if (options.type && options.type in window.console) {
    type = options.type
  }

  // Prettify
  if (options.prettify) {
    options.beforeLog = function () {
      window.console.log('')
    }
  }

  if (options.beforeLog) {
    options.beforeLog(data)
  }
  if (options.title) {
    window.console.log(options.title)
  }
  window.console[type](data)
  if (options.afterLog) {
    options.afterLog(data)
  }
}

/**
 * Gets dataURL extension
 *
 * @param {String} dataUrl
 * @return {String}
 */
export function getDataUrlExtension(dataUrl) {
  return dataUrl.split(';')[0].split('/')[1]
}

/**
 * Download data
 *
 * @param {any} data
 * @param {String} name
 * @param {String} mimeType
 */
export function download(data, name, mimeType) {
  const blob = new window.Blob([data], {
    type: mimeType
  })
  return downloadBlob(blob, name)
}

/**
 * Downloads the current HTML page
 */
export function downloadCurrentPage() {
  const data = document.documentElement.innerHTML
  const fileName = getFileName(window.location.href)
  return download(data, fileName, 'text/html')
}

/**
 * Gets file name from url
 * Does not distinguish file extensions.
 *
 * @param {String} url
 * @return {String} file name
 */
export function getFileName(url) {
  const f = failOnFalsy
  const noFragment = f(url.split('#')).shift() || ''
  const noArguments = f(noFragment.split('?')).shift() || ''
  const onlyLastRoute = f(noArguments.split('/')).pop() || ''
  return onlyLastRoute
}

/**
 * Gets file extension from url
 *
 * @param {String} url
 * @return {String} file extension
 */
export function getFileExtension(url) {
  const parts = url.split('.')
  const ext = parts[parts.length - 1] || ''
  return ext
}

/**
 * Downloads file from dataURL
 *
 * @param {String} dataUrl
 * @param {String} name
 */
export function downloadDataUrl(dataUrl, name) {
  const url = dataUrl.replace(
    /^data:image\/[^;]/,
    'data:application/octet-stream'
  )
  const extension = getDataUrlExtension(dataUrl)
  const fullName = name + '.' + extension
  downloadLink(url, fullName)
}

/**
 * Causes execution of blob.
 * May be blocked by browser(especially when multiple downloads occur.)
 *
 * @param {Blob} blob
 * @param {String} name
 */
export function downloadBlob(blob, name) {
  // CREATE URL ELEMENT
  const url = window.URL.createObjectURL(blob)

  // EXTENSION
  let extension
  if (blob.type) {
    extension = blob.type.split('/')[1]
  } else {
    extension = 'txt'
  }

  // FULL NAME
  const fullName = name + '.' + extension

  // Internet Explorer
  const n = /** @type {Navigator & { msSaveBlob?: (blob: Blob, name: string) => void }} */ (navigator)
  if (n.msSaveBlob) {
    n.msSaveBlob(blob, fullName)
  } else {
    // Other
    downloadLink(url, fullName)
  }

  // COMPLETE
  return true
}

/**
* @example downloadBlobURL(document.querySelector('video').getAttribute('src'))
* @param {string} blobURL
*/
export function downloadBlobURL(blobURL, name = 'data') {
  const link = document.createElement('a');
  link.href = blobURL;
  link.download = name;

  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  );
}

/**
 * Downloads link
 * CAUTION. Not working for cross domain urls.
 * CAUTION. Max 10 downloads at once(occurred in Chrome).
 *
 * @param {String} url
 * @param {String} fullName
 */
export function downloadLink(url, fullName) {
  // CREATE LINK
  const link = window.document.createElement('a')
  link.href = url
  link.target = '_blank' // Opens in separate tab if same domain.
  link.download = fullName

  // Need to append child in Firefox
  document.body.appendChild(link)

  // EXECUTE LINK
  link.click()
  /*
      //Doesn't work in Firefox
      var click = document.createEvent("Event");
      click.initEvent("click", true, true);
      link.dispatchEvent(click);
      */

  // Remove Link
  if (link.parentElement) {
    link.parentElement.removeChild(link)
  }
}

/**
 * Safely attempts to JSON parse data.
 * Always returns an object.
 *
 * @param {*} data JSON parseable data
 * @param {Function|undefined} onError optional error handler
 * @return {Object}
 */
export function toObject(data, onError = undefined) {
  let obj = {}

  try {
    const tempObj = parseJson(data)
    if (!tempObj) {
      throw new Error('ParseJSON failed')
    }
    obj = tempObj
  } catch (err) {
    if (onError) {
      onError(err)
    }
  }

  return obj
}

/**
 * Parses JSON data that may be in JS format.
 * Example: {a: 1} instead of {"a": 1}.
 * Because this uses eval, should never use user entered data!
 *
 * @param {String} str
 * @return {Object}
 */
export function parseFuzzyJson(str) {
  let obj

  // Try standard JSON
  obj = parseJson(str)
  if (obj === null) {
    // Non-sandboxed(DON'T USE USER CONTENT! DANGEROUS!)
    try {
      obj = eval('(' + str + ')') // eslint-disable-line no-eval
    } catch (err) {
      obj = null
    } finally {
      //
    }
  }

  return obj
}

/**
 * With no errors + checks for support.
 * Returns null on bad.
 *
 * @param {String} str
 * @return {Object|null}
 */
export function parseJson(str) {
  if (!window.JSON) {
    return null
  }

  try {
    const json = JSON.parse(str)
    return json
  } catch (err) {
    return null
  }
}

/**
 * Attempts to stringify json object
 *
 * @param {String} jsonObj
 * @return {String|null}
 */
export function stringifyJson(jsonObj) {
  if (!window.JSON) {
    return null
  }

  try {
    const str = JSON.stringify(jsonObj)
    return str
  } catch (err) {
    return null
  }
}

/**
 * GETs multiple file data
 *
 * @param {string[]} urls
 * @param {Function} onData
 * @return {Promise<*[]>}
 */
export function loadFiles(urls, onData) {
  /**
   * @type {Promise<any>[]}
   */
  const promises = []
  for (let i = 0; i < urls.length; i++) {
    promises.push(
      new Promise(function (resolve) {
        loadFile(urls[i], function (data) {
          if (onData) {
            data = onData(data)
          }
          resolve(data)
        })
      })
    )
  }

  return Promise.all(promises)
}

/**
 * GETs file data
 *
 * @param {String} url
 * @param {function(*):void} callback
 * @param {(function(Error|any):void)|undefined} onError
 * @return {XMLHttpRequest}
 */
export function loadFile(url, callback, onError = undefined) {
  const xhttp = new window.XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback(xhttp.response)
    }
  }
  if (onError) {
    xhttp.addEventListener('error', onError)
  }
  xhttp.open('GET', url, true)
  xhttp.send()

  return xhttp
}

/**
 * Handles callback for functions that may have a callback.
 * @param {function(...*):*} callback
 * @param {*[]} args
 * @this {any}
 */
export function handleCallback(callback, args) {
  if (!callback) {
    return args[0]
  }

  return callback.apply(this, args)
}

/**
 * Downloads data
 *
 * @param {*} data
 * @param {String} name
 */
export function downloadData(data, name) {
  const downloadableData = data // Process here
  if (!name) {
    name = 'untitled'
  }
  return download(downloadableData, name, 'text/txt')
}

/**
 * Prompt handle.
 * Probably was supposed to be async but was moved elsewhere.
 * Should remove.
 *
 * @deprecated
 * @param {Function} handle
 * @param {String} text
 * @param {String} defaultText
 * @return {*}
 */
export function handlePrompt(handle, text, defaultText) {
  const value = window.prompt(text, defaultText)
  return handle(value)
}

/**
 * Gets current date. Not needed. Should remove.
 * @deprecated
 * @return {Date}
 */
export function getCurrentDate() {
  const date = new Date()
  return date
}

/**
 * Inserts delimiter at selected points in lenArr
 * Used for things like binary data splitting etc.
 *
 * @param {String} str
 * @param {String} delimiter
 * @param {number[]} lenArr
 * @return {String}
 */
export function getFormattedString(str, delimiter, lenArr) {
  // Ignore no formatting
  if (!delimiter || !lenArr || lenArr.length === 0) {
    return str
  }

  let returnStr = ''
  let curIndex = 0 // Same as done.
  // var remaining
  // var length = str.length

  for (let i = 0; i < lenArr.length; i++) {
    // Remaining digits
    // remaining = length - curIndex// NOT USED

    // Delimiter
    if (i > 0) {
      returnStr += delimiter
    }

    // Add data
    returnStr += str.substr(curIndex, lenArr[i])

    // Cur index
    curIndex += lenArr[i]
  }

  return returnStr
}

/**
 * Gets current location.
 * No need for separate function so should remove.
 *
 * @deprecated
 * @param {Function} callback
 */
export function getCurrentLocation(callback) {
  return navigator.geolocation.getCurrentPosition(function (pos) {
    callback(pos.coords.latitude, pos.coords.longitude)
  })
}

/**
 * Loads file data from input event.
 *
 * @param {DragEvent|Event} event
 * @param {Function} callback
 * @param {{method: import('./types/ts/index.js').FILE_READER_METHOD_NAMES}} options
 * @return {FileReader}
 */
export function loadFileInput(event, callback, options) {
  const noFilesError = () => {
    throw new Error('No files found')
  }
  /**
   * @type {File|null}
   */
  let file = null
  if (event instanceof DragEvent) {
    if (!(event.dataTransfer)) {
      return noFilesError()
    }
    let item = event.dataTransfer.files.item(0)
    if (!item) {
      return noFilesError()
    }
    file = item
  } else {
    if (!(event.target instanceof HTMLInputElement)) {
      return noFilesError()
    }
    if (!event.target.files || event.target.files.length === 0) {
      return noFilesError()
    }
    file = event.target.files[0]
  }
  if (!file) {
    return noFilesError()
  }

  const reader = new window.FileReader()
  reader.addEventListener('load', (event) => {
    const data = event.target ? event.target.result : undefined
    callback(data)
  })
  reader.addEventListener('error', (err) => {
    console.log(err)
  })

  reader[options.method](file)

  return reader
}

/**
 * Can be inaccurate in last row cell if includes line feeds.
 * Requires col count as line feeds allowed in cells.
 * Last cell needs to be split by lf.
 * Uses tabbed data: From spreadsheet, HTML table, etc.
 *
 * @param {String} data
 * @param {Number} colCount
 * @return {Array<never[]>|Array<string[]>}
 */
export function convertTabbedDataToArray(data, colCount) {
  /**
   * @type {Array<never[]>|Array<string[]>}
   */
  const arr = []
  const TAB = '\t'
  const LF = '\n'

  // Format
  const items1 = data.split(TAB)

  /**
   * @type {string[]}
   */
  const items = []
  for (let i = 0; i < items1.length; i++) {
    // Settings
    const firstEndCellIndex = colCount - 1
    const midCellColOver = (i - firstEndCellIndex) % (colCount - 1)
    const isStartCell = i === 0
    const isLastCell = i + 1 === items1.length
    const isFirstEndCell = !isLastCell && i === firstEndCellIndex
    const isMidEndCell = !isLastCell && !isStartCell && !isFirstEndCell && midCellColOver === 0
    const isMidStartCell = false // TODO: Not in use.

    if (
      isFirstEndCell || // row 1
      isMidEndCell // Mid row(smaller due to lf delimiter)
    ) {
      const split = items1[i].split(LF)
      items.push(split[0])
      items.push(split[1])
    } else if (isMidStartCell) {
      // Ignore mid first as already processed
      //
    } else {
      // Normal
      items.push(items1[i])
    }
  }

  for (let i = 0; i < items.length; i++) {
    const x = Math.floor(i / colCount)
    const y = i % colCount

    if (!arr[x]) {
      arr[x] = []
    }
    arr[x][y] = items[i]
  }

  return arr
}

/**
 * Replaces all occurrences of string.
 * No native function available of time of writing.
 * Usually done via global regex.
 *
 * @param {String} str
 * @param {String} find
 * @param {String} replace
 * @return {String} replace complete string
 */
export function replaceAll(str, find, replace) {
  return str.split(find).join(replace)
}

/**
 * @param {string} src
 * @param {HTMLElement} parent
 * @return {Promise<Event>}
 */
export function getLoadScriptHandle(src, parent) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', src)

    parent.appendChild(script)

    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)
  })
}

/**
 * @param {string} src
 * @param {HTMLElement} parent
 * @return {Promise<Event>}
 */
export function getLoadStyleSheetHandle(src, parent) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', src)

    parent.appendChild(link)

    if (link.onload !== undefined) {
      link.addEventListener('load', resolve)
      link.addEventListener('error', reject)
    } else {
      resolve(new Event('error'))
    }
  })
}

/**
 * @param {string} src
 * @param {HTMLElement} parent
 * @return {Promise<Event>}
 */
export function getLoadTemplateHandle(src, parent) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.setAttribute('rel', 'import')
    link.setAttribute('href', src)

    parent.appendChild(link)

    if (link.onload !== undefined) {
      link.addEventListener('load', resolve)
      link.addEventListener('error', reject)
    } else {
      resolve(new Event('error'))
    }
  })
}

/**
 * Loads array of url data with custom handle for handling urls
 * Removed: param {Boolean} optionsAbstract ordered default false because order not usually important.
 * @param {string[]} arr array of link href urls.
 * @param {function(string, HTMLElement):*} handle
 * @param {Partial<import('./types/ts/index.js').MultipleUrlLoadingOptions>} options
 * @return {Promise<*[]>}
 */
export function loadAbstractUrls(arr, handle, options = {}) {
  const ordered = options.ordered || false
  const parent = options.parent || document.body

  const handles = arr.map(src => {
    return () => {
      return handle(src, parent)
    }
  })
  return promiseAll(handles, ordered)
}

/**
 * Loads array of url data with css or js
 * @param {string[]} arr array of link href urls.
 * @param {Object} options See loadAbstractUrls
 * @return {Promise<*[]>}
 */
export function loadDependencyUrls(arr, options = {}) {
  /**
   * @param {string} src
   * @param {HTMLElement} parent
   * @return {Promise<Event>}
   */
  const handle = (src, parent) => {
    if (src.substr(-'.js'.length) === '.js') {
      return getLoadScriptHandle(src, parent)
    } else if (src.substr(-'.css'.length) === '.css') {
      return getLoadStyleSheetHandle(src, parent)
    } else if (src.substr(-'.html'.length) === '.html') {
      return getLoadTemplateHandle(src, parent)
    } else {
      return Promise.reject(
        new Error(`Invalid extension used for source: ${src}`)
      )
    }
  }
  return loadAbstractUrls(arr, handle, options)
}

/**
 * Loads style sheet
 * @param {string[]} arr array of link href urls.
 * @param {Object} optionsAbstract
 * @return {Promise<*[]>}
 */
export function loadStyleSheets(arr, optionsAbstract = {}) {
  return loadAbstractUrls(
    arr,
    getLoadStyleSheetHandle,
    optionsAbstract
  )
}

/**
 * Loads scripts(Injects script tag into DOM)
 * @param {string[]} arr array of script src urls.
 * @param {Object} optionsAbstract
 * @return {Promise<*[]>}
 */
export function loadScripts(arr, optionsAbstract = {}) {
  return loadAbstractUrls(
    arr,
    getLoadScriptHandle,
    optionsAbstract
  )
}

/**
 * Loads script tag with data(js, etc.)
 *
 * @param {String} data
 * @param {Function} onLoad
 * @return {HTMLElement} script tag
 */
export function loadScriptData(data, onLoad) {
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.innerHTML = data
  script.addEventListener('load', function () {
    if (onLoad) {
      onLoad(script)
    }
  })
  document.body.appendChild(script)

  return script
}

/**
 * Extracts words from camel case string.
 * Converts to lower case.
 * Should be accurately reversible format:
 * 1. No capital letter acronyms.
 * 2. One character words possible.
 *
 * @param {String} str
 * @return {string[]} array of separated strings
 */
export function camelCaseToArray(str) {
  /**
   * @type {string[]}
   */
  const arr = []
  let cur = null

  for (let i = 0; i < str.length; i++) {
    if (cur === null) {
      cur = 0
      arr[cur] = ''
    } // Initialize

    if (isCapitalLetter(str[i])) {
      cur++
      arr[cur] = ''
    }

    arr[cur] += str[i].toLowerCase()
  }

  return arr
}

/**
 * Checks if character is capital letter.
 * Will be true for non-ascii-letters.
 *
 * @param {String} char
 * @return {Boolean}
 */
export function isCapitalLetter(char) {
  if (char && char.toUpperCase() === char) {
    return true
  } else {
    return false
  }
}

/**
 * Capitalize word
 *
 * @param {String} str
 * @return {String}
 */
export function capitalize(str) {
  let firstChar = str.substr(0, 1)
  const otherChars = str.substr(1) || ''

  // Capitalize
  firstChar = firstChar.toUpperCase()

  // Add remaining
  str = firstChar + otherChars

  return str
}

/**
 * Gets index of value from variable that could be following: String, Number, Array, Object
 * Allows using object
 * @param {*} data
 * @param {*} find value searching for.
 * @return {string|number} index
 */
export function getIndexOf(data, find) {
  /**
   * @type {string|number}
   */
  let index = -1

  // Standard
  if (typeof data === 'string' || Array.isArray(data)) {
    index = data.indexOf(find)
  } else {
    // Object
    for (let key in data) {
      if (data[key] === find) {
        index = key
        break
      }
    }
  }

  return index
}

/**
 * Gets array of delimited string items
 *
 * @param {String} str
 * @param {String} format camelCase, any delimiter.
 * @return {string[]} array of delimited strings
 */
export function delimiterStringToArray(str, format) {
  let cHandle = null

  if (format === 'camelCase') {
    cHandle = camelCaseToArray
  } else {
    const del = format
    /**
     * @param {string} str
     */
    cHandle = function (str) {
      return str.split(del)
    }
  }

  return cHandle(str)
}

/**
 * Gets string similarity(0~1)
 *
 * @param {String} str1
 * @param {String} str2
 * @return {Number}
 */
export function getStringSimilarity(str1, str2) {
  /*
      Positive:
      1. Exact
      2. Includes exact
      3. Includes partial
      4. Similar size
      */

  // Exact
  if (str1 === str2) {
    return 1
  }

  // Weight based calculation
  const inclusion1 = getStringInclusionWeight(str1, str2)
  const inclusion2 = getStringInclusionWeight(str2, str1)
  const size = getNumberSimilarity(str1.length, str2.length)
  return (inclusion1 + inclusion2 + size) / 3
}

/**
 * Tests how closely str1 is included in str2.
 * Checking every permutation would be most accurate but would be severely risky on larger strings.
 *
 * @param {String} str1
 * @param {String} str2
 * @return {Number} (0~1)
 */
export function getStringInclusionWeight(str1, str2) {
  let foundStr = ''
  let cur

  for (let i = str1.length; i >= 1; i--) {
    cur = str1.substr(0, i)
    if (str2.indexOf(cur) >= 0) {
      foundStr = cur
      break
    }
  }
  const weight = getNumberSimilarity(foundStr.length, str2.length)

  return weight
}

/**
 * Gets number similarity relative to scale of numbers (0~1)
 *
 * @param {Number} num1
 * @param {Number} num2
 * @return {Number}
 */
export function getNumberSimilarity(num1, num2) {
  const max = getMax(num1, num2)
  const min = getMin(num1, num2)
  if (min === null || max === null) {
    throw new Error('Can get number similarity for invalid number')
  }
  const diff = max - min
  const bounds = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min) // Negative OK
  const signedBounds = min < 0 && max > 0 ? bounds * 2 : bounds // Double bounds for NEGATIVE AND POSITIVE

  return 1 - diff / signedBounds
}

/**
 * Gets max number from unlimited number of parameters
 *
 * @param {number[]} args Array of numbers
 * @return {Number|null}
 */
export function getMax(...args) {
  let max = null
  for (let i = 0; i < args.length; i++) {
    if (max === null || args[i] > max) {
      max = args[i]
    }
  }

  return max
}

/**
 * Gets min number from unlimited number of parameters
 *
 * @param {number[]} args Array of numbers
 * @return {Number|null}
 */
export function getMin(...args) {
  let min = null
  for (let i = 0; i < args.length; i++) {
    if (min === null || args[i] < min) {
      min = args[i]
    }
  }

  return min
}

/**
 * @param {string} str
 * @return {string}
 */
export function removeNonCharacters(str) {
  let returnStr = str

  // Outer
  returnStr = returnStr.trim()

  // Inner white space
  returnStr = replaceAll(returnStr, ' ', '')

  // Tabs + lf
  returnStr = replaceAll(returnStr, '\t', '')
  returnStr = replaceAll(returnStr, '\n', '')
  returnStr = replaceAll(returnStr, '\r', '')

  return returnStr
}

/**
 * Checks if is native function.
 * Native functions can not be accessed in certain ways.
 * For example, the contents can not be viewed.
 *
 * @param {Function} func
 * @return {boolean}
 */
export function isNativeFunction(func) {
  const str = func.toString()
  const trimmedStr = removeNonCharacters(str)
  const expected = '{[nativecode]}'

  return trimmedStr.substr(-expected.length, expected.length) === expected
}

/**
 * Takes functions(probably dependent on eachother)
 * and outputs string that can be copy + pasted.
 * @param {function[]} funcs array of functions
 * @return {string}
 */
export function buildFunctionModule(funcs) {
  let str = ''
  let func
  for (let i = 0; i < funcs.length; i++) {
    func = funcs[i]

    if (!isNativeFunction(func)) {
      str += func.toString()
    }
  }

  return str
}

/**
 * Usage: For distinguishing between log/non-log functions such as disallowing/allowing logging.
 * @param {Function} func
 * @return {boolean}
 */
export function isLogFunction(func) {
  /**
   * @type {function[]}
   */
  let logFunctions = [window.alert]
  if (window.console) {
    // https://developer.mozilla.org/en/docs/Web/API/console
    logFunctions = logFunctions.concat([
      console.trace,
      console.debug,
      console.info,
      console.log,
      console.error,
      console.warn
    ])
  }

  return logFunctions.indexOf(func) >= 0
}

/**
 * Gets stack info
 * Gets standard info from error object + more.
 * @return {Object} info
 */
export function getStackInfo() {
  /**
   * @type {import('./types/ts/index.js').StackInfo}
   */
  const info = {
    error: null,
    stack: '',
    function: null,
    stackParts: [],
    lineNumber: null,
    columnNumber: null
  }

  info.error = new Error()
  info.stack = info.error.stack ? info.error.stack : ''

  // Only works on Chrome so far
  if (info.stack.substr(0, 'Error'.length) === 'Error') {
    const s = info.stack
    const lines = s.split('\n')
    lines.forEach(function (line, key) {
      key = Number(key)

      if (key === 0) {
        return
      }

      /**
       * @type {import('./types/ts/index.js').StackPart}
       */
      const stackPart = {
        function: '',
        lineNumber: null,
        columnNumber: null
      }
      /**
       * @type {number}
       */
      const startIndex = line.indexOf('at') + 'at '.length // First index
      const lineInfo = line.substr(startIndex)
      const parts = lineInfo.split(' ')
      if (parts.length === 1) {
        parts.unshift('')
      }
      const detailsParts = parts[1].split(':')
      const columnNumber = detailsParts[2].split(')')[0]

      stackPart.function = parts[0]
      stackPart.lineNumber = Number(detailsParts[1])
      stackPart.columnNumber = Number(columnNumber)

      if (key === 1) {
        info.function = (stackPart.function) ? stackPart.function : ''
        info.lineNumber = stackPart.lineNumber
        info.columnNumber = stackPart.columnNumber
      }

      info.stackParts.push(stackPart)
    })
  }

  return info
}

/**
 * Loops class instance functions.
 * Ignores constructor.
 *
 * @param {import("./object-helpers.js").Dictionary} classInstance
 * @param {function(function(...*):any, string, Object<string, *>):void} onFunction
 */
export function loopClassFunctions(classInstance, onFunction) {
  loopClass(classInstance, (name) => {
    if (typeof classInstance[name] === 'function') {
      onFunction(classInstance[name], name, classInstance)
    }
  })
}

/**
 * Loops class instance properties.
 *
 * @param {import("./object-helpers.js").Dictionary} classInstance
 * @param {(property: string, name: string, classInstance: import('./object-helpers.js').Dictionary) => void} onProperty
 */
export function loopClassProperties(classInstance, onProperty) {
  loopClass(classInstance,
    /**
     * @param {string} name
     */
    (name) => {
      if (typeof classInstance[name] !== 'function') {
        onProperty(classInstance[name], name, classInstance)
      }
    })
}

/**
 * @param {object} classInstance
 * @param {function(string):void} onVariable
 */
export function loopClass(classInstance, onVariable) {
  for (let obj = classInstance; obj; obj = Object.getPrototypeOf(obj)) {
    // obj returning function under certain circumstances and leading to arguments being referenced below.
    // This causes an error in strict mode, so check added below.
    // getPrototypeOf returns function on static classes.
    // TODO: No need to loop past classInstance. Fix later.
    if (typeof obj !== 'object') {
      console.warn('type is not object. Check that static class was not passed.')
      continue
    }
    if (obj.constructor === window.Object) {
      continue
    }
    for (
      let names = Object.getOwnPropertyNames(obj), i = 0; i < names.length; i++
    ) {
      let name = names[i]
      if (name === 'constructor') {
        continue
      }
      onVariable(name)
    }
  }
}

/**
 * Loop static class methods.
 * TODO: 
 */
export function loopStaticClassMethods() {
  // TODO
}

/**
 * Binds class instance to all functions.
 * Used so no need to worry about using this in classes.
 *
 * @param {import("./object-helpers.js").Dictionary} classInstance
 */
export function bindClassThis(classInstance) {
  loopClassFunctions(classInstance, (value, name) => { // TODO: try with obj instead of same class instance.
    const variable = classInstance[name]
    classInstance[name] = variable.bind(classInstance)
  })
}

/**
 * @param {import("./object-helpers.js").Dictionary} classInstance
 * @param {function} constructor
 */
export function applyStaticFunctions(classInstance, constructor) {
  const staticFunctions = getStaticFunctions(constructor)
  for (let key in staticFunctions) {
    classInstance[key] = staticFunctions[key]
  }
}

/**
 * @param {*} constructor
 * @return {string[]}
 */
export function getStaticFunctionNames(constructor) {
  return Object.getOwnPropertyNames(constructor)
    .filter(prop => Object.prototype.hasOwnProperty.call(constructor, prop) && typeof constructor[prop] === 'function')
}

/**
 * @param {*} constructor
 */
export function getStaticFunctions(constructor) {
  const names = getStaticFunctionNames(constructor)
  return Object.fromEntries(names.map(name => {
    return [name, constructor[name]]
  }))
}

/**
 * Automatically performs number operation on each key in object.
 *
 * @param {Object<string, number>[]} objArr Array of objects containing numbers.
 */
export function reduceObjectArray(objArr) {
  /**
   * @type {Object<string, number>}
   */
  const returnObj = {}
  for (let i = 0; i < objArr.length; i++) {
    let obj = objArr[i]

    for (let key in obj) {
      if (returnObj[key] === undefined) {
        returnObj[key] = 0
      }

      returnObj[key] += obj[key]
    }
  }

  return returnObj
}

/**
 * 条件を間隔的に確認して、Trueになれば、resolveする。
 *
 * @param {Function} condition Booleanを返すFunction
 * @param {Number} pollInterval ms
 * @return {Promise<void>}
 */
export function waitFor(condition, pollInterval = 50) {
  if (condition()) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    /**
     * @type {undefined|number}
     */
    let id
    const onEnd = () => {
      window.clearInterval(id)
      resolve()
    }
    id = window.setInterval(() => {
      if (condition()) {
        onEnd()
      }
    }, pollInterval)
  })
}

/**
 * Sleeps for number of ms.
 * Does not make cpu sleep, just waits and allows other scripts to run.
 *
 * @param {Number} ms milliseconds
 * @return {Promise<void>}
 */
export function sleep(ms) {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms)
  })
}

/**
 * Clever event handling mechanism
 * Detects single mode or array mode by type of events[name]
 * Returns single or array based on single mode type
 *
 * @param {import("./object-helpers.js").Dictionary} events
 * @param {String} name
 * @param {*} data data passed to event
 * @param {Partial<import('./types/ts/index.js').EventOptions>} options
 * @return {*} Return data(single or array)
 */
export function handleEvent(events, name, data = undefined, options = {}) {
  const handleData = events[name]
  const spreadArgs = !!options.spreadArgs || false
  const args = (spreadArgs && Array.isArray(data)) ? [...data] : [data]

  // No handle
  if (!handleData) {
    return null
  } else if (typeof handleData === 'function') {
    // Single handle
    return handleData(...args)
  } else if (Array.isArray(handleData)) {
    // Multiple handle
    const returnValues = handleData.map(handle => {
      return handle(...args)
    })
    return returnValues
  } else {
    // Invalid
    return null
  }
}

/**
 * Merges events based on handleEvent format.
 * @param {Object} events1
 * @param {Object} events2
 * @return {Object} merged events object
 */
export function mergeEventsObject(events1, events2) {
  /**
   * @type {object}
   */
  const events = {}

  /**
   * @param {*} val
   * @return {*[]}
   */
  const forceArray = val => {
    // Standardize empty
    if (!val) {
      val = []
    }

    // Standardize single
    if (!Array.isArray(val)) {
      val = [val]
    }

    return val
  }

  /**
   * @param {import("./object-helpers.js").Dictionary} from
   * @param {import("./object-helpers.js").Dictionary} to
   */
  const mergeEvents = (from, to) => {
    for (let key in from) {
      const fromEvents = forceArray(from[key])
      to[key] = forceArray(to[key])

      fromEvents.forEach(event => [
        to[key].push(event)
      ])
    }
  }
  mergeEvents(events1, events)
  mergeEvents(events2, events)
  return events
}

/**
 * Converts URL to blob.
 * Should work on any kind of media.
 *
 * @param {String} url
 * @return {Promise<*>}
 */
export function urlToBlob(url) {
  return new Promise((resolve, reject) => {
    // HTML5(DataURL)
    if (
      url.substr(0, 'data:'.length) === 'data:' &&
      window.ArrayBuffer &&
      window.Uint8Array
    ) {
      // example:
      // data:image/png;base64,iVBORw0....
      const byteString = window.atob(url.split(',')[1])
      const mimeString = url
        .split(',')[0] // data:image/png;base64
        .split(':')[1] // image/png;base64
        .split(';')[0] // image/png

      const arrayBuffer = new window.ArrayBuffer(byteString.length)
      const intArray = new window.Uint8Array(arrayBuffer)
      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i)
      }

      const blob = new window.Blob([arrayBuffer], {
        type: mimeString
      })
      return resolve(blob)
    }

    // Fallback(but may be blocked)
    try {
      const xhr = new window.XMLHttpRequest()
      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.onerror = function (err) {
        reject(err)
      }
      xhr.onload = function () {
        const OK = 200
        if (xhr.status === OK) {
          resolve(xhr.response)
        } else {
          reject(new Error('xhr status error:' + xhr.statusText))
        }
      }
      xhr.send()
    } catch (err) {
      reject(/** @type {Error} */(err).message)
    }
  })
}

/**
 * Sets timeout.
 * For promises.
 * Reports as soon as timeout ends.
 * Caution: Difficult to cancel out of promise, so only should be used for reporting and where can let promise finish.
 * timeout(promise, 1000).catch(console.error);
 *
 * @param {Promise<*>} promise
 * @param {Number} ms
 * @return {Promise<*>}
 * @see https://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved?noredirect=1&lq=1
 * @see https://stackoverflow.com/questions/35716275/how-to-tell-if-a-promise-is-resolved
 */
export function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    /**
     * @param {*} data
     */
    const onEnd = data => {
      resolve(data)
    }

    const onTimeout = () => {
      reject(new Error('timed out'))
    }

    promise.then(onEnd)
    sleep(ms).then(onTimeout)
  })
}

/**
 * Gets array of promises by status from array.
 * Main use is for early exit of Promise.all where need to get what completed.
 * @param {Promise<*>[]} promises
 * @param {Boolean} resolved (resolved = true. rejected = false)
 * @return {Promise<Promise<boolean>[]>} resolves array of promises
 */
export function getPromisesByState(promises, resolved = false) {
  /**
   * @param {Promise<*>} promise
   * @return {Promise<boolean>}
   */
  const checkPromise = promise => {
    return new Promise(resolve => {
      let bool = false
      promise.then(() => {
        bool = true
      })
      window.setTimeout(() => {
        resolve(bool)
      }, 1)
    })
  }

  const checkPromises = promises.map(promise => checkPromise(promise))

  return Promise.all(checkPromises).then(boolArr => {
    /**
     * @type {Promise<*>[]}
     */
    const resolvedPromises = []
    boolArr.forEach((bool, index) => {
      if (resolved === bool) {
        resolvedPromises.push(promises[index])
      }
    })

    return resolvedPromises
  })
}

/**
 * Simple abstraction of Promise.all that takes handles instead and allows sequential execution.
 *
 * @param {(function():Promise<*>)[]} arr array of functions that should return promises.
 * @param {Boolean} ordered Whether to execute handles sequentially or in any order(fastest).
 * @return {Promise<*[]>}
 */
export function promiseAll(arr, ordered = false) {
  if (ordered) {
    if (arr.length === 0) {
      Promise.resolve([])
    }

    /**
     * @type {*[]}
     */
    const responses = []
    /**
     * @type {Promise<void|any[]>}
     */
    let p = Promise.resolve([])
    arr.forEach((handle, index) => {
      p = p.then(handle).then(response => {
        responses[index] = response
      })
    })
    return /** @type {Promise<*[]>} */ (p.then(() => {
      return responses
    }))
  } else {
    /**
     * @type {Promise<*>[]}
     */
    const promises = []
    arr.forEach(handle => {
      const promise = handle()
      promises.push(promise)
    })
    return Promise.all(promises)
  }
}

/**
 * Creates a data URI
 *
 * @param {String} data
 * @param {String} mimeType
 * @param {import("./object-helpers.js").Dictionary} options optional data outputted in format key=value;
 * @return {String}
 */
export function createDataURI(data, mimeType = 'text/plain', options = {}) {
  data = window.btoa(data)

  let str = 'data:'
  str += `${mimeType};`

  for (let key in options) {
    str += `${key}=${options[key]};`
  }

  str += 'base64,'

  str += `${data}`

  return str
}

/**
 * Compares a to b using comparator.
 * Used mainly for numbers, but usable on any variable, and is of use for strings too.
 * @param {*} a
 * @param {*} b
 * @param {String} comparator <= < = > >=
 * @return {boolean}
 */
export function compare(a, b, comparator = '=') {
  switch (comparator) {
    case '=':
      return a === b

    case '<':
      return a < b

    case '<=':
      return a <= b

    case '>':
      return a > b

    case '>=':
      return a >= b

    default:
      return false
  }
}

/**
 * Checks if string is minimized.
 * Can estimate if code is minimized.
 * Has margin of error so returns object with information and estimated boolean.
 * Space ratio: <2% <5% <10% Most likely minimized. >10% Most likely not minimized.
 * @param {String} str
 * @return {import('./types/ts/index.js').ProbabilityBoolean}
 */
export function isMinimzed(str) {
  /*
  NOTES
  Other possible ways of detecting being minimized:
  Length of variables.
  Ratio of characters to lines.
  */

  // Ranges in percentages
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
  ]
  const HIGHEST_TRUE_INDEX = 1 // LIKELY. Set low to make sure properly minimized.

  /**
   * @param {string} src
   * @param {string} find
   * @return {number}
   */
  const getCount = (src, find) => {
    return src.split(find).length - 1
  }
  const wsCount = getCount(str, ' ')
  const charCount = str.length

  const percentage = (wsCount / charCount) * 100

  /**
   * @type {number|null}
   */
  let firstPassIndex = null
  ranges.forEach((range, index) => {
    if (firstPassIndex !== null) {
      return
    }

    if (percentage < range.val) {
      firstPassIndex = index
    }
  })

  const level = (firstPassIndex !== null) ? ranges[Number(firstPassIndex)].key : 'UNLIKELY'
  const bool = (firstPassIndex !== null) ? firstPassIndex <= HIGHEST_TRUE_INDEX : false

  /**
   * @type {import('./types/ts/index.js').ProbabilityBoolean}
   */
  const returnObject = {
    percentage: percentage,
    level: level,
    bool: bool
  }

  return returnObject
}

/**
 * Checks for URL hash change including existing hash in URL at time of execution.
 * @param {String} value
 * @param {Function} func
 */
export function watchForHashValue(value, func) {
  /**
   * @param {string} url
   * @return {string}
   */
  const getUrlHash = (url) => {
    let hashStr = (new window.URL(url)).hash
    return (hashStr.length > 0) ? hashStr.substr(1) : ''
  }

  /**
   * @param {string} url
   */
  const check = (url) => {
    if (getUrlHash(url) === value) {
      func()
    }
  }

  // Immediate
  check(window.location.href)

  // Future
  window.addEventListener('hashchange', function (event) {
    check(event.newURL)
  })
}

/**
 * Scans string with function and returns results
 * @param {String} string
 * @param {Function} checker (char)=>{}
 * @return {import('./types/ts/index.js').StringPosition[]} Results array
 */
export function scanString(string, checker) {
  const resultsArray = []
  const length = string.length
  let status = stringPosition()
  let index = 0
  for (; index <= length; index++) {
    let char = string[index]

    let bool = checker(char, status)
    if (bool) {
      resultsArray.push(status)
      status = stringPosition()
    }
  }

  // Unfinished status
  if (status.startIndex !== -1) {
    status.endIndex = index
    resultsArray.push(status)
  }

  return resultsArray
}

/**
 * Replaces a string with values between specified start and end indexes.
 * This function aims to replace multiple parts of a same string string quickly.
 * Ranges of indexes should NOT overlap.
 * @param {String} string
 * @param {[string, number, number][]} indexes [['a', 1, 3], ['b', 5, 8], ...]
 * @param {Boolean} sortRequired If false, expects "start" index from low to high.
 * @return {String} replaced string
 */
export function replaceStringIndexes(string, indexes = [], sortRequired = true) {
  const VALUE_KEY = 0
  const START_INDEX_KEY = 1
  const END_INDEX_KEY = 2

  if (sortRequired) {
    indexes.sort((a, b) => {
      if (a[START_INDEX_KEY] < b[START_INDEX_KEY]) {
        return 1
      } else {
        return -1
      }
    })
  }

  const length = indexes.length
  let curEndIndex = 0
  let replacedString = ''
  for (let i = 0; i < length; i++) {
    const indexInfo = indexes[i]
    const startIndex = indexInfo[START_INDEX_KEY]
    const endIndex = indexInfo[END_INDEX_KEY]
    const value = indexInfo[VALUE_KEY]

    replacedString += string.substring(startIndex, endIndex) + value // Not including end index

    curEndIndex = endIndex
  }

  // Remaining
  if (curEndIndex < string.length) {
    replacedString += string.substr(curEndIndex)
  }

  return replacedString
}

/**
 * Replaces string between start and end index range(including start and end).
 * Usually faster than replacing with string.replace.
 * @param {String} string
 * @param {String} replacer
 * @param {Number} startIndex
 * @param {Number} endIndex
 * @return {String}
 */
export function replaceAt(string, replacer, startIndex, endIndex) {
  return string.substring(0, startIndex) + replacer + string.substring(endIndex)
}

/**
 * Generate random string
 * @param {Number} length
 * @return {String}
 */
export function generateRandomString(length = 0) {
  let string = ''
  const allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    string += allowed.charAt(Math.floor(Math.random() * allowed.length))
  }

  return string
}

/**
 * Fixes a tag security issues:
 * rel="noopener noreferrer"
 * @see https://developers.google.com/web/tools/lighthouse/audits/noopener
 */
export function fixPageAnchorTagSecurity() {
  const anchorList = [...Array.from(document.querySelectorAll('a'))]
  anchorList.forEach(a => {
    setSpaceDelimitedElementAttribute(a, 'rel', ['noopener', 'noreferrer'])
  })
}

/**
 * Sets element attribute like so while allowing existing: rel="val1 val2 valn ..."
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {string[]} values
 */
export function setSpaceDelimitedElementAttribute(element, attribute, values = []) {
  let attributeValues = failOnFalsy(element.getAttribute(attribute)).split(' ')
  values.forEach(value => {
    if (!attributeValues.includes(value)) {
      attributeValues.push(value)
    }
  })
  element.setAttribute(attribute, attributeValues.join(' '))
}

/**
 * @param {HTMLFormElement} form
 */
export function preventSubmit(form) {
  form.addEventListener('submit', ev => { ev.preventDefault() })
}

/**
 * @param {string} string
 * @param {number} fromIndex
 * @param {number} length
 * @param {string} replacement
 * TODO: Duplicate implementation. Check both and handle.
 */
export function replaceAt2(string, fromIndex, length, replacement) {
  const START_INDEX = 0
  const beforeLength = fromIndex
  const before = string.substr(START_INDEX, beforeLength)
  const after = string.substr(fromIndex + length)
  return `${before}${replacement}${after}`
}

/**
 * @param {string} html
 * @return {HTMLTemplateElement}
 */
export function toTemplate(html = '') {
  const template = document.createElement('template')
  template.innerHTML = html

  return template
}

/**
 * @param {string} text
 * @param {string} name
 * @param {string} value
 * @return {boolean}
 */
export function stringIncludesAttribute(text, name, value) {
  text = text.split(' ').join('')
  return text.includes(`${name}="${value}"`)
}

/**
 * Removes ranges of text using string.substring format.
 * Assumes ranges sorted from startIndex end to start.
 * @param {String} text
 * @param {import('./types/ts/index.js').ArrayRange[]} ranges
 * @return {String}
 */
export function removeSubstringRanges(text, ranges = []) {
  const START_INDEX = 0
  const END_INDEX = 1
  ranges.forEach(range => {
    let startIndex = range[START_INDEX]
    let endIndex = range[END_INDEX]
    let {
      length
    } = text.substring(startIndex, endIndex)
    text = text.slice(startIndex, length) // TODO: length to index?
  })
  return text
}

/**
 * Common format for setting up custom element.
 * Should only include important functionality such as rendering templates.
 * @param {import('./types/ts/index.js').CustomElement} customElement
 * @param {import('./types/ts/index.js').CustomElementOptions} options
 */
export function setupCustomElement(customElement, options = {}) {
  /**
   * @type {function(string):string}
   */
  const DEFAULT_RENDERER = (string) => string

  const renderer = options.renderer || DEFAULT_RENDERER
  const htmlData = options.htmlData || {}

  customElement.rawTemplate = options.html || '' // ONLY SET ONCE
  customElement.htmlData = htmlData // Because can be any HTML data, named html data.
  customElement.html = renderer(customElement.rawTemplate, customElement.htmlData) // MAY BE CHANGED LATER
  customElement.attachShadow({ // attaches .shadowRoot to customElement.
    mode: 'open'
  })

  /*
  Reference to element that can be used for queries.
  This is shadowRoot in web components.
  Set as element as common way to access even if NO shadow root offered.
  this.setAttribute etc. should be on this, not shadowRoot.
  */

  customElement.element = customElement.shadowRoot

  customElement.css = options.css || ''
  // customElement.css += css // GLOBAL CSS. SHOULD IMPROVE!!
  const styleTag = customElement.css ? `<style>${customElement.css}</style>` : ''

  if (customElement.shadowRoot) {
    customElement.shadowRoot.innerHTML = `${styleTag}${customElement.html}`
  }
}

/**
 * @param {string} item
 * @return {string}
 */
export function capitalizeFirstLetter(item) {
  /**
   * @param {string} char
   * @param {number} index
   * @return {string}
   */
  const capitalizeFirstIndex = (char, index) => {
    const FIRST_INDEX = 0
    return index === FIRST_INDEX ? char.toUpperCase() : char
  }
  return item.split('').map(capitalizeFirstIndex).join('')
}

/**
 * Takes array of strings(with specified delimiter) and makes all readable.
 * @param {string[]} array
 * @param {String} [delimiter='-']
 * @returns {Object}
 */
export function delimitedArrayToReadableStringMap(array, delimiter = '-') {
  /**
   * @type {Object<string, string>}
   */
  const object = {}
  array.forEach(item => {
    const key = item

    item = capitalizeFirstLetter(item)
    const parts = item.split(delimiter)
    const value = parts.join(' ')

    object[key] = value
  })
  return object
}


/**
 * Combines array of objects into one.
 *
 * @param {object[]} args Array, but may be arguments list(why here?). Multiple objects.
 * @return {Object}
 */
export function combineObjects(args) { // Multiple ob
  args = [...args] // Possible Arguments list to arguments casting.

  return Object.assign({}, ...args)
}

import * as BaseObjectHelper from './object-helpers.js'
// import BaseArrayHelper from './base-array-helper'

/*
This file is for utility functions only.
This file combines all base files functionality.
Functions should have no state.
No jQuery, etc.
May include functions with some unsupported environments but should avoid latest js in builded form.
*/

/**
 * Looks at data only(No object === object comparison. Instead checks each key and value)
 *
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */
export function dataEquals(a, b) {
  if (BaseObjectHelper.isCommonObject(a) && BaseObjectHelper.isCommonObject(b)) {
    return objectDataEquals(a, b)
  } else {
    return equals(a, b)
  }
}

/**
 * Checks if object data equals each other
 *
 * @param {*} a
 * @param {*} b
 * @param {*} looped For recursion
 * @return {Boolean}
 */
export function objectDataEquals(a, b, looped = []) {
  // Key check
  if (!arrayEquals(Object.keys(a), Object.keys(b))) {
    return false
  }

  for (let key in a) {
    // Ignore already looped references
    if (BaseObjectHelper.isCommonObject(a[key])) {
      if (looped.indexOf(a[key]) >= 0) {
        continue
      }

      looped.push(a[key])
    }

    // Type check
    if (typeof a[key] !== typeof b[key]) {
      return false
    }

    // Value check
    if (BaseObjectHelper.isCommonObject(a[key])) {
      if (!objectDataEquals(a[key], b[key], looped)) {
        return false
      }
    } else {
      if (!equals(a[key], b[key])) {
        return false
      }
    }
  }

  // PASSED
  return true
}

/**
 * Array.prototype.slice is confusing because "to" is actually excluded.
 *
 * @param {*[]} arr
 * @param {Number} from
 * @param {Number} to
 * @return {*[]}
 */
export function cleverSlice(arr, from, to) {
  //
  if (!exists(from)) {
    from = 0
  }
  if (!exists(to)) {
    return arr.slice(from)
  } else {
    return arr.slice(from, to + 1)
  }
}

/**
 * Gets Arguments as Array.
 * Arguments from "arguments" are not a real array. Slice fixes this.
 *
 * @param {import('./types/ts/index.js').ArgumentsObject} args Arguments Object similar to array
 * @param {Number} from
 * @param {Number} to
 * @return {*[]}
 */
export function getArguments(args, from, to) {
  // In es6 this can be done with [...args].
  const argsObj = Array.prototype.slice.call(args) // To array
  return cleverSlice(argsObj, from, to)
}

/**
 * Checks if data in array.
 * Checks data only, not reference equality.
 *
 * @param {*} data
 * @param {*[]} arr
 * @return {Boolean}
 */
export function dataInArray(data, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (dataEquals(data, arr[i])) {
      return true
    }
  }

  // FAILED
  return false
}

/**
 * Copies variable regardless of type
 *
 * @param {*} variable
 * @param {Boolean} keepReferences
 * @return {*} copied variable
 */
export function copyVariable(variable, keepReferences = false) {
  let copy = null
  if (BaseObjectHelper.isObject(variable)) {
    if (keepReferences) {
      copy = Object.assign({}, variable)
    } else {
      copy = BaseObjectHelper.copyObject(variable)
    }
  } else if (Array.isArray(variable)) {
    if (keepReferences) {
      copy = variable.slice(0)
    } else {
      copy = BaseObjectHelper.copyObject(variable)
    }
  } else {
    copy = variable
  }

  return copy
}

/**
 * Creates multiple of single variable
 *
 * @param {*} variable
 * @param {Number} count How many to make(integer)
 * @param {Boolean} keepReferences
 * @return {*[]} array of copies
 */
export function createMultiple(variable, count, keepReferences = false) {
  /**
   * @type {string[]}
   */
  const arr = []
  for (let i = 0; i < count; i++) {
    arr.push(copyVariable(variable, keepReferences))
  }

  return arr
}

/**
 * Converts any variable to a readable string.
 *
 * @param {*} data
 * @return {String}
 */
export function toReadableString(data) {
  // Default
  let str = ''

  if (BaseObjectHelper.isObject(data)) {
    str = BaseObjectHelper.objectToReadableString(data)
  } else {
    str = String(data)
  }

  return str
}

/**
 * Exports data to browser UI as readable value.
 *
 * @param {*} data
 */
export function exportData(data) {
  const str = toReadableString(data)
  return window.prompt('', str)
}

/**
   * Gets similarity of variable(0~1)
   *
   * @param {*} var1
   * @param {*} var2
   * @return {Number}
   */
export function getSimilarity(var1, var2) {
  if (var1 === var2) {
    return 1
  } else if (typeof var1 === 'number' && typeof var2 === 'number') {
    return getNumberSimilarity(var1, var2)
  } else {
    var1 = toReadableString(var1)
    var2 = toReadableString(var2)
  }

  return getStringSimilarity(var1, var2)
}

/**
   * Gets data set for sending to server.
   * JQuery handles all this automatically so use JQuery ajax, post, get instead.
   *
   * @deprecated
   * @param {*} data
   * @return {Object}
   */
export function getDataSet(data) {
  // SPEC: Makes sure format is ok for server.

  if (!BaseObjectHelper.isObject(data)) {
    return {}
  }

  return data
}

/**
   * Executes ajax.
   * See getDataSet for deprecation info.
   *
   * @deprecated
   * @param {Object} dataSet dataSet is simple obj  with key/value pairs.
   * @param {String} url
   * @param {import('./types/ts/index.js').AjaxResponseOptions} options
   */
export function executeAjax(dataSet, url, options) {
  // Default
  //

  // Options
  if (BaseObjectHelper.isObject(options)) {
    //
  }

  // URL check
  if (!url) {
    return handleAjaxResponse(new window.XMLHttpRequest(), options)
  }

  // Header settings
  const contentEncoding = 'gzip'
  const contentType = 'application/x-www-form-urlencoded; charset=UTF-8'

  // Data
  const params = getAjaxParams(dataSet)

  // Connection
  const xhr = new window.XMLHttpRequest()
  xhr.open('POST', url, true) // Always async
  xhr.setRequestHeader('Content-Encoding', contentEncoding)
  xhr.setRequestHeader('Content-Type', contentType) // REQUIRED FOR PARAMS FORMAT
  xhr.onload = function () {
    handleAjaxResponse(xhr, options)
  }
  xhr.onerror = function () {
    handleAjaxResponse(xhr, options)
  }
  return xhr.send(params)
}

/**
   * Creates AJAX parameters from object of key value pairs.
   * Just need to attach to end of GET URL(example@domain.com?[ADD HERE])
   *
   * @param {import('./object-helpers.js').Dictionary} obj
   * @return {String}
   */
export function getAjaxParams(obj) {
  let params = ''
  let i = 0

  for (let key in obj) {
    if (i > 0) { params += '&' }
    params += key
    params += '='
    params += window.encodeURIComponent(obj[key])

    // Inc
    i++
  }

  return params
}

/**
   * Handles response from AJAX.
   * See getDataSet for deprecation info.
   *
   * @deprecated
   * @param {XMLHttpRequest} xhr
   * @param {import('./types/ts/index.js').AjaxResponseOptions} options
   * @return {*}
   */
export function handleAjaxResponse(xhr, options) {
  // Not finished
  if (xhr && xhr.readyState !== xhr.DONE) {
    return false
  }

  // Default
  let callback = null

  // Options
  if (BaseObjectHelper.isObject(options)) {
    // Callback
    if (options.callback !== undefined) {
      callback = options.callback
    }
  }

  // Handle response
  let response = false
  if (xhr) {
    response = xhr.response
  }

  // Callback
  return (callback !== null) ? handleCallback(callback, [response, xhr]) : null
}

/**
 * Polyfill object.
 * USES inheritence/prototype so sets on all instances.
 * @param {any} object
 * @param {Record<any, any>} polyfillMap
 */
export function polyfill(object, polyfillMap) {
  for (const key in polyfillMap) {
    const value = polyfillMap[key]
    if (!object['prototype'][key]) {
      object['prototype'][key] = value
    }
  }
}

/*
OLD IMPLEMENTATION.
Use NEW IMPLEMENTATION for proper typing.
export function failOnFalsy(value) {
  if (!value) {
    throw new Error(`Unallowed falsy value`)
  }
  return value
}
*/
/**
 * @template T
 * @param {T|import('./types/ts/index.js').Falsy} value
 */
export function failOnFalsy(value) {
  if (!value) {
    throw new Error(`${value} expected to be non-falsy failed check.`)
  }
  return /** @type {Exclude<T, import('./types/ts/index.js').Falsy>} */ (value)
}

/**
 * Simplest way of traversing object.
 * @param {Object} o 
 * @param {(parent: Object, key: string) => void} onProperty 
 */
export const traverseObject = (o, onProperty) => {
  for (const k in o) {
    onProperty(o, k)
    // @ts-ignore
    const v = o[k]
    if (v && typeof v === 'object') {
      traverseObject(v, onProperty)
    }
  }
};

/**
 * Simple function for observing(watching) changes on an object.
 * This is for easy copy and pasting when needed so contains NO DEPENDENCIES.
 * Logs changes and the stack.
 * THE RETURNED PROXY OBJECT IS OBSERVED, SO MUST EDIT THE RETURNED VALUE.
 * @param {Object} object
 * @param {string[]} keys
 * @return {Proxy}
 */
export function createObjectKeyObserver(object, keys = []) {
  /**
   * @type {ProxyHandler<*>}
   */
  const handler = {
    set(target, key, value) {
      if (keys.includes(String(key))) {
        console.log(`Setting value ${String(key)} as ${value}`)
        try {
          throw new Error('Error for catching stack')
        } catch (error) {
          console.log('Stack', error)
        }
        target[key] = value
      }
      return true
    }
  }
  return new Proxy(object, handler)
}

/**
 * Simple function for observing(watching) changes on an object.
 * This is for easy copy and pasting when needed so contains NO DEPENDENCIES.
 * Logs changes and the stack.
 * @param {Object} object
 * @param {string} key
 * @return {function():void} Stops watching.
 */
export function observeObjectKeys(object, key) {
  /*
    * object.watch polyfill
    *
    * 2012-04-03
    *
    * By Eli Grey, http://eligrey.com
    * Public Domain.
    * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    */

  // object.watch
  /**
   * @param {string} prop 
   * @param {function(string, *, *):*} handler 
   */
  function watch(prop, handler) {
    // @ts-ignore
    const obj = this
    let currentVal = obj[prop]
    const getter = function () {
      return currentVal
    }
    /**
     * @param {*} val
     */
    const setter = function (val) {
      return currentVal = handler.call(obj, prop, currentVal, val)
    }
    if (delete obj[prop]) { // can't watch constants
      Object.defineProperty(obj, prop, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      })
    }
  }
  if (!('watch' in Object.prototype)) {
    Object.defineProperty(Object.prototype, 'watch', {
      enumerable: false,
      configurable: true,
      writable: false,
      value: watch
    })
  }

  // object.unwatch
  /**
   * @param {*} prop 
   */
  function unwatch(prop) {
    // @ts-ignore
    const obj = this
    const p = /** @type {keyof obj} */ (prop)
    const val = obj[p]
    delete obj[p] // remove accessors
    obj[p] = val
  }
  if (!('unwatch' in Object.prototype)) {
    Object.defineProperty(Object.prototype, 'unwatch', {
      enumerable: false,
      configurable: true,
      writable: false,
      value: unwatch
    })
  }
  // Polyfill end.

  // @ts-ignore
  const polyfilledObject = /** @type {{watch: typeof watch, unwatch: typeof unwatch}} */ (object)
  polyfilledObject.watch(key, (key, oldVal, newVal) => {
    console.log(`Setting key ${key} from ${oldVal} to ${newVal}`)
    try {
      throw new Error('Error for catching stack')
    } catch (error) {
      console.log('Stack', error)
    }
    return newVal
  })

  return () => {
    polyfilledObject.unwatch(key)
  }
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
 * @param {string} base64
 */
export function base64ToBytes(base64) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => {
    const codePoint = m.codePointAt(0)
    if (codePoint === undefined) throw new Error('undefined codePoint')
    return codePoint
  });
}
/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
 * @param {string} base64
 */
export function bytesToBase64(base64) {
  const binString = Array.from(base64, (byte) => String.fromCodePoint(Number(byte))).join("");
  return btoa(binString);
}
/**
 * @param {string} ascii  
 */
export function atobUnicode(ascii) {
  return base64ToBytes(new TextEncoder().encode(ascii).toString())
}
/**
 * @param {string} base64 
 */
export function btoaUnicode(base64) {
  return new TextDecoder().decode(base64ToBytes(base64))
}