// TODO: https://stackoverflow.com/questions/59083632/how-to-fix-definition-for-rule-typescript-eslint-no-use-before-declare-was-n

  /**
   * Searches object array for value.
   *
   * @param {object[]} arr
   * @param {String} key
   * @param {*} val
   * @return {object[]} array of objects with match
   */
export function searchObjectArray(arr, key, val) {
  /**
   * @type {Object<string, *>[]}
   */
  const found = []
  /**
   * @type {Object<string, *>}
   */
  let obj
  for (let i = 0; i < arr.length; i++) {
    obj = arr[i]

    if (obj[key] === val) {
      found.push(obj)
    }
  }

  return found
}

/**
   * Converts 1d array to object.
   * Array values are used as keys, values are set with defaultVal.
   *
   * @param {string[]} arr If any numbers exist, cast beforehand.
   * @param {String} defaultVal
   * @return {Object<string|number, *>}
   */
export function singleDimensionArrayToObject(arr, defaultVal = '') {
  /**
   * @type {Object<string|number, *>}
   */
  const obj = {}
  /**
   * @type {string|number}
   */
  let key
  for (let i = 0; i < arr.length; i++) {
    key = arr[i]
    obj[key] = defaultVal
  }

  return obj
}

/**
   * Converts 2d array to array of objects.
   * Useful for settings using objects: [[1,2,3,4], ...], ['a','b','c','d'] => [{a: 1, b: 2, c: 3, d: 4}, ...]
   *
   * @param {any[][]} arr
   * @param {Array<string|number>} keys
   * @return {Object<string, *>[]}
   */
export function arrayListToObjectList(arr, keys) {
  return arr.map(function (val) {
    /**
     * @type {Object<string, *>}
     */
    const obj = {}
    for (let i = 0; i < val.length; i++) {
      obj[keys[i]] = val[i]
    }
    return obj
  })
}

/**
   * Converts array of words to camel case string
   *
   * @param {string[]} arr
   * @return {String}
   */
export function arrayToCamelCase(arr) {
  let str = ''

  for (let i = 0; i < arr.length; i++) {
    let tempStr = arr[i]

    if (i > 0) {
      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1)
    }

    str += tempStr
  }

  return str
}

/**
   * Builds string from array + format
   *
   * @param {string[]} arr
   * @param {String} format
   * @return {String}
   */
export function buildDelimiterString(arr, format) {
  let cHandle = null

  if (format === 'camelCase') {
    cHandle = arrayToCamelCase
  } else {
    /**
     * @param {string[]} arr
     * @return {string}
     */
    cHandle = function (arr) {
      const del = format
      return arr.join(del)
    }
  }

  return cHandle(arr)
}

/**
   * Creates unique array
   *
   * @param {*[]} arr
   * @return {*[]}
   */
export function uniqueArray(arr) {
  return arr.filter((value, index, array) => {
    return array.indexOf(value) === index
  })
}

/**
* @param {any[]} items
*/
export function getRandomItemFromArray(items) {
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}

/**
 * @param {any[]} arr
 * @return {any[]}
 */
export function arrayifyAll(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = [arr[i]]
  }

  return arr
}
