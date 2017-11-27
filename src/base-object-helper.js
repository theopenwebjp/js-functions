class BaseObjectHelper{
    static copyObject(obj){
        //var copy = Object.assign({}, obj);//seems to keep inner references.
        
        //Does not work for circular references.
        //Does not work for __proto__ inheriting variables(Usually native class objects) and functions.
        var copy = {};
        
        try{
          copy = JSON.parse(JSON.stringify(obj));
        }catch(err){
          //
        }
        
        return copy;
      }
      
      static copyObjectData(obj){
        //For extracting shallow data.
        var copy = {};
        for(var key in obj){
          if(!BaseObjectHelper.isCommonObject(obj[key])){
            copy[key] = obj[key];
          }
        }
        
        return copy;
      }
      
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
      
      static getObjectKeys(obj){
        //Same keys as in: for(var key in obj).
        //Does not use hasOwnProperty.
        
        var keys = [];
        for(var key in obj){
          keys.push(key);
        }
        
        return keys;
      }
    
      static expandCommonObjectIntoObject(obj, parentObj, insertIndex){
        //Expands and inserts data of object into object.
        
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
      
      static deleteObjectProperty(obj, prop){
        //Handles array or obj because indexing similar.
        
        if(Array.isArray(obj)){
          var index = obj.indexOf(prop);
          if(index >= 0){
            prop.splice(index, 1);
          }
        }else{
          delete obj[prop];
        }
      }
    
      static logObjectOnSingleLine(obj){
        var str = "";
        var LF = "\n";
        for(var key in obj){
          str+= (key + ": " + String(obj[key]) + LF);
        }
        
        console.log(str);
      }
    
      static isObject(obj){
        //object that can be traversed
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
      
      static isNonDomObject(obj){
        if(BaseObjectHelper.isObject(obj) && !obj.nodeType){
          return true;
        }else{
          return false;
        }
      }
      
      static isCommonObject(obj){
        //Traversible object or array
        return (BaseObjectHelper.isObject(obj) || Array.isArray(obj));
      }
    
      static objectToObjectInfoArray(obj, curDepth){
        /*
        Object with possible nesting => array of objects with information.
        */
      
        var arr = [];
        var temp;
        var val;
      
        //Default depth
        if(!curDepth){
          curDepth = 1;
        }
      
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
      
      static ObjectInfo(depth, key, value){
        return {
          depth: curDepth,
          key: key,
          value: val
        };
      }
    
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
      
      static filterObjectVariables(obj, keys){
        var filtered = {};
        for(var i=0; i<keys.length; i++){
          filtered[ keys[i] ] = obj[ keys[i] ];
        }
      
        return filtered;
      }
      
      static globalize(obj){
        for(var key in obj){
          window[key] = obj[key];
        }
      }
    
      static renameObjectKey(obj, oldKey, newKey){
        if(oldKey !== newKey){
          Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey));
          delete obj[oldKey];
        }
      }
    
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