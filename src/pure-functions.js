/**
 * Collection of pure functions.
 * Pure functions have ZERO dependencies.
 */

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
