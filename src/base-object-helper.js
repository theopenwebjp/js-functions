/**
 * @typedef {Object<string, *>} Dictionary
 */

/**
 * @typedef {object} ObjectInfo
 * @property {number} depth
 * @property {string} key
 * @property {*} value
 */

/**
 * @typedef {object} KeyValue
 * @property {null|string} key
 * @property {null|*} value
 */

/**
 * @typedef {object} GetterSetter
 * @property {function():*} get
 * @property {function(*):void} set
 */

/**
 * @typedef {GetterSetter} WatchOptions
 */

/**
 * @typedef {object} WatchObject
 * @property {object} obj
 * @property {string} key
 * @property {*} initialValue
 * @property {WatchOptions} options
 * @property {function():void} stop
 */

class BaseObjectHelper {
  /**
     * Copies data without references.
     * Not perfect solution, but is most basic.
     * var copy = Object.assign({}, obj);//seems to keep inner references.
     * Does not work for circular references.
     * Does not work for __proto__ inheriting variables(Usually native class objects) and functions.
     * @param {Object} obj
     */
  static copyObject(obj) {
    try {
      return JSON.parse(JSON.stringify(obj))
    } catch (err) {
      return {}
    }
  }

  /**
     * For extracting shallow data from object.
     *
     * @param {Dictionary} obj
     * @return {Dictionary} shallow copy
     */
  static copyObjectData(obj) {
    /**
         * @type {Dictionary}
         */
    var copy = {}
    for (var key in obj) {
      if (!BaseObjectHelper.isCommonObject(obj[key])) {
        copy[key] = obj[key]
      }
    }

    return copy
  }

  /**
     * Applies shallow object data one way between objects.
     * Allows for conditional handling.
     *
     * @param {Dictionary} from
     * @param {Dictionary} to
     * @param {function(string, Dictionary, Dictionary):boolean} condition
     * @return {Dictionary} to
     */
  static applyObj(from, to, condition) {
    // Check
    if (!BaseObjectHelper.isObject(from) || !BaseObjectHelper.isObject(to)) {
      throw new Error('Failed object check')
    }

    for (var key in from) {
      // Condition handling
      if (condition && !condition(key, from, to)) {
        continue
      }

      // Set
      to[key] = from[key]
    }

    return to
  }

  /**
     * Gets value at index of keys in object.
     *
     * @param {Dictionary} obj
     * @param {number} index
     * @return {Object} {key: key, value: val}
     */
  static getObjectKeyValueAtIndex(obj, index) {
    var keys = Object.keys(obj)
    /**
             * @type {KeyValue}
             */
    var keyValue = {
      key: null,
      value: null
    }

    keyValue.key = keys[index]
    keyValue.value = obj[keyValue.key]

    return keyValue
  }

  /**
     * Same keys as in: for(var key in obj)
     * As opposed to usual Object.keys.
     * Does not use hasOwnProperty
     *
     * @param {Object} obj
     * @return {string[]} array of keys
     */
  static getObjectKeys(obj) {
    // Same keys as in: for(var key in obj).
    // Does not use hasOwnProperty.

    /**
         * @type {string[]}
         */
    var keys = []
    for (var key in obj) {
      keys.push(key)
    }

    return keys
  }

  /**
   * @typedef {Array<*>|Dictionary} CommonObject
   */

