/**
 * Base utility file.
 * Should not be dependent on code outside this file.
 */
class BaseUtility {
  /**
   * Gets wrapped strings from string.
   * Examples: XML TAGS <>, double quotes "", mustache {{}}...
   *
   * @param {String} str
   * @param {String} wrapperOpen
   * @param {String} wrapperClose
   * @param {Boolean} keepWrapper Include wrapper in output
   * @param {Boolean} useClosingTagEnd Allows for things like {{{a}}} > {a} instead of {a
   * @return {Array} Array of detected wrapped strings
   */
  static getWrappedStrings(
    str,
    wrapperOpen,
    wrapperClose,
    keepWrapper = null,
    useClosingTagEnd = null
  ) {
    var strings = []

    var status = {
      currentString: '',
      inWrap: false
    }

    var i = 0
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
  static asyncCheck(callback) {
    var ms = Math.ceil(Math.random() * 10)
    window.setTimeout(function () {
      const returnVal = 'check ok'
      callback(returnVal)
    }, ms)
  }

  /**
   * Turns a function handling a callback into a promise.
   *
   * @param {Function} handle
   * @param {Array} args
   * @param {number} resolveIndex
   * @return {Promise}
   */
  static promisify(handle, args, resolveIndex) {
    var oldHandle = handle
    handle = function () {
      var oldCallback = args[resolveIndex]
      var promise = new Promise(function (resolve) {
        args[resolveIndex] = function () {
          resolve.apply(this, arguments)
        }

        oldHandle.apply(this, args)
      })
      promise.then(function (successValue) {
        oldCallback(successValue)
      })

      return promise
    }
  }

  /**
   * Handles multiple async functions.
   * Needs checking!!(handle, status.current positioning looks iffy.)
   *
   * @param {Array} arr Array of items. See code.
   * @param {Function} onEnd
   * @return {Boolean}
   */
  static asyncHandler(arr, onEnd) {
    /*
        array item = {
          handle: null,
          args: [],
          callbackParamIndex: 0,

          index: int, auto set.
        };
        */

    var status = {
      current: 0,
      total: arr.length,
      returned: []
    }

    var handle = function () {
      var item = arr[status.current]

      // Finished
      if (!item) {
        onEnd(status.returned)
        return false
      }

      item.index = status.current

      item.args[item.callbackParamIndex] = function () {
        status.returned[item.index] = arguments

        handle()
      }

      item.handle.apply(this, item.args)

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
  static equals(a, b) {
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
   * @param {Array} a
   * @param {Array} b
   * @return {Boolean}
   */
  static arrayEquals(a, b) {
    if (a.length !== b.length) {
      return false
    }

    for (var i = 0; i < a.length; i++) {
      if (!BaseUtility.equals(a[i], b[i])) {
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
  static exists(data) {
    // More useful data check than "==" OR !!
    return !(data === null || data === undefined)
  }

  static buildMediaQuery(dimensions) {
    var d = dimensions
    var parts = []
    if (BaseUtility.exists(d.width) && BaseUtility.exists(d.width.min)) {
      parts.push('min-width: ' + d.width.min + 'px')
    }
    if (BaseUtility.exists(d.width) && BaseUtility.exists(d.width.max)) {
      parts.push('max-width: ' + d.width.max + 'px')
    }
    if (BaseUtility.exists(d.height) && BaseUtility.exists(d.height.min)) {
      parts.push('min-height: ' + d.height.min + 'px')
    }
    if (BaseUtility.exists(d.height) && BaseUtility.exists(d.height.max)) {
      parts.push('max-height: ' + d.height.max + 'px')
    }

    var query = ''
    for (var i = 0; i < parts.length; i++) {
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
  static promptPrint() {
    window.print()
  }

  /**
   * Logging function that won't cause error if does not exist, and includes some options.
   *
   * @param {*} data
   * @param {Object} options See link
   * @see https://developers.google.com/web/tools/chrome-devtools/console/console-write#styling_console_output_with_css
   */
  static log(data, options = null) {
    if (!options) {
      options = {
        prettify: false,
        title: '',
        beforeLog: null,
        afterLog: null,
        type: 'log' // console functions: log, info, warn, error, ...
      }
    }

    if (!window.console) {
      return false
    }

    // Type
    var type = 'log'
    if (options.type && console[type]) {
      type = options.type
    }

    // Prettify
    if (options.prettify) {
      options.beforeLog = function () {
        console.log('')
      }
    }

    if (options.beforeLog) {
      options.beforeLog(data)
    }
    if (options.title) {
      console.log(options.title)
    }
    console[type](data)
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
  static getDataUrlExtension(dataUrl) {
    return dataUrl.split(';')[0].split('/')[1]
  }

  /**
   * Download data
   *
   * @param {*} data
   * @param {String} name
   * @param {String} mimeType
   */
  static download(data, name, mimeType) {
    var blob = new window.Blob([data], {
      type: mimeType
    })
    return BaseUtility.downloadBlob(blob, name)
  }

  /**
   * Downloads the current HTML page
   */
  static downloadCurrentPage() {
    var data = document.documentElement.innerHTML
    var fileName = BaseUtility.getFileName(window.location.href)
    return BaseUtility.download(data, fileName, 'text/html')
  }

  /**
   * Gets file name from url
   * Does not distinguish file extensions.
   *
   * @param {String} url
   * @return {String} file name
   */
  static getFileName(url) {
    return url.split('#').shift() // No fragment
      .split('?').shift() // No arguments
      .split('/').pop() // Only last route
  }

  /**
   * Gets file extension from url
   *
   * @param {String} url
   * @return {String} file extension
   */
  static getFileExtension(url) {
    var parts = url.split('.')
    var ext = parts[parts.length - 1] || ''
    return ext
  }

  /**
   * Downloads file from dataURL
   *
   * @param {String} dataUrl
   * @param {String} name
   */
  static downloadDataUrl(dataUrl, name) {
    var url = dataUrl.replace(
      /^data:image\/[^;]/,
      'data:application/octet-stream'
    )
    var extension = BaseUtility.getDataUrlExtension(dataUrl)
    var fullName = name + '.' + extension
    BaseUtility.downloadLink(url, fullName)
  }

  /**
   * Causes execution of blob.
   * May be blocked by browser(especially when multiple downloads occur.)
   *
   * @param {Blob} blob
   * @param {String} name
   */
  static downloadBlob(blob, name) {
    // CREATE URL ELEMENT
    var url = window.URL.createObjectURL(blob)

    // EXTENSION
    var extension
    if (blob.type) {
      extension = blob.type.split('/')[1]
    } else {
      extension = 'txt'
    }

    // FULL NAME
    var fullName = name + '.' + extension

    // Internet Explorer
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fullName)
    } else {
      // Other
      BaseUtility.downloadLink(url, fullName)
    }

    // COMPLETE
    return true
  }

  /**
   * Downloads link
   * CAUTION. Not working for cross domain urls.
   * CAUTION. Max 10 downloads at once(occurred in Chrome).
   *
   * @param {String} url
   * @param {String} fullName
   */
  static downloadLink(url, fullName) {
    // CREATE LINK
    var link = window.document.createElement('a')
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
    link.parentElement.removeChild(link)
  }

  /**
   * Safely attempts to JSON parse data.
   * Always returns an object.
   *
   * @param {*} data JSON parseable data
   * @param {Function} onError optional error handler
   * @return {Object}
   */
  static toObject(data, onError = null) {
    var obj = {}

    try {
      var tempObj = BaseUtility.parseJson(data)
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
  static parseFuzzyJson(str) {
    var obj

    // Try standard JSON
    obj = BaseUtility.parseJson(str)
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
   * @return {Object}
   */
  static parseJson(str) {
    if (!window.JSON) {
      return null
    }

    try {
      var json = JSON.parse(str)
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
  static stringifyJson(jsonObj) {
    if (!window.JSON) {
      return null
    }

    try {
      var str = JSON.stringify(jsonObj)
      return str
    } catch (err) {
      return null
    }
  }

  /**
   * GETs multiple file data
   *
   * @param {Array} urls
   * @param {Function} onData
   * @return {Promise}
   */
  static loadFiles(urls, onData) {
    var promises = []
    for (var i = 0; i < urls.length; i++) {
      promises.push(
        new Promise(function (resolve) {
          BaseUtility.loadFile(urls[i], function (data) {
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
   * @param {Function} callback
   * @param {Function} onError
   * @return {XMLHttpRequest}
   */
  static loadFile(url, callback, onError = null) {
    var xhttp = new window.XMLHttpRequest()
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
   *
   * @param {Function} callback
   * @param {Array} args
   */
  static handleCallback(callback, args) {
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
  static downloadData(data, name) {
    var downloadableData = data // Process here
    if (!name) {
      name = 'untitled'
    }
    return BaseUtility.download(downloadableData, name, 'text/txt')
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
  static handlePrompt(handle, text, defaultText) {
    var value = window.prompt(text, defaultText)
    return handle(value)
  }

  /**
   * Gets current date. Not needed. Should remove.
   * @deprecated
   * @return {Date}
   */
  static getCurrentDate() {
    var date = new Date()
    return date
  }

  /**
   * Inserts delimiter at selected points in lenArr
   * Used for things like binary data splitting etc.
   *
   * @param {String} str
   * @param {String} delimiter
   * @param {Array} lenArr
   * @return {String}
   */
  static getFormattedString(str, delimiter, lenArr) {
    // Ignore no formatting
    if (!delimiter || !lenArr || lenArr.length === 0) {
      return str
    }

    var returnStr = ''
    var curIndex = 0 // Same as done.
    // var remaining
    // var length = str.length

    for (var i = 0; i < lenArr.length; i++) {
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
  static getCurrentLocation(callback) {
    return navigator.geolocation.getCurrentPosition(function (pos) {
      callback(pos.latitude, pos.longitude)
    })
  }

  /**
   * Loads file data from input event.
   *
   * @param {Object} event
   * @param {Function} callback
   * @param {Object} options
   * @return {FileReader}
   */
  static loadFileInput(event, callback, options) {
    var file = null

    if (!event.dataTransfer && event.target.files.length > 0) {
      file = event.target.files[0]
    } else if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      file = event.dataTransfer.files[0]
    }

    var reader = new window.FileReader()
    reader.onload = function (event) {
      var data = event.target.result
      callback(data)
    }
    reader.onerror = function (err) {
      console.log(err)
    }

    reader[options.method](file)

    return reader
  }

  /**
   * Can be unaccurate in last row cell if includes line feeds.
   * Requires col count as line feeds allowed in cells.
   * Last cell needs to be split by lf.
   * Uses tabbed data: From spreadsheet, HTML table, etc.
   *
   * @param {String} data
   * @param {Number} colCount
   * @return {Array}
   */
  static convertTabbedDataToArray(data, colCount) {
    var arr = []
    var TAB = '\t'
    var LF = '\n'
    var split, i, x, y
    var isStartCell, isLastCell, isFirstEndCell, isMidStartCell, isMidEndCell
    var firstEndCellIndex, midCellColOver

    // Format
    var items1 = data.split(TAB)

    var items = []
    for (i = 0; i < items1.length; i++) {
      // Settings
      firstEndCellIndex = colCount - 1
      midCellColOver = (i - firstEndCellIndex) % (colCount - 1)
      isStartCell = i === 0
      isLastCell = i + 1 === items1.length
      isFirstEndCell = !isLastCell && i === firstEndCellIndex
      isMidEndCell = !isLastCell && !isStartCell && !isFirstEndCell && midCellColOver === 0

      if (
        isFirstEndCell || // row 1
        isMidEndCell // Mid row(smaller due to lf delimiter)
      ) {
        split = items1[i].split(LF)
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

    for (i = 0; i < items.length; i++) {
      x = Math.floor(i / colCount)
      y = i % colCount

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
  static replaceAll(str, find, replace) {
    return str.split(find).join(replace)
  }

  static getLoadScriptHandle(src, parent) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('src', src)

      parent.appendChild(script)

      script.addEventListener('load', resolve)
      script.addEventListener('error', reject)
    })
  }

  static getLoadStyleSheetHandle(src, parent) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', src)

      parent.appendChild(link)

      if (link.onload !== undefined) {
        link.addEventListener('load', resolve)
        link.addEventListener('error', reject)
      } else {
        resolve()
      }
    })
  }

  static getLoadTemplateHandle(src, parent) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'import')
      link.setAttribute('href', src)

      parent.appendChild(link)

      if (link.onload !== undefined) {
        link.addEventListener('load', resolve)
        link.addEventListener('error', reject)
      } else {
        resolve()
      }
    })
  }

  /**
   * Loads array of url data with custom handle for handling urls
   * @param {Array} arr array of link href urls.
   * @param {Object} optionsAbstract
   * @return {Promise}
   */
  static loadAbstractUrls(arr, handle, optionsAbstract) {
    // Deprecated: @param {Boolean} ordered default false because order not usually important.
    const options = typeof optionsAbstract === 'object' ? optionsAbstract : {}
    const ordered =
      (typeof optionsAbstract === 'boolean'
        ? optionsAbstract
        : options.ordered) || false
    const parent = options.parent || document.body

    const handles = arr.map(src => {
      return () => {
        return handle(src, parent)
      }
    })
    return BaseUtility.promiseAll(handles, ordered)
  }

  /**
   * Loads array of url data with css or js
   * @param {Array} arr array of link href urls.
   * @param {Object} options See loadAbstractUrls
   * @return {Promise}
   */
  static loadDependencyUrls(arr, options = {}) {
    const handle = (src, parent) => {
      if (src.substr(-'.js'.length) === '.js') {
        return BaseUtility.getLoadScriptHandle(src, parent)
      } else if (src.substr(-'.css'.length) === '.css') {
        return BaseUtility.getLoadStyleSheetHandle(src, parent)
      } else if (src.substr(-'.html'.length) === '.html') {
        return BaseUtility.getLoadTemplateHandle(src, parent)
      } else {
        return Promise.reject(
          new Error(`Invalid extension used for source: ${src}`)
        )
      }
    }
    return BaseUtility.loadAbstractUrls(arr, handle, options)
  }

  /**
   * Loads style sheet
   * @param {Array} arr array of link href urls.
   * @param {Object} optionsAbstract
   * @return {Promise}
   */
  static loadStyleSheets(arr, optionsAbstract) {
    return BaseUtility.loadAbstractUrls(
      arr,
      BaseUtility.getLoadStyleSheetHandle,
      optionsAbstract
    )
  }

  /**
   * Loads scripts(Injects script tag into DOM)
   * @param {Array} arr array of script src urls.
   * @param {Object} optionsAbstract
   * @return {Promise}
   */
  static loadScripts(arr, optionsAbstract) {
    return BaseUtility.loadAbstractUrls(
      arr,
      BaseUtility.getLoadScriptHandle,
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
  static loadScriptData(data, onLoad) {
    var script = document.createElement('script')
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
   * @return {Array} array of separated strings
   */
  static camelCaseToArray(str) {
    var arr = []
    var cur = null

    for (var i = 0; i < str.length; i++) {
      if (cur === null) {
        cur = 0
        arr[cur] = ''
      } // Initialize

      if (BaseUtility.isCapitalLetter(str[i])) {
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
  static isCapitalLetter(char) {
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
  static capitalize(str) {
    var firstChar = str.substr(0, 1)
    var otherChars = str.substr(1) || ''

    // Capitalize
    firstChar = firstChar.toUpperCase()

    // Add remaining
    str = firstChar + otherChars

    return str
  }

  /**
   * Gets index of value from variable that could be following: String, Number, Array, Object
   *
   * @param {*} data
   * @param {*} find value searching for.
   * @return {*} index(String or Number)
   */
  static getIndexOf(data, find) {
    // Allows using object
    var index = -1

    // Standard
    if (typeof data === 'string' || Array.isArray(data)) {
      index = data.indexOf(find)
    } else {
      // Object
      for (var key in data) {
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
   * @return {Array} array of delimited strings
   */
  static delimiterStringToArray(str, format) {
    var cHandle = null

    if (format === 'camelCase') {
      cHandle = BaseUtility.camelCaseToArray
    } else {
      var del = format
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
  static getStringSimilarity(str1, str2) {
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
    var inclusion1 = BaseUtility.getStringInclusionWeight(str1, str2)
    var inclusion2 = BaseUtility.getStringInclusionWeight(str2, str1)
    var size = BaseUtility.getNumberSimilarity(str1.length, str2.length)
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
  static getStringInclusionWeight(str1, str2) {
    var foundStr = ''
    var cur

    for (var i = str1.length; i >= 1; i--) {
      cur = str1.substr(0, i)
      if (str2.indexOf(cur) >= 0) {
        foundStr = cur
        break
      }
    }
    var weight = BaseUtility.getNumberSimilarity(foundStr.length, str2.length)

    return weight
  }

  /**
   * Gets number similarity relative to scale of numbers (0~1)
   *
   * @param {Number} num1
   * @param {Number} num2
   * @return {Number}
   */
  static getNumberSimilarity(num1, num2) {
    var max = BaseUtility.getMax(num1, num2)
    var min = BaseUtility.getMin(num1, num2)
    var diff = max - min
    var bounds = Math.abs(max) > Math.abs(min) ? Math.abs(max) : Math.abs(min) // Negative OK
    var signedBounds = min < 0 && max > 0 ? bounds * 2 : bounds // Double bounds for NEGATIVE AND POSITIVE

    return 1 - diff / signedBounds
  }

  /**
   * Gets max number from unlimited number of parameters
   *
   * @param {Array} args Array of numbers
   * @return {Number}
   */
  static getMax(...args) {
    var max = null
    for (var i = 0; i < args.length; i++) {
      if (max === null || args[i] > max) {
        max = args[i]
      }
    }

    return max
  }

  /**
   * Gets min number from unlimited number of parameters
   *
   * @param {Array} args Array of numbers
   * @return {Number}
   */
  static getMin(...args) {
    var min = null
    for (var i = 0; i < args.length; i++) {
      if (min === null || args[i] < min) {
        min = args[i]
      }
    }

    return min
  }

  static removeNonCharacters(str) {
    var returnStr = str

    // Outer
    returnStr = returnStr.trim()

    // Inner white space
    returnStr = BaseUtility.replaceAll(returnStr, ' ', '')

    // Tabs + lf
    returnStr = BaseUtility.replaceAll(returnStr, '\t', '')
    returnStr = BaseUtility.replaceAll(returnStr, '\n', '')
    returnStr = BaseUtility.replaceAll(returnStr, '\r', '')

    return returnStr
  }

  /**
   * Checks if is native function.
   * Native functions can not be accessed in certain ways.
   * For example, the contents can not be viewed.
   *
   * @param {Function} func
   * @return {Boolean}
   */
  static isNativeFunction(func) {
    var str = func.toString()
    var trimmedStr = BaseUtility.removeNonCharacters(str)
    var expected = '{[nativecode]}'

    return trimmedStr.substr(-expected.length, expected.length) === expected
  }

  /**
   * Takes functions(probably dependent on eachother)
   * and outputs string that can be copy + pasted.
   * @param {Array} funcs array of functions
   * @return {String}
   */
  static buildFunctionModule(funcs) {
    var str = ''
    var func
    for (var i = 0; i < funcs.length; i++) {
      func = funcs[i]

      if (!BaseUtility.isNativeFunction(func)) {
        str += func.toString()
      }
    }

    return str
  }

  /**
   * Usage: For distinguishing between log/non-log functions such as disallowing/allowing logging.
   * @param {Function} func
   * @return {Boolean}
   */
  static isLogFunction(func) {
    var logFunctions = [window.alert]
    if (window.console) {
      // https://developer.mozilla.org/en/docs/Web/API/console
      logFunctions = logFunctions.concat([
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
  static getStackInfo() {
    var info = {
      error: null,
      stack: '',
      function: null,
      stackParts: [],
      lineNumber: null,
      columnNumber: null
    }

    /*
        stackPart: {
          function: '',
          lineNumber: null,
          columnNumber: null
        }
        */

    info.error = new Error()
    info.stack = info.error.stack

    // Only works on Chrome so far
    if (info.stack.substr(0, 'Error'.length) === 'Error') {
      var s = info.stack
      var lines = s.split('\n')
      lines.forEach(function (line, key) {
        key = Number(key)

        if (key === 0) {
          return
        }

        var stackPart = {
          function: '',
          lineNumber: null,
          columnNumber: null
        }
        var startIndex = line.indexOf('at') + 'at '.length // First index
        var lineInfo = line.substr(startIndex)
        var parts = lineInfo.split(' ')
        if (parts.length === 1) {
          parts.unshift('')
        }
        var detailsParts = parts[1].split(':')
        var columnNumber = detailsParts[2].split(')')[0]

        stackPart.function = parts[0]
        stackPart.lineNumber = detailsParts[1]
        stackPart.columnNumber = columnNumber

        if (key === 1) {
          info.function = stackPart.function
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
   * @param {Object} classInstance
   * @param {Function} onFunction
   */
  static loopClassFunctions(classInstance, onFunction) {
    BaseUtility.loopClass(classInstance, (name) => {
      if (typeof classInstance[name] === 'function') {
        onFunction(classInstance[name], name, classInstance)
      }
    })
  }

  /**
  * Loops class instance properties.
  *
  * @param {Object} classInstance
  * @param {Function} onFunction
  */
  static loopClassProperties(classInstance, onProperty) {
    BaseUtility.loopClass(classInstance, (name) => {
      if (typeof classInstance[name] !== 'function') {
        onProperty(classInstance[name], name, classInstance)
      }
    })
  }

  static loopClass(classInstance, onVariable) {
    for (let obj = classInstance; obj; obj = Object.getPrototypeOf(obj)) {
      // obj returning function under certain circumstances and leading to arguments being referenced below.
      // This causes an error in strict mode, so check added below.
      // getPrototypeOf returns function on static classes.
      // ?? No need to loop past classInstance. Fix later.
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
   * TODO
   */
  static loopStaticClassMethods() {

  }

  /**
   * Binds class instance to all functions.
   * Used so no need to worry about using this in classes.
   *
   * @param {Object} classInstance
   */
  static bindClassThis(classInstance) {
    BaseUtility.loopClassFunctions(classInstance, (value, name, obj) => { // ??try with obj instead of same class instance.
      const variable = classInstance[name]
      classInstance[name] = variable.bind(classInstance)
    })
  }

  static applyStaticFunctions(classInstance, constructor) {
    const staticFunctions = BaseUtility.getStaticFunctions(constructor)
    for (let key in staticFunctions) {
      classInstance[key] = staticFunctions[key]
    }
  }

  static getStaticFunctionNames(constructor) {
    return Object.getOwnPropertyNames(constructor)
      .filter(prop => typeof constructor[prop] === 'function')
  }

  static getStaticFunctions(constructor) {
    const names = BaseUtility.getStaticFunctionNames(constructor)
    const functions = {}
    names.forEach(name => {
      functions[name] = constructor[name]
    })
    return functions
  }

  /**
   * Automatically performs number operation on each key in object.
   *
   * @param {Array} objArr Array of objects containing numbers.
   * @return {Object} Reduced object
   */
  static reduceObjectArray(objArr) {
    let returnObj = {}
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
   * @return {Promise}
   */
  static waitFor(condition, pollInterval = 50) {
    if (condition()) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
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
   * @return {Promise}
   */
  static sleep(ms) {
    return new Promise(resolve => {
      window.setTimeout(resolve, ms)
    })
  }

  /**
   * Clever event handling mechanism
   * Detects single mode or array mode by type of events[name]
   * Returns single or array based on single mode type
   *
   * @param {Object} events
   * @param {String} name
   * @param {*} data data passed to event
   * @param {Object} options
   * @return {*} Return data(single or array)
   */
  static handleEvent(events, name, data = undefined, options = {}) {
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
  static mergeEventsObject(events1, events2) {
    const events = {}
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
   * @return {Promise}
   */
  static urlToBlob(url) {
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
        reject(err.message)
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
   * @param {Number} ms
   * @return {Promise}
   * @see https://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved?noredirect=1&lq=1
   * @see https://stackoverflow.com/questions/35716275/how-to-tell-if-a-promise-is-resolved
   */
  static timeout(promise, ms) {
    return new Promise((resolve, reject) => {
      const onEnd = data => {
        resolve(data)
      }

      const onTimeout = () => {
        reject(new Error('timed out'))
      }

      promise.then(onEnd)
      BaseUtility.sleep(ms).then(onTimeout)
    })
  }

  /**
   * Gets array of promises by status from array.
   * Main use is for early exit of Promise.all where need to get what completed.
   * @param {Array} promises
   * @param {Boolean} resolved (resolved = true. rejected = false)
   * @return {Promise} resolves array of promises
   */
  static getPromisesByState(promises, resolved = false) {
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

    const checkPromises = []
    promises.forEach(promise => {
      checkPromises.push(checkPromise(promise))
    })

    return Promise.all(checkPromises).then(boolArr => {
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
   * @param {Array} arr array of functions that should return promises.
   * @param {Boolean} ordered Whether to execute handles sequentially or in any order(fastest).
   * @return {Promise}
   */
  static promiseAll(arr, ordered = false) {
    if (ordered) {
      if (arr.length === 0) {
        Promise.resolve([])
      }

      const responses = []
      let p = Promise.resolve()
      arr.forEach((handle, index) => {
        p = p.then(handle).then(response => {
          responses[index] = response
        })
      })
      p = p.then(() => {
        return responses
      })

      return p
    } else {
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
   * @param {Object} options optional data outputted in format key=value;
   * @return {String}
   */
  static createDataURI(data, mimeType = 'text/plain', options = {}) {
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
   */
  static compare(a, b, comparator = '=') {
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
   * @return {Object}
   */
  static isMinimzed(str) {
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

    const getCount = (src, find) => {
      return src.split(find).length - 1
    }
    const wsCount = getCount(str, ' ')
    const charCount = str.length

    const percentage = (wsCount / charCount) * 100

    let firstPassIndex = null
    ranges.forEach((range, index) => {
      if (firstPassIndex !== null) {
        return
      }

      if (percentage < range.val) {
        firstPassIndex = index
      }
    })
    const level = ranges[firstPassIndex].key
    const bool = firstPassIndex <= HIGHEST_TRUE_INDEX

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
  static watchForHashValue(value, func) {
    const getUrlHash = (url) => {
      let hashStr = (new window.URL(url)).hash
      return (hashStr.length > 0) ? hashStr.substr(1) : ''
    }

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
   * @return {Array} Results array each with format({startIndex, endIndex, value})
   */
  static scanString(string, checker) {
    const newStatus = () => {
      return {
        startIndex: null,
        endIndex: null,
        value: ''
      }
    }
    const resultsArray = []
    const length = string.length
    let status = newStatus()
    let index = 0
    for (; index <= length; index++) {
      let char = string[index]

      let bool = checker(char, status)
      if (bool) {
        resultsArray.push(status)
        status = newStatus()
      }
    }

    // Unfinished status
    if (status.startIndex !== null) {
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
   * @param {Array} indexes
   * @param {Boolean} sortRequired If false, expects "start" index from low to high.
   * @return {String} replaced string
   */
  static replaceStringIndexes(string, indexes = [], sortRequired = true) {
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
    let indexInfo
    let replacedString = ''
    let startIndex = 0
    for (let i = 0; i < length; i++) {
      indexInfo = indexes[i]

      let endIndex = indexInfo[START_INDEX_KEY] // ??END_INDEX_KEY check!!
      let value = indexInfo[VALUE_KEY]
      replacedString += string.substring(startIndex, endIndex) + value // Not including end index

      // Update next start index
      startIndex = endIndex + 1
    }

    // Remaining
    if (startIndex < string.length) {
      replacedString += string.substr(startIndex)
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
  static replaceAt(string, replacer, startIndex, endIndex) {
    return string.substring(0, startIndex) + replacer + string.substring(endIndex)
  }

  /**
   * Generate random string
   * @param {Number} length
   * @return {String}
   */
  static generateRandomString(length = 0) {
    let string = ''
    var allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

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
  static fixPageAnchorTagSecurity() {
    const anchorList = [...document.querySelectorAll('a')]
    anchorList.forEach(a => {
      BaseUtility.setSpaceDelimitedElementAttribute(a, 'rel', ['noopener', 'noreferrer'])
    })
  }

  static setSpaceDelimitedElementAttribute(element, attribute, values = []) {
    let attributeValues = element.getAttribute(attribute).split(' ')
    values.forEach(value => {
      if (!attributeValues.includes(value)) {
        attributeValues.push(value)
      }
    })
    element.setAttribute(attributeValues.join(' '))
  }
}

if (typeof window === 'object') {
  window.BaseUtility = BaseUtility
}
if (typeof module === 'object') {
  module.exports = BaseUtility
}
