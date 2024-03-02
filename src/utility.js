import * as BaseObjectHelper from './base-object-helper.js'
// import BaseArrayHelper from './base-array-helper'
import {
  equals, arrayEquals, exists, getNumberSimilarity, getStringSimilarity, handleCallback
} from './base-utility.js'

export * from './base-utility.js'

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
  args = Array.prototype.slice.call(args) // To array
  return cleverSlice(args, from, to)
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
   * @param {import('./base-object-helper').Dictionary} obj
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
