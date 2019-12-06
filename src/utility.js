const BaseUtility = require('./base-utility')
const BaseObjectHelper = require('./base-object-helper')
// const BaseArrayHelper = require('./base-array-helper')

/**
 * @typedef {object} AjaxResponseOptions
 * @property {function(boolean, XMLHttpRequest)} callback
 */

/**
 * @typedef {*[]} ArgumentsObject
 * @description Technically not any array. TODO: What is the correct type for this?
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
 */

/*
This file is for utility functions only.
This file combines all base files functionality.
Functions should have no state.
No jQuery, etc.
May include functions with some unsupported environments but should avoid latest js in builded form.
*/
class Utility extends BaseUtility {
  /**
     * Looks at data only(No object === object comparison. Instead checks each key and value)
     *
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     */
  static dataEquals (a, b) {
    if (BaseObjectHelper.isCommonObject(a) && BaseObjectHelper.isCommonObject(b)) {
      return Utility.objectDataEquals(a, b)
    } else {
      return BaseUtility.equals(a, b)
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
  static objectDataEquals (a, b, looped = []) {
    // Key check
    if (!BaseUtility.arrayEquals(Object.keys(a), Object.keys(b))) {
      return false
    }

    for (var key in a) {
      // Ignore already looped
      if (looped.indexOf(key) >= 0) {
        continue
      }

      looped.push(key)

      // Type check
      if (typeof a[key] !== typeof b[key]) {
        return false
      }

      // Value check
      if (BaseObjectHelper.isCommonObject(a[key])) {
        if (!Utility.objectDataEquals(a[key], b[key], looped)) {
          return false
        }
      } else {
        if (!BaseUtility.equals(a[key], b[key])) {
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
  static cleverSlice (arr, from, to) {
    //
    if (!BaseUtility.exists(from)) {
      from = 0
    }
    if (!BaseUtility.exists(to)) {
      return arr.slice(from)
    } else {
      return arr.slice(from, to + 1)
    }
  }

  /**
     * Gets Arguments as Array.
     * Arguments from "arguments" are not a real array. Slice fixes this.
     *
     * @param {ArgumentsObject} args Arguments Object similar to array
     * @param {Number} from
     * @param {Number} to
     * @return {*[]}
     */
  static getArguments (args, from, to) {
    // In es6 this can be done with [...args].
    args = Array.prototype.slice.call(args) // To array
    return Utility.cleverSlice(args, from, to)
  }

  /**
     * Combines array of objects into one.
     *
     * @param {object[]} args Array, but may be arguments list(why here?). Multiple objects.
     * @return {Object}
     */
  static combineObjects (args) { // Multiple ob
    args = [...args] // Possible Arguments list to arguments casting.

    return Object.assign({}, ...args)
  }

  /**
     * Checks if data in array.
     * Checks data only, not reference equality.
     *
     * @param {*} data
     * @param {*[]} arr
     * @return {Boolean}
     */
  static dataInArray (data, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (Utility.dataEquals(data, arr[i])) {
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
  static copyVariable (variable, keepReferences = false) {
    var copy = null
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
  static createMultiple (variable, count, keepReferences = false) {
    var arr = []
    for (var i = 0; i < count; i++) {
      arr.push(Utility.copyVariable(variable, keepReferences))
    }

    return arr
  }

  /**
     * Converts any variable to a readable string.
     *
     * @param {*} data
     * @return {String}
     */
  static toReadableString (data) {
    // Default
    var str = ''

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
  static exportData (data) {
    var str = Utility.toReadableString(data)
    return window.prompt('', str)
  }

  /**
     * Gets similarity of variable(0~1)
     *
     * @param {*} var1
     * @param {*} var2
     * @return {Number}
     */
  static getSimilarity (var1, var2) {
    if (var1 === var2) {
      return 1
    } else if (typeof var1 === 'number' && typeof var2 === 'number') {
      return Utility.getNumberSimilarity(var1, var2)
    } else {
      var1 = Utility.toReadableString(var1)
      var2 = Utility.toReadableString(var2)
    }

    return Utility.getStringSimilarity(var1, var2)
  }

  /**
     * Gets data set for sending to server.
     * JQuery handles all this automatically so use JQuery ajax, post, get instead.
     *
     * @deprecated
     * @param {*} data
     * @return {Object}
     */
  static getDataSet (data) {
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
     * @param {Object} options
     */
  static executeAjax (dataSet, url, options) {
    // Default
    //

    // Options
    if (BaseObjectHelper.isObject(options)) {
      //
    }

    // URL check
    if (!url) {
      return Utility.handleAjaxResponse(new window.XMLHttpRequest(), options)
    }

    // Header settings
    var contentEncoding = 'gzip'
    var contentType = 'application/x-www-form-urlencoded; charset=UTF-8'

    // Data
    var params = Utility.getAjaxParams(dataSet)

    // Connection
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST', url, true) // Always async
    xhr.setRequestHeader('Content-Encoding', contentEncoding)
    xhr.setRequestHeader('Content-Type', contentType) // REQUIRED FOR PARAMS FORMAT
    xhr.onload = function () {
      Utility.handleAjaxResponse(xhr, options)
    }
    xhr.onerror = function () {
      Utility.handleAjaxResponse(xhr, options)
    }
    return xhr.send(params)
  }

  /**
     * Creates AJAX parameters from object of key value pairs.
     * Just need to attach to end of GET URL(example@domain.com?[ADD HERE])
     *
     * @param {Object} obj
     * @return {String}
     */
  static getAjaxParams (obj) {
    var params = ''
    var i = 0

    for (var key in obj) {
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
     * @param {AjaxResponseOptions} options
     * @return {*}
     */
  static handleAjaxResponse (xhr, options) {
    // Not finished
    if (xhr && xhr.readyState !== xhr.DONE) {
      return false
    }

    // Default
    var callback = null

    // Options
    if (BaseObjectHelper.isObject(options)) {
      // Callback
      if (options.callback !== undefined) {
        callback = options.callback
      }
    }

    // Handle response
    var response = false
    if (xhr) {
      response = xhr.response
    }

    // Callback
    return (callback !== null) ? Utility.handleCallback(callback, [response, xhr]) : null
  }
}

module.exports = Utility
