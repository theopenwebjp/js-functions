const BaseUtility = require('./base-utility');
const BaseObjectHelper = require('./base-object-helper');
const BaseArrayHelper = require('./base-array-helper');

/*
This file is for utility functions only.
This file combines all base files functionality.
Functions should have no state.
No jQuery, etc.
May include functions with some unsupported environments but should avoid latest js in builded form.
*/
class Utility extends BaseUtility{
  constructor(){
    super();
  }

  /**
   * Looks at data only(No object === object comparison. Instead checks each key and value)
   * 
   * @param {*} a 
   * @param {*} b 
   * @return {Boolean}
   */
  static dataEquals(a, b){
    
    if(BaseObjectHelper.isObject(a) && BaseObjectHelper.isObject(b)){
      return Utility.objectDataEquals(a, b);
    }
    
    else{
      return BaseUtility.equals(a, b);
    }
  }

  /**
   * Checks if object data equals eachother
   * 
   * @param {*} a 
   * @param {*} b 
   * @param {*} looped For recursion
   * @return {Boolean}
   */
  static objectDataEquals(a, b, looped=[]){
    
    //Key check
    if(!BaseUtility.arrayEquals(Object.keys(a), Object.keys(b))){
      return false;
    }
    
    for(var key in a){
      
      //Ignore already looped
      if(looped.indexOf(key) >= 0){
        continue;
      }
      
      looped.push(key);
      
      //Type check
      if(typeof a[key] !== typeof b[key]){
        return false;
      }
      
      //Value check
      if(BaseObjectHelper.isObject(a[key])){
        if(!Utility.objectDataEquals(a[key], b[key], looped)){
          return false;
        }
      }else if(Array.isArray(a[key])){
        if(!BaseUtility.arrayEquals(a[key], b[key])){
          return false;
        }
      }else{
        if(!BaseUtility.equals(a[key], b[key])){
          return false;
        }
      }
    }
    
    //PASSED
    return true;
  }

  /**
   * Array.prototype.slice is confusing because "to" is actually excluded.
   * 
   * @param {Array} arr 
   * @param {Number} from 
   * @param {Number} to 
   * @return {Array}
   */
  static cleverSlice(arr, from, to){
    //
    if(!BaseUtility.exists(from)){
      from = 0;
    }
    if(!BaseUtility.exists(to)){
      return arr.slice(from);
    }else{
      return arr.slice(from, to + 1);
    }
  }

  /**
   * Gets Arguments as Array
   * 
   * @param {Object} args Arguments Object similar to array 
   * @param {*} from 
   * @param {*} to 
   * @return {Array}
   */
  static getArguments(args, from, to){
    args = Array.prototype.slice.call(args);//To array
    return Utility.cleverSlice(args, from, to);
  }

  static combineObjects(args){//Multiple objects//??Why using getArguments
    args = Utility.getArguments(args);
    args = [{}].concat(args);//Array of objects
    
    return Object.assign.apply(Object, args);
  }

  static dataInArray(data, arr){
    for(var i=0; i<arr.length; i++){
      if(Utility.dataEquals(data, arr[i])){
        return true;
      }
    }
    
    //FAILED
    return false;
  }

  static copyVariable(variable, keepReferences){
    var copy = null;
    if(BaseObjectHelper.isObject(variable)){
      if(keepReferences){
        copy = Object.assign({}, variable)
      }else{
        copy = BaseObjectHelper.copyObject(variable);
      }
    }else if(Array.isArray(variable)){
      if(keepReferences){
        copy = variable.slice(0);
      }else{
        copy = BaseObjectHelper.copyObject(variable);
      }
    }else{
      copy = variable;
    }
    
    return copy;
  }

  static createMultiple(variable, count, keepReferences){
    var arr = [];
    for(var i=0; i<count; i++){
      arr.push( Utility.copyVariable(variable, keepReferences) );
    }
    
    return arr;
  }

  static toReadableString(data){
    
      //Default
      var str = "";
    
      if(BaseObjectHelper.isObject(data)){
          str = BaseObjectHelper.objectToReadableString(data);
      }
    
      else{
          str = String(data);
      }
    
      return str;
    }

    static exportData(data){
      var str = Utility.toReadableString(data);
      return window.prompt("", str);
    }

    static getSimilarity(var1, var2){
      if(var1 === var2){
        return 1;
      }
      
      else if(typeof var1 === "number" && typeof var2 === "number"){
        return Utility.getNumberSimilarity(var1, var2);
      }
      
      else{
        var1 = Utility.toReadableString(var1);
        var2 = Utility.toReadableString(var2);
      }
      
      return Utility.getStringSimilarity(var1, var2);
    }

    static getDataSet(data){
      //SPEC: Makes sure format is ok for server.
    
      if(!BaseObjectHelper.isObject(data)){
          return {};
      }
    
      return data;
    }
  
    static executeAjax(dataSet, url, options){
      //SPEC: dataSet is simple obj  with key/value pairs.
    
      //Default
      //
    
      //Options
      if(BaseObjectHelper.isObject(options)){
          //
      }
    
      //URL check
      if(!url){
        return Utility.handleAjaxResponse({}, options);
      }
    
      //Header settings
      var contentEncoding = "gzip";
      var contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    
      //Data
      var params = Utility.getAjaxParams(dataSet);
    
      //Connection
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);//Always async
      xhr.setRequestHeader("Content-Encoding", contentEncoding);
      xhr.setRequestHeader("Content-Type", contentType);//REQUIRED FOR PARAMS FORMAT
      xhr.onload = function(xhr){
        Utility.handleAjaxResponse(xhr, options);
      }
      xhr.onerror = function(){
        Utility.handleAjaxResponse(xhr, options);
      }
      return xhr.send(params);
    }
    
    static getAjaxParams(obj){
    
      var params = "";
      var i = 0;
    
      for(var key in obj){
        if(i > 0){params+= "&";}
        params+= key;
        params+= "=";
        params+= window.encodeURIComponent(obj[key]);
    
        //Inc
        i++;
      }
    
      return params;
    }
    
    static handleAjaxResponse(xhr, options){
    
      //Not finished
      if(xhr && xhr.responseType !== xhr.DONE){
          return false;
      }
    
      //Default
      var callback = null;
    
      //Options
      if(BaseObjectHelper.isObject(options)){
    
        //Callback
        if(options.callback !== undefined){
            callback = options.callback;
        }
      }
    
      //Handle response
      var response = false;
      if(xhr){
        response = xhr.response;
      }
    
      //Callback
      return Utility.handleCallback(callback, [response, xhr]);
    }
}

module.exports = Utility;