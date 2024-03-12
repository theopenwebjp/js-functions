/**
 * @typedef {import('./types/ts/index.js').Dictionary} Dictionary
 * @typedef {import('./types/ts/index.js').ObjectInfo} ObjectInfo
 * @typedef {import('./types/ts/index.js').KeyValue} KeyValue
 * @typedef {import('./types/ts/index.js').GetterSetter} GetterSetter
 * @typedef {import('./types/ts/index.js').WatchOptions} WatchOptions
 * @typedef {import('./types/ts/index.js').WatchObject} WatchObject
 */

/**
   * Copies data without references.
   * Not perfect solution, but is most basic.
   * var copy = Object.assign({}, obj);//seems to keep inner references.
   * Does not work for circular references.
   * Does not work for __proto__ inheriting variables(Usually native class objects) and functions.
   * @param {Object} obj
   */
export function copyObject(obj) {
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
export function copyObjectData(obj) {
  /**
   * @type {Dictionary}
   */
  const copy = {}
  for (let key in obj) {
    if (!isCommonObject(obj[key])) {
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
export function applyObj(from, to, condition) {
  // Check
  if (!isObject(from) || !isObject(to)) {
    throw new Error('Failed object check')
  }

  for (let key in from) {
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
export function getObjectKeyValueAtIndex(obj, index) {
  const keys = Object.keys(obj)
  /**
   * @type {KeyValue}
   */
  const keyValue = {
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
export function getObjectKeys(obj) {
  // Same keys as in: for(var key in obj).
  // Does not use hasOwnProperty.

  /**
   * @type {string[]}
   */
  const keys = []
  for (let key in obj) {
    keys.push(key)
  }

  return keys
}

/**
   * Expands and inserts data of common object into common object.
   * Common object: Array or normal object
   *
   * @param {import('./types/ts/index.js').CommonObject} obj
   * @param {import('./types/ts/index.js').CommonObject} parentObj
   * @param {Number} insertIndex
   * @return {import('./types/ts/index.js').CommonObject}
   */
export function expandCommonObjectIntoObject(obj, parentObj, insertIndex = 0) {
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
      let spliceIndex = (insertIndex + i)
      set(spliceIndex, obj[i])
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
export function logObjectOnSingleLine(obj) {
  let str = ''
  const LF = '\n'
  for (let key in obj) {
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
export function isObject(obj) {
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
   * @param {any} obj
   * @return {Boolean}
   */
export function isNonDomObject(obj) {
  if (isObject(obj) && !('nodeType' in obj)) {
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
export function isCommonObject(obj) {
  return (isObject(obj) || Array.isArray(obj))
}

/**
   * Object with possible nesting => array of objects with information.
   * Gets information on end values ONLY for now. For example, no array or objects, only nested parts of those.
   *
   * @param {Dictionary} obj
   * @param {Number} curDepth
   * @param {ObjectInfo[]} arr
   * @return {ObjectInfo[]}
   */
export function objectToObjectInfoArray(obj, curDepth = 1, arr = []) {
  for (let key in obj) {
    if (isCommonObject(obj[key])) { // Nested objects
      objectToObjectInfoArray(obj[key], (curDepth + 1), arr)
    } else { // Value
      const val = obj[key]
      arr.push(objectInfo(curDepth, key, val))
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
export function objectInfo(depth, key, value) {
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
export function getAddedVariableNames(obj, beforeKeys) {
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
export function getRemovedVariableNames(obj, beforeKeys) {
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
export function filterObjectVariables(obj, keys) {
  /**
   * @type {Object<string, *>}
   */
  const filtered = {}
  for (let i = 0; i < keys.length; i++) {
    filtered[keys[i]] = obj[keys[i]]
  }

  return filtered
}

/**
   * Globalizes(sets to window) all shallow data in object
   *
   * @param {Dictionary} obj
   */
export function globalize(obj) {
  for (let key in obj) {
    // @ts-ignore: Setting window
    window[key] = obj[key]
  }
}

/**
   * Rename object key
   *
   * @param {Dictionary} obj
   * @param {String} oldKey
   * @param {String} newKey
   */
export function renameObjectKey(obj, oldKey, newKey) {
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
export function getKeyChanges(oldObj, newObj) {
  /**
   * @type {import('./types/ts/index.js').Changes}
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
export function objectToReadableString(obj, onError = undefined) { // TODO: Make actually readable
  let str = ''
  try {
    const tempStr = JSON.stringify(obj)
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
export function watchObjectProperty(obj, key, options = {}) {
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

  const get = options.get || function () { }
  const set = options.set || function () { }
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
  const returnObj = {
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
    // writable: true,
    configurable: true,
    enumerable: true,
    get: get,
    set: set
  })

  return returnObj
}

/**
 * @param {import('./types/ts/index.js').Dictionary} obj
 * @return {Array<[string, *]>}
 */
export function keyValueObjToArrays(obj) {
  /*
  {
    key1, val1,
    keyn, valn,
    ...
  }

  >>

  [
    [key1, val1]
    [keyn, valn]
    ....
  ]
  */

  /**
   * @type {Array<[string, *]>}
   */
  const arr = []

  for (let key in obj) {
    arr.push(
      [key, obj[key]]
    )
  }

  return arr
}
