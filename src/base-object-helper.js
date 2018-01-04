class BaseObjectHelper{

    /**
     * Copies data without references.
     * Not perfect solution, but is most basic.
     * var copy = Object.assign({}, obj);//seems to keep inner references.
     * Does not work for circular references.
     * Does not work for __proto__ inheriting variables(Usually native class objects) and functions.   
     * @param {Object} obj 
     */
    static copyObject(obj){
        var copy = {};
        
        try{
          copy = JSON.parse(JSON.stringify(obj));
        }catch(err){
          //
        }
        
        return copy;
      }
      
      /**
       * For extracting shallow data from object.
       * 
       * @param {Object} obj 
       * @return {Object} shallow copy
       */
      static copyObjectData(obj){
        var copy = {};
        for(var key in obj){
          if(!BaseObjectHelper.isCommonObject(obj[key])){
            copy[key] = obj[key];
          }
        }
        
        return copy;
      }
      
      /**
       * Applies shallow object data one way between objects.
       * Allows for conditional handling.
       * 
       * @param {Object} from 
       * @param {Object} to 
       * @param {Object} condition (key, from, to)=>{return boolean;}
       * @return {Object} to
       */
      static applyObj(from, to, condition){
      
        //Check
        if(!BaseObjectHelper.isObject(from) || !BaseObjectHelper.isObject(to)){
            return false;
        }
      
        for(var key in from){
      
          //Condition handling
          if(condition && !condition(key, from, to)){
              continue;
          }
      
          //Set
          to[key] = from[key];
        }
      
        return to;
      }
      
      /**
       * Gets value at index of keys in object.
       * 
       * @param {Object} obj 
       * @param {*} index 
       * @return {Object} {key: key, value: val}
       */
      static getObjectKeyValueAtIndex(obj, index){
        var keys = Object.keys(obj);
        var keyValue = {
          key: null,
          value: null
        };
        
        keyValue.key = keys[index];
        keyValue.value = obj[keyValue.key];
        
        return keyValue;
      }
      
      /**
       * Same keys as in: for(var key in obj)
       * As opposed to usual Object.keys.
       * Does not use hasOwnProperty
       * 
       * @param {Object} obj 
       * @return {Array} array of keys
       */
      static getObjectKeys(obj){
        //Same keys as in: for(var key in obj).
        //Does not use hasOwnProperty.
        
        var keys = [];
        for(var key in obj){
          keys.push(key);
        }
        
        return keys;
      }
    
      /**
       * Expands and inserts data of common object into common object.
       * Common object: Array or normal object
       * 
       * @param {Array|Object} obj 
       * @param {Array|Object} parentObj 
       * @param {*} insertIndex 
       * @return {Array|Object} parentObj
       */
      static expandCommonObjectIntoObject(obj, parentObj, insertIndex){
        var key, i;
        if(Array.isArray(parentObj)){
          for(i=0; i<obj.length; i++){
            key = (insertIndex + i);
            
            parentObj.splice(key, 0, obj[i]);//Moves rest forwards
          }
        }else{
          for(key in obj){
            parentObj[key] = obj[key];
          }
        }
        
        return parentObj;
      }
      
      /**
       * Deletes object property
       * Handles array or obj because indexing similar
       * Array treating prop as value but object as key!! Inconsistent!! Should remove.
       * 
       * @deprecated
       * @param {Object} obj 
       * @param {*} prop 
       */
      static deleteObjectProperty(obj, prop){
        if(Array.isArray(obj)){
          var index = obj.indexOf(prop);
          if(index >= 0){
            prop.splice(index, 1);
          }
        }else{
          delete obj[prop];
        }
      }
    
      /**
       * Log each element in object on single line.
       * Naming confusing, should change!!
       * 
       * @param {Object} obj 
       */
      static logObjectOnSingleLine(obj){
        var str = "";
        var LF = "\n";
        for(var key in obj){
          str+= (key + ": " + String(obj[key]) + LF);
        }
        
        console.log(str);
      }
    
      /**
       * Checks if is object of map style.
       * 
       * @param {Object} obj 
       * @return {Boolean}
       */
      static isObject(obj){
        if(
          typeof obj === "object" &&
          obj !== null &&
          !Array.isArray(obj)
        ){
          return true;
        }else{
          return false;
        }
      }
      
      /**
       * Checks if is map object but not from DOM.
       * 
       * @param {Object} obj 
       * @return {Boolean}
       */
      static isNonDomObject(obj){
        if(BaseObjectHelper.isObject(obj) && !obj.nodeType){
          return true;
        }else{
          return false;
        }
      }
      
      /**
       * Checks if is traversible object(map object or array)
       * 
       * @param {Object} obj 
       * @return {Boolean}
       */
      static isCommonObject(obj){
        return (BaseObjectHelper.isObject(obj) || Array.isArray(obj));
      }
    
      /**
       * Object with possible nesting => array of objects with information.
       * 
       * @param {Object} obj 
       * @param {Number} curDepth 
       * @return {Array}
       */
      static objectToObjectInfoArray(obj, curDepth=1){
        var arr = [];
        var temp;
        var val;
      
        for(var key in obj){
      
          //Nested objects
          if(BaseObjectHelper.isObject(obj[key])){
            temp = BaseObjectHelper.objectToArray(obj[key], (curDepth + 1));
            arr = arr.concat(temp);
          }
      
          //Value
          else{
            val = obj[key];
            arr.push( new ObjectInfo(curDepth, key, val) );
          }
        }
      
        return arr;
      }
      
      /**
       * Information about object value
       * 
       * @param {Number} depth Starting at 1
       * @param {*} key 
       * @param {*} value 
       * @return {ObjectInfo}
       */
      static ObjectInfo(depth, key, value){
        return {
          depth: curDepth,
          key: key,
          value: val
        };
      }
    
      /**
       * Diff(added) of object keys
       * 
       * @param {Object} obj 
       * @param {Array} beforeKeys 
       * @return {Array} added keys
       */
      static getAddedVariableNames(obj, beforeKeys){
        var afterKeys = Object.keys(obj);
        var added = [];
        for(var i=0; i<afterKeys.length; i++){
          if(beforeKeys.indexOf(afterKeys[i]) < 0){
            added.push(afterKeys[i]);
          }
        }
      
        return added;
      }
      
      /**
       * Diff(removed) of object keys
       * 
       * @param {Object} obj 
       * @param {Array} beforeKeys 
       * @return {Array} removed keys       
       */
      static getRemovedVariableNames(obj, beforeKeys){
        var afterKeys = Object.keys(obj);
        var removed = [];
        for(var i=0; i<beforeKeys.length; i++){
          if(afterKeys.indexOf(beforeKeys[i]) < 0){
            removed.push(beforeKeys[i]);
          }
        }
      
        return removed;
      }
      
      /**
       * Returns object with only desired keys
       * 
       * @param {Object} obj 
       * @param {Array} keys 
       * @return {Object}
       */
      static filterObjectVariables(obj, keys){
        var filtered = {};
        for(var i=0; i<keys.length; i++){
          filtered[ keys[i] ] = obj[ keys[i] ];
        }
      
        return filtered;
      }
      
      /**
       * Globalizes(sets to window) all shalow data in object
       * 
       * @param {Object} obj 
       */
      static globalize(obj){
        for(var key in obj){
          window[key] = obj[key];
        }
      }
    
      /**
       * Rename object key
       * 
       * @param {Object} obj 
       * @param {String} oldKey 
       * @param {String} newKey 
       */
      static renameObjectKey(obj, oldKey, newKey){
        if(oldKey !== newKey){
          Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey));
          delete obj[oldKey];
        }
      }
    
      /**
       * Diffs 2 objects and gets object of change information
       * 
       * @param {Object} oldObj 
       * @param {Object} newObj 
       * @return {Object} Changes. See source.
       */
      static getKeyChanges(oldObj, newObj){
        /*
        Also array allowed. Anything with keys ok.
        */
        var changes = {
          added: {},//New value
          updated: {},//New value
          old: {},//Old value
          deleted: {}//Old value
        };
        
        var key;
        for(key in oldObj){
          
          //Deleted
          if(!newObj || !newObj.hasOwnProperty(key)){
            changes.deleted[key] = oldObj[key];
          }
          
          //Edited
          else if(newObj && oldObj[key] !== newObj[key]){
            changes.old[key] = oldObj[key];
            changes.updated[key] = newObj[key];
          }
        }
        
        for(key in newObj){
          if(oldObj && !oldObj.hasOwnProperty(key)){
            changes.added[key] = newObj[key];
          }
        }
        
        return changes;
      }
    
      /**
       * Object to readable string.
       * Should make as readable as possible.
       * 
       * @param {Object} obj 
       * @param {Function} onError 
       * @return {String}
       */
      static objectToReadableString(obj, onError=null){//??Make actually readable
        var str = "";
        try{
          var tempStr = JSON.stringify(obj);
          str = tempStr;
        }catch(err){
            if(onError){
                onError(err);
            }else{
                console.log(err);
            }
        }
        
        return str;
      }
      
      /**
       * Starts watching object property.
       * Returns object for handling watching including stopping watching.
       * 
       * @param {Object} obj 
       * @param {*} key 
       * @param {Object} options 
       * @return {Object} watch object
       */
      static watchObjectProperty(obj, key, options={}){
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
      
        /*
        Options:
        get
        set
        */
      
        var get = options.get || function(){};
        var set = options.set || function(){};
      
        var returnObj = {
          obj: obj,
          key: key,
          initialValue: obj[key],//May change depending on setting and type
          options: options,
          
          stop: function(){
            Object.defineProperty(obj, key, {
              get: undefined,
              set: undefined
            });
          }
        };
      
        Object.defineProperty(obj, key, {
          writable: true,
          configurable: true,
          enumerable: true,
          get: get,
          set: set
        });
      
        return returnObj;
      }
}

module.exports = BaseObjectHelper;