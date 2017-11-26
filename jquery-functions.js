const Utility = require('./utility');

class JQueryFunctions{
  loadAjax(url, callback, onError){
    //jQuery dependent
    //Fails getting bad json due to auto parsing.
    
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
    console.log(ajax);
  }
  
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
  
  loadFuzzyJson(url, callback){
    Utility.loadFile(url, function(data){
      data = Utility.parseFuzzyJson(data);
      callback(data);
    }, function(args){console.log(args);});
  }
  
  showElement(el, options){
    return $(el).show(options);
  }
  
  hideElement(el, options){
    return $(el).show(options);
  }
  
  setElementDisplay(el, bool){
    if(bool){
      return JQueryFunctions.showElement(el);
    }else{
      return JQueryFunctions.hideElement(el);
    }
  }
}

module.exports = JQueryFunctions;