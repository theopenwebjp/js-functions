class BaseArrayHelper{
      /**
       * Searches object array for value.
       * 
       * @param {Array} arr 
       * @param {String} key 
       * @param {*} val 
       * @return {Array} array of objects with match
       */
      static searchObjectArray(arr, key, val){
        var found = [];
        var obj;
        for(var i=0; i<arr.length; i++){
          obj = arr[i];
          
          if(obj[key] === val){
            found.push(obj);
          }
        }
        
        return found;
      }
    
      /**
       * Converts 1d array to object.
       * Array values are used as keys, values are set with defaultVal.
       * 
       * @param {Array} arr 
       * @return {String} defaultVal
       * @return {Object}
       */
      static singleDimensionArrayToObject(arr, defaultVal=''){
        var obj = {};
        var key;
        for(var i=0; i<arr.length; i++){
          key = arr[i];
          obj[key] = defaultVal;
        }
        
        return obj;
      }
      
      /**
       * Converts 2d array to array of objects.
       * Useful for settings using objects: [[1,2,3,4], ...], ["a","b","c","d"] => [{a: 1, b: 2, c: 3, d: 4}, ...]
       * 
       * @param {Array} arr 
       * @param {Array} keys 
       * @return {Array}
       */
      static arrayListToObjectList(arr, keys){
        return arr.map(function(val){
          var obj = {};
          for(var i=0; i<val.length; i++){
            obj[ keys[i] ] = val[i];
          }
          return obj;
        });
      }
    
      /**
       * Converts array of words to camel case string
       * 
       * @param {Array} arr 
       * @return {String}
       */
      static arrayToCamelCase(arr){
        var str = "";
        var tempStr;
      
        for(var i=0; i<arr.length; i++){
          tempStr = arr[i];
      
          if(i > 0){
            tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
          }
      
          str+= tempStr;
        }
      
        return str;
      }
    
      /**
       * Builds string from array + format
       * 
       * @param {Array} arr 
       * @param {String} format 
       * @return {String}
       */
      static buildDelimiterString(arr, format){
        var cHandle = null;
        
        if(format === "camelCase"){
          cHandle = BaseArrayHelper.arrayToCamelCase;
        }else{
          var del = format;
          cHandle = function(arr){
            return arr.join(del);
          };
        }
        
        return cHandle(arr);
      }
    
      /**
       * Creates unique array
       * 
       * @param {Array} arr 
       * @return {Array}
       */
      static uniqueArray(arr) {
        function onlyUnique(value, index, self) { 
          return self.indexOf(value) === index;
        }
        
        var unique = arr.filter( onlyUnique );
      
        return unique;
      }
}

module.exports = BaseArrayHelper;