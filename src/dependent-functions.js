/*
Functions dependent on other libraries.
*/
class DependentFunctions{

  /**
   * Dependency: setUriParam
   * 
   * @param {Array} languages
   * @param {Object} domHelper
   * @return {DomElement}
   */
  static getLanguageButtons(languages, domHelper){
    //
    var settings = {
      tag: "ul",
      attributes: {class: "language-buttons"}
    };
    
    var childrenSettings = {
      replacements: {
        "$1": function(item, i){return item;},
        "$2": function(item, i){var str = setUriParam(location.href, "language", item); return str;}
      },
      items: languages,
      format: {
        tag: "li",
        children: [{
          tag: "a",
          attributes: {
            href: "$2"
          },
          textContent: "$1"
        }]
      }
    };
    settings.children = domHelper.setChildrenSettings(settings, childrenSettings);
    
    var ul = domHelper.createElement(settings);
    
    return ul;
  }
  
  /**
   * Dependency: jQuery, Utility, ObjectHelper
   * 
   * @param {String} url 
   * @param {Function} callback 
   */
  static getVariablesFromFile(url, callback){
    var beforeKeys = Object.keys(window);
    Utility.loadFile(url, function(data){
      Utility.loadScriptData(data, function(){
        var added = Utility.getAddedVariableNames(window, beforeKeys);
        var variables = ObjectHelper.filterObjectVariables(obj, added);
  
        callback(variables);
      });
    });
  }
  
  /**
   * Dependency: https://github.com/derek-watson/jsUri
   * Passes query value to function. Ex: http://domain.com?test=2 => testFunction(2);
   * 
   * @param {String} uri 
   * @param {Object} actions 
   * @return {Object}
   */
  static uriActionHandler(uri, actions){
    if(!window.Uri){
      return false;
    }
    var uriObj = new Uri(uri);
  
    var action;
    var val;
    var results = {};
    
    for(var key in actions){
      val = uriObj.getQueryParamValue(key);
      results[key] = actions[key](val);
    }
    
    return results;
  }
  
  /**
   * Dependency: https://github.com/derek-watson/jsUri
   * 
   * @param {String} url 
   * @param {*} key 
   * @param {*} val 
   */
  static setUriParam(url, key, val){
    if(!window.Uri){
      return false;
    }
    var uriObj = new Uri(url);
    
    return uriObj.deleteQueryParam(key).addQueryParam(key, val);
  }
  
  /**
   * Dependency: https://github.com/jonsuh/hamburgers
   * css dependency so no check.
   * 
   * @param {DomElement} el 
   */
  static setupHamburger(el){
    var hamburger;
    
    //JavaScript
    hamburger = document.querySelector(el);
    hamburger.addEventListener("click", function() {
      // Toggle class "is-active"
      hamburger.classList.toggle("is-active");
      // Do something else, like open/close menu
    });
    
    /*
    //jQuery
    $hamburger = $(el);
    $hamburger.on("click", function(e) {
      $hamburger.toggleClass("is-active");
      // Do something else, like open/close menu
    });
    */
  }
  
  /**
   * Dependency: mustache
   * 
   * @param {Object} data 
   */
  static mustachifyCurrentPage(data){
    if(!window.Mustache){return false;}
    
    var el = document.body;
    var html = el.innerHTML;
    
    /*
    //Quick fix!! Forces all mustaches into no escape mustaches. Fails for loops.
    var customTags = [ '{', '}' ];
    //window.Mustache.parse(html, customTags);//Method 1
    window.Mustache.tags = customTags;//Method 2
    */
    window.Mustache.escapeHtml = function (text) {return text;}
    window.Mustache.escape = function (text) {return text;}
    
    html = window.Mustache.render(html, data);
    
    el.innerHTML = html;
    
    return true;
  }
}

module.exports = DependentFunctions;