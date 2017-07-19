/*
Functions dependent on other libraries.
*/

function getLanguageButtons(languages, domHelper){
  //Dependency: setUriParam
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

function getVariablesFromFile(url, callback){
  //Dependency: jQuery
  var beforeKeys = Object.keys(window);
  loadFile(url, function(data){
    loadScriptData(data, function(){
      var added = getAddedVariableNames(window, beforeKeys);
      var variables = filterObjectVariables(obj, added);

      callback(variables);
    });
  });
}

function uriActionHandler(uri, actions){
  //Dependency: https://github.com/derek-watson/jsUri
  //Passes query value to function. Ex: http://domain.com?test=2 => testFunction(2);
  
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

function setUriParam(url, key, val){
  //Dependency: https://github.com/derek-watson/jsUri
  
  if(!window.Uri){
    return false;
  }
  var uriObj = new Uri(url);
  
  return uriObj.deleteQueryParam(key).addQueryParam(key, val);
}

function setupHamburger(el){
  //Dependency: https://github.com/jonsuh/hamburgers
  //css dependency so no check.
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