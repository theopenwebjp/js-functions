const Utility = require('./utility')

/**
 * List of JQuery based utility functions
 */
class JQueryFunctions {
  /**
     * Loads url via ajax
     * Fails getting bad json due to auto parsing
     *
     * @param {String} url
     * @param {Function} callback
     * @param {Function} onError
     */
  static loadAjax (url, callback, onError) {
    // Keep below just in case.
    if (!window.$) {
      callback(null)
      return false
    }

    return window.$.ajax({
      url: url,
      /**
             * @param {*} data
             */
      success: function (data) {
        callback(data)
      },
      /**
             *
             * @param {XMLHttpRequest} xhr
             * @param {string} status
             * @param {string} errorStr
             */
      error: function (xhr, status, errorStr) {
        callback(null)
        if (onError) {
          onError(xhr, status, errorStr)
        }
      },
      dateType: 'text'
    })
  }

  /**
     * Loads JSON
     *
     * @param {String} url
     * @param {Function} callback
     */
  static loadJson (url, callback) {
    // jQuery dependent
    if (!window.$) {
      callback(null)
      return false
    }

    return window.$.getJSON(url,
      /**
             * @param {object} object
             */
      function (object) {
        callback(object)
      })
  }

  /**
     * Loads JSON that may have JS format instead.
     * Does not seem to use jquery so should remove!!
     *
     * @deprecated
     * @param {String} url
     * @param {Function} callback
     * @param {Function|undefined} onError
     */
  static loadFuzzyJson (url, callback, onError = undefined) {
    Utility.loadFile(url,
      /**
             * @param {string} data
             */
      function (data) {
        data = Utility.parseFuzzyJson(data)
        callback(data)
      }, onError)
  }

  /**
     * Show element
     *
     * @param {HTMLElement} el
     * @param {Object} options
     */
  static showElement (el, options = {}) {
    return window.$(el).show(options)
  }

  /**
     * Hide element
     *
     * @param {HTMLElement} el
     * @param {Object} options
     */
  static hideElement (el, options = {}) {
    return window.$(el).show(options)
  }

  /**
     * Set display of element via boolean
     *
     * @param {HTMLElement} el
     * @param {Boolean} bool
     */
  static setElementDisplay (el, bool) {
    if (bool) {
      return JQueryFunctions.showElement(el)
    } else {
      return JQueryFunctions.hideElement(el)
    }
  }
}

module.exports = JQueryFunctions