  /**
     * Expands and inserts data of common object into common object.
     * Common object: Array or normal object
     *
     * @param {CommonObject} obj
     * @param {CommonObject} parentObj
     * @param {Number} insertIndex
     * @return {CommonObject}
     */
  static expandCommonObjectIntoObject(obj, parentObj, insertIndex = 0) {
    /**
     * @param {string|number} key 
     * @param {*} value 
     */
    const set = (key, value) => {
      if (Array.isArray(parentObj)) {
        parentObj.splice(Number(key), 0, value) // Moves rest forwards
      } else {
        parentObj[String(key)] = value
      }
    }

    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        let key = (insertIndex + i)
        set(key, obj[key])
      }
    } else {
      for (let key in obj) {
        set(key, obj[key])
      }
    }

    return parentObj
  }

  /**
     * Log each element in object on single line.
     * Naming confusing, should change!!
     *
     * @param {Dictionary} obj
     */
  static logObjectOnSingleLine(obj) {
    var str = ''
    var LF = '\n'
    for (var key in obj) {
      str += (key + ': ' + String(obj[key]) + LF)
    }

    console.log(str)
  }

  /**
     * Checks if is object of map style.
     *
     * @param {*} obj
     * @return {Boolean}
     */
  static isObject(obj) {
    if (
      typeof obj === 'object' &&
      obj !== null &&
      !Array.isArray(obj)
    ) {
      return true
    } else {
      return false
    }
  }

  /**
     * Checks if is map object but not from DOM.
     *
     * @param {Object} obj
     * @return {Boolean}
     */
  static isNonDomObject(obj) {
    if (BaseObjectHelper.isObject(obj) && !('nodeType' in obj)) {
      return true
    } else {
      return false
    }
  }

  /**
     * Checks if is traversible object(map object or array)
     *
     * @param {*} obj
     * @return {Boolean}
     */
  static isCommonObject(obj) {
    return (BaseObjectHelper.isObject(obj) || Array.isArray(obj))
  }

  /**
     * Object with possible nesting => array of objects with information.
     *
     * @param {Dictionary} obj
     * @param {Number} curDepth
     * @param {ObjectInfo[]} arr
     * @return {ObjectInfo[]}
     */
  static objectToObjectInfoArray(obj, curDepth = 1, arr = []) {
    var val

    for (var key in obj) {
      if (BaseObjectHelper.isCommonObject(obj[key])) { // Nested objects
        BaseObjectHelper.objectToObjectInfoArray(obj[key], (curDepth + 1), arr)
      } else { // Value
        val = obj[key]
        arr.push(BaseObjectHelper.objectInfo(curDepth, key, val))
      }
    }

    return arr
  }

  /**
     * Information about object value
     *
     * @param {Number} depth Starting at 1
     * @param {*} key
     * @param {*} value
     * @return {ObjectInfo}
     */
  static objectInfo(depth, key, value) {
    return {
      depth: depth,
      key: key,
      value: value
    }
  }

  /**
     * Diff(added) of object keys
     *
     * @param {Object} obj
     * @param {string[]} beforeKeys
     * @return {string[]} added keys
     */
  static getAddedVariableNames(obj, beforeKeys) {
    const afterKeys = Object.keys(obj)
    const added = afterKeys.filter(key => beforeKeys.indexOf(key) < 0)
    return added
  }

  /**
     * Diff(removed) of object keys
     *
     * @param {Object} obj
     * @param {string[]} beforeKeys
     * @return {string[]} removed keys
     */
  static getRemovedVariableNames(obj, beforeKeys) {
    const afterKeys = Object.keys(obj)
    const removed = beforeKeys.filter(key => afterKeys.indexOf(key) < 0)
    return removed
  }

  /**
     * Returns object with only desired keys
     *
     * @param {Dictionary} obj
     * @param {string[]} keys
     * @return {Object}
     */
  static filterObjectVariables(obj, keys) {
    /**
         * @type {Object<string, *>}
         */
    var filtered = {}
    for (var i = 0; i < keys.length; i++) {
      filtered[keys[i]] = obj[keys[i]]
    }

    return filtered
  }

  /**
     * Globalizes(sets to window) all shallow data in object
     *
     * @param {Dictionary} obj
     */
  static globalize(obj) {
    for (var key in obj) {
      if (key in window) {
        // @ts-ignore: Setting window
        window[key] = obj[key]
      }
    }
  }

  /**
     * Rename object key
     *
     * @param {Dictionary} obj
     * @param {String} oldKey
     * @param {String} newKey
     */
  static renameObjectKey(obj, oldKey, newKey) {
    if (oldKey !== newKey) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, oldKey)
      if (descriptor) {
        Object.defineProperty(obj, newKey, descriptor)
        delete obj[oldKey]
      } else {
        throw new Error('Failed to find descriptor.')
      }
    }
  }

  /**
     * Diffs 2 objects and gets object of change information
     *
     * @param {Dictionary} oldObj
     * @param {Dictionary} newObj
     * @return {Dictionary} Changes. See source.
     */
  static getKeyChanges(oldObj, newObj) {
    /**
         * Also array allowed. Anything with keys ok.
         * @typedef {object} Changes
         * @property {Dictionary} added
         * @property {Dictionary} updated
         * @property {Dictionary} old
         * @property {Dictionary} deleted
         */

    /**
     * @type {Changes}
     */
    const changes = {
      added: {}, // New value
      updated: {}, // New value
      old: {}, // Old value
      deleted: {} // Old value
    }

    let key
    for (key in oldObj) {
      // Deleted
      if (!newObj || !Object.prototype.hasOwnProperty.call(newObj, key)) {
        changes.deleted[key] = oldObj[key]
      } else if (newObj && oldObj[key] !== newObj[key]) { // Edited
        changes.old[key] = oldObj[key]
        changes.updated[key] = newObj[key]
      }
    }

    for (key in newObj) {
      if (oldObj && !Object.prototype.hasOwnProperty.call(oldObj, key)) {
        changes.added[key] = newObj[key]
      }
    }

    return changes
  }

  /**
     * Object to readable string.
     * Should make as readable as possible.
     *
     * @param {Object} obj
     * @param {Function|undefined} onError
     * @return {String}
     */
  static objectToReadableString(obj, onError = undefined) { // TODO: Make actually readable
    var str = ''
    try {
      var tempStr = JSON.stringify(obj)
      str = tempStr
    } catch (err) {
      if (onError) {
        onError(err)
      } else {
        console.log(err)
      }
    }

    return str
  }

  /**
     * Starts watching object property.
     * Returns object for handling watching including stopping watching.
     *
     * @param {Dictionary} obj
     * @param {String} key
     * @param {Partial<WatchOptions>} options
     * @return {WatchObject} watch object
     * @example See comments in code.
     */
  static watchObjectProperty(obj, key, options = {}) {
    /*
      Usage:
      var usages = [];
      var obj = {};
      var returnObj = watchObjectProperty(obj, 'a', {
          get: function(){
          usages.push(['get', this]);
          return obj['a'];
          },
          set: function(val){
          usages.push(['set', this]);
          return val;
          }
      });
      var test = obj['a'];
      obj['a'] = 1;
      */

    var get = options.get || function () { }
    var set = options.set || function () { }
    /**
     * @type {GetterSetter}
     */
    const completeOptions = {
      get,
      set
    }

    /**
         * @type {WatchObject}
         */
    var returnObj = {
      obj: obj,
      key: key,
      initialValue: obj[key], // May change depending on setting and type
      options: completeOptions,

      stop: function () {
        Object.defineProperty(obj, key, {
          get: undefined,
          set: undefined
        })
      }
    }

    Object.defineProperty(obj, key, {
      writable: true,
      configurable: true,
      enumerable: true,
      get: get,
      set: set
    })

    return returnObj
  }
}

module.exports = BaseObjectHelper
