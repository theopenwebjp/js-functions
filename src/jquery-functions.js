const Utility = require('./utility');

/**
 * List of JQuery based utility functions
 */
class JQueryFunctions{

  /**
   * Loads url via ajax 
   * Fails getting bad json due to auto parsing
   * 
   * @param {String} url 
   * @param {Function} callback 
   * @param {Function} onError 
   */
  loadAjax(url, callback, onError){
    
    //Keep below just in case.
    if(!window.$){
      callback(null);
      return false;
    }
  
    var ajax = $.ajax({
      url: url,
      success: function (data){
        callback(data);
      },
      error: function(xhr, status, errorStr){
        callback(null);
        if(onError){onError(arguments);}
      },
      dateType: "text"
    });
  }
  
  /**
   * Loads JSON
   * 
   * @param {String} url 
   * @param {Function} callback 
   */
  loadJson(url, callback){
    //jQuery dependent
    if(!window.$){
      callback(null);
      return false;
    }
  
    return $.getJSON(url, function(json) {
      callback(json);
    }); 
  }
  
  /**
   * Loads JSON that may have JS format instead.
   * Does not seem to use jquery so should remove!!
   * 
   * @deprecated
   * @param {String} url 
   * @param {Function} callback
   * @param {Function} onError
   */
  loadFuzzyJson(url, callback, onError=null){
    Utility.loadFile(url, function(data){
      data = Utility.parseFuzzyJson(data);
      callback(data);
    }, onError);
  }
  
  /**
   * Show element
   * 
   * @param {DomElement} el 
   * @param {Object} options 
   */
  showElement(el, options){
    return $(el).show(options);
  }
  
  /**
   * Hide element
   * 
   * @param {DomElement} el 
   * @param {Object} options 
   */
  hideElement(el, options){
    return $(el).show(options);
  }
  
  /**
   * Set display of element via boolean
   * 
   * @param {DomElement} el 
   * @param {Boolean} bool 
   */
  setElementDisplay(el, bool){
    if(bool){
      return JQueryFunctions.showElement(el);
    }else{
      return JQueryFunctions.hideElement(el);
    }
  }
}

module.exports = JQueryFunctions;